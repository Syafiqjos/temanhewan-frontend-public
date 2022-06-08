import { useRouter } from 'next/router'
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import ConsultationFormComponent from '@/components/business/consultations/ConsultationFormComponent';
import ConsultationStatusFormComponent from '@/components/business/consultations/ConsultationStatusFormComponent';
import CustomerFormComponent from '@/components/business/consultations/CustomerFormComponent';
import DoctorFormComponent from '@/components/business/consultations/DoctorFormComponent';
import ReviewFormComponent from '@/components/business/consultations/ReviewFormComponent';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

import AuthAPI from '@/api/AuthAPI';
import CancelConsultationAPI from '@/api/CancelConsultationAPI';
import CompleteConsultationAPI from '@/api/CompleteConsultationAPI';
import CreateConsultationReviewAPI from '@/api/CreateConsultationReviewAPI';
import GetConsultationAPI from '@/api/GetConsultationAPI';
import GetConsultationReviewAPI from '@/api/GetConsultationReviewAPI';
import GetPublicUserAPI from '@/api/GetPublicUserAPI';
import PaidConsultationAPI from '@/api/PaidConsultationAPI';
import AuthService from '@/services/AuthService';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

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

function SuccessPage({ myUser, user, consultation, review, setStatus, refreshUser }: { myUser: any, user: any, consultation: any, review: any, setStatus: any, refreshUser: any }) {
	const router = useRouter();

	const [ isInputingReview, setIsInputingReview ] = React.useState(false);
	const inputReviewRef = React.useRef(null);
	const ratingReviewRef = React.useRef([]);
	const privateReviewRef = React.useRef(null);

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

			setTimeout(() => {
				refreshUser();
			}, 1000);
		} else {
			setStatus('FAILED');
		}
	}

	async function handlePayConsultation(e: any) {
		e.preventDefault();

		const res = await PaidConsultationAPI({ id: consultation.id });
		const success = res.success;

		if (success) {
			setStatus('PAID');

			setTimeout(() => {
				refreshUser();
			}, 2000);
		} else {
			setStatus('FAILED');
		}
	}

	async function handleCompleteConsultation(e: any) {
		e.preventDefault();

		const res = await CompleteConsultationAPI({ id: consultation.id });
		const success = res.success;

		if (success) {
			setStatus('COMPLETED');

			setTimeout(() => {
				refreshUser();
			}, 3000);
		} else {
			setStatus('FAILED');
		}
	}

	function handleCloseInputReviewConsultation(e: any) {
		e.preventDefault();

		setIsInputingReview(false);
	}

	function handleInputReviewConsultation(e: any) {
		e.preventDefault();

		setIsInputingReview(true);
	}

	async function handleReviewConsultation(e: any) {
		e.preventDefault();

		if (ratingReviewRef && ratingReviewRef.current && inputReviewRef && inputReviewRef.current && privateReviewRef && privateReviewRef.current) {
			const rating = (ratingReviewRef.current.find(el => (el as any).checked) as any).value;

			const res = await CreateConsultationReviewAPI({
				id: consultation.id,
				rating: rating,
				review: (inputReviewRef.current as any).value,
				is_public: !(privateReviewRef.current as any).checked
			});
			const success = res.success;

			if (success) {
				setStatus('REVIEWED');

				setTimeout(() => {
					refreshUser();
				}, 3000);
			} else {
				setStatus('FAILED');
			}
		}
	}

	return (<>
	<div className="flex flex-col gap-1 p-4">
		<ConsultationFormComponent consultation={consultation} />
		<DoctorFormComponent user={user} />
		<CustomerFormComponent user={myUser} />
		{consultation.is_reviewed && <ReviewFormComponent review={review} />}
		<ConsultationStatusFormComponent consultation={consultation} />
		
		{(()=>{
			if (consultation.is_reviewed) {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			}
			else if (consultation.status == 'pending') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-primary-500 text-white rounded-xl border-primary-500 p-2 inline border-2" onClick={handleCancelConsultation}>Batalkan Konsultasi</button>
					</div>
				);
			} else if (consultation.status == 'cancelled') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			} else if (consultation.status == 'accepted') {
				return (
					<div className="grid grid-cols-3 gap-3">
						<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleCancelConsultation}>Batalkan Konsultasi</button>
						<button className="bg-primary-500 text-white rounded-xl border-primary-500 p-2 inline border-2" onClick={handlePayConsultation}>Bayar Biaya Konsultasi</button>
					</div>
				);
			} else if (consultation.status == 'paid') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-primary-500 text-white rounded-xl border-primary-500 p-2 inline border-2" onClick={handleCompleteConsultation}>Selesaikan Konsultasi</button>
					</div>
				);
			} else if (consultation.status == 'completed') {
				return (
					<>
						{(!isInputingReview && <div className="grid grid-cols-2 gap-3">
							<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2" onClick={handleBack}>Kembali</button>
							<button className="bg-primary-500 text-white rounded-xl border-primary-500 p-2 inline border-2" onClick={handleInputReviewConsultation}>Tambahkan Review Konsultasi</button>
						</div>)}
						{(isInputingReview && <div className="grid grid-cols-3 gap-3">
							<button className="bg-white text-primary-500 rounded-xl border-primary-500 p-2 inline border-2 row-span-3" onClick={handleCloseInputReviewConsultation}>Batal</button>
							<form className="w-full col-span-2">
								<span className="font-semibold">Rating</span>
								<ul className="grid grid-cols-5">
									<li><input ref={el => ratingReviewRef.current[0] = (el as never)} className="p-1" type="radio" name="review_rating" value="1" /> 1 Star</li>
									<li><input ref={el => ratingReviewRef.current[1] = (el as never)} className="p-1" type="radio" name="review_rating" value="2" /> 2 Stars</li>
									<li><input ref={el => ratingReviewRef.current[2] = (el as never)} className="p-1" type="radio" name="review_rating" value="3" /> 3 Stars</li>
									<li><input ref={el => ratingReviewRef.current[3] = (el as never)} className="p-1" type="radio" name="review_rating" value="4" /> 4 Stars</li>
									<li><input ref={el => ratingReviewRef.current[4] = (el as never)} className="p-1" type="radio" name="review_rating" value="5" /> 5 Stars</li>
								</ul>
							</form>
							<textarea ref={inputReviewRef} className="bg-white text-primary-500 rounded-xl border-primary-500 p-4 inline border-2 col-span-2" placeholder="Review anda"></textarea>
							<form className="p-4">
								<input className="mr-2" ref={privateReviewRef} id="review_public" name="review_public" type="checkbox" />
								<label htmlFor="review_public">Review secara privasi?</label>
							</form>
							<button className="bg-primary-500 text-white rounded-xl border-primary-500 p-2 inline border-2 col-span-1" onClick={handleReviewConsultation}>Tambahkan Review Konsultasi</button>
						</div>)}
					</>
				);
			}
		})()}
	</div>
	</>);
}

