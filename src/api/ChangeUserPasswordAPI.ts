import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function ChangeUserPasswordAPI(
{
	old_password,
	password,
	password_confirmation
}: {
	old_password?: string,
	password?: string,
	password_confirmation?: string
}) {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/user/change_password');
	const body = { 
		old_password,
		password,
		password_confirmation
	};
	console.log(body);
	const res = await API.PostAPI(url, body, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}