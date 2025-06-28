import { usePlayerStore } from "../../stores/usePlayerStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

	const [volume, setVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isDraggingProgress, setIsDraggingProgress] = useState(false);
	const [isDraggingVolume, setIsDraggingVolume] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const progressSliderRef = useRef<HTMLInputElement>(null);
	const volumeSliderRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		audioRef.current = document.querySelector("audio");

		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => {
			if (!isDraggingProgress) {
				setCurrentTime(audio.currentTime);
			}
		};
		const updateDuration = () => setDuration(audio.duration);

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);

		const handleEnded = () => {
			usePlayerStore.setState({ isPlaying: false });
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong, isDraggingProgress]);

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		if (audioRef.current) {
			audioRef.current.currentTime = value;
			if (!isDraggingProgress) {
				setCurrentTime(value);
			}
		}
	};

	const handleProgressMouseDown = () => {
		setIsDraggingProgress(true);
	};

	const handleProgressMouseUp = () => {
		setIsDraggingProgress(false);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		setVolume(value);
		if (audioRef.current) {
			audioRef.current.volume = value / 100;
		}
	};

	// Global mouse event handlers for drag functionality
	useEffect(() => {
		const handleMouseUp = () => {
			if (isDraggingProgress) {
				setIsDraggingProgress(false);
			}
			if (isDraggingVolume) {
				setIsDraggingVolume(false);
			}
		};

		document.addEventListener('mouseup', handleMouseUp);
		return () => document.removeEventListener('mouseup', handleMouseUp);
	}, [isDraggingProgress, isDraggingVolume]);

	return (
		<footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4 fixed bottom-0 left-0 right-0 w-full'>
			<div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>
				{/* currently playing song */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
					{currentSong && (
						<>
							<img
								src={currentSong.imageUrl}
								alt={currentSong.title}
								className='w-14 h-14 object-cover rounded-md'
							/>
							<div className='flex-1 min-w-0'>
								<div className='font-medium truncate hover:underline cursor-pointer'>
									{currentSong.title}
								</div>
								<div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>

				{/* player controls*/}
				<div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
					<div className='flex items-center gap-4 sm:gap-6'>
						<button
							className='hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors'
						>
							<Shuffle className='h-4 w-4' />
						</button>

						<button
							className='h-10 w-10 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors inline-flex'
							onClick={playPrevious}
							disabled={!currentSong}
						>
							<SkipBack className='h-4 w-4' />
						</button>

						<button
							className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8 inline-flex items-center justify-center transition-colors disabled:opacity-50'
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
						</button>

						<button
							className='h-10 w-10 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors inline-flex'
							onClick={playNext}
							disabled={!currentSong}
						>
							<SkipForward className='h-4 w-4' />
						</button>

						<button
							className='hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors'
						>
							<Repeat className='h-4 w-4' />
						</button>
					</div>

					<div className='hidden sm:flex items-center gap-2 w-full'>
						<div className='text-xs text-zinc-400'>{formatTime(currentTime)}</div>
						<div className='relative flex-1'>
							<input
								ref={progressSliderRef}
								type="range"
								min="0"
								max={duration || 100}
								step="1"
								value={currentTime}
								onChange={handleSeek}
								onMouseDown={handleProgressMouseDown}
								onMouseUp={handleProgressMouseUp}
								className='w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900'
								style={{
									background: `linear-gradient(to right, #ffffff 0%, #ffffff ${duration ? (currentTime / duration) * 100 : 0}%, #3f3f46 ${duration ? (currentTime / duration) * 100 : 0}%, #3f3f46 100%)`
								}}
							/>
						</div>
						<div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
					</div>
				</div>

				{/* volume controls */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
					<button className='h-10 w-10 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors inline-flex'>
						<Mic2 className='h-4 w-4' />
					</button>
					<button className='h-10 w-10 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors inline-flex'>
						<ListMusic className='h-4 w-4' />
					</button>
					<button className='h-10 w-10 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors inline-flex'>
						<Laptop2 className='h-4 w-4' />
					</button>

					<div className='flex items-center gap-2'>
						<button className='h-10 w-10 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors inline-flex'>
							<Volume1 className='h-4 w-4' />
						</button>

						<div className='relative w-24'>
							<input
								ref={volumeSliderRef}
								type="range"
								min="0"
								max="100"
								step="1"
								value={volume}
								onChange={handleVolumeChange}
								className='w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-grab active:cursor-grabbing focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900'
								style={{
									background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volume}%, #3f3f46 ${volume}%, #3f3f46 100%)`
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};