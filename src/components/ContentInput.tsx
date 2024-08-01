import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../context/AuthContext";
import { ChangeEvent, FormEvent, useState } from "react";

    


interface ContentInputProps {
    post: Post;
}

interface Comment {
    displayName: string;
    photoURL: string;
    content: string;
    createdAt: any;
    id: any;
}

interface Post {
    id: string;
    comments: Comment[];
}

export default function ContentInput({  post }: ContentInputProps) {
    const { updateDocument, response} = useFirestore("posts");
    const { user } =useAuthContext();

    const [newComment, setNewComment] = useState("");
    const [newPost, setNewPost] = useState("")

    const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commentToAdd: Comment = {
            displayName: user?.displayName!,
            photoURL: user?.photoURL!,
            content: newComment,
            createdAt: new Date(),
            id: Math.random(),
        };

        await updateDocument(post.id, {
            comments: [...post.comments, commentToAdd],
        });

        if (!response.error) {
            setNewComment("");
        }
    };

    const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const postToAdd: Post = {
            id: Math.random().toString(),
            comments:[],
        };

        await updateDocument(postToAdd.id, {
            content: newPost,
            displayName: user?.displayName!,
            photoURL: user?.photoURL!,
            createdAt: new Date(),
        });

        if (!response.error) {
            setNewPost("")
        }

    }


    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    };

    const handlePostChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPost(e.target.value);
    };


    return (
        <div>
            <form className="w-full" onSubmit={handleCommentSubmit}>
                <input 
                    type="text"
                    placeholder="Leave a comment"
                    required
                    onChange={handleCommentChange}
                    value={newComment}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full border-none outline-none w-full text-gray-800 dark:text-gray-200"
                />
            </form>
            <form className="w-fll mt-4" onSubmit={handlePostSubmit}>
                <input 
                    type="text"
                    placeholder="Write a Post"
                    required
                    onChange={handlePostChange}
                    value={newPost}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full border-none outline-none w-full text-gray-800 dark:text-gray-200" 
                />
            </form>
        </div>
    )
}