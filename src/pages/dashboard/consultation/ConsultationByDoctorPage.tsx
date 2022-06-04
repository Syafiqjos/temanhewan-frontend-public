import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';
import GetConsultationByDoctorAPI from '@/api/GetConsultationByDoctorAPI';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

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

export default function ConsultationByDoctorPage() {
  const [ consultations, setConsultations ] = React.useState<any>([]);

  React.useEffect(() => {
	(async () => {
		const token = AuthService.getToken();
		const resUser = await AuthAPI({ token });
		const userId = resUser.data.id;

		// get users from server
		const res = await GetConsultationByDoctorAPI({ doctor_id: userId, offset:0, limit: 100 });
		const success = res.success;

		console.log(res);

		if (success) {
			setConsultations(res.data);
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
		<ShouldAuthorized roleSpecific="doctor">
			<section className='bg-white'>
			  doctor
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}