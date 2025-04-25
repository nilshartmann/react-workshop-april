import {z} from "zod";
import ky from "ky";
import SettingsForm from "@/components/SettingsForm";

type PageProps = {
	params: Promise<{userId: string}>
}


const UserSettings = z.object({
	id: z.string(),
	name: z.string(),
	leagueIds: z.string().array(),
	matchesPerLeague: z.number().min(0),
});


export default async function UserSettingsPage({params}: PageProps) {
	const {userId} = await params;
	// Code wird serverseitig ausgeführt!

	const response = await ky
		.get(`http://localhost:7100/api/users/${userId}`)
		.json();

	const userSettings = UserSettings.parse(response);

	// Auf dem SERVER geladenen DATEN an den CLIENT übergeben
	return <SettingsForm userId={userId}
											 initialName={userSettings.name}
											 initialLeagueIds={userSettings.leagueIds}
											 initialMatchesPerLeague={userSettings.matchesPerLeague}
	/>
}