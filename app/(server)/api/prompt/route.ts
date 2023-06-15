import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')
        if (!prompts) return new Response('no connection', { status: 404 });
        return NextResponse.json(prompts, { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 