import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

type body = {
	userId: string;
	prompt: string;
	tag: string;
};

export async function POST(req: Request) {
	const body: body = await req.json();
	const { userId, prompt, tag } = body;
	try {
		await connectToDB();
		const newPrompt = new Prompt({ creator: userId, prompt, tag });
		await newPrompt.save();
		return NextResponse.json(newPrompt, { status: 201 });
	} catch (error) {
		console.log(error);
	}
}
