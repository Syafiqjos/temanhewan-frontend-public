import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function CreateGroomingOrderAPI(
{
	address,
	grooming_service_id,
	pet_id
}: {
	address: string,
	grooming_service_id: string,
	pet_id: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/grooming/order/create');
	const body = { 
		address,
	grooming_service_id,
	pet_id
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}