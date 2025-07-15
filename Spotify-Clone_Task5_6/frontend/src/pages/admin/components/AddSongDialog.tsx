import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";
import { useMusicStore } from "../../../stores/useMusicStore";


interface NewSong {
	title: string;
	artist: string;
	album: string;
	duration: string;
}

const AddSongDialog = () => {
	
	const { albums } = useMusicStore();
	const [songDialogOpen, setSongDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [newSong, setNewSong] = useState<NewSong>({
		title: "",
		artist: "",
		album: "",
		duration: "0",
	});

	const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
		audio: null,
		image: null,
	});

	const audioInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!files.audio || !files.image) {
				return toast.error("Please upload both audio and image files");
			}

			const formData = new FormData();

			formData.append("title", newSong.title);
			formData.append("artist", newSong.artist);
			formData.append("duration", newSong.duration);
			if (newSong.album && newSong.album !== "none") {
				formData.append("albumId", newSong.album);
			}

			formData.append("audioFile", files.audio);
			formData.append("imageFile", files.image);

			await axiosInstance.post("/admin/songs", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setNewSong({
				title: "",
				artist: "",
				album: "",
				duration: "0",
			});

			setFiles({
				audio: null,
				image: null,
			});
			toast.success("Song added successfully");
		} catch (error: any) {
			toast.error("Failed to add song: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div>
			{/* Trigger Button */}
			<button 
				onClick={() => setSongDialogOpen(true)}
				className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-black hover:bg-emerald-600 h-10 px-4 py-2"
			>
				<Plus className='mr-2 h-4 w-4' />
				Add Song
			</button>

			{/* Dialog Overlay */}
			{songDialogOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					{/* Backdrop */}
					<div 
						className="fixed inset-0 bg-black bg-opacity-80"
						onClick={() => setSongDialogOpen(false)}
					/>
					
					{/* Dialog Content */}
					<div className="relative bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg w-full max-w-lg mx-4 max-h-[80vh] overflow-auto">
						{/* Header */}
						<div className="flex flex-col space-y-1.5 p-6">
							<h2 className="text-lg font-semibold leading-none tracking-tight text-white">
								Add New Song
							</h2>
							<p className="text-sm text-zinc-400">
								Add a new song to your music library
							</p>
						</div>

						{/* Body */}
						<div className="p-6 pt-0">
							<div className='space-y-4 py-4'>
								<input
									type='file'
									accept='audio/*'
									ref={audioInputRef}
									hidden
									onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
								/>

								<input
									type='file'
									ref={imageInputRef}
									className='hidden'
									accept='image/*'
									onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
								/>

								{/* Image upload area */}
								<div
									className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600 transition-colors'
									onClick={() => imageInputRef.current?.click()}
								>
									<div className='text-center'>
										{files.image ? (
											<div className='space-y-2'>
												<div className='text-sm text-emerald-500'>Image selected:</div>
												<div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
											</div>
										) : (
											<>
												<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
													<Upload className='h-6 w-6 text-zinc-400' />
												</div>
												<div className='text-sm text-zinc-400 mb-2'>Upload artwork</div>
												<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-700 bg-transparent hover:bg-zinc-700 hover:text-white h-8 px-3 py-1  text-zinc-300">
													Choose File
												</button>
											</>
										)}
									</div>
								</div>

								{/* Audio upload */}
								<div className='space-y-2'>
									<label className='text-sm font-medium text-white'>Audio File</label>
									<div className='flex items-center gap-2'>
										<button 
											onClick={() => audioInputRef.current?.click()}
											className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-700 bg-transparent hover:bg-zinc-700 hover:text-white h-10 px-4 py-2 w-full text-zinc-300"
										>
											{files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
										</button>
									</div>
								</div>

								{/* Title field */}
								<div className='space-y-2'>
									<label className='text-sm font-medium text-white'>Title</label>
									<input
										type="text"
										value={newSong.title}
										onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
										className='flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white'
									/>
								</div>

								{/* Artist field */}
								<div className='space-y-2'>
									<label className='text-sm font-medium text-white'>Artist</label>
									<input
										type="text"
										value={newSong.artist}
										onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
										className='flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white'
									/>
								</div>

								{/* Duration field */}
								<div className='space-y-2'>
									<label className='text-sm font-medium text-white'>Duration (seconds)</label>
									<input
										type='number'
										min='0'
										value={newSong.duration}
										onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
										className='flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white'
									/>
								</div>

								{/* Album select */}
								<div className='space-y-2'>
									<label className='text-sm font-medium text-white'>Album (Optional)</label>
									<select
										value={newSong.album}
										onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
										className='flex h-10 w-full items-center justify-between rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white'
									>
										<option value="">Select album</option>
										<option value='none'>No Album (Single)</option>
										{albums.map((album) => (
											<option key={album._id} value={album._id}>
												{album.title}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>

						{/* Footer */}
						<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6">
							<button 
								onClick={() => setSongDialogOpen(false)} 
								disabled={isLoading}
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-700 bg-transparent hover:bg-zinc-700 hover:text-white h-10 px-4 py-2 mt-2 sm:mt-0 text-zinc-300"
							>
								Cancel
							</button>
							<button 
								onClick={handleSubmit} 
								disabled={isLoading}
								className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2"
							>
								{isLoading ? "Uploading..." : "Add Song"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddSongDialog;