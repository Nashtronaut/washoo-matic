<script lang="ts">
  import { supabase } from "./../lib/supabase";
  import TopBar from "./top-bar.svelte";
  import ScoreButtons from "./score-buttons.svelte";
  import History from "./history.svelte";
  import ScoreBoard from "./score-board.svelte";
  import TeamInfo from "./team-info.svelte";
  import NameInput from "./name-input.svelte";
  import type { GameInfo } from "./types.ds";
  import Stats from "./stats.svelte";
  import { userStore } from "$lib/user-store";
  import LoginAndSignUp from "./login-and-sign-up.svelte";
  import ExtraMenu from "./extra-menu.svelte";
  import ExtraPageWrapper from "./extra-page-wrapper.svelte";
  import MyProfile from "./my-profile.svelte";
  import { onMount } from "svelte";
  import LoadSpinner from "./load-spinner.svelte";
  import { errorMessage } from "$lib/error-message-store";
  import FamilyManager from "./family-manager.svelte";
  import MyStats from "./my-stats.svelte";

  let showStats = false;
  let historyMountSize = 0;
  let gameId = 0;
  let spectateMode = false;
  let inputSpectateCode = "";
  let activeTab = "";
  let isLoading = true;

  let freshStats = {
    accuracy: 0,
    shots: 0,
    hits: 0,
    misses: 0,
    points: 0,
    busted: 0,
  };

  // TO ANYONE READING THIS ON GITHUB
  // I know the tailwind stuff is stupid and not optimal. This is a rushed project for the weekend lol. I'll fix it later.
  let gameInfo: GameInfo = {
    players: [
      {
        id: 0,
        dataId: null,
        anonPlayer: true,
        name: null,
        color: "blue",
        colorInformation: {
          name: "Blue",
          hex: "#3AAEEA",
        },
        stats: { ...freshStats },
      },
      {
        id: 1,
        dataId: null,
        anonPlayer: true,
        name: null,
        color: "blue",
        colorInformation: {
          name: "Blue",
          hex: "#3AAEEA",
        },
        stats: { ...freshStats },
      },
      {
        id: 2,
        dataId: null,
        anonPlayer: true,
        name: null,
        color: "red",
        colorInformation: {
          name: "Red",
          hex: "#EF4444",
        },
        stats: { ...freshStats },
      },
      {
        id: 3,
        dataId: null,
        anonPlayer: true,
        name: null,
        color: "red",
        colorInformation: {
          name: "Red",
          hex: "#EF4444",
        },
        stats: { ...freshStats },
      },
    ],
    rounds: [
      {
        name: "Round 1",
        tracking: [],
        redTotal: 0,
        blueTotal: 0,
      },
    ],
    scores: {
      red: 0,
      blue: 0,
    },
    busts: {
      red: 0,
      blue: 0,
    },
    round: "1A",
    currentPlayer: null,
    winner: null,
    shootingFirst: null,
    spectateCode: null,
  };

  onMount(async () => {
    isLoading = true;
    const { data, error } = await supabase.auth.getSession();
    if (!data.session) {
      isLoading = false;
      return;
    }

    if (error) {
      console.error("Error fetching session:", error);
      errorMessage.set(error.message);
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      console.error("Error fetching user data:", userError);
      if (userError) {
        errorMessage.set(userError.message);
      }

      return;
    } else {
      userStore.set(userData.user);
    }

    isLoading = false;
  });

  const trackStats = () => {
    resetStats();
    gameInfo.rounds.forEach((round) => {
      round.tracking.forEach((shot) => {
        const player = gameInfo.players.find(
          (player) => player.id === shot.shooter.id
        );

        if (!player) return;

        player.stats.shots++;
        if (shot.score !== 0) {
          player.stats.hits++;
        } else {
          player.stats.misses++;
        }

        player.stats.accuracy = player.stats.hits / player.stats.shots;
        player.stats.points += shot.score;
        if (shot.busted) {
          player.stats.busted++;
        }
      });
    });
  };

  const resetStats = () => {
    gameInfo.players.forEach((player) => {
      player.stats = {
        accuracy: 0,
        shots: 0,
        hits: 0,
        misses: 0,
        points: 0,
        busted: 0,
      };
    });
  };

  const updateRemote = async () => {
    if (
      gameInfo.currentPlayer !== null &&
      gameInfo.shootingFirst &&
      gameInfo.players.filter((player) => player.name === null).length === 0 &&
      gameId !== 0
    ) {
      const { error } = await supabase
        .from("game-info")
        .update({
          ...gameInfo,
        })
        .eq("id", gameId);

      if (error) {
        errorMessage.set(error.message);
        console.error(error);
      }
    }
  };

  const updatePairingData = async (
    pairingInformation: any,
    winner: boolean,
    busts: number
  ) => {
    if (pairingInformation.some((player) => player.anonPlayer)) return;

    console.log(pairingInformation);

    const { data: pairingData, error } = await supabase
      .from("team_pairings")
      .select("*")
      .or(
        `and(player_one.eq.${pairingInformation[0].dataId},player_two.eq.${pairingInformation[1].dataId}),` +
          `and(player_one.eq.${pairingInformation[1].dataId},player_two.eq.${pairingInformation[0].dataId})`
      )
      .maybeSingle();

    const newGameAccuracy =
      pairingInformation.reduce(
        (acc, player) => acc + player.stats.accuracy,
        0
      ) / pairingInformation.length;

    if (error) {
      errorMessage.set(error.message);
      console.error("Error fetching pairing data:", error);
      return;
    }

    if (pairingData) {
      const newAverageAccuracy =
        (pairingData.average_accuracy * pairingData.games_played +
          newGameAccuracy) /
        (pairingData.games_played + 1);

      const { error: updateError } = await supabase
        .from("team_pairings")
        .update({
          games_played: pairingData.games_played + 1,
          wins: winner ? pairingData.wins + 1 : pairingData.wins,
          losses: winner ? pairingData.losses : pairingData.losses + 1,
          busts: pairingData.busts + busts,
          average_accuracy: newAverageAccuracy * 100,
        })
        .eq("id", pairingData.id);

      if (updateError) {
        console.error("Error updating pairing data:", updateError);
      } else {
        console.log("Pairing data updated successfully.");
      }
    } else {
      const { error: insertError } = await supabase
        .from("team_pairings")
        .insert({
          player_one: pairingInformation[0].dataId,
          player_two: pairingInformation[1].dataId,
          games_played: 1,
          wins: winner ? 1 : 0,
          losses: winner ? 0 : 1,
          busts: busts,
          average_accuracy: newGameAccuracy * 100,
        });

      if (insertError) {
        console.error("Error inserting pairing data:", insertError);
      } else {
        console.log("Pairing data inserted successfully.");
      }
    }
  };

  const updateRemoteGameConclusion = async () => {
    if (!gameInfo.winner) return;

    const redTeam = gameInfo.players.filter((player) => player.color === "red");
    const blueTeam = gameInfo.players.filter(
      (player) => player.color === "blue"
    );

    await Promise.all([
      updatePairingData(
        blueTeam,
        gameInfo.winner === "Blue",
        gameInfo.busts.blue
      ),
      updatePairingData(redTeam, gameInfo.winner === "Red", gameInfo.busts.red),
    ]);

    gameInfo.players.forEach(async (player) => {
      if (!player.anonPlayer) {
        console.log("PLAYER: ", player);
        const { error } = await supabase.from("personal_stat").insert({
          stats: player.stats,
          gameId: gameId,
          user: player.dataId,
          winner: gameInfo.winner?.toLowerCase() === player.color.toLowerCase()
        });
      }
    });
  };

  $: gameInfo.rounds, trackStats();
  $: gameInfo, updateRemote();
  $: gameInfo.winner, updateRemoteGameConclusion();
