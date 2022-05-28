import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import InputText from '@/components/forms/InputText';
import InputButton from '@/components/forms/InputButton';
import Seo from '@/components/Seo';

import UnauthorizedRedirect from '@/components/auths/UnauthorizedRedirect';

import LoginAPI from '@/api/LoginAPI';
import { useAuthState, useAuthDispatch } from '@/providers/AuthContextProvider';
import AuthService from '@/services/AuthService';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

function LoginForm() {

	const authState = useAuthState();
	const authDispatch = useAuthDispatch();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	function handleEmail(e: any){
		setEmail(e.target.value);
	}

	function handlePassword(e: any){
		setPassword(e.target.value);
	}

	async function handleSubmit(e: any){
		e.preventDefault();
		const res = await LoginAPI({ email, password });
		const accessToken = res.data.access_token;
		if (accessToken !== null || accessToken !== undefined)  {
			AuthService.storeToken(accessToken);
			authDispatch({ type:'LOGIN', payload: { email: res.data.user.email, name: res.data.user.name } });
		}
	}

	return (
		<form className='flex flex-col items-start justify-start p-4 text-left gap-3' onSubmit={handleSubmit}>
		  <h1 className="text-xl font-semibold">Masuk Akun</h1>
		  <h2 className="text-base font-normal">Dapatkan sensasi hewan peliharaan.</h2>
		  <InputText label="Email" name="email" type="text" placeholder="Email anda" onChange={handleEmail} />
		  <InputText label="Password" name="password" type="password" placeholder="Password anda" onChange={handlePassword} />
		  <div>
			<span>Lupa password? <UnstyledLink href="/reset-password" className="text-orange-600">Klik disini</UnstyledLink></span>
		  </div>
		  <div>
			<span>Belum pernah mendaftar? <UnstyledLink href="/sign-up" className="text-orange-600">Klik disini</UnstyledLink></span>
		  </div>
		  <InputButton text="Masuk" />
		</form>
	);
}

export default function HomePage() {
  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <UnauthorizedRedirect>
			<section className='bg-white'>
			  <div className='layout min-h-screen grid grid-cols-2 mt-8 w-100'>
				<LoginForm/>
				<div className="p-4">
				  <img className="rounded-xl" src="/images/cover/login-cover.png" />
				</div>
			  </div>
			</section>
	    </UnauthorizedRedirect>
      </main>
    </>
  );
}
