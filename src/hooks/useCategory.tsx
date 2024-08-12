import { useState } from "react";


interface useCategoryReturn {
    category: (postContent: string) => Promise<string[] | undefined>;
    error: string | null;
    isPending: boolean;
}



export const useCategory = (): useCategoryReturn => {
    const [error, setError] = useState<any>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const category = async (
        postContent: string
    ): Promise<string[] | undefined> => {
        setIsPending(true);
        setError(null);

        const formdata = new FormData();
        formdata.append("key", "ea562b0b663a539149517f8d7450ae3f");
        formdata.append("txt", postContent);
        formdata.append("model", "IPTC_en");

        const requestOptions: RequestInit = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        try {
            const response = await fetch(
                "https://api.meaningcloud.com/class-2.0",
                requestOptions
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.category_list && data.category_list.length > 0) {
                return data.category_list[0].label.split(/-|,/);
            } else {
                throw new Error("No categories found")
            }
        } catch (error: any) {
            console.error("Error fetching categories:", error);
            setError(error.message || "Unknown error occurred");
        } finally {
            setIsPending(false);
        }
    };

    return { category, error, isPending }
};