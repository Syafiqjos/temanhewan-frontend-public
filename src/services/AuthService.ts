const AuthService = {
	storeToken: (token: string) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('token', token);
		}
	},
	getToken: (): string | null => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('token');
		}
		return null;
	},
	resetToken: () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('token');
		}
	}
};

export default AuthService;