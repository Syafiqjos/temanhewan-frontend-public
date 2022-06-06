import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';
import CreateGroomingServiceAPI from '@/api/CreateGroomingServiceAPI';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import InputText from '@/components/forms/InputText';
import InputButton from '@/components/forms/InputButton';
import GroomingServiceComponent from '@/components/business/groomings/GroomingServiceComponent';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import Link from 'next/link';

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

interface User {
	id: string,
	email: string,
	name: string,
	role: string,
	birthdate?: string,
	username?: string,
	gender?: string,
	address?: string,
	phone?: string,
	profile_image?: string
}

function CreatedPage() {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Layanan Grooming Berhasil Dibuat!</h1>
	</div>
	</>);
}

function SuccessPage({ setStatus }: { setStatus: any }) {
	const router = useRouter();

	  const [ name, setName ] = React.useState('');
	  const [ description, setDescription ] = React.useState('');
	  const [ price, setPrice ] = React.useState(100000);

	  function handleName(e: any) {
			setName(e.target.value);
	  }

		function handleDescription(e: any) {
			setDescription(e.target.value);
	  }

		function handlePrice(e: any) {
			setPrice(e.target.value as number);
		}

	  async function handleSubmit(e: any) {
			e.preventDefault();

			if (!router.isReady) return;

			const token = AuthService.getToken()!;
			const resUser = await AuthAPI({ token });
			const userId = resUser.data.id;

			// create grooming service
			const res = await CreateGroomingServiceAPI({ grooming_id: userId, name, description, price });
			const success = res.success;

			if (success) {
				setStatus('CREATED');

				const groomingService = res.data;

				setTimeout(() => {
					router.push(`/dashboard/grooming-service/i/${groomingService.id}`);
				} ,500);
			} else {
				setStatus('FAILED')
			}
		}

	return (<>
	<div className="flex flex-col gap-1">
		<form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
					<InputText label="Nama Layanan" name="name" type="text" placeholder="Nama layanan anda" onChange={handleName} />
					<div className="flex flex-col items-start w-full">
						<label>Deskripsi Layanan</label>
						<textarea className="bg-white text-orange-600 rounded-xl border-orange-600 p-4 inline border-2 w-full" placeholder="Deskripsi layanan anda" onChange={handleDescription}></textarea>
					</div>
					  <InputText label="Biaya Layanan (IDR)" name="price" type="number" placeholder="Biaya layanan anda" onChange={handlePrice} value="100000" />
						<InputButton text="Buat Layanan" />
		</form>
	</div>
	</>);
}

function FailedPage() {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Ada sesuatu yang salah, silahkan coba kembali</h1>
	</div>
	</>);
}

export default function GroomingServiceByGroomingPage() {
  const [ status, setStatus ] = React.useState<'SUCCESS' | 'CREATED' | 'FAILED' >('SUCCESS');

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
		<ShouldAuthorized roleSpecific="grooming">
			<section className='bg-white'>
				<div className="p-4">
					<h1 className="text-xl">Buat Layanan Grooming</h1>
					{status == 'SUCCESS' && <SuccessPage setStatus={setStatus} />
					|| status == 'CREATED' && <CreatedPage />
					|| status == 'FAILED' && <FailedPage />}
				</div>
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}