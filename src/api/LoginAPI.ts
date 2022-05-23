import * as API from '@/api/API';

export default async function LoginAPI({ email, password }: { email: string, password: string }) {
	API.GetCSRFToken();
	const url = API.GetAPIHost('/api/user/login');
	const body = { email: email, password: password };
	const res = await API.PostAPI(url, body);

	return res
}