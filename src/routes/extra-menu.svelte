<script lang="ts">
  import { errorMessage } from "$lib/error-message-store";
  import { supabase } from "$lib/supabase";
  import { userStore } from "$lib/user-store";
  import { onMount } from "svelte";

  export let activeTab: string;
  let isFamilyManager: boolean = false;

  onMount(async () => {
    const { data, error } = await supabase
      .from("user")
      .select("family_manager")
      .eq("id", $userStore.id)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      errorMessage.set(error.message);
    } else {
      isFamilyManager = data.family_manager;
    };
  })
</script>

<div class="flex flex-col gap-4 pb-4">
  <div
    id="full-container"
    class="flex flex-col gap-4 w-full text-center h-full px-4 pt-2 pb-4 text-[#B0BEC5] bg-[#1E1E1E] rounded-xl"
  >
    <p class="text-lg">Menu</p>
    {#if $userStore}
      <button
        on:click|preventDefault={() => (activeTab = "my-stats")}
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

    <!-- {#if $userStore}
      <button
        on:click|preventDefault={() => (activeTab = "profile")}
        class="bg-blue-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
        ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">MY PROFILE</span
        ></button
      >
    {/if} -->

    {#if isFamilyManager}
      <button
        on:click|preventDefault={() => (activeTab = "family-manager")}
        class="bg-blue-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
        ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >FAMILY MANAGER</span
        ></button
      >
    {/if}

    <button
      on:click|preventDefault={async () => {
        await supabase.auth.signOut();
        userStore.set(null);
        activeTab = "";
      }}
      class="bg-blue-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
      ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >SIGN OUT</span
      ></button
    >
  </div>
</div>
