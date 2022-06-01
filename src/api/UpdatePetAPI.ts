import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function UpdatePetAPI(
{
	id,
	name,
	description,
	race,
	gender,
	profile_image
}: {
	id: string,
	name: string,
	description: string,
	race: string,
	gender: string,
	profile_image?: any
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/pet/update');
	const body = { 
		id,
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