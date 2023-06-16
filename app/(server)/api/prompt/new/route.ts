import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

type body = {
	userId: string;
	prompt: string;
	tag: string;
};


export const POST = async (request: { json: () => PromiseLike<{ userId: any; prompt: any; tag: any; }> | { userId: any; prompt: any; tag: any; }; }) => {
	const { userId, prompt, tag } = await request.json();
	try {
		await connectToDB();
		const newPrompt = new Prompt({ creator: userId, prompt, tag });
		await newPrompt.save();
		return NextResponse.json(newPrompt, { status: 201 });
	} catch (error) {
		console.log(error);
	}
}
