import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import { Bookmark, Post } from "../Types";


interface ConfirmProps {
    title: string;
    item: string;
    type: string;
    setIsConfirm: (isConfirm: boolean) => void;
    post: Post;
}

export default function Confirm ({
    title,
    item,
    type,
    setIsConfirm,
    post,
} : ConfirmProps) {
    const { deleteDocument: deletePostDoc, response: postResponse } = useFirestore("posts");
    const { deleteDocument: deleteBookmarkDoc, response: bookmarkResponse } = useFirestore("bookmarks");
    const { documents } = useCollection<Bookmark>("bookmarks")

    const bookmarks: Bookmark[] = documents?.filter((document: Bookmark) => document.postId === post.id) || [];

    const handleDelete = async () => {
        await deletePostDoc(post.id);
        if(bookmarks.length > 0) {
            await deleteBookmarkDoc(bookmarks[0].id);
            if (!bookmarkResponse.error) {
                console.log("bookmark deleted");
            }
        }
        if (!postResponse.error) {
            console.log("Post deleted successfully")
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p>Are you sure you want to {type} this {item}</p>
                <p className="text-red-500 mt-2">You can not undo this action.</p>
                <div className="mt-4 flex items-center justify-center">
                    <div className="flex items-center text-yellow-500">
                        <i className="fas fa-exclamation-triangle"></i>
                        <h4 className="ml-2 font-bold">Warning</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Deleting this post will also remove it from bookmarks and all reference.</p>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                    <button 
                        onClick={() => setIsConfirm(false)} 
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Cancel
                    </button>
                    {!postResponse.isPending && (
                        <button onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                            Delete
                        </button>
                    )}
                    {postResponse.isPending && (
                        <button 
                            className="bg-red-600 text-white py-2 px-4 rounded" 
                            disabled
                        >
                            Deleting...
                        </button>
                    )}
                </div>
            </div>
        </div>
    )


}