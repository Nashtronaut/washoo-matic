<script lang="ts">
  import { errorMessage } from "$lib/error-message-store";
  import { supabase } from "$lib/supabase";
  import { onMount } from "svelte";
  import LoadSpinner from "./load-spinner.svelte";
  import { userStore } from "$lib/user-store";

  let loadedUsers: any = null;
  let isLoading: boolean = true;
  let currentFamily: string[] = [];
  let disableButtons = false;

  onMount(async () => {
    isLoading = true;

    const { data: users, error: usersError } = await supabase
      .from("user")
      .select("*");

    currentFamily =
      users?.filter((user) => {
        return user.id === $userStore.id;
      })[0].family_members ?? [];

    if (usersError) {
      console.error("Error fetching users:", usersError);
      errorMessage.set(usersError.message);
      isLoading = false;
      return;
    }

    loadedUsers = users.map((user) => {
      return {
        ...user,
        isActing: false,
      };
    });
    isLoading = false;
  });

  const addFamilyMember = async (userId: string) => {
    currentFamily = [...currentFamily, userId];

    const { error } = await supabase
      .from("user")
      .update({ family_members: currentFamily })
      .eq("id", $userStore.id);

    if (error) {
      console.error("Error adding family member:", error);
      errorMessage.set(error.message);
    }
  };

  const removeFamilyMember = async (userId: string) => {
    currentFamily = currentFamily.filter((id) => id !== userId);

    const { error } = await supabase
      .from("user")
      .update({ family_members: currentFamily })
      .eq("id", $userStore.id);

    if (error) {
      console.error("Error removing family member:", error);
      errorMessage.set(error.message);
    }
  };
</script>

{#key currentFamily}
  {#if !isLoading}
    <div class="w-full">
      <div class="flex flex-col w-full justify-between gap-4 mt-8">
        {#each loadedUsers as user}
          <div class="flex justify-between bg-gray-800 px-4 py-2 rounded-lg">
            <h2 class="text-lg font-bold">{user.name}</h2>
            {#if currentFamily.includes(user.id)}
              <button
                disabled={disableButtons}
                on:click={async () => {
                  disableButtons = true;
                  await removeFamilyMember(user.id);
                  disableButtons = false;
                }}>Remove</button
              >
            {:else}
              <button
                disabled={disableButtons}
                on:click={async () => {
                  disableButtons = true;
                  await addFamilyMember(user.id);
                  disableButtons = false;
                }}>Add</button
              >
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <LoadSpinner />
  {/if}
{/key}
