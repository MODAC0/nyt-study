"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArticleSearch_T } from "@/interface/dtos/news";

const ArticleDetail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const articleId = searchParams.get('id');

    const [article, setArticle] = useState<ArticleSearch_T.Article | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 특정 기사 데이터 요청
    const fetchArticle = async (id: string) => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/articleDetail?id=${encodeURIComponent(id)}`);
            if (!res.ok) throw new Error(`Error: ${res.statusText}`);

            const data: { response: { docs: ArticleSearch_T.Article[] } } = await res.json();
            setArticle(data.response.docs[0]); // 첫 번째 기사 정보
        } catch (err: any) {
            setError(err.message || "An error occurred while fetching the article.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (articleId) fetchArticle(articleId);
    }, [articleId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!article) return <p>No article found.</p>;

    return (
        <div>
            <h1>{article.headline?.main}</h1>
            <p>{article.snippet}</p>
            <p>Published on: {article.pub_date}</p>
            <a href={article.web_url} target="_blank" rel="noopener noreferrer">
                Read full article
            </a>
        </div>
    );
};

export default ArticleDetail;
