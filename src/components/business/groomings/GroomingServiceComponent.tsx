import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

import GroomingServicePriceComponent from '@/components/business/groomings/GroomingServicePriceComponent';

const formatCurrency = (currency: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'IDR'
	}).format(currency);
};

function GroomingServiceComponent({ service, children }: { service: any, children: any }) {
	return (
		<div className="mb-2">
			<div className="p-4 border rounded rounded-lg border-orange-600 flex flex-row justify-between">
				<div className="flex flex-col">
					<div className="font-semibold mb-2">{service.name}</div>
					<div className="mb-2">{service.description}</div>
				</div>
				<div className="flex flex-row">
					<div>
						<GroomingServicePriceComponent service={service} />
					</div>
					<div>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GroomingServiceComponent;