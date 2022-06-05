import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function CancelConsultationAPI(
{
	id
}: {
	id: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/consultation/cancel');
	const body = { 
		id
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}