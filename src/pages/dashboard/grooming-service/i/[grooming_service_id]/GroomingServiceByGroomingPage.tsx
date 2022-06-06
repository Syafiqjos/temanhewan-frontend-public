import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';
import GetGroomingServiceAPI from '@/api/GetGroomingServiceAPI';

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

function LoadingPage() {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Memuat..</h1>
	</div>
	</>);
}

function SuccessPage({ service }: { service: any }) {
	const router = useRouter();

	  function handleBack(e: any) {
			if (router.isReady) {
				router.push(`/dashboard/grooming-service`);
			}
	  }

	return (<>
	<div className="flex flex-col gap-1">
		<form className="p-4 flex flex-col gap-4">
					<InputText label="Nama Layanan" name="name" type="text" placeholder="Nama layanan anda" disabled value={service.name} />
					<div className="flex flex-col items-start w-full">
						<label className="mb-3">Deskripsi Layanan</label>
						<textarea className="bg-white text-orange-600 rounded-xl border-orange-600 p-4 inline border-2 w-full" placeholder="Deskripsi layanan anda" disabled value={service.description}></textarea>
					</div>
					  <InputText label="Biaya Layanan (IDR)" name="price" type="number" placeholder="Biaya layanan anda" disabled value={service.price} />
						<div className="grid grid-cols-2 gap-3">
							<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						</div>
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
  const router = useRouter();

  const [ status, setStatus ] = React.useState<'SUCCESS' | 'LOADING' | 'FAILED' >('LOADING');
  const [ service, setService ] = React.useState<any>({});

  const refreshService = async () => {
		if (!router.isReady) return;

		const serviceId = router.query.grooming_service_id;

		// get grooming service
		const res = await GetGroomingServiceAPI({ id: serviceId });
		const success = res.success;

		if (success) {
			setStatus('SUCCESS');
			const groomingService = res.data;

			setService(groomingService);
		} else {
			setStatus('FAILED')
		}
  };

  React.useEffect(() => {
		refreshService();
  }, [ router.isReady ]);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
		<ShouldAuthorized roleSpecific="grooming">
			<section className='bg-white'>
				<div className="p-4">
					<h1 className="text-xl">Rincian Layanan Grooming</h1>
					{status == 'SUCCESS' && <SuccessPage service={service} />
					|| status == 'LOADING' && <LoadingPage />
					|| status == 'FAILED' && <FailedPage />}
				</div>
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}