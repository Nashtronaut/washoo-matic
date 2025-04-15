<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { userStore } from "$lib/user-store";
  import { onMount } from "svelte";
  import LoadSpinner from "./load-spinner.svelte";

  export let user: string = $userStore.id ?? "";
  let isLoading = false;
  let calculatedStats: any = [];

  onMount(async () => {
    isLoading = true;
    const { data, error } = await supabase
      .from("personal_stat")
      .select("*")
      .eq("user", user);

    console.log("DATA: ", data);

    if (data.length > 0) {
      calculatedStats = [
        {
          statOne: {
            title: "Games Played",
            value: data?.length ?? 0,
            bg: "border-blue-500",
          },
          statTwo: {
            title: "Shots Taken",
            value: getTotalShots(data),
            bg: "border-blue-500",
          },
        },
        {
          statOne: {
            title: "Games Won",
            value: data?.reduce((acc, stat) => {
              return acc + (stat.winner ? 1 : 0);
            }, 0),
            bg: "border-green-500",
          },
          statTwo: {
            title: "Games Lost",
            value: data?.reduce((acc, stat) => {
              return acc + (stat.winner ? 0 : 1);
            }, 0),
            bg: "border-red-400",
          },
        },

        {
          statOne: {
            title: "Win Loss Percentage",
            value: `${(
              (data?.reduce((acc, stat) => {
                return acc + (stat.winner ? 1 : 0);
              }, 0) /
                data?.length) *
              100
            ).toFixed(2)} %`,
            bg: "border-blue-500",
          },
          statTwo: {
            title: "Avg Points Per Game",
            value: (
              data?.reduce((acc, stat) => {
                return acc + (stat.stats.points ?? 0);
              }, 0) / data?.length
            ).toFixed(2),
            bg: "border-blue-500",
          },
        },
        {
          statOne: {
            title: "Avg Accuracy",
            value: (
              data?.reduce((acc, stat) => {
                return acc + (stat.stats.accuracy ?? 0);
              }, 0) / data?.length
            ).toFixed(2),
            bg: "border-blue-500",
          },
          statTwo: {
            title: "Avg Busts Per Game",
            value: (
              data?.reduce((acc, stat) => {
                return acc + (stat.stats.busted ?? 0);
              }, 0) / data?.length
            ).toFixed(2),
            bg: "border-red-400",
          },
        },
        {
          statOne: {
            title: "Busted Shots",
            value: data?.reduce((acc, stat) => {
              return acc + (stat.stats.busted ?? 0);
            }, 0),
            bg: "border-red-400",
          },
          statTwo: {
            title: "Avg Misses Per Game",
            value: (
              data?.reduce((acc, stat) => {
                return acc + (stat.stats.misses ?? 0);
              }, 0) / data?.length
            ).toFixed(2),
            bg: "border-red-400",
          },
        },
        {
          statOne: {
            title: "Missed Shots",
            value: data?.reduce((acc, stat) => {
              return acc + (stat.stats.misses ?? 0);
            }, 0),
            bg: "border-red-400",
          },
          statTwo: {
            title: "Avg Misses Per Game",
            value: (
              data?.reduce((acc, stat) => {
                return acc + (stat.stats.misses ?? 0);
              }, 0) / data?.length
            ).toFixed(2),
            bg: "border-red-500",
          },
        },
        {
          statOne: {
            title: "Highest Accuracy Game",
            value: Math.max(...data.map((stat) => stat.stats.accuracy ?? 0)),
            bg: "border-green-500",
          },

          statTwo: {
            title: "Highest Accuracy Game",
            value: Math.min(...data.map((stat) => stat.stats.accuracy ?? 0)),
            bg: "border-green-500",
          },
        },
        {
          statOne: {
            title: "Highest Points Game",
            value: Math.max(...data.map((stat) => stat.stats.points ?? 0)),
            bg: "border-green-500",
          },
          statTwo: {
            title: "Highest Busts",
            value: Math.max(...data.map((stat) => stat.stats.busted ?? 0)),
            bg: "border-red-500",
          },
        },
      ];
    } else {
      calculatedStats = [
        {
          statOne: {
            title: "Total Games",
            value: 0,
          },
          statTwo: {
            title: "Total Shots",
            value: 0,
          },
        },
        {
          statOne: {
            title: "Total Wins",
            value: 0,
          },
          statTwo: {
            title: "Total Losses",
            value: 0,
          },
        },

        {
          statOne: {
            title: "Win Loss Ratio",
            value: 0,
          },
          statTwo: {
            title: "Average Points Per Game",
            value: 0,
          },
        },
      ];
    }

    isLoading = false;
  });

  const getTotalShots = (data) => {
    return data.reduce((acc, stat) => {
      return acc + (stat.stats.shots ?? 0);
    }, 0);
  };
</script>

<div>
  {#if !isLoading && calculatedStats.length !== 0}
    <div class="flex flex-col gap-2 w-full text-white">
      {#each calculatedStats as { statOne, statTwo }}
        <div class="flex gap-2">
          <div
            class="{statOne.bg} border-2 flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-full"
          >
            <dt class="mb-2 text-3xl font-extrabold">{statOne.value}</dt>
            <dd class="text-gray-500 dark:text-gray-400">{statOne.title}</dd>
          </div>

          <div
            class="{statTwo.bg} border-2 flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-full"
          >
            <dt class="mb-2 text-3xl font-extrabold">{statTwo.value}</dt>
            <dd class="text-gray-500 dark:text-gray-400">{statTwo.title}</dd>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <LoadSpinner />
  {/if}
</div>
