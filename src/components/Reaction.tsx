import React from "react";
import { Timestamp } from "../utils/firebaseConfig"
import Link from "next/link"
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../context/AuthContext";
import useTheme from "../hooks/useTheme";
import { Post, Like } from "../Types";





interface ReactionProps {
    post: Post;
}


const Reaction: React.FC<ReactionProps> = ({ post }) => {
    const { updateDocument, response } = useFirestore("post");
    const { user } = useAuthContext();
    const { state: { color } } = useTheme();
    const localColor = localStorage.getItem("color");

    const like = post.likes.filter((like) => like.uid === user?.uid);

    const handleLike = async () => {
        const likeToAdd: Like = {
            id: Math.floor(Math.random() * 10000000),
            displayName: user?.displayName!,
            photoURL: user?.photoURL!,
            createdAt: Timestamp.fromDate(new Date()),
            uid: user?.uid!,
        };

        if (like.length && like[0].uid === user?.uid) {
            console.log("you already like this post");
        } else {
            await updateDocument(post.id, {
                likes: [...post.likes, likeToAdd],
            });
        }
    };

    return (
        <div className="flex justify-between items-center mt-2">
           <Link href={`/posts/${post.id}`} className="flex items-center
            gap-2 p-2 text-gray-800 dark:text-gray-200">
                <i className="fas fa-comments"></i>
                <span className="text-sm">{post.comments.length}</span>
            </Link>

            <button className="flex items-center gap-2 p-2 text-gray-800 dark:text-gray-200" onClick={handleLike}>
                {like.length && like[0].uid === user?.uid ? (
                    <i className="fas fa-heart text-red-600"></i>
                ) : (
                    <i className="far fa-heart"></i>
                )}
                <span className="text-sm">{post.likes.length}</span>
            </button>

            <div className="flex items-center gap-2 p-2 text-gray-800 dark:text-gray-200">
                <i className="fas fa-eye"></i>
                <span className="text-sm">{post.views.length}</span>
                <span className="text-sm hidden md:inline">views</span>
            </div>
        </div>
    );
};

export default Reaction;