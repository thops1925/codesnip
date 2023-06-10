import { BURL } from './url';

export const fetchAll = async () => {
	try {
		return await (await fetch(`${BURL}/api/prompt`)).json();
	} catch (error) {
		console.log(error);
	}
}; 
