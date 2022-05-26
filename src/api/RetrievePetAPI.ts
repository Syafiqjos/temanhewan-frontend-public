import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function RetrievePetAPI(
{
	id
}: {
	id: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/pet/get');
	const body = { 
		id
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}