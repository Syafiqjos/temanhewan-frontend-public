import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

import GroomingOrderStatusComponent from '@/components/business/groomings/GroomingOrderStatusComponent';

function GroomingOrderComponent({ order }: { order: any }) {
	return (
		<li className="mb-2">
			<div className="p-4 border rounded rounded-lg border-orange-600 flex flex-row justify-between">
				<div className="flex flex-col">
					<div className="font-semibold">{order.complaint}</div>
					<div className="mb-2">{order.address}</div>
					<div>{new Date(order.created_at).toUTCString().split(' ', 4).join(' ')}</div>
				</div>
				<div className="flex flex-row">
					<div>
						<GroomingOrderStatusComponent order={order} />
					</div>
					<div>
						<ButtonLink variant="primary" href={`/dashboard/grooming-order/i/${order.id}`}>Lihat</ButtonLink>
					</div>
				</div>
			</div>
		</li>
	);
}

export default GroomingOrderComponent;