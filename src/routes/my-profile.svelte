<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { userStore } from "$lib/user-store";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { errorMessage } from "$lib/error-message-store";

  let userData: any = null;

  onMount(async () => {
    const user = get(userStore);

    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", user?.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user data:", error);
      errorMessage.set(error.message);
    } else {
      userData = data;
    }
  });
</script>

<div>
  {#key userData}
    {#if userData}
      <pre>{JSON.stringify(userData, null, 2)}</pre>

      <button
        on:click={async () => {
          const { error } = await supabase.auth.signOut();

          if (error) {
            errorMessage.set(error.message);
            console.error("Error signing out:", error);
          } else {
            userStore.set(null);
          }
        }}>Sign Out</button
      >
    {/if}
  {/key}
</div>
