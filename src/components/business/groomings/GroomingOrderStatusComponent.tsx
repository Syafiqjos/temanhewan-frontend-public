import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

const formatCurrency = (currency: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'IDR'
	}).format(currency);
};

function GroomingOrderStatusComponent({ order }: { order: any }) {
	const [className, setClassName] = React.useState('');
	const [status, setStatus] = React.useState('');
	const [postfix, setPostfix] = React.useState('');

	React.useEffect(() => {
		let _className = "p-2 mr-2 font-semibold";
		let _status = 'UNDEFINED';

		if (order.status == "pending") {
			_className += " text-yellow-600";
			_status = 'Menunggu Konfirmasi';
		} else if (order.status == "rejected") {
			_className += " text-red-600";
			_status = 'Ditolak';
		} else if (order.status == "accepted") {
			_className += " text-green-600";
			_status = 'Menunggu Pembayaran';
			setPostfix(` (${formatCurrency(order.fee as number)})`);
		} else if (order.status == "cancelled") {
			_className += " text-red-600";
			_status = 'Dibatalkan';
		} else if (order.status == "paid") {
			_className += " text-teal-600";
			_status = 'Dibayar dan Menunggu Konsultasi';
			setPostfix(` (${formatCurrency(order.fee as number)})`);
		} else if (order.status == "completed") {
			_className += " text-green-600";
			_status = 'Selesai';
			setPostfix(` (${formatCurrency(order.fee as number)})`);
		}

		setStatus(_status);
		setClassName(_className);
	}, []);

	return (
		<div className={className}>
			{status} {postfix}
		</div>
	);
}

export default GroomingOrderStatusComponent;