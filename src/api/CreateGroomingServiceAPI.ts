import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function CreateGroomingServiceAPI(
{
	name,
	description,
	price,
	grooming_id
}: {
	name: string,
	description: string,
	price: number,
	grooming_id: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/grooming/service/create');
	const body = { 
		name,
		description,
		price,
		grooming_id
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}