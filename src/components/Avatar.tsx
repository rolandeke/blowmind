import Image from "next/image";

interface AvatarProps {
    src: string;
    className?: string;
    alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt= "User Avatar", className = "" }) => {
    return (
        <div className={`w-9 h-9 rounded-full overflow-hidden border dark:border-gray-600 ${className}`}>
            <Image 
                src={src || "/default-avatar.png"} 
                alt={alt} 
                className={`object-cover ${className}`} 
            />
        </div>
    );
};

export default Avatar;