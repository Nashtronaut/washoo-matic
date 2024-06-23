<script lang="ts">
	import { supabase } from './../lib/supabase';
  import TopBar from "./top-bar.svelte";
  import ScoreButtons from "./score-buttons.svelte";
  import History from "./history.svelte";
  import ScoreBoard from "./score-board.svelte";
  import TeamInfo from "./team-info.svelte";
  import NameInput from "./name-input.svelte";
  import type { GameInfo } from "./types.ds";
  import Stats from "./stats.svelte";
  
  let showStats = false;
  let historyMountSize = 0;
  let gameId = 0;
  let spectateMode = false;
  let inputSpectateCode = "";

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
        name: null,
        color: "blue",
        colorInformation: {
          name: "Blue",
          hex: "#3AAEEA",
        },
        tailwindColor: 'blue',
        tailwindBgColor: "bg-blue-400",
        tailwindBorderColor: "border-blue-400",
        tailwindTextColor: "text-blue-400",
        stats: {...freshStats},
      },
      {
        id: 1,
        name: null,
        color: "blue",
        colorInformation: {
          name: "Blue",
          hex: "#3AAEEA",
        },
        tailwindColor: 'blue',
        tailwindBgColor: "bg-blue-400",
        tailwindBorderColor: "border-blue-400",
        tailwindTextColor: "text-blue-400",
        stats: {...freshStats},
      },
      {
        id: 2,
        name: null,
        color: "red",
        colorInformation: {
          name: "Red",
          hex: "#EF4444",
        },
        tailwindColor: 'red',
        tailwindBgColor: "bg-red-400",
        tailwindBorderColor: "border-red-400",
        tailwindTextColor: "text-red-400",

        stats: {...freshStats}
      },
      {
        id: 3,
        name: null,
        color: "red",
        colorInformation: {
          name: "Red",
          hex: "#EF4444",
        },
        tailwindColor: 'red',
        tailwindBgColor: "bg-red-400",
        tailwindBorderColor: "border-red-400",
        tailwindTextColor: "text-red-400",
        stats: {...freshStats}
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
        };

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
    if (gameInfo.currentPlayer !== null && gameInfo.shootingFirst && gameInfo.players.filter((player) => player.name === null).length === 0 && gameId !== 0) {
      const { error } = await supabase.from('game-info').update({
        ...gameInfo
      }).eq('id', gameId);

      if (error) {
        console.error(error);
      }
    }
  };

 $: gameInfo.rounds, trackStats();
 $: gameInfo, updateRemote();

</script>

<div class="flex flex-col h-screen bg-[#121212] py-4 px-4">
  <TeamInfo bind:gameInfo />
  {#if gameInfo.currentPlayer !== null && gameInfo.shootingFirst}
    <div
      class="flex-1 w-full rounded-xl mt-4 transition"
    >
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
            <History bind:gameInfo bind:showStats bind:historyMountSize bind:inputSpectateCode {spectateMode} />
            <ScoreButtons bind:gameInfo {spectateMode} />
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <NameInput bind:gameInfo bind:gameId bind:spectateMode bind:inputSpectateCode />
  {/if}
</div>
