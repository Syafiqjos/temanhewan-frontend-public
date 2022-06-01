import * as React from 'react';

import Sidebar from '@/components/layout/Sidebar';
import Seo from '@/components/Seo';

export default function Dashboard() {
  return (
    <>
      <Seo title='Dashboard' />
      <div className='flex'>
        <div className='flex-col'>
          <Sidebar />
        </div>
        <div className='flex-col pl-5 pt-5'>
          <h1>Dashboard</h1>
        </div>
      </div>
    </>
  );
}
