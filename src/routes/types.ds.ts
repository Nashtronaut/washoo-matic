export type GameInfo = {
    players: Player[];
    rounds: {
        name: string;
        tracking: any[];
        redTotal: number;
        blueTotal: number;
    }[];
    scores: {
        red: number;
        blue: number;
    };
    busts: {
        red: number;
        blue: number;
    };
    winner: string | null;
    currentPlayer: number | null;
    shootingFirst: string | null;
    round: string;
};

export type Player = {
    id: number;
    name: string | null;
    color: string;
    score: number;
};