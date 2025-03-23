import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="news-container">
      <h2>Latest Farming News</h2>
      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <img
              src={article.urlToImage || "https://via.placeholder.com/150"}
              alt="News"
            />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
