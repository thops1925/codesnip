import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

type body = {
	prompt: string;
	tag: string;
};

export async function GET(req: Request, { params }: any) {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(params.id).populate('creator');
		if (!prompt) return new Response('Prompt not fount', { status: 404 });
		return NextResponse.json(prompt, { status: 200 });
	} catch (error) {
		console.log(error);
	}
}

export async function PATCH(req: Request, { params }: any) {
	const body: body = await req.json();
	const { prompt, tag } = body;
	try {
		await connectToDB();
		const exist = await Prompt.findById(params.id);
		if (!exist) return new Response('Prompt not fount', { status: 404 });
		exist.prompt = prompt;
		exist.tag = tag;
		await exist.save();

		// const prompt = await Prompt.findById(params.id).populate('creator');
		return NextResponse.json(exist, { status: 200 });
	} catch (error) {
		console.log(error);
	}
}

export async function DELETE(req: Request, { params }: any) {
	try {
		await connectToDB();
		await Prompt.findByIdAndRemove(params.id).populate('creator');
		return new Response('Prompt Deleted', { status: 200 });
		// return NextResponse.json(prompt, { status: 200 });
	} catch (error) {
		console.log(error);
	}
}
