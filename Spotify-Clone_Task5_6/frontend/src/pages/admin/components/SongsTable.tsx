import { useMusicStore } from "../../../stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
	const { songs, isLoading, error, deleteSong } = useMusicStore();
	
	console.log(songs);
	
	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>Loading songs...</div>
			</div>
		);
	}
	
	if (error) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-red-400'>{error}</div>
			</div>
		);
	}
	
	return (
		<div className="relative w-full overflow-auto">
			<table className="w-full caption-bottom text-sm">
				<thead className="[&_tr]:border-b border-zinc-700">
					<tr className="border-b border-zinc-700 transition-colors hover:bg-zinc-800/50 data-[state=selected]:bg-muted">
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0 w-[50px]"></th>
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Title</th>
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Artist</th>
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Release Date</th>
						<th className="h-12 px-4 text-right align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Actions</th>
					</tr>
				</thead>
				<tbody className="[&_tr:last-child]:border-0">
					{songs.map((song) => (
						<tr key={song._id} className="border-b border-zinc-700 transition-colors hover:bg-zinc-800/50 data-[state=selected]:bg-muted">
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
								<img src={song.imageUrl} alt={song.title} className='w-14 h-10 rounded object-cover' />
							</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{song.title}</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{song.artist}</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Calendar className='h-4 w-4' />
									{new Date(song.createdAt).toISOString().split("T")[0]}
								</span>
							</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
								<div className='flex gap-2 justify-end'>
									<button
										onClick={() => deleteSong(song._id)}
										className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-400/10'
									>
										<Trash2 className='h-4 w-4' />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SongsTable;