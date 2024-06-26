<script lang="ts">
  import { onMount } from "svelte";
  import type { GameInfo } from "./types.ds";

  export let gameInfo: GameInfo;
  export let showStats: boolean;

  let mounted: boolean = false;
  let accuracyArray: any = [];
  let shotsArray: any = [];
  let hitsArray: any = [];
  let missesArray: any = [];
  let pointsArray: any = [];
  let bustedArray: any = [];

  onMount(() => {
    accuracyArray = gameInfo.players
      .map((player) => {
        return {
          name: player.name,
          color: player.color,
          accuracy: Number(player.stats.accuracy * 100).toFixed(2),
        };
      })
      .sort((a, b) => Number(b.accuracy) - Number(a.accuracy));

    hitsArray = gameInfo.players
      .map((player) => {
        return {
          name: player.name,
          color: player.color,
          hits: player.stats.hits,
          taken: player.stats.shots,
        };
      })
      .sort((a, b) => b.hits - a.hits);

    missesArray = gameInfo.players
      .map((player) => {
        return {
          name: player.name,
          color: player.color,
          misses: player.stats.misses,
          taken: player.stats.shots,
        };
      })
      .sort((a, b) => b.misses - a.misses);

    pointsArray = gameInfo.players
      .map((player) => {
        return {
          name: player.name,
          color: player.color,
          points: player.stats.points,
        };
      })
      .sort((a, b) => b.points - a.points);

    bustedArray = gameInfo.players
      .map((player) => {
        return {
          name: player.name,
          color: player.color,
          busted: player.stats.busted,
        };
      })
      .sort((a, b) => b.busted - a.busted);

    mounted = true;
  });
</script>

{#if mounted}
  <div class="w-full py-2 text-white bg-[#121212] rounded-xl px-4 pb-4">
    <div class="flex flex-col w-full text-xs gap-2">
      <div class="w-full bg-[#1E1E1E] p-2 rounded-xl mt-4">
        <p class="pb-2">Accuracy</p>
        <div class="flex flex-col gap-1">
          {#each accuracyArray as player, index}
            <div class="flex justify-between w-full">
              <p
                style="color: {player.color === 'red'
                  ? gameInfo.players[2].colorInformation.hex
                  : gameInfo.players[1].colorInformation.hex}"
                class="font-semibold"
              >
                {player.name}
              </p>
              <p class={index === 0 ? "text-green-400" : ""}>
                {player.accuracy} %
              </p>
            </div>
          {/each}
        </div>
      </div>

      <div class="flex w-full justify-between gap-2 text-xs">
        <div class="w-1/2 bg-[#1E1E1E] p-2 rounded-xl">
          <p class="pb-2">Buckets Hit</p>
          <div class="flex flex-col gap-1">
            {#each hitsArray as player, index}
              <div class="flex justify-between w-full">
                <p
                  style="color: {player.color === 'red'
                    ? gameInfo.players[2].colorInformation.hex
                    : gameInfo.players[1].colorInformation.hex}"
                  class="font-semibold"
                >
                  {player.name}
                </p>
                <p>
                  <span class={index === 0 ? "text-green-400" : ""}
                    >{player.hits}</span
                  >
                  / {player.taken}
                </p>
              </div>
            {/each}
          </div>
        </div>

        <div class="w-1/2 bg-[#1E1E1E] p-2 rounded-xl">
          <p class="pb-2">Misses</p>
          <div class="flex flex-col gap-1">
            {#each missesArray as player, index}
              <div class="flex justify-between w-full">
                <p
                  style="color: {player.color === 'red'
                    ? gameInfo.players[2].colorInformation.hex
                    : gameInfo.players[1].colorInformation.hex}"
                  class="font-semibold"
                >
                  {player.name}
                </p>
                <p>
                  <span class={index === 0 ? "text-red-400" : ""}
                    >{player.misses}</span
                  >
                  / {player.taken}
                </p>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <div class="flex w-full justify-between gap-2 text-xs">
        <div class="w-1/2 bg-[#1E1E1E] p-2 rounded-xl">
          <p class="pb-2">Total Points Hit</p>
          <div class="flex flex-col gap-1">
            {#each pointsArray as player, index}
              <div class="flex justify-between w-full">
                <p
                  style="color: {player.color === 'red'
                    ? gameInfo.players[2].colorInformation.hex
                    : gameInfo.players[1].colorInformation.hex}"
                  class="font-semibold"
                >
                  {player.name}
                </p>
                <p class={index === 0 ? "text-green-400" : ""}>
                  {player.points}
                </p>
              </div>
            {/each}
          </div>
        </div>

        <div class="w-1/2 bg-[#1E1E1E] p-2 rounded-xl">
          <p class="pb-2">Shots over 21</p>
          <div class="flex flex-col gap-1">
            {#each bustedArray as player, index}
              <div class="flex justify-between w-full">
                <p
                  style="color: {player.color === 'red'
                    ? gameInfo.players[2].colorInformation.hex
                    : gameInfo.players[1].colorInformation.hex}"
                  class="font-semibold"
                >
                  {player.name}
                </p>
                <p class={index === 0 ? "text-red-400" : ""}>
                  {player.busted}
                </p>
              </div>
            {/each}
          </div>
        </div>
      </div>
      {#if !gameInfo?.winner}
        <div class="bg-[#1E1E1E] rounded-xl px-4 py-1 text-xs">
          <p>
            Spectate Code: <span class="font-bold"
              >{gameInfo.spectateCode?.toUpperCase() ?? ""}</span
            >
          </p>
        </div>
        <button
          on:click|preventDefault={() => (showStats = false)}
          class="flex justify-center items-center bg-gray-400 p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
        >
          <span
            class="bg-[#1E1E1E] rounded-full py-1 px-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg w-full"
            >Back to Game</span
          >
        </button>
      {/if}
    </div>
  </div>
{/if}
