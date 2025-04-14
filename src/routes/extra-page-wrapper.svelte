<script lang="ts">
  export let title: string = "";
  export let activeTab: string;
</script>

  <div
    class="flex flex-col gap-4 w-full text-center h-full px-4 pt-2 pb-4 text-[#B0BEC5] bg-[#1E1E1E] rounded-xl"
  >
    <div class='flex justify-between items-center'>
        <button on:click={() => (activeTab = "")} class="w-full text-left">Go Back</button>
        <p class="w-full">{title}</p>
        <div class="w-full" />
    </div>
    <slot />
  </div>
