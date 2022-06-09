import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import Seo from '@/components/Seo';

import DashboardCustomer from './dashboardCustomer';
import DashboardDoctor from './DashboardDoctor';

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
        </ShouldAuthorized>
      </main>
      
    </>
  );
}
