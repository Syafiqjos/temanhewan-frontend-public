import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

function GroomingOrderFormComponent({ order }: { order: any }) {
	return <form className="border rounded-lg border-orange-600 p-8 mb-4">
			<h1 className="text-lg mb-4">Pesanan Grooming</h1>
			<InputText label="Alamat Grooming" name="order_address" value={order.address} disabled></InputText>
			<InputText label="Tanggal Grooming" name="order_date" value={order.created_at} disabled></InputText>
		</form>;
}

export default GroomingOrderFormComponent;