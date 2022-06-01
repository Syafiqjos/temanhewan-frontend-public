import * as React from 'react';

import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

export default function Dashboard() {
  return (
    <>
      <Seo title='Dashboard' />
      <div className='flex flex-row'>
        <div>
          <Sidebar />
        </div>
        <div className='pl-5 pt-5'>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
      </div>
    </>
  );
}
