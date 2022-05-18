import * as React from 'react';

export default function InputText(
{
	label,
	name,
	type,
	placeholder
}: {
	label: string,
	name: string,
	type: 'text' | 'password',
	placeholder?: string
}) {
	return (
		<div className="flex flex-col items-start w-full">
			<label for={name}>{label}</label>
			<input className="bg-gray-100 border-0 rounded-l w-full p-4" type={type} name={name} id={name} placeholder={placeholder} />
		</div>
	);
}