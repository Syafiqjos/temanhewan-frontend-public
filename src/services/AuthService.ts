const AuthService = {
	storeToken: (token: string) => {
		localStorage.setItem('token', token);
	},
	getToken: (): string | null => {
		return localStorage.getItem('token');
	},
	resetToken: () => {
		localStorage.removeItem('token');
	}
};

export default AuthService;