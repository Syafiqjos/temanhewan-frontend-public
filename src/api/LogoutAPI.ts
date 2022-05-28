import * as API from '@/api/API';
import AuthService from '@/services/AuthService';

export default async function LogoutAPI() {
	API.GetCSRFToken();
	const authToken = AuthService.getToken();
	const url = API.GetAPIHost('/api/user/logout');
	const res = await API.PostAPI(url, {}, {
		'Authorization': `Bearer ${authToken}`
	});

	return res
}