import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';

import GetGroomingOrderAPI from '@/api/GetGroomingOrderAPI';
import GetGroomingServiceAPI from '@/api/GetGroomingServiceAPI';
import RetrievePetAPI from '@/api/RetrievePetAPI';

import RejectGroomingOrderAPI from '@/api/RejectGroomingOrderAPI';
import PaidGroomingOrderAPI from '@/api/PaidGroomingOrderAPI';
import ConfirmGroomingOrderAPI from '@/api/ConfirmGroomingOrderAPI';
import DeliverGroomingOrderAPI from '@/api/DeliverGroomingOrderAPI';
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
		pet,
		setStatus,
		refreshOrder
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pesanaan Grooming tidak ditemukan</h1>
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
		setStatus,
		refreshOrder
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
		setStatus,
		refreshOrder
	} = React.useContext(PageContext);

	const router = useRouter();

	function handleBack(e: any) {
		e.preventDefault();

		if (router.isReady) {
			router.push(`/dashboard/grooming-order`);
		}
	}

	async function handleRejectGroomingOrder(e: any) {
		e.preventDefault();

		const res = await RejectGroomingOrderAPI({ id: order.id });
		console.log(res);
		const success = res.success;

		if (success) {
			setStatus('REJECTED');

			setTimeout(() => {
				refreshOrder();
			}, 1000);
		} else {
			setStatus('FAILED');
		}
	}

	async function handleDeliverGroomingOrder(e: any) {
		e.preventDefault();

		const res = await DeliverGroomingOrderAPI({ id: order.id });
		const success = res.success;

		console.log(res);

		if (success) {
			setStatus('DELIVERED');

			setTimeout(() => {
				refreshOrder();
			}, 1000);
		} else {
			setStatus('FAILED');
		}
	}

	async function handleConfirmGroomingOrder(e: any) {
		e.preventDefault();

		const res = await ConfirmGroomingOrderAPI({ id: order.id });
		const success = res.success;

		console.log(res);

		if (success) {
			setStatus('ACCEPTED');

			setTimeout(() => {
				refreshOrder();
			}, 1000);
		} else {
			setStatus('FAILED');
		}
	}

	async function handleAcceptGroomingOrder(e: any) {
		e.preventDefault();

		const res = await AcceptGroomingOrderAPI({ id: order.id });
		const success = res.success;

		if (success) {
			setStatus('ACCEPTED');

			setTimeout(() => {
				refreshOrder();
			}, 1000);
		} else {
			setStatus('FAILED');
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
		<GroomingOrderStatusFormComponent order={order} service={service} />
		
		{(()=>{
			if (order.status == 'pending') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			} else if (order.status == 'cancelled') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			} else if (order.status == 'rejected') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			} else if (order.status == 'accepted') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			} else if (order.status == 'paid') {
				return (
					<div className="grid grid-cols-3 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleRejectGroomingOrder}>Tolak Permintaan</button>
						<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleConfirmGroomingOrder}>Terima Permintaan</button>
					</div>
				);
			} else if (order.status == 'completed') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
					</div>
				);
			} else if (order.status == 'confirmed') {
				return (
					<div className="grid grid-cols-2 gap-3">
						<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleBack}>Kembali</button>
						<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleDeliverGroomingOrder}>Lakukan Grooming</button>
					</div>
				);
			} else if (order.status == 'delivered') {
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

function AcceptedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		setStatus,
		refreshOrder
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pesanan Diterima, silahkan datang untuk melakukan grooming pada hewan peliharaan pelanggan. Mohon tunggu konfirmasi pelanggan.</h1>
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
		setStatus,
		refreshOrder
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Permintaan Pesanan Grooming Berhasil Ditolak</h1>
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
		setStatus,
		refreshOrder
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

function FailedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		setStatus,
		refreshOrder
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

function ConfirmedPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		setStatus,
		refreshOrder
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pesanan Grooming diterima, silahkan mengunjungi alamat pelanggan dan segera melakukan grooming pada jadwal yang telah ditentukan.</h1>
	</div>
	</>);
}

function DeliveredPage() {
	const {
		service,
		order,
		customer,
		groomer,
		pet,
		setStatus,
		refreshOrder
	} = React.useContext(PageContext);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Grooming selesai dilakukan!</h1>
	</div>
	</>);
}

export default function HomePage() {
  const [ status, setStatus ] = React.useState<'LOADING' | 'NOTFOUND' | 'SUCCESS' | 'ACCEPTED' | 'REJECTED' | 'DELIVERED' | 'CANCELED' | 'PAID' | 'COMPLETED' | 'FAILED'>('LOADING');
  const [ customer, setCustomer ] = React.useState<any>(null);
  const [ groomer, setGroomer ] = React.useState<any>(null);
  const [ service, setService ] = React.useState<any>(null);
  const [ order, setOrder ] = React.useState<any>(null);
  const [ pet, setPet ] = React.useState<any>(null);
  const [ review, setReview ] = React.useState<any>(null);

  const router = useRouter();

  const refreshGroomer = async () => {
		// get user
		const token = AuthService.getToken()!;
		const res = await AuthAPI({ token });
		const success = res.success;
		const groomerData = res.data;

		console.log('groomer res');
		console.log(res);

		if (success) {
			if (groomerData.role == 'grooming') {
				setGroomer(groomerData);
				console.log('SUCCESSSS GROOMER');
			}
		} else {
			setStatus('NOTFOUND');
		}
  };

  const refreshCustomer = async () => {
		// get groomer
		const res = await GetPublicUserAPI({ id: order.customer_id });
		const success = res.success;
		const customerData = res.data;

		console.log('customer res');
		console.log(res);

		if (success) {
			if (customerData.role == 'customer') {
				setCustomer(customerData);
				console.log('SUCCESSSS CUSTOMER');
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
			console.log('SUCCESSSS PET');
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
			console.log('SUCCESSSS SERVICE');
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
			console.log('SUCCESSSS ORDER');
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
		<ShouldAuthorized roleSpecific="grooming">
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
						|| status === 'DELIVERED' && <DeliveredPage />
						|| status === 'CANCELED' && <CanceledPage />
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