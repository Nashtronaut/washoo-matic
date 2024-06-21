export const resetGame = (gameInfo: any) => {
    gameInfo.players = gameInfo.players.map((player: any) => {
        player.stats = {
            accuracy: 0,
            shotsTaken: 0,
            hits: 0,
            misses: 0,
            busts: 0,
            points: 0,
        };
        return player;
    });

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
