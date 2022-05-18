import * as React from 'react';

export default function InputButton(
{
	text
}: {
	text: string
}) {
	return (
		<div>
			<input className="bg-orange-600 text-white p-4 px-8 cursor-pointer rounded-xl" type="submit" value={text} />
		</div>
	);
}