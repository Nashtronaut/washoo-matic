<script lang="ts">
  import { error } from "@sveltejs/kit";
  import { colors } from "./colors";
  export let showProfilePage: boolean;

  let errorMessage = '';
  let passwordConfirmation = "";
  let profileInformation = {
    name: "",
    profileName: "",
    color: null,
    email: "",
    password: "",
  };

  const signUp = async () => {
    errorMessage = "";
    if (profileInformation.name.length === 0) {
      errorMessage = "Name is required";
      return;
    }

    if (profileInformation.email.length === 0) {
      errorMessage = "Email is required";
      return;
    }

    if (profileInformation.password.length === 0) {
        errorMessage = "Password is required";
      return;
    }

    if (profileInformation.password !== passwordConfirmation) {
      errorMessage = "Passwords do not match";
      return;
    }
  };
</script>

<div
  class="flex flex-col items-center text-center text-sm justify-center gap-4 text-white bg-[#1E1E1E] rounded-xl p-4 flex-1 gap-8"
>
  <p class="font-semibold text-base">Create a profile</p>
  <p>
    Create a profile and join a league to keep persistent stats and view league
    leaderboards.
  </p>

  <div class="flex flex-col gap-1">
      <p class="text-red-500">{errorMessage}</p>
  </div>

  <div class="flex gap-4 px-4 justify-between text-left">
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <label for="name" class="text-xs pb-1 pl-1">Name: </label>
        <input
          bind:value={profileInformation.name}
          style="border-color: {profileInformation.color?.hex}"
          class="border rounded-full px-2 bg-[#121212] w-full"
          type="text"
        />
      </div>

      <div class="flex flex-col">
        <label for="email" class="text-xs pb-1 pl-1">Email: </label>
        <input
          bind:value={profileInformation.email}
          style="border-color: {profileInformation.color?.hex}"
          class="border rounded-full px-2 bg-[#121212] w-full"
          type="text"
        />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <label for="password" class="text-xs pb-1 pl-1">Password: </label>
        <input
          bind:value={profileInformation.password}
          style="border-color: {profileInformation.color?.hex}"
          class="border rounded-full px-2 bg-[#121212] w-full"
          type="password"
        />
      </div>

      <div class="flex flex-col">
        <label for="confirm-password" class="text-xs pb-1 pl-1"
          >Confirm Password:
        </label>
        <input
          bind:value={profileInformation.password}
          style="border-color: {profileInformation.color?.hex}"
          class="border rounded-full px-2 bg-[#121212] w-full"
          type="password"
        />
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-2 w-full px-8">
    <label for="name" class="text-sm">Favourite Color: </label>
    <div class="flex justify-center flex-wrap gap-3">
      {#each colors as color}
        <button
          on:click={() => (profileInformation.color = color)}
          tabindex="-1"
          style="background-color: {color.hex}"
          class="h-6 w-6 rounded"
        ></button>
      {/each}
    </div>
  </div>

  <div class="flex w-full gap-4 px-4">
    <button
      on:click={() => (showProfilePage = false)}
      class="bg-gray-500 rounded-full w-1/2 mx-auto text-white font-bold px-4 py-1 mb-4 mt-8 text-sm"
      ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Back</span></button
    >
    <button
      on:click={signUp}
      class="bg-green-500 rounded-full w-1/2 mx-auto text-white font-bold px-4 py-1 mb-4 mt-8 text-sm"
      ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >Create Profile</span
      ></button
    >
  </div>
</div>
