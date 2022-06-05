import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function AcceptConsultationAPI(
{
	id,
	fee
}: {
	id: string,
	fee: number
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/consultation/accept');
	const body = { 
		id,
		fee
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}