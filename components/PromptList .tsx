import Prompt from './Prompt';

export const PromptList = ({ data }: { data: Post[] }) => {
	return (
		<div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 mx-auto'>
			{data.map((post: Post) => (
				<Prompt post={post} key={post._id} handleEdit={undefined} handleDelete={undefined} />
			))}
		</div>
	);
};
