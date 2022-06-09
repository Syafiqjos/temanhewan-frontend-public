import * as React from 'react';

import Router from 'next/router';
import { useAuthState } from '@/providers/AuthContextProvider';

function BlockingAuth({ show, children }: { show: boolean, children: any }) {
	return show && children;
}

export default function ShouldAuthorized({ roleSpecific, children, dontRedirect }: { roleSpecific?: string, children: React.ReactNode, dontRedirect?: boolean }) {
	const authState = useAuthState();

	const [ show, setShow ] = React.useState(false);
	const isMounted = React.useRef(true);

	React.useEffect(() => {
		if (isMounted.current && authState) {
			const roleGranted = authState.authenticated && (roleSpecific === undefined || ( authState.user && roleSpecific === authState.user.role));

			if (authState.authenticated && roleGranted && authState.loading == false) {
				setShow(true);
			} else if (!roleGranted && authState.loading == false) {
				setShow(false);
				isMounted.current = false;
				if (dontRedirect === undefined || dontRedirect == false) {
					try {
						/*
						Router.push({
							pathname: '/'
						});
						*/
					} catch {
						// skip catch
					}
				}
			}
		}

	}, [ authState, authState.authenticated ]);

	return <BlockingAuth show={show}>{children}</BlockingAuth>
}