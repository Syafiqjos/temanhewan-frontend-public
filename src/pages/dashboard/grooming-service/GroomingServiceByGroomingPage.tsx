import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';
import GetGroomingServiceListAPI from '@/api/GetGroomingServiceListAPI';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import InputText from '@/components/forms/InputText';
import GroomingServiceComponent from '@/components/business/groomings/GroomingServiceComponent';

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

export default function GroomingServiceByGroomingPage() {
  const [ originalServices, setOriginalServices ] = React.useState<any>([]);
  const [ services, setServices ] = React.useState<any>([]);
  const filterRef = React.useRef(null);
  const sortRef = React.useRef(null);

  function handleFilter(e: any) {
	if (filterRef && sortRef && filterRef.current && sortRef.current) {
		let _services = [ ...originalServices ];
		const filter = (filterRef.current as any).value;
		const sort = (sortRef.current as any).value;

		if (filter != 'all') {
			_services = _services.filter((c: any) => { return c.status == filter; });
		}

		if (sort == 'newest') {
			_services = _services.sort((a: any, b: any) => { return ((new Date(b.date + ' ' + b.time)).getTime() - (new Date(a.date + ' ' + a.time)).getTime()); });
		} else if (sort == 'oldest') {
			_services = _services.sort((a: any, b: any) => { return ((new Date(a.date + ' ' + a.time)).getTime() - (new Date(b.date + ' ' + b.time)).getTime()); });
		} else if (sort == 'lowest_fee') {
			_services = _services.sort((a: any, b: any) => { return (parseInt(a.fee) - parseInt(b.fee)); });
		} else if (sort == 'highest_fee') {
			_services = _services.sort((a: any, b: any) => { return (parseInt(b.fee) - parseInt(a.fee)); });
		}

		setServices(_services);
	}
  }

  React.useEffect(() => {
	(async () => {
		const token = AuthService.getToken()!;
		const resUser = await AuthAPI({ token });
		const userId = resUser.data.id;

		// get users from server
		const res = await GetGroomingServiceListAPI({ grooming_id: userId, offset:0, limit: 100 });
		const success = res.success;

		if (success) {
			setOriginalServices(res.data);
			setServices(res.data);

			console.log(originalServices);
		} else {
			// something error
		}
	})();
  }, []);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
		<ShouldAuthorized roleSpecific="grooming">
			<section className='bg-white'>
				<div className="p-4">
					<h1 className="text-xl">Daftar Layanan Grooming</h1>
					<div className="grid grid-cols-4 p-4">
						<div className="col-span-1 p-2">
							<InputText label="Cari" name="search" type="text" />
						</div>
						<div className="col-span-3 p-4">
							<ul className="pb-4">
								{services.map((service: any) => {
									return (
										<GroomingServiceComponent service={service} key={`service-${service.id}`} />
									);
								})}
							</ul>
						</div>
					</div>
				</div>
				<Link href="/dashboard/grooming-service/new"><a className="fixed right-4 bottom-4 bg-orange-600 text-white rounded-xl w-16 h-16 flex flex-col items-center justify-center font-semibold text-xl">+</a></Link>
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}