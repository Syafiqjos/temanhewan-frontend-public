import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function UpdateForumAPI(
{
	id,
	title,
	subtitle,
	content,
	forum_images
}: {
	id: string,
	title: string,
	subtitle: string,
	content: string,
	forum_images?: any
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/forum/create');
	const body = { 
		id,
		title,
		subtitle,
		content,
		forum_images
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}