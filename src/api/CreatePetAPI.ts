import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function CreatePetAPI(
{
	name,
	description,
	race,
	gender
}: {
	name: string,
	description: string,
	race: string,
	gender: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/pet/create');
	const body = { 
		name,
		description,
		race,
		gender
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}