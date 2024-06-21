<script lang="ts">
  import TopBar from "./top-bar.svelte";
  import ScoreButtons from "./score-buttons.svelte";
  import History from "./history.svelte";
  import ScoreBoard from "./score-board.svelte";
  import TeamInfo from "./team-info.svelte";
  import NameInput from "./name-input.svelte";
  
  let gameInfo = {
    players: [
      {
        id: 0,
        name: null,
        score: 0,
        color: "blue",
      },
      {
        id: 1,
        name: null,
        score: 0,
        color: "blue",
      },
      {
        id: 2,
        name: null,
        score: 0,
        color: "red",
      },
      {
        id: 3,
        name: null,
        score: 0,
        color: "red",
      },
    ],
    rounds: [
      {
        name: "Round 1",
        tracking: [],
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
  };
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
          <History bind:gameInfo />
          <ScoreButtons bind:gameInfo />
        </div>
      </div>
    </div>
  {:else}
    <NameInput bind:gameInfo />
  {/if}
</div>
