import * as React from 'react';
import { useRouter } from 'next/router'

import RetrievePetAPI from '@/api/RetrievePetAPI';

import Pet from '@/interfaces/Pet';
import PetType from '@/enums/PetType';

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

function NotFoundPage() {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1">
	  <h1>Peliharaan tidak ditemukan</h1>
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
	<div className="p-4 grid grid-cols-1">
	  <h1>Memuat..</h1>
	</div>
	</>);
}

function SuccessPage({ myPet }: { myPet: Pet }) {
	function getPetType(petRace: PetRace) {
		switch (petRace) {
			case 'cat':
				return 'Kucing';
			case 'dog':
				return 'Anjing';
		}
		return 'Awokawok';
	}

	function getPetRace(petType: PetType) {
		switch (petType) {
			case PetType.Cat:
				return 'cat';
			case PetType.Dog:
				return 'dog';
		}
		return 'Awokawok';
	}

	function getGender(gender: 'm' | 'f') {
		switch (gender) {
			case 'm':
				return 'Jantan';
			case 'f':
				return 'Betina';
		}
		return 'Awokawok';
	}

	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src={myPet.imageUrl} />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1">
	  <h1>{myPet.name}</h1>
	  <p className="my-4">{myPet.description}</p>
	  <InputText label="Jenis Peliharaan" type="text" name="petType" disabled value={getPetType(myPet.race)} />
	  <InputText label="Jenis Kelamin" type="text" name="gender" disabled value={getGender(myPet.gender)} />
	</div>
	</>);
}

export default function HomePage() {
  const router = useRouter();
  const [ status, setStatus ] = React.useState<'LOADING' | 'NOTFOUND' | 'SUCCESS'>('LOADING');
  const [ myPet, setMyPet ] = React.useState<Pet>({ id: '', name: '', type: PetType.Cat, gender: 'm' });

  React.useEffect(async () => {
	// check router ready
	if (!router.isReady) return;

	const { id } = router.query;

    // get my pets from server
	const res = await RetrievePetAPI({ id });
	const success = res.success;
	const pet: Pet = res.data;

	if (pet && pet.id != '') {
		setMyPet(pet);
		setStatus('SUCCESS');
	} else {
		setStatus('NOTFOUND');
	}
  }, [ router.isReady ]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout grid grid-cols-1 mt-8 w-100'>
			<h1 className="text-xl font-semibold mb-2">Peliharaan saya</h1>
            <div className="px-4 grid grid-cols-2 gap-3">
				{status === 'LOADING' && <LoadingPage />
				|| status === 'NOTFOUND' && <NotFoundPage />
				|| status === 'SUCCESS' && <SuccessPage myPet={myPet} />
				}
            </div>
		  </div>
        </section>
      </main>
    </Layout>
  );
}