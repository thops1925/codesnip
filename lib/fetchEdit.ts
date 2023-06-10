import { BURL } from './url';

export const fetchEdit = async (id: any) => {
	try {
		return await (await fetch(`${BURL}/api/prompt/${id}`)).json();
	} catch (error) {
		console.log(error);
	}
};
