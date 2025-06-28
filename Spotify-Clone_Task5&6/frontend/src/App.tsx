
import{Route, Routes} from "react-router-dom"
import HomePage from './pages/home/HomePage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import ChatPage from './pages/chat/ChatPage'
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";
import { useChatStore } from "../src/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";






const App = () => {
	const { user } = useUser();
const { initSocket } = useChatStore();

useEffect(() => {
	if (user) {
		initSocket(user.id); // 👈 This MUST be called
	}
}, [user]);


  return (
   <>
   <Routes>
				<Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
				<Route path='/auth-callback' element={<AuthCallbackPage />} />
				<Route path='/admin' element={<AdminPage />} />

				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					
				</Route>
			</Routes>
			<Toaster />
   
   </>
  )
}

export default App