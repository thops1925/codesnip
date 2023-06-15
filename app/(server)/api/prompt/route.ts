import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function GET(request: Request) {
    try {
        await connectToDB(); // Connect to the database

        const prompts = await Prompt.find({}).populate('creator'); // Fetch all prompts and populate the 'creator' field

        if (!prompts) {
            return new Response('No prompts found', { status: 404 });
        }

        return new Response(JSON.stringify(prompts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error); // Log the error for debugging purposes

        return new Response('Failed to fetch all prompts', { status: 500 });
    }
}
