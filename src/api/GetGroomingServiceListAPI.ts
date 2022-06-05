import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function GetGroomingServiceListAPI(
{
	grooming_id,
	offset,
	limit
}: {
	grooming_id: string,
	offset: number,
	limit: number
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/grooming/service/list');
	const body = { 
		grooming_id,
		offset,
		limit
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}