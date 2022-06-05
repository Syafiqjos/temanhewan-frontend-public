import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function CreateConsultationAPI(
{
	complaint,
	address,
	date,
	time,
	doctor_id
}: {
	complaint: string,
	address: string,
	date: string,
	time: string,
	doctor_id: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/consultation/create');
	const body = { 
		complaint,
		address,
		date,
		time,
		doctor_id
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}