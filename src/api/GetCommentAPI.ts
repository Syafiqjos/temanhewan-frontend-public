import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function GetForumAPI(
{
	comment_id
}: {
	comment_id: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/comment/get');
	const body = { 
		comment_id
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}