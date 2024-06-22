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
    spectateCode: string | null;
};

export type Player = {
    id: number;
    name: string | null;
    color: string;
    tailwindColor: string;
    tailwindBgColor: string;
    tailwindBorderColor: string;
    tailwindTextColor: string;
    stats: {
        accuracy: number;
        shots: number;
        hits: number;
        misses: number;
        points: number;
        busted: number;
    }
};