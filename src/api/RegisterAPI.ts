import * as API from '@/api/API';

export default async function RegisterAPI(
{
	name,
	birthdate,
	username,
	gender,
	role,
	email,
	password,
	password_confirmation,
	address,
	phone
}: {
	name: string,
	birthdate: Date,
	username: string,
	gender:  string | "m" | "f",
	role:  string | "customer" | "doctor" | "grooming",
	email: string,
	password: string,
	password_confirmation: string,
	address: string,
	phone: string
}) {
	API.GetCSRFToken();
	const url = API.GetAPIHost('/api/user/register');
	const body = { 
		name,
		birthdate,
		username,
		gender,
		role,
		email,
		password,
		password_confirmation,
		address,
		phone
	};
	console.log('AMPI');
	console.log(body);
	const res = await API.PostAPI(url, body);

	return res
}