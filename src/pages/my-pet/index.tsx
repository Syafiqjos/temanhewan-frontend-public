import * as React from 'react';

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

function PetLabelComponent({ handlePetFilter, filter, petType, children } : { handlePetFilter: any, filter: PetType | null, petType: PetType | null, children: any }) {
	const petFilterClassNames = 'p-2 rounded-lg cursor-pointer';
	const petFilterActiveClassNames = 'bg-orange-600 text-white';

	return (<li onClick={() => handlePetFilter(petType)} className={`${petFilterClassNames} ${filter === petType ? petFilterActiveClassNames : ''}`}>{children}</li>);
}

export default function HomePage() {
  const [ myPets, setMyPets ] = React.useState<Pet[]>([]);
  const [ myFilteredPets, setMyFilteredPets ] = React.useState<Pet[]>([]);
  const [ filter, setFilter ] = React.useState<PetType | null>(null);
  const [ petFlags, setPetFlags ] = React.useState<Set<number>>(new Set<number>());

  React.useEffect(() => {
    // get my pets from server
    const retrievePets: Pet[] = [
       { id: 'oki', name: 'Oki', type: PetType.Cat, sex: 'm', imageUrl: '/images/cover/homepage-cover-1.png' },
       { id: 'neko', name: 'Neko', type: PetType.Cat, sex: 'f', imageUrl: '/images/cover/homepage-cover-2.png' },
       { id: 'hampter', name: 'Hampter', type: PetType.Hamster, sex: 'm', imageUrl: '/images/cover/login-cover.png' },
       { id: 'norid', name: 'Norid Jiraya', type: PetType.Dog, sex: 'm', imageUrl: '/images/cover/register-cover.png' },
    ];
    const sortedPets = retrievePets.sort((a, b) => (a.type - b.type));
    const flags = new Set<number>();

	for (let i = 0; i < sortedPets.length; i++) {
      flags.add(sortedPets[i].type);
    }

    setMyPets(sortedPets);
	setMyFilteredPets(sortedPets);
    setPetFlags(flags);
  }, []);

  function handlePetFilter(filter: PetType | null) {
	if (filter === null) {
		setMyFilteredPets(myPets);
		setFilter(null);
	} else {
        const filteredPets = myPets.filter((pet) => pet.type === filter);
		const sortedPets = filteredPets.sort((a, b) => (a.type - b.type));
		setMyFilteredPets(sortedPets);
		setFilter(filter);
	}
  }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout grid grid-cols-1 mt-8 w-100'>
			<h1 className="text-xl font-semibold mb-2">Peliharaan saya</h1>
            <div className="px-4 grid grid-cols-4 gap-3">
				<div className="flex flex-col gap-1">
					<ul className="p-4">
						<PetLabelComponent handlePetFilter={handlePetFilter} filter={filter} petType={null}>Semua</PetLabelComponent>
						<PetLabelComponent handlePetFilter={handlePetFilter} filter={filter} petType={PetType.Cat}>Kucing</PetLabelComponent>
						<PetLabelComponent handlePetFilter={handlePetFilter} filter={filter} petType={PetType.Dog}>Anjing</PetLabelComponent>
						<PetLabelComponent handlePetFilter={handlePetFilter} filter={filter} petType={PetType.Hamster}>Hamster</PetLabelComponent>
						<PetLabelComponent handlePetFilter={handlePetFilter} filter={filter} petType={PetType.Rabbit}>Kelinci</PetLabelComponent>
						<PetLabelComponent handlePetFilter={handlePetFilter} filter={filter} petType={PetType.Special}>Spesial</PetLabelComponent>
					</ul>
				</div>
				<div className="p-4 grid grid-cols-3 col-span-3">
				  {myFilteredPets.map((pet) => {
						return (
							<Link key={pet.id} href={`/my-pet/i/${pet.id}`}>
								<a>
									<div className="p-2">
										<img className="rounded-xl object-cover w-full h-48" src={pet.imageUrl ? pet.imageUrl : ''} />
										<div className="flex flex-row justify-between">
											<span>{pet.name}</span>
											<span>{pet.sex == 'm' ? 'M' : 'F'}</span>
										</div>
									</div>
								</a>
							</Link>);
                     })}
				</div>
            </div>
			<Link href="/my-pet/new"><a className="fixed right-4 bottom-4 bg-orange-600 text-white rounded-xl w-16 h-16 flex flex-col items-center justify-center font-semibold text-xl">+</a></Link>
		  </div>
        </section>
      </main>
    </Layout>
  );
}