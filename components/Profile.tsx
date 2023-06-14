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
		<div className='container sm:container lg:container md:container mx-auto'>
			<span className='text-2xl font-bold'>{name}</span>
			<h1 className='mt-3 font-mono text-sm font-normal'>{desc}</h1>
			<div className='space-y-4 py-4 sm:columns-1 xl:columns-3 md:columns-2 sm:px-32'>
				{data.map((post: Post) => (
					<Prompt
						post={post}
						key={post._id}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>
		</div>
	);
};

export default Profile;
