import * as React from 'react';
import Router, { useRouter } from 'next/router'

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import GetPublicUserAPI from '@/api/GetPublicUserAPI';
import CreateConsultationAPI from '@/api/CreateConsultationAPI';

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

function FailedPage({ user }: { user: User }) {
	React.useEffect(() => {
		Router.push({
			pathname: `/vet/i/${user.id}/consult`
		});
	}, []);

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

function UnmatchedPage({ user }: { user: User }) {
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

function SuccessPage({ user }: { user: User }) {
	React.useEffect(() => {
		setTimeout(() => {
			Router.push({
				pathname: `/dashboard/consultation`
			});
		}, 1000);
	}, []);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Konsultasi berhasil dibuat! Tunggu respon dari dokter konsultasi peliharaan yang anda pilih.</h1>
	</div>
	</>);
}

function MatchedPage({ user, setStatus }: { user: User, setStatus: any }) {
	const router = useRouter();

	const [ req, setReq ] = React.useState<any>({
		complaint: '',
		address: '',
		date: (new Date().toISOString().split('T')[0]),
		time: (new Date().toISOString().split('T')[1].split(':', 2).join(':')),
		doctor_id: user.id
	});

	function handleComplaint(e: any) {
		setReq((prev: any) => {
			return {
				...prev,
				'complaint': e.target.value
			};
		});
	}

	function handleAddress(e: any) {
		setReq((prev: any) => {
			return {
				...prev,
				'address': e.target.value
			};
		});
	}

	function handleDate(e: any) {
		setReq((prev: any) => {
			return {
				...prev,
				'date': e.target.value
			};
		});
	}

	function handleTime(e: any) {
		setReq((prev: any) => {
			return {
				...prev,
				'time': e.target.value
			};
		});
	}

	function handleCancel(e: any) {
		e.preventDefault();

		router.push(`/vet/i/${user.id}`);
	}

	async function handleSubmit(e: any) {
		e.preventDefault();

		const res = await CreateConsultationAPI({ ...req });
		console.log(res);

		if (res.success) {
			setStatus('SUCCESS');
		} else {
			setStatus('FAILED');
		}
	}

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			
		</ul>
	</div>
	<div className="px-4 grid grid-cols-3 gap-3">
		<form className='flex flex-col items-start justify-start p-4 text-left gap-3'>
						<img src={user.profile_image} alt="profile image" className="w-40 h-40" />
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
		</form>
		<form className="flex flex-col items-start justify-start p-4 text-left gap-3 col-span-2">
			<h1 className="text-lg font-semibold mb-2">Isi form berikut untuk melakukan reservasi konsultasi dengan dokter peliharan.</h1>
			<InputText label="Komplain" name="complaint" type="text" placeholder="Komplain peliharaan anda" value={req.complaint} onChange={handleComplaint} />
			<InputText label="Alamat" name="address" type="text" placeholder="Alamat konsultasi anda" value={req.address} onChange={handleAddress} />
			<InputText label="Tanggal konsultasi" name="date" type="date" placeholder="Tanggal konsultasi anda" value={req.date} onChange={handleDate} />
			<InputText label="Waktu konsultasi" name="time" type="time" placeholder="Waktu konsultasi anda" value={req.time} onChange={handleTime} />
			<div className="grid grid-cols-2 gap-3">
				<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleCancel}>Batal</button>
				<button className="bg-primary-500 text-white rounded-xl border-primary-500 p-2 inline border-2" onClick={handleSubmit}>Pasang Konsultasi</button>
			</div>
		</form>
	</div>
	</>);
}

export default function HomePage() {
  const [ status, setStatus ] = React.useState<'LOADING' | 'FAILED' | 'NOTFOUND' | 'UNMATCHED' | 'MATCHED' | 'SUCCESS'>('LOADING');
  const [ state, setState ] = React.useState<any>({});

  const router = useRouter();

  React.useEffect(() => {
	const refreshUser = async () => {
		if (!router.isReady) return;

		const userId = router.query.id as string;
		const res = await GetPublicUserAPI({ id: userId });
		const success = res.success;

		if (success) {
			const user = res.data;

			if (user.role == 'doctor') {
				setState(user);
				setStatus('MATCHED');
			} else {
				setStatus('UNMATCHED');
			}
		} else {
			setStatus('NOTFOUND');
		}
	};

	refreshUser();
  }, [ router.isReady ]);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
		<ShouldAuthorized roleSpecific="customer">
			<section className='bg-white'>
			  <div className='layout grid grid-cols-1 mt-8 w-100'>
				<h1 className="text-xl font-semibold mb-2">Pesan konsultasi</h1>
				<div className="px-4 grid grid-cols-1 gap-3">
					{status === 'LOADING' && <LoadingPage />
					|| status === 'NOTFOUND' && <NotFoundPage />
					|| status === 'MATCHED' && <MatchedPage user={state} setStatus={setStatus} />
					|| status === 'UNMATCHED' && <UnmatchedPage user={state} />
					|| status === 'SUCCESS' && <SuccessPage user={state} />
					|| status === 'FAILED' && <FailedPage user={state} />
					}
				</div>
			  </div>
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}