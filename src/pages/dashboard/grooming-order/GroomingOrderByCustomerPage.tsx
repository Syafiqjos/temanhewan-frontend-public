import * as React from 'react';
import { useRouter } from 'next/router'

import AuthAPI from '@/api/AuthAPI';
import AuthService from '@/services/AuthService';
import GetGroomingOrderCustomerAPI from '@/api/GetGroomingOrderCustomerAPI';

import ShouldAuthorized from '@/components/auths/ShouldAuthorized';

import InputText from '@/components/forms/InputText';
import GroomingOrderComponent from '@/components/business/groomings/GroomingOrderComponent';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import Link from 'next/link';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

interface User {
	id: string,
	email: string,
	name: string,
	role: string,
	birthdate?: string,
	username?: string,
	gender?: string,
	address?: string,
	phone?: string,
	profile_image?: string
}

export default function GroomingOrderByCustomerPage() {
  const [ originalOrders, setOriginalOrders ] = React.useState<any>([]);
  const [ orders, setOrders ] = React.useState<any>([]);
  const filterRef = React.useRef(null);
  const sortRef = React.useRef(null);

  function handleFilter(e: any) {
	if (filterRef && sortRef && filterRef.current && sortRef.current) {
		let _orders = [ ...originalOrders ];
		const filter = (filterRef.current as any).value;
		const sort = (sortRef.current as any).value;

		if (filter != 'all') {
			_orders = _orders.filter((c: any) => { return c.status == filter; });
		}

		if (sort == 'newest') {
			_orders = _orders.sort((a: any, b: any) => { return ((new Date(b.date + ' ' + b.time)).getTime() - (new Date(a.date + ' ' + a.time)).getTime()); });
		} else if (sort == 'oldest') {
			_orders = _orders.sort((a: any, b: any) => { return ((new Date(a.date + ' ' + a.time)).getTime() - (new Date(b.date + ' ' + b.time)).getTime()); });
		} else if (sort == 'lowest_fee') {
			_orders = _orders.sort((a: any, b: any) => { return (parseInt(a.fee) - parseInt(b.fee)); });
		} else if (sort == 'highest_fee') {
			_orders = _orders.sort((a: any, b: any) => { return (parseInt(b.fee) - parseInt(a.fee)); });
		}

		setOrders(_orders);
	}
  }

  React.useEffect(() => {
	(async () => {
		const token = AuthService.getToken()!;
		const resUser = await AuthAPI({ token });
		const userId = resUser.data.id;

		// get users from server
		const res = await GetGroomingOrderCustomerAPI({ customer_id: userId, offset:0, limit: 100 });
		const success = res.success;

		if (success) {
			setOriginalOrders(res.data);
			setOrders(res.data);

			console.log(originalOrders);
		} else {
			// something error
		}
	})();
  }, []);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
		<ShouldAuthorized roleSpecific="customer">
			<section className='bg-white'>
				<div className="p-4">
					<h1 className="text-xl">Daftar Pesanan Grooming</h1>
					<div className="grid grid-cols-4 p-4">
						<div className="col-span-1 p-2">
							<div className="flex flex-col items-start w-full mb-2">
								<label>Filter Status</label>
								<select ref={filterRef} className="w-full" onChange={handleFilter}>
									<option value="all">Semua</option>
									<option value="pending">Menunggu Konfirmasi</option>
									<option value="rejected">Ditolak</option>
									<option value="accepted">Menunggu Pembayaran</option>
									<option value="cancelled">Dibatalkan</option>
									<option value="paid">Dibayar dan Menunggu Konsultasi</option>
									<option value="completed">Selesai</option>
								</select>
							</div>
							<div className="flex flex-col items-start w-full mb-2">
								<label>Sortir</label>
								<select ref={sortRef} className="w-full" onChange={handleFilter}>
									<option value="newest">Terbaru</option>
									<option value="oldest">Terlama</option>
									<option value="highest_fee">Termahal</option>
									<option value="lowest_fee">Termurah</option>
								</select>
							</div>
						</div>
						<div className="col-span-3 p-4">
							<ul className="pb-4">
								{orders.map((order: any) => {
									return (
										<GroomingOrderComponent order={order} key={`order-${order.id}`} />
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</ShouldAuthorized>
      </main>
    </>
  );
}