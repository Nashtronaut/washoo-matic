<script lang="ts">
  import { errorMessage } from "$lib/error-message-store";
  import "../app.css";
</script>

{#if $errorMessage}
  <div
    class="flex flex-col gap-4 bg-red-500 text-white px-4 py-4 font-semibold"
  >
    <p>SHOW THIS TO NASH PLEASE.</p>
    <p>{$errorMessage}</p>
    <button on:click={() => ($errorMessage = "")}>CLEAR ERROR</button>
  </div>
{/if}
<slot />
