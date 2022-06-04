import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function GetDoctorReviewsAPI(
{
	doctor_id,
	all
}: {
	doctor_id: string,
	all?: boolean
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/doctor/reviews');
	const body = { 
		doctor_id,
		all
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}