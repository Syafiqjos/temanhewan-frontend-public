import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';

import GetGroomingOrderAPI from '@/api/GetGroomingOrderAPI';
import GetGroomingServiceAPI from '@/api/GetGroomingServiceAPI';
import RetrievePetAPI from '@/api/RetrievePetAPI';

import CancelGroomingOrderAPI from '@/api/CancelGroomingOrderAPI';
import PaidGroomingOrderAPI from '@/api/PaidGroomingOrderAPI';
import CompleteGroomingOrderAPI from '@/api/CompleteGroomingOrderAPI';
import CreateGroomingOrderReviewAPI from '@/api/CreateGroomingOrderReviewAPI';
import GetPublicUserAPI from '@/api/GetPublicUserAPI';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import InputText from '@/components/forms/InputText';
import DoctorFormComponent from '@/components/business/consultations/DoctorFormComponent';
import CustomerFormComponent from '@/components/business/consultations/CustomerFormComponent';
import ConsultationFormComponent from '@/components/business/consultations/ConsultationFormComponent';
import ConsultationStatusFormComponent from '@/components/business/consultations/ConsultationStatusFormComponent';
import ReviewFormComponent from '@/components/business/consultations/ReviewFormComponent';

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

const PageContext = React.createContext({ service: null, order: null, customer: null, groomer: null, pet: null });

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
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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

function SuccessPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			}
			else if (consultation.status == 'pending') {
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
			} else if (consultation.status == 'accepted') {
				return (
					<div className="grid grid-cols-3 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleCancelConsultation}>Batalkan Konsultasi</button>
						<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handlePayConsultation}>Bayar Biaya Konsultasi</button>
					</div>
				);
			} else if (consultation.status == 'paid') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleCompleteConsultation}>Selesaikan Konsultasi</button>
					</div>
				);
			} else if (consultation.status == 'completed') {
				return (
					<>
						{(!isInputingReview && <div className="grid grid-cols-2 gap-3">
							<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
							<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleInputReviewConsultation}>Tambahkan Review Konsultasi</button>
						</div>)}
						{(isInputingReview && <div className="grid grid-cols-3 gap-3">
							<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2 row-span-3" onClick={handleCloseInputReviewConsultation}>Batal</button>
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
							<textarea ref={inputReviewRef} className="bg-white text-orange-600 rounded-xl border-orange-600 p-4 inline border-2 col-span-2" placeholder="Review anda"></textarea>
							<form className="p-4">
								<input className="mr-2" ref={privateReviewRef} id="review_public" name="review_public" type="checkbox" />
								<label htmlFor="review_public">Review secara privasi?</label>
							</form>
							<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2 col-span-1" onClick={handleReviewConsultation}>Tambahkan Review Konsultasi</button>
						</div>)}
					</>
				);
			}
		})()}
	</div>
	</>);
}

function AcceptedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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

function RejectedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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

function CanceledPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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

function PaidPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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

function CompletedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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

function ReviewedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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
	const {
		service,
		order,
		customer,
		groomer,
		pet
	} = React.useContext(PageContext);

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
  const [ customer, setCustomer ] = React.useState<any>(null);
  const [ groomer, setGroomer ] = React.useState<any>(null);
  const [ service, setService ] = React.useState<any>(null);
  const [ order, setOrder ] = React.useState<any>(null);
  const [ pet, setPet ] = React.useState<any>(null);

  const router = useRouter();

  const refreshCustomer = async () => {
		// get user
		const token = AuthService.getToken()!;
		const res = await AuthAPI({ token });
		const success = res.success;
		const customerData = res.data;

		console.log('customer res');
		console.log(res);

		if (success) {
			if (customerData.role == 'customer') {
				setCustomer(customerData);
			}
		} else {
			setStatus('NOTFOUND');
		}
  };

  const refreshGroomer = async () => {
		// get groomer
		const res = await GetPublicUserAPI({ id: order.grooming_id });
		const success = res.success;
		const groomerData = res.data;

		console.log('groomer res');
		console.log(res);

		if (success) {
			if (groomerData.role == 'grooming') {
				setGroomer(groomerData);
			}
		} else {
			setStatus('NOTFOUND');
		}
  };

  const refreshPet = async () => {
		// get pets
		const res = await RetrievePetAPI({ id: order.pet_id });
		const success = res.success;
		const petData = res.data;

		console.log('pet res');
		console.log(res);

		if (success) {
			setPet(petData);
		} else {
			setStatus('NOTFOUND');
		}
  };

  const refreshService = async () => {
		const serviceRes = await GetGroomingServiceAPI({ id: order.grooming_service_id });
		const serviceSuccess = serviceRes.success;
		const serviceData = serviceRes.data;

		console.log('service res');
		console.log(serviceRes);

		if (serviceSuccess) {
			setService(serviceData);
		} else {
			setStatus('NOTFOUND');
		}
  };

  const refreshOrder = async () => {
		const orderId = router.query.grooming_order_id as string;
		const orderRes = await GetGroomingOrderAPI({ id: orderId });
		const orderSuccess = orderRes.success;
		const orderData = orderRes.data;

		console.log('order res');
		console.log(orderRes);

		if (orderSuccess) {
			setOrder(orderData);
		} else {
			setStatus('NOTFOUND');
		}
  };

  React.useEffect(() => {
	refreshOrder();
  }, [ router.isReady ]);

  React.useEffect(() => {
	if (order) {
		setService(null);
		setCustomer(null);
		setGroomer(null);
		setPet(null);

		refreshService();
		refreshCustomer();
		refreshGroomer();
		refreshPet();
	}
  }, [order]);

  React.useEffect(() => {
    if (service && customer && groomer && pet) {
		setStatus('SUCCESS');
	}
  }, [service, customer, groomer, pet]);

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
					<PageContext.Provider value={ {service, order, customer, groomer, pet} }>
						{status === 'LOADING' && <LoadingPage />
						|| status === 'NOTFOUND' && <NotFoundPage />
						|| status === 'SUCCESS' && <SuccessPage />
						|| status === 'ACCEPTED' && <AcceptedPage />
						|| status === 'REJECTED' && <RejectedPage />
						|| status === 'CANCELED' && <CanceledPage />
						|| status === 'PAID' && <PaidPage/>
						|| status === 'COMPLETED' && <CompletedPage />
						|| status === 'REVIEWED' && <ReviewedPage />
						|| status === 'FAILED' && <FailedPage />
						}
					</PageContext.Provider>
				</div>
			  </div>
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}