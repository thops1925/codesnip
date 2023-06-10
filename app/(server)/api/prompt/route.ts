import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		await connectToDB();
		const prompts = await Prompt.find({}).populate('creator');
		return NextResponse.json(prompts, { status: 200 });
	} catch (error) {
		console.log(error);
	}
}
