import * as React from 'react';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';
import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

export default function Dashboard() {
  return (
    <>
      <Seo title='Dashboard' />
      <Sidebar>
        <main>
          <ShouldAuthorized roleSpecific='customer'>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </ShouldAuthorized>
        </main>
      </Sidebar>
    </>
  );
}