function AcceptedPage({ myUser, user, consultation }: { myUser: any, user: any, consultation: any }) {
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

function RejectedPage({ myUser, user, consultation }: { myUser: any, user: any, consultation: any }) {
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

function CanceledPage({ myUser, user, consultation }: { myUser: any, user: any, consultation: any }) {
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

function PaidPage({ myUser, user, consultation }: { myUser: any, user: any, consultation: any }) {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pembayaran konsultasi berhasil</h1>
	  <h2 className="text-xl">Silahkan bersiap ditempat dan waktu yang telah dijanjikan. Nantikan dokter hewan pilihan anda untuk memeriksa!</h2>
	</div>
	</>);
}

function CompletedPage({ myUser, user, consultation }: { myUser: any, user: any, consultation: any }) {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Konsultasi telah diselesaikan</h1>
	  <h2 className="text-xl">Selamat konsultasi bersama dokter hewan peliharaan anda telah selesai. Jangan lupa untuk berikan review dan testimoni terhadap dokter hewan peliharaan yang telah membantu anda ya.</h2>
	</div>
	</>);
}

function ReviewedPage({ myUser, user, consultation }: { myUser: any, user: any, consultation: any }) {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Review berhasil diteruskan</h1>
	  <h2 className="text-xl">Terima kasih telah menambahkan review konsultasi bersama dokter hewan peliharaan anda. Sehat selalu ya.</h2>
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
  const [ status, setStatus ] = React.useState<'LOADING' | 'NOTFOUND' | 'SUCCESS' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'PAID' | 'COMPLETED' | 'REVIEWED' | 'FAILED'>('LOADING');
  const [ myUser, setMyUser ] = React.useState<any>({});
  const [ user, setUser ] = React.useState<any>({});
  const [ consultation, setConsultation ] = React.useState<any>({});
  const [ review, setReview ] = React.useState<any>({});

  const router = useRouter();

  const refreshUser = async () => {
		if (!router.isReady) return;

		const resAuth = await AuthAPI({ token: AuthService.getToken()! });
		setMyUser(resAuth.data);

		const consultation_id = router.query.consultation_id as string;
		const res = await GetConsultationAPI({ id: consultation_id });
		const success = res.success;

		if (success) {
			const _consultation = res.data;
			setConsultation(_consultation);

			if (_consultation.is_reviewed) {
				const resReview = await GetConsultationReviewAPI({ id: _consultation.id });
				if (resReview.success) {
					setReview(resReview.data);
				}
			}

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

  React.useEffect(() => {
	refreshUser();
  }, [ router.isReady ]);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo title = "Detail Consultation"/>
			
			<Sidebar>
				<main>
					<ShouldAuthorized roleSpecific="customer">
						<section className='bg-white'>
							<div className='layout grid grid-cols-1 mt-8 w-100'>
							<h1 className="text-xl font-semibold mb-2">Informasi Konsultasi</h1>
								<div className="px-4 grid grid-cols-1 gap-3">
									{status === 'LOADING' && <LoadingPage />
									|| status === 'NOTFOUND' && <NotFoundPage />
									|| status === 'SUCCESS' && <SuccessPage myUser={myUser} user={user} consultation={consultation} review={review} setStatus={setStatus} refreshUser={refreshUser} />
									|| status === 'ACCEPTED' && <AcceptedPage myUser={myUser} user={user} consultation={consultation} />
									|| status === 'REJECTED' && <RejectedPage myUser={myUser} user={user} consultation={consultation} />
									|| status === 'CANCELED' && <CanceledPage myUser={myUser} user={user} consultation={consultation} />
									|| status === 'PAID' && <PaidPage myUser={myUser} user={user} consultation={consultation} />
									|| status === 'COMPLETED' && <CompletedPage myUser={myUser} user={user} consultation={consultation} />
									|| status === 'REVIEWED' && <ReviewedPage myUser={myUser} user={user} consultation={consultation} />
									|| status === 'FAILED' && <FailedPage />
									}
								</div>
							</div>
						</section>
					</ShouldAuthorized>
				</main>
			</Sidebar>
    </>
  );
}