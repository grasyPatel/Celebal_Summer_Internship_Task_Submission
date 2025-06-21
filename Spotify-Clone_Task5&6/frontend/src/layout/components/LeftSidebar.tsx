
import { Link } from "react-router-dom";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { Box, Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import PlaylistSkeleton from "../../components/skeletons/PlaylistSkeleton";
import {useMusicStore} from "../../stores/useMusicStore"
import {useEffect} from "react";

const StyledButton = styled(Button)<
  ButtonProps & { component?: any; to?: string }
>(({ theme }) => ({
  width: "100%",
  justifyContent: "flex-start",
  color: "white",
  textTransform: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#27272a", // zinc-800 equivalent
  },
  "& .MuiButton-startIcon": {
    marginRight: "8px",
  },
  "& .hidden-md": {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inline",
    },
  },
}));

const ScrollArea = styled(Box)({
  height: "calc(100vh - 300px)",
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#52525b", // zinc-600 equivalent
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#71717a", // zinc-500 equivalent
  },
});

const LeftSidebar = () => {
  
  const { isSignedIn } = useAuth();
  const { albums,fetchAlbums,isLoading}=useMusicStore();
  useEffect(()=>{
    fetchAlbums()

  },[fetchAlbums])
  
  return (
    <Box className="h-full flex flex-col gap-2">
      <Box className="rounded-lg bg-zinc-900 p-4">
        <StyledButton
          component={Link}
          to="/"
          startIcon={<HomeIcon className="size-5" />}
        >
          <span className="hidden-md">Home</span>
        </StyledButton>

        {isSignedIn ? (
          <StyledButton
            component={Link}
            to="/chat"
            startIcon={<MessageCircle className="size-5" />}
          >
            <span className="hidden-md">Messages</span>
          </StyledButton>
        ) : null}
      </Box>

      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">PlayLists</span>
          </div>
        </div>
        
        <ScrollArea>
          <div className="space-y-2">
            {isLoading ? <PlaylistSkeleton /> : (
               albums.map((album)=>(
                <Link to={`/albums/${album._id}`}
                key={album._id}
                className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3  group cursor-pointer">
                    <img src={album.imageUrl} alt="PlayList-Image" className="size-12 rounded-md flex-shrink-0 object-cover"/>
                    <div className="flex-1 min-w-0 hidden md:block">
                        <p className="font-medium truncate">
                            {album.title}
                        </p>
                        <p className="text-sm text-zinc-400 truncate">
                            Album  &#x25CF; {album.artist}
                        </p>
                    </div>

                </Link>
               )) 
            )}
          </div>
        </ScrollArea>
      </div>
    </Box>
  );
};

export default LeftSidebar;