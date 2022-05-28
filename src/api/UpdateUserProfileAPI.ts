import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function UpdateUserProfileAPI(
{
	name,
	profile_image,
	birthdate,
	gender,
	address,
	phone
}: {
	name?: string,
	profile_image?: string,
	birthdate?: string,
	gender?: string,
	address?: string,
	phone?: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/user/update');
	const body = { 
		name,
		profile_image,
		birthdate,
		gender,
		address,
		phone
	};
	console.log(body);
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}