import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import Seo from '@/components/Seo';

import DashboardCustomer from './DashboardCustomer';
import DashboardDoctor from './DashboardDoctor';
import DashboardGrooming from './DashboardGrooming';

export default function Dashboard() {
  return (
    <>
      <Seo title="Dashboard"/>

      <main>
        <ShouldAuthorized>
          <ShouldAuthorized roleSpecific='customer' dontRedirect={true}>
            <DashboardCustomer />
          </ShouldAuthorized>
          
          <ShouldAuthorized roleSpecific='doctor' dontRedirect={true}>
            <DashboardDoctor />
          </ShouldAuthorized>

          <ShouldAuthorized roleSpecific='grooming' dontRedirect={true}>
            <DashboardGrooming />
          </ShouldAuthorized>
        </ShouldAuthorized>
      </main>
      
    </>
  );
}
