import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { type } from 'os';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
	interface Session {
		/** This is an example. You can find me in types/next-auth.d.ts */
		user: {
			id: string;
			email: string;
			name: string;
			image: string;
		};
	}
	// interface Profile {
	// 	email?: string;
	// 	username?: string;
	// 	image?: string;
	// 	name?: string;
	// 	picture?: string;
	// }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
	interface JWT {
		/** This is an example. You can find me in types/next-auth.d.ts */
		bar: number;
	}
}
