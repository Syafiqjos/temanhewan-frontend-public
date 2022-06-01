import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function CreateCommentAPI(
{
	content,
	forum_id,
	comment_images
}: {
	content: string,
	forum_id: string,
	comment_images?: any
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/comment/create');
	const body = { 
		content,
		forum_id,
		comment_images
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}