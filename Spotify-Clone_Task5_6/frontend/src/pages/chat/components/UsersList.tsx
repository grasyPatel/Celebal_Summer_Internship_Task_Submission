import UsersListSkeleton from "../../../components/skeletons/UsersListSkeleton";
import { useChatStore } from "../../../stores/useChatStore";

const UsersList = () => {
	const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();
	
	return (
		<div style={{ borderRight: '1px solid #27272a' }}>
			<div style={{ 
				display: 'flex', 
				flexDirection: 'column', 
				height: '100%' 
			}}>
				<div style={{
					height: 'calc(100vh - 280px)',
					overflowY: 'auto',
					scrollbarWidth: 'thin',
					scrollbarColor: '#4b5563 #1f2937'
				}}>
					<div style={{ 
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
						padding: '16px' 
					}}>
						{isLoading ? (
							<UsersListSkeleton />
						) : (
							users.map((user) => (
								<div
									key={user._id}
									onClick={() => setSelectedUser(user)}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '12px',
										padding: '12px',
										borderRadius: '8px',
										cursor: 'pointer',
										transition: 'background-color 0.2s',
										backgroundColor: selectedUser?.clerkId === user.clerkId ? '#27272a' : 'transparent'
									}}
									onMouseEnter={(e) => {
										if (selectedUser?.clerkId !== user.clerkId) {
											(e.target as HTMLElement).style.backgroundColor = '#101010';
										}
									}}
									onMouseLeave={(e) => {
										if (selectedUser?.clerkId !== user.clerkId) {
											(e.target as HTMLElement).style.backgroundColor = 'transparent';
										}
									}}
								>
									<div style={{ position: 'relative' }}>
										<div style={{
											width: '32px',
											height: '32px',
											borderRadius: '50%',
											backgroundColor: user.imageUrl ? 'transparent' : '#6b7280',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: '#ffffff',
											fontWeight: '600',
											fontSize: '14px',
											overflow: 'hidden',
											position: 'relative'
										}}
										className="md:w-12 md:h-12"
										>
											{user.imageUrl ? (
												<img 
													src={user.imageUrl} 
													alt={user.fullName}
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover'
													}}
												/>
											) : (
												user.fullName[0]
											)}
										</div>
										{/* online indicator */}
										<div
											style={{
												position: 'absolute',
												bottom: '0',
												right: '0',
												height: '12px',
												width: '12px',
												borderRadius: '50%',
												border: '2px solid #18181b',
												backgroundColor: onlineUsers.has(user.clerkId) ? '#22c55e' : '#6b7280'
											}}
										/>
									</div>
									<div style={{ 
										flex: '1', 
										minWidth: '0'
									}}
									className="hidden lg:block"
									>
										<span style={{ 
											fontWeight: '500',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											display: 'block',
											color: '#ffffff'
										}}>
											{user.fullName}
										</span>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersList;