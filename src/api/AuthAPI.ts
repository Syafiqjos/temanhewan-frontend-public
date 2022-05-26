import * as API from '@/api/API';

export default async function AuthAPI({ token }: { token: string }) {
	API.GetCSRFToken();
	const url = API.GetAPIHost('/api/user/get');
	const res = await API.PostAPI(url, {}, {
		Authorization: `Bearer ${token}`
	});

	return res
}