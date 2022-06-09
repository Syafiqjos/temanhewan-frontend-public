import { useRouter } from 'next/router';
import * as React from 'react';

import InputButton from '@/components/forms/InputButton';
import SidebarDoctor from '@/components/layout/SidebarDoctor';
import Seo from '@/components/Seo';

import LogoutAPI from '@/api/LogoutAPI';
import { useAuthDispatch } from '@/providers/AuthContextProvider';


export default function LogoutDoctor() {
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

    <SidebarDoctor>
			<main>
				<form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleSubmit}>
					<h1 className="text-xl font-semibold">Logout Akun</h1>
					<h2 className="text-base font-normal">Silahkan klik tombol dibawah untuk logout dari akun anda.</h2>
					<InputButton text="Logout" />
				</form>
			</main>
    </SidebarDoctor>
  </>
}