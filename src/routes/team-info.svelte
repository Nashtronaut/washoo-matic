<script lang="ts">
  import { resetGame } from "./reset-game";
  import type { GameInfo } from "./types.ds";

  export let gameInfo: GameInfo;

  let currentDirection: string | null = null;

  let counters = {
    missedBlue: 0,
    missedRed: 0,
    oneRed: 0,
    oneBlue: 0,
    threeRed: 0,
    threeBlue: 0,
    fiveRed: 0,
    fiveBlue: 0,
    unshotRed: 4,
    unshotBlue: 4,
  };

  const placeDisc = () => {
    const currentShots = gameInfo.rounds[gameInfo.rounds.length - 1].tracking;
    currentDirection =
      gameInfo.currentPlayer === 0 || gameInfo.currentPlayer === 2
        ? "right"
        : "left";

    if (currentShots.length === 0) {
      counters = {
        missedBlue: 0,
        missedRed: 0,
        oneRed: 0,
        oneBlue: 0,
        threeRed: 0,
        threeBlue: 0,
        fiveRed: 0,
        fiveBlue: 0,
        unshotRed: 4,
        unshotBlue: 4,
      };

      return;
    }

    counters.missedBlue = currentShots.filter(
      (shot: any) => shot.shooter.color === "blue" && shot.score === 0
    ).length;
    counters.missedRed = currentShots.filter(
      (shot: any) => shot.shooter.color === "red" && shot.score === 0
    ).length;
    counters.oneRed = currentShots.filter(
      (shot: any) => shot.shooter.color === "red" && shot.score === 1
    ).length;
    counters.oneBlue = currentShots.filter(
      (shot: any) => shot.shooter.color === "blue" && shot.score === 1
    ).length;
    counters.threeRed = currentShots.filter(
      (shot: any) => shot.shooter.color === "red" && shot.score === 3
    ).length;
    counters.threeBlue = currentShots.filter(
      (shot: any) => shot.shooter.color === "blue" && shot.score === 3
    ).length;
    counters.fiveRed = currentShots.filter(
      (shot: any) => shot.shooter.color === "red" && shot.score === 5
    ).length;
    counters.fiveBlue = currentShots.filter(
      (shot: any) => shot.shooter.color === "blue" && shot.score === 5
    ).length;

    counters.unshotBlue =
      4 -
      counters.missedBlue -
      counters.oneBlue -
      counters.threeBlue -
      counters.fiveBlue;
    counters.unshotRed =
      4 -
      counters.missedRed -
      counters.oneRed -
      counters.threeRed -
      counters.fiveRed;
  };

  const handleResetGame = () => {
    gameInfo = resetGame(gameInfo);
  };

  $: gameInfo.rounds, placeDisc();
  $: currentDirection,
    (() => {
      counters = {
        missedBlue: 0,
        missedRed: 0,
        oneRed: 0,
        oneBlue: 0,
        threeRed: 0,
        threeBlue: 0,
        fiveRed: 0,
        fiveBlue: 0,
        unshotRed: 4,
        unshotBlue: 4,
      };
    })();
</script>

