import { useChatStore } from "../../../stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const { user } = useUser();
	const { selectedUser, sendMessage } = useChatStore();
	
	const handleSend = () => {
		if (!selectedUser || !user || !newMessage) return;
		sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
		setNewMessage("");
	};
	
	return (
		<div style={{
			padding: '16px',
			marginTop: 'auto',
			borderTop: '1px solid #27272a',
		}}>
			<div style={{
				display: 'flex',
				gap: '8px'
			}}>
				<input
					placeholder='Type a message'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					style={{
						backgroundColor: '#27272a',
						border: 'none',
						padding: '8px 12px',
						borderRadius: '6px',
						color: '#ffffff',
						flex: '1',
						outline: 'none',
						fontSize: '14px'
					}}
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>
				<button 
					onClick={handleSend} 
					disabled={!newMessage.trim()}
					style={{
						width: '40px',
						height: '40px',
						borderRadius: '6px',
						border: 'none',
						backgroundColor: !newMessage.trim() ? '#4b5563' : '#3b82f6',
						color: '#ffffff',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: !newMessage.trim() ? 'not-allowed' : 'pointer',
						opacity: !newMessage.trim() ? '0.6' : '1'
					}}
				>
					<Send className='size-4' />
				</button>
			</div>
		</div>
	);
};

export default MessageInput;