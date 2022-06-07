import * as React from 'react';
import Router, { useRouter } from 'next/router'

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import AuthService from '@/services/AuthService';
import AuthAPI from '@/api/AuthAPI';
import ListPetAPI from '@/api/ListPetAPI';
import GetPublicUserAPI from '@/api/GetPublicUserAPI';
import GetGroomingServiceAPI from '@/api/GetGroomingServiceAPI';
import CreateGroomingOrderAPI from '@/api/CreateGroomingOrderAPI';

import GroomingServiceComponent from '@/components/business/groomings/GroomingServiceComponent';

import InputText from '@/components/forms/InputText';
import InputButton from '@/components/forms/InputButton';

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

function PetsBlockList({ pets, selectedPet, setSelectedPet }: { pets: any, selectedPet: any, setSelectedPet: any }) {
  function handleSelectPet(petId: any) {
		if (selectedPet == petId) {
			setSelectedPet(null);
		} else {
			setSelectedPet(petId);
		}
	}

  return (
    <>
        <section className='bg-white'>
          <div className='layout grid grid-cols-1 mt-8 w-100'>
			<h1 className="text-xl font-semibold mb-2">Pilih Peliharaan</h1>
            <div className="px-4 grid grid-cols-4 gap-3">
				<div className="flex flex-col gap-1">
					<ul className="p-4">
						
					</ul>
				</div>
				<div className="p-4 grid grid-cols-3 col-span-3">
				  {pets && pets.map((pet) => {
						return (
								<button key={pet.id} className={selectedPet == pet.id ? 'border border-orange-600 border-2 rounded-xl'  : 'border border-white border-2'} onClick={(e: any) => { e.preventDefault(); handleSelectPet(pet.id); }} >
									<div className="p-2">
										<img className="rounded-xl object-cover w-full h-48" src={pet.profile_image ? pet.profile_image : ''} />
										<div className="flex flex-row justify-between">
											<span>{pet.name}</span>
											<span>{pet.gender == 'm' ? 'M' : 'F'}</span>
										</div>
									</div>
								</button>
							);
                     })}
				</div>
            </div>
		  </div>
        </section>
    </>
  );
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

function FailedPage({ groomer, service }: { groomer: any, service: any }) {
	React.useEffect(() => {
		setTimeout(() => {
			Router.push({
				pathname: `/grooming-order/i/${order.id}`
			});
		}, 400);
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

function OrderedPage({ order }: { order: any }) {
	React.useEffect(() => {
		setTimeout(() => {
			Router.push({
				pathname: `/grooming-order/i/${order.id}`
			});
		}, 400);
	}, []);

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  <h1>Pesanan Grooming berhasil dipasang!</h1>
	</div>
	</>);
}

function SuccessPage({ user, service, pets, groomer, setStatus, setOrder }: { user: User, service: any, pets: any, groomer: any, setStatus: any, setOrder: any }) {
	const [ selectedPet, setSelectedPet ] = React.useState<any>(null);
	const [ address, setAddress ] = React.useState<any>('');

	function handleAddress(e: any) {
		e.preventDefault();

		setAddress(e.target.value);
	}

	async function handleSubmit(e: any) {
		e.preventDefault();

		const res = await CreateGroomingOrderAPI({ address, grooming_service_id: service.id, pet_id: selectedPet });
		const success = res.success;
		const orderData = res.data;

		if (res.success) {
			setOrder(orderData);
			setStatus('ORDERED');
		} else {
			setStatus('FAILED');
		}
	}

	return (<>
	<div className="p-4 grid grid-cols-1 col-span-3">
	  {service && <GroomingServiceComponent service={service} />}
	  {pets && <PetsBlockList pets={pets} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />}
		<div className="px-4">
			<div className="p-4">
				<h1 className="text-xl font-semibold mb-2">Alamat Grooming Anda</h1>
				<InputText label="" name="address" type="text" onChange={handleAddress} placeholder="Alamat grooming anda" />
			</div>
		</div>
		<form className="w-full flex flex-row justify-end" onSubmit={handleSubmit}>
			<InputButton disabled={selectedPet == null || address == ''} text="Pasang Pesanan Grooming" />
		</form>
	</div>
	</>);
}

export default function HomePage() {
  const [ status, setStatus ] = React.useState<'LOADING' | 'FAILED' | 'NOTFOUND' | 'SUCCESS' | 'ORDERED'>('LOADING');
  const [ user, setUser ] = React.useState<any>(null);
  const [ pets, setPets ] = React.useState<any>(null);
  const [ groomer, setGroomer ] = React.useState<any>(null);
  const [ service, setService ] = React.useState<any>(null);
  const [ order, setOrder ] = React.useState<any>(null);

  const router = useRouter();

  const refreshUser = async () => {
		// get user
		const token = AuthService.getToken()!;
		const res = await AuthAPI({ token });
		const success = res.success;
		const userData = res.data;

		if (success) {
			if (userData.role == 'customer') {
				setUser(userData);
				setStatus('SUCCESS');
				return true;
			}
		} else {
			setStatus('NOTFOUND');
		}
  };

  const refreshPets = async () => {
		// get pets
		const res = await ListPetAPI({ offset: 0, limit: 100 });
		const success = res.success;
		const petsData = res.data;

		if (success) {
			setPets(petsData);
			setStatus('SUCCESS');
			return true;
		} else {
			setStatus('NOTFOUND');
		}
  };

  const refreshGroomer = async () => {
		// get groomer
		const groomerId = router.query.id as string;
		const res = await GetPublicUserAPI({ id: groomerId });
		const success = res.success;
		const groomerData = res.data;

		if (success) {
			if (groomerData.role == 'grooming') {
				setGroomer(groomerData);
				setStatus('SUCCESS');
				return true;
			}
		} else {
			setStatus('NOTFOUND');
		}
  };

  const refreshService = async () => {
		const serviceId = router.query.service_id as string;
		const serviceRes = await GetGroomingServiceAPI({ id: serviceId });
		const serviceSuccess = serviceRes.success;
		const serviceData = serviceRes.data;

		if (serviceSuccess) {
			setService(serviceData);
			setStatus('SUCCESS');
			return true;
		} else {
			setStatus('NOTFOUND');
		}
  };

  React.useEffect(() => {
	const refreshEffect = async () => {
		if (!router.isReady) return;

		await refreshUser() &&
		await refreshPets() &&
		await refreshGroomer() &&
		await refreshService();
	};

	refreshEffect();
  }, [ router.isReady ]);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
		<ShouldAuthorized roleSpecific="customer">
			<section className='bg-white'>
			  <div className='layout grid grid-cols-1 mt-8 w-100'>
				<h1 className="text-xl font-semibold mb-2">Pesan Layanan Grooming</h1>
				<div className="px-4 grid grid-cols-1 gap-3">
					{status === 'LOADING' && <LoadingPage />
					|| status === 'NOTFOUND' && <NotFoundPage />
					|| status === 'SUCCESS' && <SuccessPage setStatus={setStatus} user={user} pets={pets} groomer={groomer} service={service} setOrder={setOrder} />
					|| status === 'ORDERED' && <OrderedPage order={order} />
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