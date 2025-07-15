import { usePlayerStore } from "../../stores/usePlayerStore";
import { useEffect, useRef, useState } from "react";

const AudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const prevSongRef = useRef<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { currentSong, isPlaying, playNext } = usePlayerStore();

	// handle song changes
	useEffect(() => {
		if (!audioRef.current || !currentSong) return;

		const audio = audioRef.current;

		// check if this is actually a new song
		const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
		if (isSongChange) {
			setIsLoading(true);
			
			// Pause current playback before changing source
			audio.pause();
			
			audio.src = currentSong?.audioUrl;
			audio.currentTime = 0;
			prevSongRef.current = currentSong?.audioUrl;
		}
	}, [currentSong]);

	// handle audio events
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleCanPlay = () => {
			setIsLoading(false);
			// Only play if the store says we should be playing
			if (isPlaying) {
				audio.play().catch((error) => {
					console.error('Play failed:', error);
					// Update store to reflect actual state
					usePlayerStore.setState({ isPlaying: false });
				});
			}
		};

		const handleLoadStart = () => {
			setIsLoading(true);
		};

		const handleEnded = () => {
			playNext();
		};

		const handleError = (e:any) => {
			console.error('Audio error:', e);
			setIsLoading(false);
			usePlayerStore.setState({ isPlaying: false });
		};

		audio.addEventListener("canplay", handleCanPlay);
		audio.addEventListener("loadstart", handleLoadStart);
		audio.addEventListener("ended", handleEnded);
		audio.addEventListener("error", handleError);

		return () => {
			audio.removeEventListener("canplay", handleCanPlay);
			audio.removeEventListener("loadstart", handleLoadStart);
			audio.removeEventListener("ended", handleEnded);
			audio.removeEventListener("error", handleError);
		};
	}, [playNext, isPlaying]);

	// handle play/pause logic - separate from song changes
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !currentSong || isLoading) return;

		if (isPlaying) {
			audio.play().catch((error) => {
				console.error('Play failed:', error);
				usePlayerStore.setState({ isPlaying: false });
			});
		} else {
			audio.pause();
		}
	}, [isPlaying, currentSong, isLoading]);

	return <audio ref={audioRef} preload="metadata" />;
};

export default AudioPlayer;