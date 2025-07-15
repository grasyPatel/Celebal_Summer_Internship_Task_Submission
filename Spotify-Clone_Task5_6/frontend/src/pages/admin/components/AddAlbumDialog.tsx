import { axiosInstance } from "../../../lib/axios";
import { Plus, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddAlbumDialog = () => {
	const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [newAlbum, setNewAlbum] = useState({
		title: "",
		artist: "",
		releaseYear: new Date().getFullYear(),
	});

	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!imageFile) {
				return toast.error("Please upload an image");
			}

			const formData = new FormData();
			formData.append("title", newAlbum.title);
			formData.append("artist", newAlbum.artist);
			formData.append("releaseYear", newAlbum.releaseYear.toString());
			formData.append("imageFile", imageFile);

			await axiosInstance.post("/admin/albums", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setNewAlbum({
				title: "",
				artist: "",
				releaseYear: new Date().getFullYear(),
			});
			setImageFile(null);
			setAlbumDialogOpen(false);
			toast.success("Album created successfully");
		} catch (error: any) {
			toast.error("Failed to create album: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setAlbumDialogOpen(false);
		}
	};

	return (
		<>
			{/* Trigger Button */}
			<button
				onClick={() => setAlbumDialogOpen(true)}
				className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-violet-500 text-white hover:bg-violet-600 h-10 px-4 py-2"
			>
				<Plus className="mr-2 h-4 w-4" />
				Add Album
			</button>

			{/* Dialog Overlay */}
			{albumDialogOpen && (
				<div
					className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
					onClick={handleBackdropClick}
				>
					{/* Dialog Content */}
					<div className="relative bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-hidden">
						{/* Close Button */}
						<button
							onClick={() => setAlbumDialogOpen(false)}
							className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
						>
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</button>

						{/* Header */}
						<div className="p-6 pb-4">
							<h2 className="text-lg font-semibold leading-none tracking-tight text-white">
								Add New Album
							</h2>
							<p className="text-sm text-zinc-400 mt-2">
								Add a new album to your collection
							</p>
						</div>

						{/* Content */}
						<div className="px-6 pb-4">
							<div className="space-y-4 py-4">
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleImageSelect}
									accept="image/*"
									className="hidden"
								/>
								<div
									className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600 transition-colors"
									onClick={() => fileInputRef.current?.click()}
								>
									<div className="text-center">
										<div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
											<Upload className="h-6 w-6 text-zinc-400" />
										</div>
										<div className="text-sm text-zinc-400 mb-2">
											{imageFile ? imageFile.name : "Upload album artwork"}
										</div>
										<button
											type="button"
											className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-700 bg-transparent hover:bg-zinc-800 hover:text-white h-8 px-3"
										>
											Choose File
										</button>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white">Album Title</label>
									<input
										type="text"
										value={newAlbum.title}
										onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
										className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
										placeholder="Enter album title"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white">Artist</label>
									<input
										type="text"
										value={newAlbum.artist}
										onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
										className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
										placeholder="Enter artist name"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white">Release Year</label>
									<input
										type="number"
										value={newAlbum.releaseYear}
										onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })}
										className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
										placeholder="Enter release year"
										min={1900}
										max={new Date().getFullYear()}
									/>
								</div>
							</div>
						</div>

						{/* Footer */}
						<div className="flex justify-end space-x-2 p-6 pt-0">
							<button
								onClick={() => setAlbumDialogOpen(false)}
								disabled={isLoading}
								className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-700 bg-transparent hover:bg-zinc-800 hover:text-white h-10 px-4 py-2 text-white"
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								disabled={isLoading || !imageFile || !newAlbum.title || !newAlbum.artist}
								className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-violet-500 text-white hover:bg-violet-600 h-10 px-4 py-2"
							>
								{isLoading ? "Creating..." : "Add Album"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AddAlbumDialog;