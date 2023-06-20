'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@app/components/Form';

const FormFeed = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({ prompt: '', tag: '' });

	const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

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
	};

	if (!session)
		return (
			<div>
				<p>Please login</p>
			</div>
		);

	return <Form type='Create' post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />;
};

export default FormFeed;
