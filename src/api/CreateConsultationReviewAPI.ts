import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function CreateConsultationReviewAPI(
{
	id,
	rating,
	review,
	is_public
}: {
	id: string,
	rating: number,
	review: string,
	is_public: boolean
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/consultation/review/create');
	const body = { 
		id,
		rating,
		review,
		is_public
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}