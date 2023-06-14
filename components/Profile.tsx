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
		<div className='container sm:container lg:container md:container flex justify-center items-center flex-col'>
			<div className='flex justify-start items-start flex-col space-y-3'>
				<span className='text-2xl font-bold mx-4'>{name}</span>
				<h1 className='font-mono text-sm font-normal mx-4 lg:w-1/2'>{desc}</h1>
			</div>

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
