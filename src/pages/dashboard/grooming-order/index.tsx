import { useRouter } from 'next/router'
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import GroomingOrderByCustomerPage from './GroomingOrderByCustomerPage';
import GroomingOrderByGroomingPage from './GroomingOrderByGroomingPage';

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