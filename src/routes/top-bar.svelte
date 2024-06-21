<script lang="ts">
  import { onMount } from "svelte";
  import type { GameInfo } from "./types.ds";

  export let gameInfo: GameInfo;
  let time: string = "Game Time: 0:00";
  let roundInfo: string = "Round 1A";
  let onMountComplete = false;

  onMount(() => {
    time = formatTime(0);
    startTimer();
    onMountComplete = true;
  });

  const formatTime = (seconds: number) => {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;
    if (remainderSeconds < 10) {
      return `Game Time: ${minutes}:0${remainderSeconds}`;
    } else {
      return `Game Time: ${minutes}:${remainderSeconds}`;
    }
  };

  // Timer logic
  let seconds = 0;
  const startTimer = () => {
    setInterval(() => {
      seconds++;
      time = formatTime(seconds);
    }, 1000);
  }
</script>

<div class="flex justify-between items-center text-[#B0BEC5] pt-4 w-full text-xs">
    <p>Round {gameInfo.round}</p>
    <p>{time}</p>
</div>
