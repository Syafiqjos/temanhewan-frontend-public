import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function UpdatePetAPI(
{
	id,
	name,
	description,
	race,
	gender
}: {
	id: string,
	name: string,
	description: string,
	race: string,
	gender: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/pet/update');
	const body = { 
		id,
		name,
		description,
		race,
		gender
	};
	console.log(body);
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}