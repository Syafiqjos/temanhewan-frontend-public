import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

function ConsultationStatusComponent({ consultation }: { consultation: any }) {
	const [className, setClassName] = React.useState('');
	const [status, setStatus] = React.useState('');

	React.useEffect(() => {
		let _className = "p-2 mr-2 font-semibold";
		let _status = 'UNDEFINED';

		if (consultation.status == "pending") {
			_className += " text-yellow-600";
			_status = 'Menunggu Konfirmasi';
		} else if (consultation.status == "rejected") {
			_className += " text-red-600";
			_status = 'Ditolak';
		} else if (consultation.status == "accepted") {
			_className += " text-green-600";
			_status = 'Menunggu Pembayaran';
		} else if (consultation.status == "cancelled") {
			_className += " text-red-600";
			_status = 'Dibatalkan';
		} else if (consultation.status == "paid") {
			_className += " text-teal-600";
			_status = 'Dibayar';
		} else if (consultation.status == "completed") {
			_className += " text-green-600";
			_status = 'Selesai';
		}

		setStatus(_status);
		setClassName(_className);
	}, []);

	return (
		<div className={className}>
			{status}
		</div>
	);
}

export default ConsultationStatusComponent;