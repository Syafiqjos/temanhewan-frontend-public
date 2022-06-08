import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

import GroomingOrderStatusComponent from '@/components/business/groomings/GroomingOrderStatusComponent';

function GroomingOrderStatusFormComponent({ order }: { order: any }) {
	return <form className="border rounded-lg border-orange-600 p-8 mb-4">
			<h1 className="text-lg mb-4">Status Pesanan Grooming</h1>
			<GroomingOrderStatusComponent order={order} />
		</form>;
}

export default GroomingOrderStatusFormComponent;