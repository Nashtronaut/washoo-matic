<script lang="ts">
  import { supabase } from "$lib/supabase";
  import type { GameInfo } from "./types.ds";

  export let gameInfo: GameInfo;
  export let gameId: number;
  export let spectateMode: boolean;
  export let inputSpectateCode: string;

  let errorMessage = "";
  let keyswitch = {};

  const colorOptions = [
    "red",
    // "orange",
    // "amber",
    "yellow",
    // "lime",
    "green",
    // "emerald",
    // "teal",
    // "cyan",
    // "sky",
    "blue",
    // "indigo",
    // "violet",
    // "purple",
    // "fuchsia",
    // "pink",
    // "rose"
  ];

  const initializeGame = async () => {
    const { data, error } = await supabase
      .from("game-info")
      .insert({
        ...gameInfo,
      })
      .select("id")
      .single();

    if (data) {
      gameId = data.id;
    }
  };

  const spectateGame = async () => {
    errorMessage = "";
    spectateMode = true;
    const { data, error } = await supabase
      .from("game-info")
      .select("*")
      .eq("spectateCode", inputSpectateCode)
      .single();

    if (data) {
      gameInfo = data;
    } else {
      errorMessage = "Game not found.";
    }

    supabase
      .channel("game-info")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "game-info" },
        (payload) => {
          if (payload.new.spectateCode === inputSpectateCode) {
            gameInfo = payload.new;
          }
        }
      )
      .subscribe();
  };

  const swapColor = (team) => {
    const currentColor = gameInfo.players[team === 1 ? 0 : 2].tailwindColor;
    const currentIndex = colorOptions.indexOf(currentColor);
    const teamPlayers = team === 1 ? [0, 1] : [2, 3];
    const otherTeamColor =
      team === 1
        ? gameInfo.players[2].tailwindColor
        : gameInfo.players[0].tailwindColor;

    let newIndex = (currentIndex + 1) % colorOptions.length;
    let newColor = colorOptions[newIndex];

    // Ensure the new color does not match the other team's color
    while (newColor === otherTeamColor) {
      newIndex = (newIndex + 1) % colorOptions.length;
      newColor = colorOptions[newIndex];
    }

    teamPlayers.forEach((player) => {
      gameInfo.players[player].tailwindColor = newColor;
      gameInfo.players[player].tailwindBorderColor = `border-${newColor}-400`;
      gameInfo.players[player].tailwindBgColor = `bg-${newColor}-400`;
        gameInfo.players[player].tailwindTextColor = `text-${newColor}-400`;
    });

    keyswitch = {};
  };
</script>

{#key keyswitch}
  <div class="flex flex-col gap-4 pb-4">
    <div
      id="full-container"
      class="flex flex-col gap-4 w-full text-center h-full px-4 py-2 mt-4 text-[#B0BEC5] bg-[#1E1E1E] rounded-xl"
    >
      <p class="text-lg">Welcome to Washoo-matic!</p>
      <p class="text-sm">Please input player names.</p>

      {#each gameInfo.players as player, index}
        <div class="flex gap-4 items-center justify-center">
          <label for="player{index + 1}" class="text-sm">{index + 1}: </label>
          <input
            bind:value={player.name}
            id="player{index + 1}"
            class="{player.tailwindBorderColor} border rounded-full px-2 bg-[#121212]"
            type="text"
          />
          {#if index === 1 || index === 2}
            <button
              on:click|preventDefault={() => swapColor(index)}
              tabindex='-1'
              class="h-5 w-5 {player.tailwindBgColor}"
            ></button>
          {:else}
            <div class="w-5" />
          {/if}
        </div>
      {/each}

      <button
        on:click|preventDefault={async () => {
          if (
            gameInfo.players.filter((player) => player.name === null).length ===
            0
          ) {
            gameInfo.spectateCode = (Math.random() + 1)
              .toString(36)
              .substring(7)
              .toUpperCase();
            gameInfo.currentPlayer = Math.floor(Math.random() * 4);
            gameInfo.shootingFirst =
              gameInfo.players[gameInfo.currentPlayer].color;
            await initializeGame();
          }
        }}
        class="bg-green-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
        ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">START GAME</span
        ></button
      >
      <p class="text-xs mt-4 justify-self-end px-8">
        For four player, use first name in each box. For two player, use first
        and last name on the same team color.
      </p>
    </div>

    <div
      class="rounded-xl flex flex-col gap-2 bg-[#1E1E1E] px-4 py-2 text-[#B0BEC5] text-center"
    >
      <p>Spectate Game</p>
      <p class="text-xs">
        View a game in progress by inputting the spectate code.
      </p>
      <div class="flex gap-4 items-center justify-center my-4">
        <input
          bind:value={inputSpectateCode}
          id="player1"
          class="border-purple-500 border rounded-full px-2 bg-[#121212]"
          type="text"
        />
      </div>
      <button
        on:click|preventDefault={spectateGame}
        class="bg-purple-500 rounded-full w-1/2 mx-auto text-white font-bold px-4 py-1 mb-4 text-sm"
        ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">SPECTATE</span
        ></button
      >
      <p>{errorMessage}</p>
    </div>
  </div>
{/key}
