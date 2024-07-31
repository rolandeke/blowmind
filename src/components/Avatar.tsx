import Image from "next/image";

interface AvatarProps {
    src: string;
    className?: string;
}

const Avatar = ({ src, className = "" }: AvatarProps) => {
    return (
        <div className="{`w-9 h-9 rounded-full overflow-hidden border dark:border-gray-600 ${className}`}">
            <Image src={src} alt="user avatar" className="w-full h-full object-cover" />
        </div>
    );
};

export default Avatar;