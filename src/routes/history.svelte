<script lang="ts">
  import { onMount } from "svelte";
  import { resetGame } from "./reset-game";

  export let gameInfo;
  let mounted = false;
  let manuallyBustConfirmation = false;
  let resetConfirmation = false;

  onMount(() => {
    const container = document.getElementById("full-container");
    const height = container!.offsetHeight;
    container!.style.height = `${height}px`;
    mounted = true;
  });

  // Reactive statement to handle scrolling
  $: gameInfo.rounds, scrollToBottom();

  // Function to scroll the container to the bottom
  const scrollToBottom = () => {
    if (!mounted) return;
    const scrollContainer = document.getElementById("scroll-container");
    setTimeout(() => {
      scrollContainer!.scrollTop = scrollContainer!.scrollHeight;
    }, 0);
  };

  const manuallyBust = () => {
    const color = gameInfo.players[gameInfo.currentPlayer].color;
    gameInfo.busts[gameInfo.players[gameInfo.currentPlayer].color]++;

    if (color === "red") {
      gameInfo.scores.red = 0;
    } else {
      gameInfo.scores.blue = 0;
    }

    manuallyBustConfirmation = false;
  };

  const undoLastShot = () => {
    if (gameInfo.winner) {
      gameInfo.winner = null;
    }

    let currentRound = gameInfo.rounds[gameInfo.rounds.length - 1];

    if (currentRound.tracking.length === 0) {
      if (gameInfo.rounds.length === 1) return;
      gameInfo.rounds = gameInfo.rounds.slice(0, -1);
      currentRound = gameInfo.rounds[gameInfo.rounds.length - 1];
      gameInfo.scores.red = gameInfo.scores.red - currentRound.redTotal;
      gameInfo.scores.blue = gameInfo.scores.blue - currentRound.blueTotal;
    }

    gameInfo.rounds[gameInfo.rounds.length - 1].tracking =
      currentRound.tracking.slice(0, -1);
    gameInfo.currentPlayer =
      currentRound?.tracking[currentRound.tracking.length - 1]?.shooter?.id ??
      gameInfo.currentPlayer;
  };

  const handleResetGame = () => {
      gameInfo = resetGame(gameInfo);
  };
</script>

<div
  id="full-container"
  class="flex flex-col gap-2 w-full text-right h-full bg-[#121212] px-4 py-2 rounded-xl"
>
  <p class="text-sm font-bold pr-2 text-center">History</p>

  <div
    id="scroll-container"
    class="flex flex-col text-xs text-[#B0BEC5] overflow-scroll pr-2 h-[85%] mb-4"
  >
    <div class="flex flex-col gap-4">
      {#each gameInfo.rounds as { name, tracking, finalTotal }}
        <div class="flex flex-col gap-1">
          <p class="text-left text-[0.6rem]">{name}</p>
          {#each tracking as shot, index}
            <div class="flex justify-between w-full">
              {#if index !== 0}
                <p
                  class={tracking[index - 1].shooter.name !== shot.shooter.name
                    ? `${shot.shooter.color === "red" ? "text-red-400" : "text-blue-400"}`
                    : "text-transparent"}
                >
                  {shot.shooter.name}
                </p>
              {:else}
                <p
                  class={shot.shooter.color === "red"
                    ? "text-red-400"
                    : "text-blue-400"}
                >
                  {shot.shooter.name}
                </p>
              {/if}
              <p>{shot.score === 0 ? "miss" : "+" + shot.score}</p>
            </div>
          {/each}
          {#if finalTotal}
            <p class="text-left mt-4">hello</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  {#if !manuallyBustConfirmation && !resetConfirmation}
    <div class="flex justify-between items-center w-full text-xs">
      <button
        on:click|preventDefault={() => (manuallyBustConfirmation = true)}
        class="flex justify-center items-center bg-red-400 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
      >
        <span
          class="bg-[#1E1E1E] rounded-full py-1 px-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg"
          >Bust</span
        >
      </button>
      <button
        on:click|preventDefault={() => (resetConfirmation = true)}
        class="flex justify-center items-center bg-yellow-400 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
      >
        <span
          class="bg-[#1E1E1E] rounded-full py-1 px-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg"
          >Reset</span
        >
      </button>
      <button
        on:click|preventDefault={undoLastShot}
        class="flex justify-center items-center bg-purple-400 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
      >
        <span
          class="bg-[#1E1E1E] rounded-full py-1 px-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg"
          >Undo</span
        >
      </button>
    </div>
  {:else if manuallyBustConfirmation}
    <p class="text-xs text-[#B0BEC5] text-left py-2">
      You are manually busting {gameInfo.players[gameInfo.currentPlayer].color} team.
      Continue?
    </p>
    <div class="flex justify-between items-center w-full text-base">
      <button
        on:click|preventDefault={manuallyBust}
        class="flex justify-center items-center bg-red-400 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
      >
        <span
          class="bg-[#1E1E1E] rounded-full py-1 px-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg"
          >Confirm</span
        >
      </button>
      <button
        on:click|preventDefault={() => (manuallyBustConfirmation = false)}
        class="flex justify-center items-center bg-yellow-400 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
      >
        <span
          class="bg-[#1E1E1E] rounded-full py-1 px-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg"
          >Cancel</span
        >
      </button>
    </div>
  {:else if resetConfirmation}
    <p class="text-xs text-[#B0BEC5] text-left py-2">
      You are manually resetting the game back to player input.
      Continue?
    </p>
    <div class="flex justify-between items-center w-full text-base">
      <button
        on:click|preventDefault={handleResetGame}
        class="flex justify-center items-center bg-red-400 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
      >
        <span
          class="bg-[#1E1E1E] rounded-full py-1 px-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg"
          >Confirm</span
        >
      </button>
      <button
        on:click|preventDefault={() => (resetConfirmation = false)}
        class="flex justify-center items-center bg-yellow-400 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
      >
        <span
          class="bg-[#1E1E1E] rounded-full py-1 px-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg"
          >Cancel</span
        >
      </button>
    </div>
  {/if}
</div>
