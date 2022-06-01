import * as React from 'react';

// import ListUserAPI from '@/api/ListUserAPI';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import InputText from '@/components/forms/InputText';

import Link from 'next/link';

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

function LabelComponent({ handleFilter, filter, role, children } : { handleFilter: any, filter: string | number | null, role: string | null, children: any }) {
	const filterClassNames = 'p-2 rounded-lg cursor-pointer';
	const filterActiveClassNames = 'bg-orange-600 text-white';

	return (<li onClick={() => handleFilter(role)} className={`${filterClassNames} ${filter == role ? filterActiveClassNames : ''}`}>{children}</li>);
}

export default function HomePage() {
  const [ vets, setVets ] = React.useState<User[]>([]);
  const [ filteredVets, setFilteredVets ] = React.useState<User[]>([]);
  const [ filter, setFilter ] = React.useState<string | null>(null);

  const [ searchInput, setSearchInput ] = React.useState<string>('');

  React.useEffect(() => {
	(async () => {
		// get users from server
		// const res = await ListUserAPI({ offset:0, limit: 10 });
		const res = {
			success: true,
			data: [
				{
					id: 'jayawati-xxx',
					name: 'Jayawati',
					role: 'doctor',
					email: 'jayawati@gmail.com',
					username: 'jayawati@gmail.com',
					profile_image: 'https://api-temanhewan.mirzaq.com/image/pet_default.png'
				},
				{
					id: 'arsenal-xxx',
					name: 'Arsenal',
					role: 'doctor',
					email: 'arsenal@gmail.com',
					username: 'arsenal@gmail.com',
					profile_image: 'https://api-temanhewan.mirzaq.com/image/pet_default.png'
				},
				{
					id: 'miku-xxx',
					name: 'Miku',
					role: 'doctor',
					email: 'miku@gmail.com',
					username: 'miku@gmail.com',
					profile_image: 'https://api-temanhewan.mirzaq.com/image/pet_default.png'
				},
				{
					id: 'hartent-xxx',
					name: 'Hartent',
					role: 'doctor',
					email: 'hartent@gmail.com',
					username: 'hartent@gmail.com',
					profile_image: 'https://api-temanhewan.mirzaq.com/image/pet_default.png'
				},
				{
					id: 'micro-xxx',
					name: 'Micro',
					role: 'doctor',
					email: 'micro@gmail.com',
					username: 'micro@gmail.com',
					profile_image: 'https://api-temanhewan.mirzaq.com/image/pet_default.png'
				}
			]
		};
		const retrieveVets = res.data;
		const sortedVets = retrieveVets.sort((a: User, b: User) => a.name.localeCompare(b.name));

		setVets(sortedVets);
		setFilteredVets(sortedVets);
	})();
  }, []);

  function handleSearchInput(e: any){
	const searchBy = e.target.value;
	setSearchInput(searchBy);

	const searchedVets = vets.filter((vet: User) => {
		if (searchBy == ''
			|| searchBy == undefined
			|| searchBy == null
			|| vet.name && vet.name.includes(searchBy)
			|| vet.email && vet.email.includes(searchBy)
			|| vet.username && vet.username.includes(searchBy)
			|| vet.id && vet.id.includes(searchBy)
			|| vet.phone && vet.phone.includes(searchBy)
			|| vet.address && vet.address.includes(searchBy)
		) {
			return true;
		}
		return false;
	});
	const sortedVets = searchedVets.sort((a: User, b: User) => a.name.localeCompare(b.name));

	setFilteredVets(sortedVets);
  }

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout grid grid-cols-1 mt-8 w-100'>
			<h1 className="text-xl font-semibold mb-2">Pencarian Dokter Hewan</h1>
            <div className="px-4 grid grid-cols-4 gap-3">
				<div className="flex flex-col gap-1">
					<ul className="p-4">
						{/*
						<LabelComponent handleFilter={handleFilter} filter={filter} role={null}>Semua</LabelComponent>
						<LabelComponent handleFilter={handleFilter} filter={filter} role={'vet'}>Dokter Hewan</LabelComponent>
						<LabelComponent handleFilter={handleFilter} filter={filter} role={'groomer'}>Jasa Grooming</LabelComponent>
						*/}
						<InputText label={'Cari'} name={'search-query'} value={searchInput} onChange={handleSearchInput} />
					</ul>
				</div>
				<div className="p-4 grid grid-cols-3 col-span-3">
				  {filteredVets.map((vet) => {
						return (
							<Link key={vet.id} href={`/vet/i/${vet.id}`}>
								<a>
									<div className="p-2">
										<img className="rounded-xl object-cover w-full h-48" src={vet.profile_image ? vet.profile_image : 'https://api-temanhewan.mirzaq.com/image/pet_default.png'} />
										<div className="flex flex-row justify-between">
											<span>{vet.name}</span>
											<span>{vet.gender == 'm' ? 'M' : 'F'}</span>
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
    </>
  );
}