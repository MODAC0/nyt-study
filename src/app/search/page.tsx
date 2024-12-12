"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArticleSearch_T } from "@/interface/dtos/news";

const SearchPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL에서 query와 page 파라미터 가져오기
    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page")) || 0;

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

    useEffect(() => {
        fetchArticles(query as string, Number(page));
    }, [query, page]);

    const handleSearch = (newQuery: string) => {
        router.push(`/search?query=${encodeURIComponent(newQuery)}&page=0`);
    };

    const loadMore = () => {
        const nextPage = Number(page || 0) + 1;
        router.push(`/search?query=${encodeURIComponent(query as string)}&page=${nextPage}`);
    };

    const detailTest = async (id: string) => {
        console.log(id);
        try {
            const res = await fetch(`/api/articleDetail?id=${id}`);
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            <input
                type="text"
                placeholder="Search articles..."
                defaultValue={query || ""}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch((e.target as HTMLInputElement).value);
                }}
            />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                {articles.map((article) => (
                    <div key={article._id} style={{ marginBottom: "20px" }}>
                        <h2>{article.headline?.main}</h2>
                        <p>{article.snippet}</p>
                        <p onClick={() => detailTest(article._id)}>
                            Read more
                        </p>
                    </div>
                ))}
            </div>
            {articles.length > 0 && (
                <button onClick={loadMore} disabled={loading}>
                    {loading ? "Loading..." : "Load More"}
                </button>
            )}
        </div>
    );
};

export default SearchPage;
