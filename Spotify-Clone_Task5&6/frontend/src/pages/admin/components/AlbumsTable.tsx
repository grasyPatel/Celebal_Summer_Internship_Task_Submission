import { useMusicStore } from "../../../stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AlbumsTable = () => {
	const { albums, deleteAlbum, fetchAlbums } = useMusicStore();
	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	return (
		<div className="relative w-full overflow-auto ">
			<table className="w-full caption-bottom text-sm">
				<thead className="[&_tr]:border-b border-zinc-700">
					<tr className="border-b border-zinc-700 transition-colors hover:bg-zinc-800/50 data-[state=selected]:bg-muted">
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0 w-[50px]"></th>
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Title</th>
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Artist</th>
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Release Year</th>
						<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Songs</th>
						<th className="h-12 px-4 text-right align-middle font-medium text-zinc-400 [&:has([role=checkbox])]:pr-0">Actions</th>
					</tr>
				</thead>
				<tbody className="[&_tr:last-child]:border-0">
					{albums.map((album) => (
						<tr key={album._id} className="border-b border-zinc-700 transition-colors hover:bg-zinc-800/50 data-[state=selected]:bg-muted">
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
								<img src={album.imageUrl} alt={album.title} className='w-10 h-10 rounded object-cover' />
							</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{album.title}</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{album.artist}</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Calendar className='h-4 w-4' />
									{album.releaseYear}
								</span>
							</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
								<span className='inline-flex items-center gap-1 text-zinc-400'>
									<Music className='h-4 w-4' />
									{album.songs.length} songs
								</span>
							</td>
							<td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
								<div className='flex gap-2 justify-end'>
									<button
										onClick={() => deleteAlbum(album._id)}
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

export default AlbumsTable;