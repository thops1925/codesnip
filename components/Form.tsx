'use client';

import Link from 'next/link';

type Props = {
	type: string;
	post: {
		prompt: string;
		tag: string;
	};
	setPost: any;
	handleSubmit: any;
	submitting: any;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
	return (
		<section className='flex w-full max-w-full flex-col items-center  justify-center'>
			<h1 className='flex items-center justify-center font-cookie text-5xl font-bold'>{type}</h1>
			<form
				onSubmit={handleSubmit}
				className='mt-10 flex w-full max-w-2xl flex-col gap-7  rounded-xl border border-gray-200 bg-white/20 p-5 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur '>
				<label>
					<span className='font-satoshi text-base font-semibold text-gray-700 '>Code ... </span>
					<textarea
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						required
						className=' mt-2 flex h-[200px] w-full rounded-lg p-3 font-satoshi text-sm text-gray-500 outline-0 '
						placeholder='PASTE YOUR CODE HERE'
					/>
				</label>
				<label>
					<span className='font-satoshi text-base font-semibold text-gray-700 '>TITLE </span>
					<input
						value={post.tag}
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
						required
						className=' mt-2  flex w-full rounded-lg p-3 font-satoshi text-sm text-gray-500 outline-0'
						placeholder='CREATE A TITLE OR KEY WORD THAT YOU CAN REMEMBER YOUR CODE'
					/>
				</label>
				<div className='mx-3 mb-5 flex items-end justify-end gap-4'>
					<Link href='/' className='rounded-full border border-black px-8  py-4 font-bold'>
						Cancel
					</Link>
					<button type='submit' disabled={submitting} className='rounded-full border border-black bg-black px-4 py-4 font-bold text-white'>
						{submitting ? `${type} ... ` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
