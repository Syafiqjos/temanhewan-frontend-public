import * as React from 'react';

export default function InputButton(
{
	text,
	disabled = false
}: {
	text: string,
	disabled?: boolean
}) {
	return (
		<div>
			<input className={`p-4 px-8 cursor-pointer rounded-xl ${!disabled ? 'bg-orange-600 text-white' : 'bg-gray-400 text-white'}`} type="submit" value={text} disabled={disabled} />
		</div>
	);
}