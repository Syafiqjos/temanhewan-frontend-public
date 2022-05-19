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

interface Pet {
	id: string,
	name: string,
	type: 'cat' | 'dog' | 'hamster' | 'rabbit' | 'special',
	sex: 'm' | 'f'
};

export default function HomePage() {
  const [ myPets, setMyPets ] = React.useState<Pet[]>([]);
  const [ petFlags, setPetFlags ] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    // get my pets from server
    const retrievePets: Pet[] = [
       { id: 'oki', name: 'Oki', type: 'cat', sex: 'm', imageUrl: '/images/cover/homepage-cover-1.png' },
       { id: 'neko', name: 'Neko', type: 'cat', sex: 'f', imageUrl: '/images/cover/homepage-cover-2.png' },
       { id: 'hampter', name: 'Hampter', type: 'hamster', sex: 'm', imageUrl: '/images/cover/login-cover.png' },
       { id: 'norid', name: 'Norid Jiraya', type: 'dog', sex: 'm', imageUrl: '/images/cover/register-cover.png' },
    ];
    const sortedPets = retrievePets.sort((a, b) => a.type < b.type);
    const flags = new Set();

	for (let i = 0; i < sortedPets.length; i++) {
      flags.add(sortedPets[i].type);
    }

    setMyPets(sortedPets);
    setPetFlags(flags);
  }, []);

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
						<li className="p-2 rounded-lg bg-orange-600 text-white">Semua</li>
						{petFlags.has('cat') && <li className="p-2 rounded-lg">Kucing</li> }
						{petFlags.has('dog') && <li className="p-2 rounded-lg">Anjing</li> }
						{petFlags.has('hamster') && <li className="p-2 rounded-lg">Hamster</li> }
						{petFlags.has('rabbit') && <li className="p-2 rounded-lg">Kelinci</li> }
						{petFlags.has('special') && <li className="p-2 rounded-lg">Spesial</li> }
					</ul>
				</div>
				<div className="p-4 grid grid-cols-3 col-span-3">
				  {myPets.map((pet) => {
						return (
							<Link key={pet.id} href={`/my-pet/i/${pet.id}`}>
								<a>
									<div className="p-2">
										<img className="rounded-xl object-cover w-full h-48" src={pet.imageUrl} />
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
		  </div>
        </section>
      </main>
    </Layout>
  );
}