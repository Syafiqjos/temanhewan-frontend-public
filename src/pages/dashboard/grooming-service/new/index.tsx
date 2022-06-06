import { useRouter } from 'next/router'
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import Sidebar from '@/components/layout/Sidebar';

import GroomingServiceByGroomingPage from './GroomingServiceByGroomingPage';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
		<Sidebar>
		<ShouldAuthorized>
			<ShouldAuthorized roleSpecific="grooming" dontRedirect={true}>
				<GroomingServiceByGroomingPage />
			</ShouldAuthorized>
		</ShouldAuthorized>
		</Sidebar>
    </>
  );
}