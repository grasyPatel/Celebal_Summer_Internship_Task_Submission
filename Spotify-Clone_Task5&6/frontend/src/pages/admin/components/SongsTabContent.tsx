import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
	return (
		<div className="bg-white rounded-lg border  shadow-sm  border-zinc-700/50 bg-zinc-800/50 text-card-foreground ">
			<div className="p-6 border-b border-gray-200">
				<div className='flex items-center justify-between'>
					<div>
						<h3 className='flex items-center gap-2 text-lg font-semibold text-white leading-none tracking-tight'>
							<Music className='size-5 text-emerald-500' />
							Songs Library
						</h3>
						<p className="text-sm text-gray-600 mt-1">Manage your music tracks</p>
					</div>
					<AddSongDialog />
				</div>
			</div>
			<div className="p-6">
				<SongsTable />
			</div>
		</div>
	);
};

export default SongsTabContent;