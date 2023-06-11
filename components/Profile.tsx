import Prompt from './Prompt';

type Props = {
	name: string | any;
	desc: string;
	data: Post[];
	handleEdit: any;
	handleDelete: any;
};

const Profile = ({ name, desc, data, handleEdit, handleDelete }: Props) => {
	return (
		<section className='w-full'>
			<span className='mx-4 text-2xl font-bold'>{name}</span>
			<h1 className='mx-4 mt-3 whitespace-pre-wrap font-mono text-sm font-normal md:w-1/2 '>{desc}</h1>
			<div className='mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
				{data.map((post: Post) => (
					<Prompt
						post={post}
						key={post._id}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>
		</section>
	);
};

export default Profile;
