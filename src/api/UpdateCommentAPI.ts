import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function UpdateCommentAPI(
{
	comment_id,
	content,
	comment_images
}: {
	comment_id: string,
	content: string,
	comment_images?: any
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/comment/update');
	const body = { 
		comment_id,
		content,
		comment_images
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}