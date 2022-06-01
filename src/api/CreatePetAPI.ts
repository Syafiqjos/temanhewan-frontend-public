import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function CreatePetAPI(
{
	name,
	description,
	race,
	gender,
	profile_image
}: {
	name: string,
	description: string,
	race: string,
	gender: string,
	profile_image?: any
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/pet/create');
	const body = { 
		name,
		description,
		race,
		gender,
		profile_image
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}