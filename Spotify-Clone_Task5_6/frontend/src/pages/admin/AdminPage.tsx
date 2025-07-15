import { useAuthStore } from "../../stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect, useState } from "react";
import { useMusicStore } from "../../stores/useMusicStore";

const AdminPage = () => {
	const { isAdmin, isLoading } = useAuthStore();
	const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();
	const [activeTab, setActiveTab] = useState('songs');
	
	useEffect(() => {
		fetchAlbums();
		fetchSongs();
		fetchStats();
	}, [fetchAlbums, fetchSongs, fetchStats]);
	
	if (!isAdmin && !isLoading) return <div>Unauthorized</div>;
	
	return (
		<div
			className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8'
		>
			<Header />
			<DashboardStats />
			<div className='space-y-6'>
				<div className='p-1 bg-zinc-800/50 rounded-md inline-flex h-10 items-center justify-center text-muted-foreground'>
					<button
						className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
							activeTab === 'songs' 
								? 'bg-zinc-700 text-foreground shadow-sm' 
								: 'hover:bg-zinc-700/50'
						}`}
						onClick={() => setActiveTab('songs')}
					>
						<Music className='mr-2 size-4' />
						Songs
					</button>
					<button
						className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
							activeTab === 'albums' 
								? 'bg-zinc-700 text-foreground shadow-sm' 
								: 'hover:bg-zinc-700/50'
						}`}
						onClick={() => setActiveTab('albums')}
					>
						<Album className='mr-2 size-4' />
						Albums
					</button>
				</div>
				<div>
					{activeTab === 'songs' && <SongsTabContent />}
					{activeTab === 'albums' && <AlbumsTabContent />}
				</div>
			</div>
		</div>
	);
};

export default AdminPage;