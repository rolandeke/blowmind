export const useReadTime = () => {
    const averageReadingSpeed = 200;

    const calculateReadingTime = (text: string): string => {
        const trimmedText = text.trim();

        const words = trimmedText.split(/\s+/);
        const wordCount = words.length || 0;
        const minutes = Math.ceil(wordCount / averageReadingSpeed);


        return wordCount <50 ? "less than a min read" : `${minutes} min read`;
    };

    return { calculateReadingTime };
};