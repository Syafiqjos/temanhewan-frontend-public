import { useRouter } from 'next/router'
import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import SidebarGroomer from '@/components/layout/SidebarGroomer';

import GroomingServiceByGroomingPage from './GroomingServiceByGroomingPage';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
		<SidebarGroomer>
		<ShouldAuthorized>
			<ShouldAuthorized roleSpecific="grooming" dontRedirect={true}>
				<GroomingServiceByGroomingPage />
			</ShouldAuthorized>
		</ShouldAuthorized>
		</SidebarGroomer>
    </>
  );
}