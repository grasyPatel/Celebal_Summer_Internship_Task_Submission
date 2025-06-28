import { usePlayerStore } from "../../../stores/usePlayerStore";
import { Song } from "../../../types/index";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;

	const handlePlay = () => {
		if (isCurrentSong) togglePlay();
		else setCurrentSong(song);
	};

	return (
		<button
			onClick={handlePlay}
			className="p-3 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all text-black"
		>
			{isCurrentSong && isPlaying ? (
				<Pause className="size-5" />
			) : (
				<Play className="size-5" />
			)}
		</button>
	);
};

export default PlayButton;