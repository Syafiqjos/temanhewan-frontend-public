import { useRouter } from 'next/router'
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import ConsultationByCustomerPage from '@/pages/dashboard/consultation/ConsultationByCustomerPage';
import ConsultationByDoctorPage from '@/pages/dashboard/consultation/ConsultationByDoctorPage';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
		<ShouldAuthorized>
			<ShouldAuthorized roleSpecific="customer" dontRedirect={true}>
				<ConsultationByCustomerPage />
			</ShouldAuthorized>
			<ShouldAuthorized roleSpecific="doctor" dontRedirect={true}>
				<ConsultationByDoctorPage />
			</ShouldAuthorized>
		</ShouldAuthorized>
    </>
  );
}