import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useMusicStore} from "../../stores/useMusicStore"
import {usePlayerStore} from "../../stores/usePlayerStore"

// Styled components for custom styling

export const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};


const AlbumPage=()=>{
	const { albumId } = useParams();
	const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

	useEffect(() => {
		if (albumId) fetchAlbumById(albumId);
	}, [fetchAlbumById, albumId]);

	if (isLoading) return null;

	const handlePlayAlbum = () => {
		if (!currentAlbum) return;

		const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
		if (isCurrentAlbumPlaying) togglePlay();
		else {
			// start playing the album from the beginning
			playAlbum(currentAlbum?.songs, 0);
		}
	};

	const handlePlaySong = (index: number) => {
		if (!currentAlbum) return;

		playAlbum(currentAlbum?.songs, index);
	};
   

   

   

 

  

	

	
    return (
       <div className="h-screen overflow-auto bg-zinc-900">
      <div className="relative min-h-full">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/80 via-zinc-900/80 to-zinc-900 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Album Header */}
          <div className="p-6 pb-4">
            <div className="flex gap-6 items-end flex-col md:flex-row">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-60 h-60 rounded-lg shadow-2xl mx-auto md:mx-0"
              />
              <div className="flex-1 text-center md:text-left">
                <p className="text-sm font-medium text-white mb-2">
                  Album
                </p>
                <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-none">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-zinc-300 text-sm justify-center md:justify-start">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs?.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Play Button */}
          <div className="px-6 pb-4 flex justify-center md:justify-start">
            <button
              onClick={handlePlayAlbum}
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              {isPlaying && currentAlbum?.songs?.some((song) => song._id === currentSong?._id) ? (
                <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Songs Table */}
          <div className="bg-black/20 backdrop-blur-sm">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
              <div>#</div>
              <div>Title</div>
              <div>Released Date</div>
              <div className="flex items-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                </svg>
              </div>
            </div>

            {/* Songs List */}
            <div className="px-6 py-4 space-y-2">
              {currentAlbum?.songs?.map((song, index) => {
                const isCurrentSong = currentSong?._id === song._id;
                return (
                  <div
                    key={song._id}
                    onClick={() => handlePlaySong(index)}
                    className="grid grid-cols-[16px_1fr_auto] md:grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                  >
                    {/* Track Number / Play Icon */}
                    <div className="flex items-center justify-center">
                      {isCurrentSong && isPlaying ? (
                        <span className="text-green-500 text-lg">♫</span>
                      ) : (
                        <>
                          <span className="group-hover:hidden">{index + 1}</span>
                          <svg className="w-4 h-4 hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </>
                      )}
                    </div>

                    {/* Song Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <img 
                        src={song.imageUrl} 
                        alt={song.title} 
                        className="w-10 h-10 rounded flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-white text-sm truncate">
                          {song.title}
                        </div>
                        <div className="text-zinc-400 text-sm truncate">
                          {song.artist}
                        </div>
                      </div>
                    </div>

                    {/* Release Date - Hidden on mobile */}
                    <div className="hidden md:flex items-center text-sm">
                      {song.createdAt?.toISOString().split("T")[0]}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center text-sm">
                      {formatDuration(song.duration)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default AlbumPage;