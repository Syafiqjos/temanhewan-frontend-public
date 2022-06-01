import * as React from 'react';

import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

export default function Dashboard() {
  return (
    <>
      <Seo title='Dashboard' />
      <Sidebar>
          <h1 className="text-xl font-semibold">Dashboard</h1>
      </Sidebar>
    </>
  );
}
