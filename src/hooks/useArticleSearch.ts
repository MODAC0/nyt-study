import { ArticleSearch_T } from "@/interface/dtos/news";
import { useState } from "react";

export function useArticleSearch(initialQuery: string, initialPage: number) {
    const [articles, setArticles] = useState<ArticleSearch_T.Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchArticles = async (searchQuery: string, searchPage: number) => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                `/api/articleSearch?query=${encodeURIComponent(searchQuery)}&page=${searchPage}`
            );
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            const data: ArticleSearch_T.DTO = await res.json();
            setArticles((prev) =>
                searchPage === 0 ? data.response.docs : [...prev, ...data.response.docs]
            );
        } catch (err: any) {
            setError(err.message || "An error occurred while fetching articles.");
        } finally {
            setLoading(false);
        }
    };

    return { articles, loading, error, fetchArticles };
}