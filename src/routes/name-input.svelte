<script lang='ts'>
  import type { GameInfo } from "./types.ds";

    export let gameInfo: GameInfo;
</script>

<div
      id="full-container"
      class="flex flex-col gap-4 w-full text-center h-full bg-[#1E1E1E] px-4 py-2 rounded-xl mt-4 text-[#B0BEC5]"
    >
    <p class="text-lg">Welcome to Washoo-matic!</p>
    <p class="text-sm">Please input player names.</p>

    <div class="flex gap-4 items-center justify-center">
        <label for="player1" class="text-sm">1: </label>
        <input bind:value={gameInfo.players[0].name} id="player1" class="border-blue-400 border rounded-full px-2 bg-[#121212]" type="text">
    </div>

    <div class="flex gap-4 items-center justify-center">
        <label for="player1" class="text-sm">2: </label>
        <input bind:value={gameInfo.players[1].name} id="player1" class="border-blue-400 border rounded-full px-2 bg-[#121212]" type="text">
    </div>

    <div class="flex gap-4 items-center justify-center">
        <label for="player1" class="text-sm">3: </label>
        <input bind:value={gameInfo.players[2].name} id="player1" class="border-red-400 border rounded-full px-2 bg-[#121212]" type="text">
    </div>

    <div class="flex gap-4 items-center justify-center">
        <label for="player1" class="text-sm">4: </label>
        <input bind:value={gameInfo.players[3].name} id="player1" class="border-red-400 border rounded-full px-2 bg-[#121212]" type="text">
    </div>
    
    
    <button on:click|preventDefault={() => {
        if (gameInfo.players.filter((player) => player.name === null).length === 0) {
            gameInfo.currentPlayer = Math.floor(Math.random() * 4);
            gameInfo.shootingFirst = gameInfo.players[gameInfo.currentPlayer].color;            
        }
    }} class="bg-green-500 rounded-full w-1/2 mx-auto text-white font-bold my-4 px-4 py-2"><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">START GAME</span></button>
    <p class='text-xs mt-4 justify-self-end px-8'>For four player, use first name in each box. For two player, use first and last name on the same team color.</p>
</div>