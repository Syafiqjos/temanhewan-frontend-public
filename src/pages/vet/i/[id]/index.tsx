import * as React from 'react';
import { useRouter } from 'next/router'

import GetPublicUserAPI from '@/api/GetPublicUserAPI';

import InputText from '@/components/forms/InputText';

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

function NotFoundPage() {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Dokter hewan tidak ditemukan</h1>
	</div>
	</>);
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

function SuccessPage({ user }: { user: User }) {
	const router = useRouter();

	function handleAskVet(e: any) {
		e.preventDefault();
	}

	function handleConsultVet(e: any) {
		e.preventDefault();

		if (router.isReady) {
			router.push(`/vet/i/${user.id}/consult`);
		}
	}

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img src={user.profile_image} alt="profile image" className="w-40 h-40" />
		</ul>
	</div>
	<form className='flex flex-col items-start justify-start p-4 text-left gap-3 col-span-3'>
					  <InputText label="Email" name="email" type="text" placeholder="Email anda" disabled value={user.email} />
					  <InputText label="Nama" name="name" type="text" placeholder="Nama anda" disabled value={user.name} />
					  <InputText label="Tanggal lahir" name="birthdate" type="date" placeholder="Tanggal lahir anda" disabled value={user.birthdate} />
					  <div className="flex flex-col items-start w-full">
						<label htmlFor="gender">Jenis kelamin</label>
						<select name="gender" id="gender" className="border-0 rounded-l w-full p-4 bg-gray-100" disabled value={user.gender}>
							<option value="" disabled>Pilih jenis kelamin anda..</option>
							<option value="m">Laki - laki</option>
							<option value="f">Perempuan</option>
						</select>
					  </div>
					  <InputText label="No. HP" name="phone" type="text" placeholder="No. HP anda" disabled value={user.phone} />
					  <InputText label="Alamat" name="address" type="text" placeholder="Alamat anda" disabled value={user.address} />
					<div className="grid grid-cols-2 gap-3">
																																																																																												<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleAskVet}>Bertanya</button>
																																																																																												<button className="bg-primary-500 text-white rounded-xl border-primary-500 p-2 inline border-2" onClick={handleConsultVet}>Pesan Konsultasi</button>
</div>
																					</form>
	</>);
}

export default function HomePage() {
  const router = useRouter();
  const [ status, setStatus ] = React.useState<'LOADING' | 'NOTFOUND' | 'SUCCESS'>('LOADING');
  const [ user, setUser ] = React.useState<User>({ id: '', name: '', email: '', role: '' });

  React.useEffect(() => {
	(async () => {
		// check router ready
		if (!router.isReady) return;

		const id: string = router.query.id as string;

		// get user from server
		const res = await GetPublicUserAPI({ id });
		const success = res.success;
		const user: User = res.data;

		if (user && user.id != '') {
			setUser(user);
			setStatus('SUCCESS');
		} else {
			setStatus('NOTFOUND');
		}
	})();
  }, [ router.isReady ]);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout grid grid-cols-1 mt-8 w-100'>
			<h1 className="text-xl font-semibold mb-2">Profile Dokter Hewan</h1>
            <div className="px-4 grid grid-cols-4 gap-3">
				{status === 'LOADING' && <LoadingPage />
				|| status === 'NOTFOUND' && <NotFoundPage />
				|| status === 'SUCCESS' && <SuccessPage user={user} />
				}
            </div>
		  </div>
        </section>
      </main>
    </>
  );
}