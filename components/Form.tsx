'use client';

import Link from 'next/link';
export const dynamic = 'force-dynamic';

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
		<section className='w-full max-w-full flex justify-center items-center  flex-col'>
			<h1 className='text-5xl flex items-center justify-center font-bold font-cookie'>{type}</h1>
			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7  rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5 '>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700 '>Code ... </span>
					<textarea
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						required
						className=' font-satoshi w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 '
						placeholder='PASTE YOUR CODE HERE'
					/>
				</label>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700 '>TITLE </span>
					<input
						value={post.tag}
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
						required
						className=' font-satoshi  w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
						placeholder='CREATE A TITLE OR KEY WORD THAT YOU CAN REMEMBER YOUR CODE'
					/>
				</label>
				<div className='flex justify-end items-end mx-3 mb-5 gap-4'>
					<Link href='/' className='font-bold border border-black rounded-full  px-8 py-4'>
						Cancel
					</Link>
					<button type='submit' disabled={submitting} className='font-bold border border-black rounded-full px-4 py-4 bg-black text-white'>
						{submitting ? `${type} ... ` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
