import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';
import GetConsultationByCustomerAPI from '@/api/GetConsultationByCustomerAPI';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import InputText from '@/components/forms/InputText';
import ConsultationComponent from '@/components/business/consultations/ConsultationComponent';

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

export default function ConsultationByCustomerPage() {
  const [ consultations, setConsultations ] = React.useState<any>([]);

  React.useEffect(() => {
	(async () => {
		const token = AuthService.getToken();
		const resUser = await AuthAPI({ token });
		const userId = resUser.data.id;

		// get users from server
		const res = await GetConsultationByCustomerAPI({ customer_id: userId, offset:0, limit: 100 });
		const success = res.success;

		if (success) {
			setConsultations(res.data);

			console.log(consultations);
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
		<ShouldAuthorized roleSpecific="customer">
			<section className='bg-white'>
				<div className="p-4">
					<h1 className="text-xl">Daftar Konsultasi</h1>
					<div className="grid grid-cols-4 p-4">
						<div className="col-span-1 p-2">
							<div className="flex flex-col items-start w-full mb-2">
								<label>Filter</label>
								<select className="w-full">
									<option>1</option>
									<option>2</option>
								</select>
							</div>
							<div className="flex flex-col items-start w-full mb-2">
								<label>Sortir</label>
								<select className="w-full">
									<option>1</option>
									<option>2</option>
								</select>
							</div>
						</div>
						<div className="col-span-3 p-4">
							<ul className="pb-4">
								{consultations.map((consultation) => {
									return (
										<ConsultationComponent consultation={consultation} key={`consultation-${consultation.id}`} />
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}