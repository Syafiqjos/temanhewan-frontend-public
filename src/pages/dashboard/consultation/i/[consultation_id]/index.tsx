import * as React from 'react';
import { useRouter } from 'next/router'

import ConsultationByCustomerPage from '@/pages/dashboard/consultation/i/[consultation_id]/ConsultationByCustomerPage';
import ConsultationByDoctorPage from '@/pages/dashboard/consultation/i/[consultation_id]/ConsultationByDoctorPage';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import Link from 'next/link';

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
		<ShouldAuthorized>
    </>
  );
}