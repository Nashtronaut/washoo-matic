<script lang="ts">
  export let gameInfo: any;
  let direction: string | null = null;
  let roundTotal: number = 0;
  let bust: boolean = false;
  let win: string | null = null;

  const calculateRoundDisplay = () => {
    bust = false;
    win = null;
    let round = gameInfo.rounds[gameInfo.rounds.length - 1];

    const roundBlue = round.tracking
      .filter((shot: any) => shot.shooter.color === "blue")
      .reduce((acc: number, shot: any) => acc + shot.score, 0);
    const roundRed = round.tracking
      .filter((shot: any) => shot.shooter.color === "red")
      .reduce((acc: number, shot: any) => acc + shot.score, 0);

    if (roundBlue === roundRed) {
      direction = null;
    } else if (roundBlue > roundRed) {
      direction = "blue";
    } else {
      direction = "red";
    }

    if (direction === "blue") {
      roundTotal = roundBlue - roundRed;
    } else {
      roundTotal = roundRed - roundBlue;
    }

    if (direction === "blue") {
      if (roundTotal + gameInfo.scores.blue > 21) {
        bust = true;
      }

      if (roundTotal + gameInfo.scores.blue === 21) {
        win = "Blue";
      }
    }

    if (direction === "red") {
      if (roundTotal + gameInfo.scores.red > 21) {
        bust = true;
      }

      if (roundTotal + gameInfo.scores.red === 21) {
        win = "Red";
      }
    }
  };

  $: gameInfo.rounds, calculateRoundDisplay();
</script>

<div
  class="relative flex justify-center items-center w-full py-2 text-xl text-white font-bold gap-12"
>
  {#if !gameInfo.winner}
    <p class="absolute text-[0.6rem] top-0">Round Total</p>
    <div class="flex flex-col justify-center text-center py-2">
      <div class="flex justify-center bg-red-400 rounded-full px-4 py-1">
        <span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >{gameInfo.scores.red}</span
        >
      </div>
      <p class="text-[0.6rem] text-[#B0BEC5] font-semibold text-center">Busts: {gameInfo.busts.red}</p>
    </div>

    <div class="flex gap-3 items-end justify-center text-base flex-1 w-full">
      {#if direction}
        <svg
          class="{direction === 'red'
            ? 'fill-white'
            : 'fill-transparent'} w-[1rem] h-[1rem]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          ><path
            d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
            data-name="4-Arrow Left"
          /></svg
        >
        {#if bust}
          <p class="text-red-400">Bust</p>
        {:else if win}
          <p class="text-xs text-center text-green-400">{win} to win!</p>
        {:else}
          <p>+{roundTotal === 0 ? "-" : roundTotal}</p>
        {/if}
        <svg
          class="{direction === 'blue'
            ? 'fill-white'
            : 'fill-transparent'} w-[1rem] h-[1rem] rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          ><path
            d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
            data-name="4-Arrow Left"
          /></svg
        >
      {:else}
        -
      {/if}
    </div>

    <div class="flex flex-col">
      <div class="flex justify-center bg-blue-400 rounded-full px-4 py-1">
        <span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >{gameInfo.scores.blue}</span
        >
      </div>
      <p class="text-[0.6rem] text-[#B0BEC5] font-semibold text-center">Busts: {gameInfo.busts.blue}</p>
    </div>
  {:else}
    <p
      class="{gameInfo.winner === 'Red'
        ? 'text-red-400'
        : 'text-blue-400'} font-bold p-[1.6rem]"
    >
      {gameInfo.winner} Team Wins!
    </p>
  {/if}
</div>
