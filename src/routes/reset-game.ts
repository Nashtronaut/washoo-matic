export const resetGame = (gameInfo: any) => {
    gameInfo.rounds = [
        {
            name: "Round 1",
            tracking: [],
            redTotal: 0,
            blueTotal: 0,
        },
    ];
    gameInfo.scores = {red: 0, blue: 0};
    gameInfo.busts = {red: 0, blue: 0};
    gameInfo.winner = null;
    gameInfo.currentPlayer = null;
    gameInfo.shootingFirst = null;
    gameInfo.round = "1A";


    return gameInfo;
};
