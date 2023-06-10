import { BURL } from './url';

export const fetchProfile = async (id: any) => {
	try {
		return await (await fetch(`${BURL}/api/users/${id}/posts`)).json();
	} catch (error) {
		console.log(error);
	}
};