{#if gameInfo}
  <div class="bg-[#1E1E1E] rounded-xl p-4">
    <div
      class="relative flex justify-between h-full flex-col text-sm text-[#B0BEC5] gap-8"
    >
      <div class="flex w-full justify-between text-base pb-4 font-bold">
        <p
          class="min-h-6 {gameInfo.currentPlayer === 0
            ? `${gameInfo.players[0].tailwindTextColor}`
            : 'text-[#B0BEC5]'} transition"
        >
          {gameInfo.players[0].name ?? " "}
        </p>
        <p
          class="{gameInfo.currentPlayer === 1
            ? `${gameInfo.players[0].tailwindTextColor}`
            : 'text-[#B0BEC5]'} transition"
        >
          {gameInfo.players[1].name ?? " "}
        </p>
      </div>

      {#if gameInfo.winner}
        <div class="flex justify-center gap-4 py-3.5">
          <button
            class="bg-green-400 text-white font-bold px-4 py-2 rounded-full"
            on:click|preventDefault={handleResetGame}
          >
            <span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              >Start New Game</span
            >
          </button>
        </div>
      {:else}
        <div class="flex justify-between items-center">
          <div
            class="flex items-center justify-end pr-4 gap-3 h-16 w-[8.5rem] bg-[#121212] rounded"
          >
            <div
              class="flex items-center justify-between rounded-full w-5 h-5 bg-[#B0BEC5] overflow-hidden border"
            >
              {#if currentDirection === "left"}
                {#if counters.fiveRed > 0}
                  <div
                    class="{counters.fiveRed === counters.fiveBlue
                      ? 'w-1/2'
                      : counters.fiveRed > counters.fiveBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[2].tailwindBgColor} h-full"
                  />
                {/if}

                {#if counters.fiveBlue > 0}
                  <div
                    class="{counters.fiveRed === counters.fiveBlue
                      ? 'w-1/2'
                      : counters.fiveRed < counters.fiveBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[1].tailwindBgColor} h-full"
                  ></div>
                {/if}
              {/if}
            </div>

            <div
              class="flex items-center justify-between rounded-full w-5 h-5 bg-[#B0BEC5] overflow-hidden border"
            >
              {#if currentDirection === "left"}
                {#if counters.threeRed > 0}
                  <div
                    class="{counters.threeRed === counters.threeBlue
                      ? 'w-1/2'
                      : counters.threeRed > counters.threeBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[2].tailwindBgColor} h-full"
                  />
                {/if}

                {#if counters.threeBlue > 0}
                  <div
                    class="{counters.threeRed === counters.threeBlue
                      ? 'w-1/2'
                      : counters.threeRed < counters.threeBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[1].tailwindBgColor} h-full"
                  ></div>
                {/if}
              {/if}
            </div>

            <div
              class="flex items-center justify-between rounded-full w-5 h-5 bg-[#B0BEC5] overflow-hidden border"
            >
              {#if currentDirection === "left"}
                {#if counters.oneRed > 0}
                  <div
                    class="{counters.oneRed === counters.oneBlue
                      ? 'w-1/2'
                      : counters.oneRed > counters.oneBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[2].tailwindBgColor} h-full"
                  />
                {/if}

                {#if counters.oneBlue > 0}
                  <div
                    class="{counters.oneRed === counters.oneBlue
                      ? 'w-1/2'
                      : counters.oneRed < counters.oneBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[1].tailwindBgColor} h-full"
                  ></div>
                {/if}
              {/if}
            </div>
          </div>

          <svg
            class="{gameInfo.currentPlayer === null ? 'rotate-90' : gameInfo.currentPlayer === 0 || gameInfo.currentPlayer === 2 ? 'rotate-180' : ''} fill-white w-[1.5rem] h-[1.5rem] transition duration-500 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            ><path
              d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
              data-name="4-Arrow Left"
            /></svg
          >

          <div
            class="flex items-center justify-start pl-4 gap-3 h-16 w-[8.5rem] bg-[#121212] rounded"
          >
            <div
              class="flex items-center justify-between rounded-full w-5 h-5 bg-[#B0BEC5] overflow-hidden border"
            >
              {#if currentDirection === "right"}
                {#if counters.oneRed > 0}
                  <div
                    class="{counters.oneRed === counters.oneBlue
                      ? 'w-1/2'
                      : counters.oneRed > counters.oneBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[2].tailwindBgColor} h-full"
                  />
                {/if}

                {#if counters.oneBlue > 0}
                  <div
                    class="{counters.oneRed === counters.oneBlue
                      ? 'w-1/2'
                      : counters.oneRed < counters.oneBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[1].tailwindBgColor} h-full"
                  ></div>
                {/if}
              {/if}
            </div>
            <div
              class="flex items-center justify-between rounded-full w-5 h-5 bg-[#B0BEC5] overflow-hidden border"
            >
              {#if currentDirection === "right"}
                {#if counters.threeRed > 0}
                  <div
                    class="{counters.threeRed === counters.threeBlue
                      ? 'w-1/2'
                      : counters.threeRed > counters.threeBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[2].tailwindBgColor} h-full"
                  />
                {/if}

                {#if counters.threeBlue > 0}
                  <div
                    class="{counters.threeRed === counters.threeBlue
                      ? 'w-1/2'
                      : counters.threeRed < counters.threeBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[1].tailwindBgColor} h-full"
                  ></div>
                {/if}
              {/if}
            </div>
            <div
              class="flex items-center justify-between rounded-full w-5 h-5 bg-[#B0BEC5] overflow-hidden border"
            >
              {#if currentDirection === "right"}
                {#if counters.fiveRed > 0}
                  <div
                    class="{counters.fiveRed === counters.fiveBlue
                      ? 'w-1/2'
                      : counters.fiveRed > counters.fiveBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[2].tailwindBgColor} h-full"
                  />
                {/if}

                {#if counters.fiveBlue > 0}
                  <div
                    class="{counters.fiveRed === counters.fiveBlue
                      ? 'w-1/2'
                      : counters.fiveRed < counters.fiveBlue
                        ? 'w-full'
                        : 'w-0'} {gameInfo.players[1].tailwindBgColor} h-full"
                  ></div>
                {/if}
              {/if}
            </div>
          </div>
        </div>

        <div
          class="{currentDirection === 'right'
            ? 'right-1'
            : 'left-1'} absolute bottom-8 gap-1 flex items-center"
        >
          {#each Array(counters.missedRed) as _, i}
            <div class="rounded-full w-4 h-4 {gameInfo.players[2].tailwindBgColor}"></div>
          {/each}
        </div>

        <div
          class="{currentDirection === 'right'
            ? 'right-1'
            : 'left-1'} absolute bottom-32 gap-1 flex items-center"
        >
          {#each Array(counters.missedBlue) as _, i}
            <div class="rounded-full w-4 h-4 {gameInfo.players[1].tailwindBgColor}"></div>
          {/each}
        </div>

        {#if gameInfo.currentPlayer !== null}
          <div
            class="{currentDirection === 'right'
              ? 'left-1'
              : 'right-1'} absolute bottom-8 gap-1 flex items-center"
          >
            {#each Array(counters.unshotRed) as _, i}
              <div class="rounded-full w-4 h-4 {gameInfo.players[2].tailwindBgColor}"></div>
            {/each}
          </div>

          <div
            class="{currentDirection === 'right'
              ? 'left-1'
              : 'right-1'} absolute bottom-32 gap-1 flex items-center"
          >
            {#each Array(counters.unshotBlue) as _, i}
              <div class="rounded-full w-4 h-4 {gameInfo.players[1].tailwindBgColor}"></div>
            {/each}
          </div>
        {/if}
      {/if}

      {#if gameInfo.players.length > 2}
        <div class="flex w-full justify-between text-base font-bold">
          <p
            class="{gameInfo.currentPlayer === 2
              ? `${gameInfo.players[2].tailwindTextColor}`
              : 'text-[#B0BEC5]'} transition"
          >
            {gameInfo.players[2].name ?? " "}
          </p>
          <p
            class="min-h-6 {gameInfo.currentPlayer === 3
              ? `${gameInfo.players[2].tailwindTextColor}`
              : 'text-[#B0BEC5]'} transition"
          >
            {gameInfo.players[3].name ?? " "}
          </p>
        </div>
      {/if}
    </div>
  </div>
{/if}
