import * as React from 'react';
import InputText from '@/components/forms/InputText';
import ButtonLink from '@/components/links/ButtonLink';

const formatCurrency = (currency: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'IDR'
	}).format(currency);
};

function GroomingServicePriceComponent({ service }: { service: any }) {
	const [className, setClassName] = React.useState('');
	const [price, setPrice] = React.useState('');

	React.useEffect(() => {
		let _className = "p-2 mr-2 font-semibold text-teal-600";

		setPrice(`${formatCurrency(service.price as number)}`);
		setClassName(_className);
	}, []);

	return (
		<div className={className}>
			{price}
		</div>
	);
}

export default GroomingServicePriceComponent;