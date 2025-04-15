<script lang="ts">
  import { userStore } from "$lib/user-store";

  export let activeTab: string;
</script>

<div class="flex flex-col gap-4 pb-4">
  <div
    id="full-container"
    class="flex flex-col gap-4 w-full text-center h-full px-4 pt-2 pb-4 text-[#B0BEC5] bg-[#1E1E1E] rounded-xl"
  >
    <p class="text-lg">Menu</p>
    {#if $userStore}
      <button
        on:click|preventDefault={() => (activeTab = "family-manager")}
        class="bg-blue-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
        ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">MY STATS</span
        ></button
      >
    {/if}

    <button
      on:click|preventDefault={() => (activeTab = "family-manager")}
      class="bg-blue-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
      ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">FAMILY STATS</span
      ></button
    >

    {#if $userStore}
      <button
        on:click|preventDefault={() => (activeTab = "profile")}
        class="bg-blue-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
        ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">MY PROFILE</span
        ></button
      >
    {/if}

    <button
      on:click|preventDefault={() => (activeTab = "family-manager")}
      class="bg-blue-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
      ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >FAMILY MANAGER</span
      ></button
    >
  </div>
</div>
