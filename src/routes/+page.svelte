<script lang="ts">
  import TopBar from "./top-bar.svelte";
  import ScoreButtons from "./score-buttons.svelte";
  import History from "./history.svelte";
  import ScoreBoard from "./score-board.svelte";
  import TeamInfo from "./team-info.svelte";
  import NameInput from "./name-input.svelte";
  import type { GameInfo } from "./types.ds";
  import Stats from "./stats.svelte";
  
  let showStats = false;

  let freshStats = {
    accuracy: 0,
    shots: 0,
    hits: 0,
    misses: 0,
    points: 0,
    busted: 0,
  };

  let gameInfo: GameInfo = {
    players: [
      {
        id: 0,
        name: null,
        color: "blue",
        stats: {...freshStats},
      },
      {
        id: 1,
        name: null,
        color: "blue",
        stats: {...freshStats},
      },
      {
        id: 2,
        name: null,
        color: "red",
        stats: {...freshStats}
      },
      {
        id: 3,
        name: null,
        color: "red",
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
    historyMountSize: false
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

 $: gameInfo.rounds, trackStats(); 
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
          <TopBar bind:gameInfo />
          <ScoreBoard bind:gameInfo />
        </div>
        <div
          class="flex justify-between items-center rounded-lg gap-4 text-[#E0E0E0] w-full h-[80%]"
        >
          {#if showStats || gameInfo.winner}
            <Stats {gameInfo} bind:showStats />
          {:else}
            <History bind:gameInfo bind:showStats />
            <ScoreButtons bind:gameInfo />
          {/if}
        </div>
      </div>
    </div>
  {:else}
    <NameInput bind:gameInfo />
  {/if}
</div>
