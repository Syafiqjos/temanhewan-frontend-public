import { useRouter } from 'next/router'
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import InputText from '@/components/forms/InputText';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

import DeletePetAPI from '@/api/DeletePetAPI';
import RetrievePetAPI from '@/api/RetrievePetAPI';
import PetType from '@/enums/PetType';
import Pet from '@/interfaces/Pet';

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
	const router = useRouter();

	function getPetType(petRace: string | PetType) {
		switch (petRace) {
			case PetType.Cat:
			case 'cat':
				return 'Kucing';
			case PetType.Dog:
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
	}

	function getGender(gender: 'm' | 'f') {
		switch (gender) {
			case 'm':
				return 'Jantan';
			case 'f':
				return 'Betina';
		}
	}

	async function handleDeletePet(){
		console.log("delete");
		console.log(myPet.id);
		const res = await DeletePetAPI({ id: myPet.id! });
		console.log(res);
		const success = res.success;

		if (success) {
			router.push('/dashboard/my-pet');
			console.log("success delete");
		} else {
			console.log("failed delete");
		}
	}

	async function handleUpdatePet(){
		console.log("update");
		console.log(myPet.id);
		router.push(`/dashboard/my-pet/i/${myPet.id}/update`);
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
	  <div className="grid grid-cols-2 gap-3">
		<button className="bg-white text-orange-600 rounded-xl border-orange-600 p-2 inline border-2" onClick={handleDeletePet}>Hapus Peliharaan</button>
		<button className="bg-orange-600 text-white rounded-xl border-orange-600 p-2 inline border-2" onClick={handleUpdatePet}>Update Peliharaan</button>
	  </div>
	</div>
	</>);
}

export default function HomePage() {
  const router = useRouter();
  const [ status, setStatus ] = React.useState<'LOADING' | 'NOTFOUND' | 'SUCCESS'>('LOADING');
  const [ myPet, setMyPet ] = React.useState<Pet>({ id: '', name: '', race: PetType.Cat, gender: 'm', description: '' });

  React.useEffect(() => {
	(async () => {
		// check router ready
		if (!router.isReady) return;

		const id: string = router.query.id as string;

		// get my pets from server
		const res = await RetrievePetAPI({ id });
		const success = res.success;
		const pet: Pet = res.data;

		pet.imageUrl = res.data.profile_image;

		if (pet && pet.id != '') {
			setMyPet(pet);
			setStatus('SUCCESS');
		} else {
			setStatus('NOTFOUND');
		}
	})();
  }, [ router.isReady ]);

  return (
    <>
      <Seo title = "Detail Pet"/>

			<Sidebar>
				<main>
					<ShouldAuthorized roleSpecific='customer'>
						<section className='bg-white'>
							<div className='layout grid grid-cols-1 mt-8 w-100'>
								<h1 className="text-xl font-semibold mb-2">Hewan Peliharaan saya</h1>
								<div className="px-4 grid grid-cols-2 gap-3">
									{status === 'LOADING' && <LoadingPage />
									|| status === 'NOTFOUND' && <NotFoundPage />
									|| status === 'SUCCESS' && <SuccessPage myPet={myPet} />
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