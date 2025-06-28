import { useChatStore } from "../../../stores/useChatStore";

const ChatHeader = () => {
	const { selectedUser, onlineUsers } = useChatStore();
	
	if (!selectedUser) return null;
	
	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			padding: '12px',
			borderBottom: '1px solid #e5e7eb',
			backgroundColor: '#0000'
		}}>
			<div style={{
				display: 'flex',
				alignItems: 'center',
				gap: '12px'
			}}>
				<div style={{
					width: '40px',
					height: '40px',
					borderRadius: '50%',
					backgroundColor: selectedUser.imageUrl ? 'transparent' : '#6b7280',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: '#ffffff',
					fontWeight: '600',
					fontSize: '16px',
					overflow: 'hidden',
					position: 'relative'
				}}>
					{selectedUser.imageUrl ? (
						<img 
							src={selectedUser.imageUrl} 
							alt={selectedUser.fullName}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover'
							}}
						/>
					) : (
						selectedUser.fullName[0]
					)}
				</div>
				
				<div>
					<div style={{
						fontSize: '16px',
						fontWeight: '600',
						color: '',
						marginBottom: '2px'
					}}>
						{selectedUser.fullName}
					</div>
					<div style={{
						fontSize: '14px',
						color: onlineUsers.has(selectedUser.clerkId) ? '#10b981' : '#6b7280'
					}}>
						{onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;