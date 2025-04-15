<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { userStore } from "$lib/user-store";
  import { errorMessage } from "$lib/error-message-store";

  let email = "";
  let password = "";
  let signUpEmail = "";
  let signUpPassword = "";
  let signUpFirstName = "";

  const onLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      errorMessage.set(error.message);
    } else {
      handleStore(data.user);
    }
  };

  const onSignup = async () => {
    if (await checkUserName()) {
      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
      });
  
      if (error) {
        errorMessage.set(error.message);
      } else {
        handleStore(data.user, true);
      }
    }
  };

  const handleStore = async (user, signingUp = false) => {
    let tempUser = user;

    if (signingUp) {
      const { data, error } = await supabase
        .from("user")
        .upsert({
          id: user.id,
          name: signUpFirstName,
        })
        .select("*")
        .single();

      if (data) {
        tempUser = data;
      };

      if (error) {
        errorMessage.set(error.message);
        return;
      }
    }

    userStore.set(tempUser);
  };

  const checkUserName = async () => {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("name", signUpFirstName)
      .single();

    if (data) {
      errorMessage.set("This username is already taken.");
      return false;
    };

    return true;
  }
</script>

<div class="text-white">
  <div class="flex flex-col gap-4 pb-4">
    <div
      id="full-container"
      class="flex flex-col gap-4 w-full text-center h-full px-4 py-2 mt-4 text-[#B0BEC5] bg-[#1E1E1E] rounded-xl"
    >
      <p class="text-lg">Welcome to Washoo-matic!</p>
      <p>Please login or sign up.</p>
    </div>

    <div
      id="full-container"
      class="flex flex-col gap-4 w-full text-center h-full px-4 py-2 text-[#B0BEC5] bg-[#1E1E1E] rounded-xl"
    >
      <p class="text-lg">Login</p>
      <p>Email</p>
      <input
        bind:value={email}
        class="border-green-500 border rounded-full px-2 bg-[#121212] text-center"
        type="email"
      />

      <p>Password</p>
      <input
        bind:value={password}
        class="border rounded-full px-2 bg-[#121212] text-center"
        type="password"
      />

      <div class="flex gap-4 mb-2">
        <button
          on:click|preventDefault={onLogin}
          class="bg-green-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
          ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">LOGIN</span
          ></button
        >
      </div>
      <button class="text-xs my-4">I forgot my password</button>
    </div>

    <div
      id="full-container"
      class="flex flex-col gap-4 w-full text-center h-full px-4 py-2 text-[#B0BEC5] bg-[#1E1E1E] rounded-xl"
    >
      <p class="text-lg">Sign Up</p>

      <p>Email</p>
      <input
        bind:value={signUpEmail}
        class="border-purple-500 border rounded-full px-2 bg-[#121212] text-center"
        type="email"
      />

      <p>First Name</p>
      <input
        bind:value={signUpFirstName}
        class="border-yellow-500 border rounded-full px-2 bg-[#121212] text-center"
        type="text"
      />

      <p>Password</p>
      <input
        bind:value={signUpPassword}
        class="border rounded-full px-2 bg-[#121212] text-center"
        type="password"
      />

      <div class="flex gap-4 mb-2">
        <button
          on:click|preventDefault={onSignup}
          class="bg-purple-500 rounded-full w-1/2 mx-auto text-white font-bold mt-2 px-4 py-1 text-sm"
          ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Sign Up</span
          ></button
        >
      </div>
    </div>
  </div>
</div>

<!-- <button
  class="bg-purple-500 rounded-full w-1/2 mx-auto text-white font-bold px-4 py-1 mb-4 text-sm"
  ><span class="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">SPECTATE</span
  ></button
>
<input
  maxlength="6"
  id="player1"
  class="border-purple-500 border rounded-full px-2 bg-[#121212] text-center"
  type="text"
/> -->
