import Topbar from "../../components/Topbar";
import { useChatStore } from "../../stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";

const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const ChatPage = () => {
	
	const { user } = useUser();
	const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();
	
	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);
	
	useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId);
	}, [selectedUser, fetchMessages]);
	
	console.log({ messages });
	
	return (
		<main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
			<Topbar />
			<div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
				<UsersList />
				{/* chat message */}
				<div className='flex flex-col h-full'>
					{selectedUser ? (
						<>
							<ChatHeader />
							{/* Messages */}
							<div style={{
								height: 'calc(100vh - 340px)',
								overflowY: 'auto',
								scrollbarWidth: 'thin',
								scrollbarColor: '#4b5563 #1f2937'
							}}>
								<div style={{
									padding: '16px',
									display: 'flex',
									flexDirection: 'column',
									gap: '16px'
								}}>
									{messages.map((message) => (
										<div
											key={message._id}
											style={{
												display: 'flex',
												alignItems: 'flex-start',
												gap: '12px',
												flexDirection: message.senderId === user?.id ? 'row-reverse' : 'row'
											}}
										>
											<div style={{
												width: '32px',
												height: '32px',
												borderRadius: '50%',
												overflow: 'hidden',
												backgroundColor: '#6b7280',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												color: '#ffffff',
												fontWeight: '600',
												fontSize: '14px'
											}}>
												{(message.senderId === user?.id
													? user.imageUrl
													: selectedUser.imageUrl) ? (
													<img 
														src={message.senderId === user?.id
															? user.imageUrl
															: selectedUser.imageUrl}
														alt="Avatar"
														style={{
															width: '100%',
															height: '100%',
															objectFit: 'cover'
														}}
													/>
												) : (
													<span>
														{message.senderId === user?.id 
															? user?.fullName?.[0] || user?.firstName?.[0] || 'U'
															: selectedUser.fullName[0]
														}
													</span>
												)}
											</div>
											<div
												style={{
													borderRadius: '8px',
													padding: '12px',
													maxWidth: '70%',
													backgroundColor: message.senderId === user?.id ? '#22c55e' : '#27272a',
													color: '#ffffff'
												}}
											>
												<p style={{ 
													fontSize: '14px',
													margin: '0 0 4px 0'
												}}>
													{message.content}
												</p>
												<span style={{
													fontSize: '12px',
													color: '#d4d4d8',
													display: 'block'
												}}>
													{formatTime(message.createdAt)}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
							<MessageInput />
						</>
					) : (
						<NoConversationPlaceholder />
					)}
				</div>
			</div>
		</main>
	);
};

export default ChatPage;

const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<img src='/logo.png' alt='Spotify' className='size-16 animate-bounce' />
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
			<p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
		</div>
	</div>
);