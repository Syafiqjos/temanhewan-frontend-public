export function GetAPIHost(url: string): string{
	return 'https://api-temanhewan.mirzaq.com' + url;
}

export async function GetCSRFToken() {
	const csrfUrl = GetAPIHost('/sanctum/csrf-cookie');
	const csrf = await GetAPI(csrfUrl);
}

export async function PostAPI(url: string, body: any) {
	const res = await fetch(url, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin',
		method: 'POST',
		body: JSON.stringify(body)
	});
	const data = await res.json();

	return data;
}

export async function GetAPI(url: string, headers?: any) {
	const res = await fetch(url, {
		method: 'GET',
		credentials: 'same-origin',
		headers
	});

	const data = await res.text();

	return data;
}