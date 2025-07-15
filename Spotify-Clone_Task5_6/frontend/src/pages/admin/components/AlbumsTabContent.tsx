import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";




const AlbumsTabContent = () => {
	return (
		<div className='rounded-lg border border-zinc-700/50 bg-zinc-800/50 text-card-foreground shadow-sm'>
			<div className='flex flex-col space-y-1.5 p-6'>
				<div className='flex items-center justify-between'>
					<div>
						<h3 className='text-2xl font-semibold leading-none tracking-tight flex items-center gap-2'>
							<Library className='h-5 w-5 text-violet-500' />
							Albums Library
						</h3>
						<p className='text-sm text-zinc-400 mt-1.5'>Manage your album collection</p>
					</div>
					<AddAlbumDialog />
				</div>
			</div>
			<div className='p-6 pt-0'>
				<AlbumsTable />
			</div>
		</div>
	);
};

export default AlbumsTabContent;