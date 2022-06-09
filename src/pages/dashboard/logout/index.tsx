import { useRouter } from 'next/router';
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import Seo from '@/components/Seo';

import LogoutAPI from '@/api/LogoutAPI';
import { useAuthDispatch } from '@/providers/AuthContextProvider';

import LogoutCustomer from './LogoutCustomer';
import LogoutDoctor from './LogoutDoctor';
import LogoutGroomer from './LogoutGroomer';


export default function Logout() {
	const router = useRouter();
	const authDispatch = useAuthDispatch();

	async function handleSubmit(e: any) {
		e.preventDefault();
		console.log('submit logout');
		const res = await LogoutAPI();
		console.log(res);
		const success = res.success;
		if (success) {
			authDispatch({ type:'LOGOUT' });
			router.push('/');
		}
	}
	return <>
    <Seo title="Logout"/>

			<main>
				<ShouldAuthorized>
					<ShouldAuthorized roleSpecific='customer' dontRedirect={true}>
						<LogoutCustomer />
					</ShouldAuthorized>
					<ShouldAuthorized roleSpecific='doctor' dontRedirect={true}>
						<LogoutDoctor />
					</ShouldAuthorized>
					<ShouldAuthorized roleSpecific='grooming' dontRedirect={true}>
						<LogoutGroomer />
					</ShouldAuthorized>
				</ShouldAuthorized>
			</main>
  </>
}