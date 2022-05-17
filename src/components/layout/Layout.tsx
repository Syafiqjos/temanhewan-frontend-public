import * as React from 'react';
import Header from '@/components/layout/Header.tsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return <>
    <Header/>
    {children}
  </>;
}
