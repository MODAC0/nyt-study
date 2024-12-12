"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArticleSearch_T } from "@/interface/dtos/news";

const ArticleSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 초기 상태를 URL에서 가져오기
  const initialQuery = searchParams.get("query") || "";
  const initialPage = Number(searchParams.get("page")) || 0;

  const [query, setQuery] = useState<string>(initialQuery);
  const [articles, setArticles] = useState<ArticleSearch_T.Article[]>([]);
  const [page, setPage] = useState<number>(initialPage);
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

  const handleSearch = () => {
    // 검색 시 URL 업데이트
    router.push(`/search?query=${encodeURIComponent(query)}&page=0`);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    router.push(`/search?query=${encodeURIComponent(query)}&page=${nextPage}`);
  };

  // URL 쿼리가 변경될 때 실행
  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    const currentPage = Number(searchParams.get("page")) || 0;

    if (currentQuery) {
      setQuery(currentQuery);
      setPage(currentPage);
      fetchArticles(currentQuery, currentPage);
    }
  }, [searchParams]);

  return (
    <div>
      <h1>New York Times Article Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {articles.map((article) => (
          <div key={article._id} style={{ marginBottom: "20px" }}>
            <h2>{article.headline?.main}</h2>
            <p>{article.snippet}</p>
            <a href={article.web_url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
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

export default ArticleSearch;
