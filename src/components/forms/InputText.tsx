import * as React from 'react';

export default function InputText(
{
	label,
	name,
	type,
	placeholder,
	onChange,
	disabled = false,
	value = ''
}: {
	label: string,
	name: string,
	type: 'text' | 'password' | 'date',
	placeholder?: string,
	onChange?: any,
	disabled?: boolean,
	value?: string
}) {
	return (
		<div className="flex flex-col items-start w-full">
			<label htmlFor={name}>{label}</label>
			<input disabled={disabled} onChange={onChange} className={`border-0 rounded-l w-full p-4 ${disabled ? 'bg-white' : 'bg-gray-100'}`} type={type} name={name} id={name} placeholder={placeholder} defaultValue={value} />
		</div>
	);
}