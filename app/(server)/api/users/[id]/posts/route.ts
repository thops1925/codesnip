import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
	try {
		await connectToDB();
		const prompts = await Prompt.find({ creator: params.id }).populate('creator');
		return NextResponse.json(prompts, { status: 200 });
	} catch (error) {
		console.log(error);
	}
}

