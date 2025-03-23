import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

const topics = [
  "crop diseases India",
  "pest outbreak India",
  "farming weather alerts India",
  "agriculture crisis India",
];

const fetchNews = async (query) => {
  const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.articles || [];
};

app.get("/api/news", async (req, res) => {
  try {
    let allNews = [];
    for (const topic of topics) {
      const news = await fetchNews(topic);
      allNews = [...allNews, ...news];
    }
    res.json(allNews.slice(0, 10)); // Limit to 10 articles
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
