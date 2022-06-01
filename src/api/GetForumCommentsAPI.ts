import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function GetForumCommentsAPI(
{
	forum_id
}: {
	forum_id: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/comment/forum');
	const body = { 
		forum_id
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}