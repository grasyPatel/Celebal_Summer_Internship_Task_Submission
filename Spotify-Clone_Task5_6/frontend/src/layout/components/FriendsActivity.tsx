import { useEffect, ReactNode } from "react";
import { useChatStore } from "../../stores/useChatStore";
import { Headphones, Users, Music } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

interface ScrollAreaProps {
  className?: string;
  children?: ReactNode;
}

interface AvatarProps {
  className?: string;
  children?: ReactNode;
}

interface AvatarImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

const ScrollArea = ({ className = "", children }: ScrollAreaProps) => (
  <div className={`overflow-auto ${className}`}>{children}</div>
);

const Avatar = ({ className = "", children }: AvatarProps) => (
  <div className={`relative inline-flex ${className}`}>{children}</div>
);

const AvatarImage = ({
  src = "",
  alt = "",
  className = "",
}: AvatarImageProps) => {
  if (!src) return null;
  
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover rounded-full ${className}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
      }}
    />
  );
};

export const FriendsActivity = () => {
  const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col mr-2">
      <div className="p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0 text-zinc-400" />
          <h2 className="font-semibold text-white">
            What they're listening to
          </h2>
        </div>
      </div>

      {!user && <LoginPrompt />}

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {users.map((user) => {
            console.log("All userActivities:", Array.from(userActivities.entries()));

            const activity = userActivities.get(user.clerkId);
            
            // Fix: Check if activity exists and is not "Idle"
            const isPlaying = activity && activity !== "Idle" && activity.startsWith("Playing ");
            const isOnline = onlineUsers.has(user.clerkId);
            
            return (
              <div
                key={user._id || user.clerkId}
                className="cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="size-12 rounded-full p-[2px] bg-zinc-700">
                      <Avatar className="size-11 bg-zinc-900 rounded-full">
                        <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      </Avatar>
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 ${
                        isOnline ? "bg-green-500" : "bg-zinc-600"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white">
                        {user.fullName}
                      </span>
                      {isPlaying && <Music className="h-4 w-4 text-green-500" />}
                    </div>
                    {isPlaying ? (
                      <div className="mt-1">
                        {(() => {
                          // Parse the activity string more safely
                          const activityText = activity.replace("Playing ", "");
                          const parts = activityText.split(" by ");
                          const songTitle = parts[0] || "Unknown Song";
                          const artist = parts[1] || "Unknown Artist";
                          
                          return (
                            <>
                              <div className="text-sm text-white font-medium truncate">
                                {songTitle}
                              </div>
                              <div className="text-xs text-zinc-400 truncate">
                                by {artist}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="mt-1 text-xs text-zinc-400">
                        {activity || "Idle"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

const LoginPrompt = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center p-6 text-center space-y-4">
      <div className="relative">
        {/* Glow effect background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg opacity-75 animate-pulse"></div>

        {/* Main icon container */}
        <div className="relative bg-zinc-900 rounded-full p-4">
          <Headphones className="size-8 text-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Text content */}
      <div className="space-y-2 max-w-[250px]">
        <h3 className="text-lg font-semibold text-white">
          See What Friends Are Playing
        </h3>
        <p className="text-sm text-zinc-400">
          Login to discover what music your friends are playing right now
        </p>
      </div>
    </div>
  );
};