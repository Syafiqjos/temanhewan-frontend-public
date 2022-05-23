export function GetAPIHost(url: string): string{
	return 'https://api-temanhewan.mirzaq.com' + url;
}

export async function GetCSRFToken() {
	const csrfUrl = GetAPIHost('/sanctum/csrf-cookie');
	const csrf = await GetAPI(csrfUrl);
}

export async function PostAPI(url: string, body: any) {
	const config = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin',
		method: 'POST'
	};
	if (body) {
		config['body'] = JSON.stringify(body);
	}
	const res = await fetch(url, config);
	const data = await res.json();

	return data;
}

export async function GetAPI(url: string) {
	const config = {
		method: 'GET',
		credentials: 'same-origin'
	};
	const res = await fetch(url, config);

	const data = await res.text();

	return data;
}