</script>

<div class="flex flex-col h-screen bg-[#121212] py-4 px-4">
  {#if isLoading}
    <LoadSpinner />
  {/if}
  {#if activeTab === "" && !isLoading}
    <TeamInfo bind:gameInfo />
    {#if gameInfo.currentPlayer !== null && gameInfo.shootingFirst}
      <div class="flex-1 w-full rounded-xl mt-4 transition">
        <div
          class="h-full flex flex-col gap-4 mx-auto items-center bg-[#1E1E1E] rounded-xl p-4"
        >
          <div class="bg-[#121212] w-full rounded-xl px-4">
            <TopBar bind:gameInfo {spectateMode} />
            <ScoreBoard bind:gameInfo />
          </div>
          <div
            class="flex justify-between items-center rounded-lg gap-4 text-[#E0E0E0] w-full h-[80%]"
          >
            {#if showStats || gameInfo.winner}
              <Stats {gameInfo} bind:showStats />
            {:else}
              <History
                bind:gameInfo
                bind:showStats
                bind:historyMountSize
                bind:inputSpectateCode
                {spectateMode}
              />
              <ScoreButtons bind:gameInfo {spectateMode} />
            {/if}
          </div>
        </div>
      </div>
    {:else if !$userStore}
      <LoginAndSignUp />
    {:else}
      <NameInput
        bind:gameInfo
        bind:gameId
        bind:spectateMode
        bind:inputSpectateCode
      />

      <ExtraMenu bind:activeTab />
    {/if}
  {:else if activeTab === "family-manager"}
    <ExtraPageWrapper title="My Profile" bind:activeTab>
      <FamilyManager />
    </ExtraPageWrapper>
  {:else if activeTab === "my-stats"}
    <ExtraPageWrapper title="My Profile" bind:activeTab>
      <MyStats />
    </ExtraPageWrapper>
  {:else if activeTab === "profile"}
    <ExtraPageWrapper title="My Profile" bind:activeTab>
      <MyProfile />
    </ExtraPageWrapper>
  {/if}
</div>
