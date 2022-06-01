import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function DeleteForumImageAPI(
{
	image_name
}: {
	image_name: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/forum/delete');
	const body = { 
		image_name
	};
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}