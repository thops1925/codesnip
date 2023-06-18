import Prompt from "@models/prompt";
import { connectToDB } from "@app/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
    try {
        await connectToDB()

        const prompts = await Prompt.findOne({ _id: params.id }).populate('creator')

        return NextResponse.json(prompts, { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 