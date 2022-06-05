import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';
import GetConsultationAPI from '@/api/GetConsultationAPI';
import CancelConsultationAPI from '@/api/CancelConsultationAPI';
import GetPublicUserAPI from '@/api/GetPublicUserAPI';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import InputText from '@/components/forms/InputText';
import DoctorFormComponent from '@/components/business/consultations/DoctorFormComponent';
import CustomerFormComponent from '@/components/business/consultations/CustomerFormComponent';
import ConsultationFormComponent from '@/components/business/consultations/ConsultationFormComponent';
import ConsultationStatusFormComponent from '@/components/business/consultations/ConsultationStatusFormComponent';

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

function SuccessPage({ myUser, user, consultation, setStatus }: { myUser: any, user: any, consultation: any, setStatus: any }) {
	const router = useRouter();

	function handleBack(e: any) {
		e.preventDefault();

		if (router.isReady) {
			router.push(`/dashboard/consultation`);
		}
	}

	async function handleCancelConsultation(e: any) {
		e.preventDefault();

		const res = await CancelConsultationAPI({ id: consultation.id });
		const success = res.success;

		if (success) {
			setStatus('CANCELED');
		} else {
			setStatus('FAILED');
		}
	}

	return (<>
	<div className="flex flex-col gap-1 p-4">
		<ConsultationFormComponent consultation={consultation} />
		<DoctorFormComponent user={user} />
		<CustomerFormComponent user={myUser} />
		<ConsultationStatusFormComponent consultation={consultation} />
		
		{(()=>{
			if (consultation.status == 'pending') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleCancelConsultation}>Batalkan Konsultasi</button>
					</div>
				);
			} else if (consultation.status == 'cancelled') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			}
		})()}
	</div>
	</>);
}

function AcceptedPage({ myUser, user, consultation, setStatus }: { myUser: any, user: any, consultation: any, setStatus: any }) {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Konsultasi Berhasil Diterima</h1>
	</div>
	</>);
}

function RejectedPage({ myUser, user, consultation, setStatus }: { myUser: any, user: any, consultation: any, setStatus: any }) {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Konsultasi Berhasil Ditolak</h1>
	</div>
	</>);
}

function CanceledPage({ myUser, user, consultation, setStatus }: { myUser: any, user: any, consultation: any, setStatus: any }) {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Konsultasi Berhasil Dibatalkan</h1>
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
	  <h1>Ada yang salah, silahkan ulangi lagi</h1>
	</div>
	</>);
}

export default function HomePage() {
  const [ status, setStatus ] = React.useState<'LOADING' | 'NOTFOUND' | 'SUCCESS' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'FAILED'>('LOADING');
  const [ myUser, setMyUser ] = React.useState<any>({});
  const [ user, setUser ] = React.useState<any>({});
  const [ consultation, setConsultation ] = React.useState<any>({});

  const router = useRouter();

  React.useEffect(() => {
	const refreshUser = async () => {
		if (!router.isReady) return;

		const resAuth = await AuthAPI({ token: AuthService.getToken() });
		setMyUser(resAuth.data);

		const consultation_id = router.query.consultation_id
		const res = await GetConsultationAPI({ id: consultation_id });
		const success = res.success;

		if (success) {
			const _consultation = res.data;
			setConsultation(_consultation);

			const userId = _consultation.doctor_id;
			const resUser = await GetPublicUserAPI({ id: userId });
			const success = resUser.success;

			if (success) {
				const user = resUser.data;

				if (user.role == 'doctor') {
					setUser(user);
					setStatus('SUCCESS');
				} else {
					setStatus('NOTFOUND');
				}
			} else {
				setStatus('NOTFOUND');
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
				<h1 className="text-xl font-semibold mb-2">Informasi Konsultasi</h1>
				<div className="px-4 grid grid-cols-1 gap-3">
					{status === 'LOADING' && <LoadingPage />
					|| status === 'NOTFOUND' && <NotFoundPage />
					|| status === 'SUCCESS' && <SuccessPage myUser={myUser} user={user} consultation={consultation} setStatus={setStatus} />
					|| status === 'ACCEPTED' && <AcceptedPage myUser={myUser} user={user} consultation={consultation} />
					|| status === 'REJECTED' && <RejectedPage myUser={myUser} user={user} consultation={consultation} />
					|| status === 'CANCELED' && <CanceledPage myUser={myUser} user={user} consultation={consultation} />
					|| status === 'FAILED' && <FailedPage />
					}
				</div>
			  </div>
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}