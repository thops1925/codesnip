import { cache } from 'react'

export const getUser = cache(async () => {
    try {
        const response = await fetch('/api/prompt/new', {
            method: 'POST',
            body: JSON.stringify({
                userId: session?.user?.id,
                prompt: post.prompt,
                tag: post.tag,
            }),
        });
        if (response.ok) {
            router.push('/');
        }
    } catch (error) {
        console.log(error);
    } finally {
        setIsSubmitting(false);
    }
})