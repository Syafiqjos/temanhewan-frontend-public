import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function GetGroomingReviewsAPI(
{
	id,
	all
}: {
	id: number,
	all?: boolean
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/grooming/reviews');
	const body = { 
		id,
		all
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}