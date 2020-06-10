import { UserService } from './services/user.service';

export function appInitializer(userService: UserService): () => Promise<any> {
	return () =>
		new Promise((resolve, reject) => {
			userService
				.getUser()
				.toPromise()
				.then(() => resolve(true))
				.catch(() => {
					console.clear();
					resolve(false);
				});
		});
}
