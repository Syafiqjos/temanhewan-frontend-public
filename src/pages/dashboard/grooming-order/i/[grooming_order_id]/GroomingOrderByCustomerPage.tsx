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
import GroomingServiceComponent from '@/components/business/groomings/GroomingServiceComponent';
import GroomingOrderComponent from '@/components/business/groomings/GroomingOrderComponent';
import GroomingOrderStatusComponent from '@/components/business/groomings/GroomingOrderStatusComponent';
import GroomingOrderStatusFormComponent from '@/components/business/groomings/GroomingOrderStatusFormComponent';

import GroomingServiceFormComponent from '@/components/business/groomings/GroomingServiceFormComponent';
import GroomingOrderFormComponent from '@/components/business/groomings/GroomingOrderFormComponent';
import CustomerFormComponent from '@/components/business/groomings/CustomerFormComponent';
import GroomingFormComponent from '@/components/business/groomings/GroomingFormComponent';
import PetFormComponent from '@/components/business/groomings/PetFormComponent';
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
	  <h1>Pesanan Grooming tidak ditemukan</h1>
	</div>
	</>);
}

function LoadingPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		refreshOrder,
		setStatus
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
		pet,
		refreshOrder,
		setStatus
	} = React.useContext(PageContext);

	const router = useRouter();

	const [ isInputingReview, setIsInputingReview ] = React.useState(false);
	const inputReviewRef = React.useRef(null);
	const ratingReviewRef = React.useRef([]);
	const privateReviewRef = React.useRef(null);

	function handleBack(e: any) {
		e.preventDefault();

		if (router.isReady) {
			router.push(`/dashboard/grooming-order`);
		}
	}

	async function handleCancelGroomingOrder(e: any) {
		e.preventDefault();

		const res = await CancelGroomingOrderAPI({ id: order.id });
		const success = res.success;

		if (success) {
			setStatus('CANCELED');

			setTimeout(() => {
				refreshOrder();
			}, 1000);
		} else {
			setStatus('FAILED');
		}
	}

	async function handlePayGroomingOrder(e: any) {
		e.preventDefault();

		const res = await PaidGroomingOrderAPI({ id: order.id });
		const success = res.success;

		if (success) {
			setStatus('PAID');

			setTimeout(() => {
				refreshOrder();
			}, 2000);
		} else {
			setStatus('FAILED');
		}
	}

	async function handleCompleteGroomingOrder(e: any) {
		e.preventDefault();

		const res = await CompleteGroomingOrderAPI({ id: order.id });
		const success = res.success;

		if (success) {
			setStatus('COMPLETED');

			setTimeout(() => {
				refreshOrder();
			}, 3000);
		} else {
			setStatus('FAILED');
		}
	}

	function handleCloseInputReviewGroomingOrder(e: any) {
		e.preventDefault();

		setIsInputingReview(false);
	}

	function handleInputReviewGroomingOrder(e: any) {
		e.preventDefault();

		setIsInputingReview(true);
	}

	async function handleReviewGroomingOrder(e: any) {
		e.preventDefault();

		if (ratingReviewRef && ratingReviewRef.current && inputReviewRef && inputReviewRef.current && privateReviewRef && privateReviewRef.current) {
			const rating = (ratingReviewRef.current.find(el => (el as any).checked) as any).value;

			const res = await CreateGroomingOrderReviewAPI({
				id: order.id,
				rating: rating,
				review: (inputReviewRef.current as any).value,
				is_public: !(privateReviewRef.current as any).checked
			});
			const success = res.success;

			if (success) {
				setStatus('REVIEWED');

				setTimeout(() => {
					refreshOrder();
				}, 3000);
			} else {
				setStatus('FAILED');
			}
		}
	}

	return (<>
	<div className="flex flex-col gap-1 p-4">
		<GroomingServiceFormComponent service={service} />
		<GroomingOrderFormComponent order={order} />
		<GroomingFormComponent user={groomer} />
		<CustomerFormComponent user={customer} />
		<PetFormComponent pet={pet} />
		{order.is_reviewed && <ReviewFormComponent review={review} />}
		<GroomingOrderStatusFormComponent order={order} />
		
		{(()=>{
			if (order.is_reviewed) {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			}
			else if (order.status == 'pending') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleCancelGroomingOrder}>Batalkan Pesanan</button>
					</div>
				);
			} else if (order.status == 'cancelled') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			} else if (order.status == 'accepted') {
				return (
					<div className="grid grid-cols-3 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleCancelGroomingOrder}>Batalkan Pesanan</button>
						<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handlePayGroomingOrder}>Bayar Biaya Pesanan</button>
					</div>
				);
			} else if (order.status == 'paid') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleCompleteGroomingOrder}>Selesaikan Pesanan</button>
					</div>
				);
			} else if (order.status == 'completed') {
				return (
					<>
						{(!isInputingReview && <div className="grid grid-cols-2 gap-3">
							<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
							<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleInputReviewGroomingOrder}>Tambahkan Review Jasa Grooming</button>
						</div>)}
						{(isInputingReview && <div className="grid grid-cols-3 gap-3">
							<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2 row-span-3" onClick={handleCloseInputReviewGroomingOrder}>Batal</button>
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
							<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2 col-span-1" onClick={handleReviewGroomingOrder}>Tambahkan Review Jasa Grooming</button>
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
		pet,
		refreshOrder,
		setStatus
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pesanan Grooming Berhasil Diterima</h1>
	</div>
	</>);
}

function RejectedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		refreshOrder,
		setStatus
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pesanan Grooming Berhasil Ditolak</h1>
	</div>
	</>);
}

function CanceledPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		refreshOrder,
		setStatus
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pesanan Grooming Berhasil Dibatalkan</h1>
	</div>
	</>);
}

function PaidPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		refreshOrder,
		setStatus
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pembayaran Pesanan Grooming Berhasil</h1>
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
		pet,
		refreshOrder,
		setStatus
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pesanan Grooming telah diselesaikan</h1>
	  <h2 className="text-xl">Selamat pesanan bersama jasa grooming hewan peliharaan anda telah selesai. Jangan lupa untuk berikan review dan testimoni terhadap jasa grooming yang telah membantu anda ya.</h2>
	</div>
	</>);
}

function ReviewedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		refreshOrder,
		setStatus
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Review berhasil diteruskan</h1>
	  <h2 className="text-xl">Terima kasih telah menambahkan review grooming bersama jasa grooming hewan peliharaan anda. Sehat selalu ya.</h2>
	</div>
	</>);
}

function FailedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		refreshOrder,
		setStatus
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
				<h1 className="text-xl font-semibold mb-2">Informasi Pesanan Grooming</h1>
				<div className="px-4 grid grid-cols-1 gap-3">
					<PageContext.Provider value={ {service, order, customer, groomer, pet, refreshOrder, setStatus} }>
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