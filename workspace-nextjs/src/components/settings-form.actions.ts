"use server";

// Diese Datei enthält React "Server Functions"
//  - Für alle exportierten Funktionen stellt React (bzw. Next)
//    einen Endpunkt zur Verfügung
//  - Wir können die Funktionen aus Client Componenten
//    aufrufen, ohne uns um Serialisierung, Endpunkt-Design etc.
//    kümmern zu müssen

import ky from "ky";
import {revalidatePath} from "next/cache";

export async function saveUser(userId: string, name: string, matchesPerLeague: number, leagueIds: string[]) {
	// Dieser Code wird im SERVER ausgeführt
	const response = await ky.put(`http://localhost:7100/api/users/${userId}?slowdown=1200`, {
		json: {
			name: name,
			matchesPerLeague,
			leagueIds: leagueIds
		}
	}).json();

	// Da die "/"-Route statisch ist, würde sie im Prod-Build nicht erneut gerendert,
	// so dass die aktualisierten Einstellungen nicht angewendet würden und
	// die Darstellung nicht korrekt wäre.
	// Aus diesem Grund muss man den Next.js Cache hier manuell invalidieren
	revalidatePath("/");

	// Der Return-Wert wird serialisiert und zurück zum CLIENT geschickt,
	// wo dieser ihn verarbeiten könnte (wie mit einem "normalen" HTTP Endpunkt)
	return response;
}

