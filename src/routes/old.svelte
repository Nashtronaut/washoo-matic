<script lang="ts">
  let activeTab = "blue";
</script>

<div
  style="transition: all;"
  class="relative flex flex-col h-screen p-4 bg-[#201c1c]"
>
  <div class="flex-1">
    <div class="relative h-full">
      <div class="animate target"></div>
      <div
        class="target {activeTab === 'red'
          ? '-top-2 z-10'
          : ''} absolute bg-red-950 h-[90%] rounded-t-xl bottom-0 w-[98.5%] rounded-b-xl left-1.5"
      >
        <div class="flex flex-col gap-4 justify-center items-center mt-40">
          <button> +5 </button>
        </div>
      </div>
      <div
        class="target {activeTab === 'blue'
          ? '-top-2 z-10'
          : ''} absolute bg-gray-900 h-[90%] rounded-t-xl bottom-0 w-[98.5%] rounded-b-xl right-1.5"
      >


        <div
          class="flex flex-col gap-8 justify-center items-center text-white font-bold p-4 w-2/3 mx-auto rounded-xl py-12"
        >
          <button
            class="relative inline-flex items-center justify-center p-3 mb-2 me-2 overflow-hidden text-2xl font-bold text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span
              class="relative p-9 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              +5
            </span>
          </button>

          <button
            class="relative inline-flex items-center justify-center p-2.5 b-2 me-2 overflow-hidden text-2xl font-bold text-gray-900 rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span
              class="relative p-8 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              +3
            </span>
          </button>

          <button
            class="relative inline-flex items-center justify-center p-2 mb-2 me-2 overflow-hidden text-2xl font-2xl text-gray-900 rounded-full group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span
              class="relative p-7 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              +1
            </span>
          </button>

          <button
            class="relative inline-flex items-center justify-center p-1.5 mb-2 me-2 overflow-hidden text-2xl text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span
              class="relative p-6 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              MISS
            </span>
          </button>


        </div>
      </div>

      <div class="absolute bottom-0 h-[12%] w-full rounded-b-xl">
        <div class="relative h-full w-[98.5%]">
          <button
            on:click={() => (activeTab = "blue")}
            class="absolute bg-blue-400 h-full z-10 rounded-b-xl {activeTab ===
            'blue'
              ? 'bottom-2.5 w-3/5 z-10'
              : 'bottom-0 w-[98.5%] z-0'}"
          ></button>
          <button
            on:click={() => (activeTab = "red")}
            class="absolute bg-red-400 h-full rounded-b-xl {activeTab === 'red'
              ? 'bottom-2.5 -right-1.5 w-3/5 z-10'
              : 'bottom-0 w-[98.5%] right-0 z-0'}"
          ></button>
        </div>
      </div>
    </div>
  </div>
</div>
