import * as React from 'react';
import { useRouter } from 'next/router'

import GroomingOrderByCustomerPage from './GroomingOrderByCustomerPage';
import GroomingOrderByGroomingPage from './GroomingOrderByGroomingPage';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
		<ShouldAuthorized>
			<ShouldAuthorized roleSpecific="customer" dontRedirect={true}>
				<GroomingOrderByCustomerPage />
			</ShouldAuthorized>
			<ShouldAuthorized roleSpecific="grooming" dontRedirect={true}>
				<GroomingOrderByGroomingPage />
			</ShouldAuthorized>
		</ShouldAuthorized>
    </>
  );
}