const AuthService = {
	storeToken: (token: string | null | undefined) => {
		localStorage.setItem('token', token);
	},
	getToken: (): string => {
		return localStorage.getItem('token');
	},
	resetToken: () => {
		localStorage.removeItem('token');
	}
};

export default AuthService;