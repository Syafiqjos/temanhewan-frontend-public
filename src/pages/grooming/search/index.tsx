import * as React from 'react';

import GetGroomingList from '@/api/GetGroomingListAPI';

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
	avatar?: string
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
  const [ groomers, setGroomers ] = React.useState<User[]>([]);
  const [ filteredGroomers, setFilteredGroomers ] = React.useState<User[]>([]);
  const [ filter, setFilter ] = React.useState<string | null>(null);

  const [ searchInput, setSearchInput ] = React.useState<string>('');

  React.useEffect(() => {
	(async () => {
		// get users from server
		const res = await GetGroomingList({ offset:0, limit: 100 });
		const retrieveGroomers = res.data;
		const sortedGroomers = retrieveGroomers.sort((a: User, b: User) => a.name.localeCompare(b.name));

		setGroomers(sortedGroomers);
		setFilteredGroomers(sortedGroomers);
	})();
  }, []);

  function handleSearchInput(e: any){
	const searchBy = e.target.value;
	setSearchInput(searchBy);

	const searchedGroomers = groomers.filter((groomer: User) => {
		if (searchBy == ''
			|| searchBy == undefined
			|| searchBy == null
			|| groomer.name && groomer.name.includes(searchBy)
			|| groomer.email && groomer.email.includes(searchBy)
			|| groomer.username && groomer.username.includes(searchBy)
			|| groomer.id && groomer.id.includes(searchBy)
			|| groomer.phone && groomer.phone.includes(searchBy)
			|| groomer.address && groomer.address.includes(searchBy)
		) {
			return true;
		}
		return false;
	});
	const sortedGroomers = searchedGroomers.sort((a: User, b: User) => a.name.localeCompare(b.name));

	setFilteredGroomers(sortedGroomers);
  }

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout grid grid-cols-1 mt-8 w-100'>
			<h1 className="text-xl font-semibold mb-2">Pencarian Grooming Peliharaan</h1>
            <div className="px-4 grid grid-cols-4 gap-3">
				<div className="flex flex-col gap-1">
					<ul className="p-4">
						{/*
						<LabelComponent handleFilter={handleFilter} filter={filter} role={null}>Semua</LabelComponent>
						<LabelComponent handleFilter={handleFilter} filter={filter} role={'vet'}>Dokter Hewan</LabelComponent>
						<LabelComponent handleFilter={handleFilter} filter={filter} role={'groomer'}>Jasa Grooming</LabelComponent>
						*/}
						<InputText type="text"label={'Cari'} name={'search-query'} value={searchInput} onChange={handleSearchInput} />
					</ul>
				</div>
				<div className="p-4 grid grid-cols-3 col-span-3">
				  {filteredGroomers.map((groomer) => {
						return (
							<Link key={groomer.id} href={`/grooming/i/${groomer.id}`}>
								<a>
									<div className="p-2">
										<img className="rounded-xl object-cover w-full h-48" src={groomer.avatar ? groomer.avatar : 'https://api-temanhewan.mirzaq.com/image/user_default.png'} />
										<div className="flex flex-row justify-between">
											<span>{groomer.name}</span>
											<span>{groomer.gender == 'm' ? 'M' : 'F'}</span>
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