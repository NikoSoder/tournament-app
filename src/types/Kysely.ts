import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Matches {
  id: Generated<number>;
  match: number;
  player1: string;
  player2: string;
  round: number;
  tournament_id: number;
  winner: string | null;
  player1_hits: number;
  player2_hits: number;
}

export interface Players {
  player_name: string;
}

export interface TournamentPlayers {
  player_name: string;
  tournament_id: number;
  bracket_match: number | null;
  bracket_seed: number | null;
}

export interface Tournaments {
  date: Timestamp;
  format: string;
  id: Generated<number>;
  name: string;
}

export interface Users {
  password: string;
  role: string;
  username: string;
}

export interface DB {
  matches: Matches;
  players: Players;
  tournament_players: TournamentPlayers;
  tournaments: Tournaments;
  users: Users;
}
