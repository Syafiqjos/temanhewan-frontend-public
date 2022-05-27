import * as React from 'react';

import { useRouter } from 'next/router';
import { useAuthState } from '@/providers/AuthContextProvider';

function BlockingAuth({ show, children }: { show: boolean, children: any }) {
	return show && children;
}

export default function UnauthorizedRedirect({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const authState = useAuthState();

	const [ show, setShow ] = React.useState(false);

	React.useEffect(() => {
		if (!router.isReady) return;

		if (authState.authenticated) {
			setShow(false);
			router.push('/');
		} else if (authState.loading == false) {
			setShow(true);
		}

	}, [ authState, authState.authenticated, router.isReady ]);

	return <BlockingAuth show={show}>{children}</BlockingAuth>
}