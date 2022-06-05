import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function UpdateGroomingServiceAPI(
{
	id,
	name,
	description,
	price
}: {
	id: string,
	name: string,
	description: string,
	price: number
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/grooming/service/update');
	const body = { 
		id,
		name,
		description,
		price
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}