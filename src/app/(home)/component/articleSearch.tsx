"use client";

import { useState, useEffect } from 'react';
import { ArticleSearch_T } from "@/interface/dtos/news";

const ArticleSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [articles, setArticles] = useState<ArticleSearch_T.Article[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchArticles = async () => {
    if (!query) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/articleSearch?query=${encodeURIComponent(query)}&page=${page}`
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data: ArticleSearch_T.DTO = await res.json();
      setArticles((prev) => [...prev, ...data.response.docs]);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching articles.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setArticles([]); // Clear previous results
    setPage(0); // Reset to first page
    fetchArticles();
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 0) {
      fetchArticles();
    }
  }, [page]);

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