import * as React from 'react';
import { useRouter } from 'next/router'

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

enum PetType {
	Cat,
	Dog,
	Hamster,
	Rabbit,
	Special
};

interface Pet {
	id: string,
	name: string,
	type: PetType,
	sex: 'm' | 'f',
	imageUrl?: string
};

function getPetType(petType: PetType) {
	switch (petType) {
		case PetType.Cat:
			return 'Kucing';
		case PetType.Dog:
			return 'Anjing';
		case PetType.Hamster:
			return 'Hamster';
		case PetType.Rabbit:
			return 'Kelinci';
		case PetType.Special:
			return 'Spesial';
	}
	return 'Awokawok';
}

function getSex(sex: string) {
	switch (sex) {
		case 'm':
			return 'Jantan';
		case 'f':
			return 'Betina';
	}
	return 'Awokawok';
}

function InitialPage({ router, setMyPet, setErrorMessage, setStatus }: { router: any, setMyPet: any, setErrorMessage: any, setStatus: any }) {

	const [name, setName] = React.useState('');
	const [sex, setSex] = React.useState('m');
	const [petType, setPetType] = React.useState(0);

	function handleSubmit(e: any) {
		e.preventDefault();
		const petId = name.toLowerCase();
		
		// Submit pet and get pet id from server
		const success = true;
		if (success) {
			setMyPet({
				id: petId,
				name: name,
				petType: petType,
				sex: sex
			});
			setStatus('SUCCESS');
		} else {
			setErrorMessage('Something went wrong!');
			setStatus('ERROR');
		}
		setTimeout(() => {router.push('/my-pet/i/' + petId)} , 1000);
	}

	function handleSetName(e: any) {
		setName(e.target.value);
	}

	function handleSetPetType(e: any) {
		setPetType(e.target.value);
	}

	function handleSetSex(e: any) {
		setSex(e.target.value);
	}

	return (<>
		<form className="flex flex-col gap-1">
			<ul className="p-4">
				<img className="rounded-xl object-cover w-full h-48" src={myPet.imageUrl} />
			</ul>
		</form>
		<form className="p-4 grid grid-cols-1 gap-2" onSubmit={handleSubmit}>
		  { myPet.name === '' && (<InputText label="Nama" name="name" type="text" value={myPet.name} onChange={handleSetName} />)
		  || (<h1>{myPet.name}</h1>)}

		  <div className="flex flex-col items-start w-full">
			  <label htmlFor="petType">Jenis Peliharaan</label>
			  <select className="w-full" id="petType" onChange={handleSetPetType}>
				{Object.keys(PetType).filter((v) => isNaN(Number(v))).map((v, i) => 
					(<option key={`petType-${v}`} value={v}>{getPetType(i)}</option>)
				)}
			  </select>
		  </div>

		  <div className="flex flex-col items-start w-full">
			  <label htmlFor="sex">Jenis Kelamin</label>
			  <select className="w-full" id="sex" onChange={handleSetSex}>
				{['m', 'f'].map((v, i) => 
					(<option key={`sex-${v}`} value={v}>{getSex(v)}</option>)
				)}
			  </select>
		  </div>

		  <input className="bg-orange-600 text-white font-semibold rounded-xl p-3" type="submit" value="Tambah +" />
		</form>
	</>);
}

function ErrorPage({ errorMessage }: { errorMessage: string }) {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src="/images/cover/register-cover.png" />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1">
	  <h1>{errorMessage}</h1>
	</div>
	</>);
}

function SuccessPage({ myPet }: { myPet: Pet }) {
	return (<>
	<div className="flex flex-col gap-1">
		<ul className="p-4">
			<img className="rounded-xl object-cover w-full h-48" src={myPet.imageUrl} />
		</ul>
	</div>
	<div className="p-4 grid grid-cols-1">
	  <h1>Peliharaan {myPet.name} ditambah!</h1>
	</div>
	</>);
}

export default function HomePage() {
  const router = useRouter();
  const [ status, setStatus ] = React.useState<'INITIAL' | 'ERROR' | 'SUCCESS'>('INITIAL');
  const [ myPet, setMyPet ] = React.useState<Pet | null>({ id: '', name: '', type: PetType.Cat, sex: 'm' });
  const [ errorMessage, setErrorMessage ] = React.useState<string>('');

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout grid grid-cols-1 mt-8 w-100'>
			<h1 className="text-xl font-semibold mb-2">Tambah peliharaan saya</h1>
            <div className="px-4 grid grid-cols-2 gap-3">
				{errorMessage !== '' && <ErrorPage errorMessage={errorMessage} />
				|| status === 'INITIAL' && <InitialPage router={router} myPet={myPet} setMyPet={setMyPet} setErrorMessage={setErrorMessage} setStatus={setStatus} />
				|| status === 'SUCCESS' && <SuccessPage myPet={myPet} />
				}
            </div>
		  </div>
        </section>
      </main>
    </Layout>
  );
}