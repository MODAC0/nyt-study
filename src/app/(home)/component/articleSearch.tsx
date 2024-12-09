"use client";

import { useState, useEffect } from 'react';

export interface Article {
  _id: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  abstract: string;
  headline: {
    main: string;
    kicker?: string;
    content_kicker?: string;
    print_headline?: string;
    name?: string;
    seo?: string;
    sub?: string;
  };
  pub_date: string;
  byline: {
    original?: string;
    person?: {
      firstname?: string;
      middlename?: string;
      lastname?: string;
      qualifier?: string;
      title?: string;
      role?: string;
      organization?: string;
      rank?: number;
    }[];
  };
  multimedia: {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption?: string;
    copyright?: string;
  }[];
  section_name?: string;
  subsection_name?: string;
}

export interface ArticleSearchResponse {
  response: {
    docs: Article[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

const ArticleSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
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

      const data: ArticleSearchResponse = await res.json();
      console.log(data);
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