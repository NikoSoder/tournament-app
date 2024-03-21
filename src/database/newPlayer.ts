"use server";
import { db } from "@/database/database";
import { Result } from "@/types/result";
import { TournamentPlayers } from "@/database/types";
import { Player } from "@/types/Player";

// this function adds a new player to the players table
export async function newPlayer(
  name: string
): Promise<Result<undefined, string>> {
  try {
    const result = await db
      .insertInto("players")
      .values({
        player_name: name.toString(),
      })
      .executeTakeFirst();
    console.log(result);

    if (!result) {
      return { success: false, error: "Error adding player" };
    }
    return { success: true, value: undefined };
  } catch (error) {
    return { success: false, error: "Error adding player" };
  }
}

// this function adds an existing player from the players table to the tournament_players table
export async function addPlayer(
  name: string,
  tournamentId: number
): Promise<Result<Player, string>> {
  try {
    const result = (await db
      .insertInto("tournament_players")
      .values({
        player_name: name.toString(),
        tournament_id: tournamentId,
        hits_given: 0,
        hits_received: 0,
      })
      .returningAll()
      .executeTakeFirst()) as TournamentPlayers | undefined;

    if (!result) {
      return { success: false, error: "Error adding player to tournament" };
    }

    const player: Player = {
      player: result,
      matches: [],
    };

    return { success: true, value: player };
  } catch (error) {
    return {
      success: false,
      error: "Error adding player to tournament (catch)",
    };
  }
}