import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarProps {
  name: string;
  avatar?: string;
  className?: string;
}
// Function to generate initials from the user's name
const getInitials = (fullName: string): string => {
  return fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const UserAvatar: React.FC<UserAvatarProps> = ({ name, avatar, className }) => {

  return (
    <Avatar className={`h-8 w-8 rounded-lg ${className || ""}`}>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="rounded-lg">{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;