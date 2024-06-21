<script lang="ts">
  export let gameInfo: any;

  const addScore = (score: number) => {
    const currentHistory = gameInfo.rounds[gameInfo.rounds.length - 1].tracking;
    gameInfo.rounds[gameInfo.rounds.length - 1].tracking = [
      ...currentHistory,
      {
        shooter: gameInfo.players[gameInfo.currentPlayer],
        score: score,
      },
    ];

    if (gameInfo.rounds[gameInfo.rounds.length - 1].tracking.length === 4) {
      gameInfo.round = gameInfo.round.slice(0, -1) + "B";
      switch (gameInfo.currentPlayer) {
        case 0:
          gameInfo.currentPlayer = 2;
          break;
        case 1:
          gameInfo.currentPlayer = 3;
          break;
        case 2:
          gameInfo.currentPlayer = 0;
          break;
        case 3:
          gameInfo.currentPlayer = 1;
          break;
      }
    }

    if (gameInfo.rounds[gameInfo.rounds.length - 1].tracking.length === 8) {
      incrementRound();
    }
  };

  const incrementRound = () => {
    const currentRound = gameInfo.rounds[gameInfo.rounds.length - 1];

    const redTotal = currentRound.tracking
      .filter((shot: any) => shot.shooter.color === "red")
      .reduce((acc: number, shot: any) => acc + shot.score, 0);

    const blueTotal = currentRound.tracking
      .filter((shot: any) => shot.shooter.color === "blue")
      .reduce((acc: number, shot: any) => acc + shot.score, 0);

    gameInfo.rounds[gameInfo.rounds.length - 1].redTotal = 0;
    gameInfo.rounds[gameInfo.rounds.length - 1].blueTotal = 0;

    if (redTotal > blueTotal) {
      gameInfo.scores.red += redTotal - blueTotal;
      gameInfo.rounds[gameInfo.rounds.length - 1].redTotal =
        redTotal - blueTotal;

      if (gameInfo.scores.red > 21) {
        gameInfo.scores.red = 0;
        gameInfo.busts.red++;
      }
    } else {
      gameInfo.scores.blue += blueTotal - redTotal;
      gameInfo.rounds[gameInfo.rounds.length - 1].blueTotal =
        blueTotal - redTotal;

      if (gameInfo.scores.blue > 21) {
        gameInfo.scores.blue = 0;
        gameInfo.busts.blue++;
      }
    }

    if (gameInfo.scores.red === 21) {
      gameInfo.winner = "Red";
    }

    if (gameInfo.scores.blue === 21) {
      gameInfo.winner = "Blue";
    }

    const newRound = {
      name: `Round ${gameInfo.rounds.length + 1}`,
      tracking: [],
    };
    gameInfo.currentPlayer = determineNextPlayerAfterRound(currentRound);
    gameInfo.rounds = [...gameInfo.rounds, newRound];
    gameInfo.round = Number(gameInfo.round.slice(0, -1)) + 1 + "A";
  };

  const determineNextPlayerAfterRound = (currentRound) => {
    const redTotal = currentRound.tracking
      .filter((shot: any) => shot.shooter.color === "red")
      .reduce((acc: number, shot: any) => acc + shot.score, 0);

    const blueTotal = currentRound.tracking
      .filter((shot: any) => shot.shooter.color === "blue")
      .reduce((acc: number, shot: any) => acc + shot.score, 0);

    if (redTotal > blueTotal) {
      gameInfo.shootingFirst = "red";
      if (gameInfo.currentPlayer === 0 || gameInfo.currentPlayer === 2) {
        return 3;
      } else if (gameInfo.currentPlayer === 1 || gameInfo.currentPlayer === 3) {
        return 2;
      }
    } else if (blueTotal > redTotal) {
      gameInfo.shootingFirst = "blue";
      if (gameInfo.currentPlayer === 0 || gameInfo.currentPlayer === 2) {
        return 1;
      } else if (gameInfo.currentPlayer === 1 || gameInfo.currentPlayer === 3) {
        return 0;
      }
    } else if (blueTotal === redTotal) {
      if (
        gameInfo.shootingFirst === "red" &&
        (gameInfo.currentPlayer === 0 || gameInfo.currentPlayer === 2)
      ) {
        return 3;
      } else if (
        gameInfo.shootingFirst === "red" &&
        (gameInfo.currentPlayer === 1 || gameInfo.currentPlayer === 3)
      ) {
        return 2;
      } else if (
        gameInfo.shootingFirst === "blue" &&
        (gameInfo.currentPlayer === 0 || gameInfo.currentPlayer === 2)
      ) {
        return 1;
      } else if (
        gameInfo.shootingFirst === "blue" &&
        (gameInfo.currentPlayer === 1 || gameInfo.currentPlayer === 3)
      ) {
        return 0;
      }
    }
  };
</script>

<div
  class="{gameInfo.winner
    ? 'pointer-events-none'
    : ''} flex flex-col justify-evenly w-[45%] font-bold items-center bg-[#121212] rounded-xl h-full py-2 px-4"
>
  <button
    on:click|preventDefault={() => addScore(5)}
    class="flex justify-center items-center bg-[#00BFA5] font-bold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:ring-opacity-50 shadow-lg"
  >
    <span
      class="bg-[#1E1E1E] rounded-full p-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg text-xl"
      >+5</span
    >
  </button>

  <!-- Lighter Teal Button -->
  <button
    on:click|preventDefault={() => addScore(3)}
    class="flex justify-center items-center bg-[#26C6DA] font-bold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#26C6DA] focus:ring-opacity-50 shadow-lg"
  >
    <span
      class="bg-[#1E1E1E] rounded-full p-5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg text-xl"
      >+3</span
    >
  </button>

  <!-- Lightest Teal Button -->
  <button
    on:click|preventDefault={() => addScore(1)}
    class="flex justify-center items-center bg-[#80DEEA] font-bold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
  >
    <span
      class="bg-[#1E1E1E] rounded-full p-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg text-xl"
      >+1</span
    >
  </button>

  <button
    on:click|preventDefault={() => addScore(0)}
    class="flex justify-center items-center bg-[#80DEEA] font-bold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#80DEEA] focus:ring-opacity-50 shadow-lg"
  >
    <span
      class="bg-[#1E1E1E] rounded-full py-3 px-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-lg text-xl"
      >M</span
    >
  </button>
</div>
