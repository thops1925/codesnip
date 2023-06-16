import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

// type body = {
// 	userId: string;
// 	prompt: string;
// 	tag: string;
// };


export const POST = async (request: Request) => {
	const { userId, prompt, tag } = await request.json();
	try {
		await connectToDB();
		const newPrompt = new Prompt({ creator: userId, prompt, tag });
		await newPrompt.save();
		return new Response(JSON.stringify(newPrompt), { status: 201 })
	} catch (error) {
		console.log(error);
	}
}
