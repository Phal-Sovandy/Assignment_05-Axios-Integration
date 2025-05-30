import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [filterJournalistId, setFilterJournalistId] = useState(-1);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    axios
      .get("http://localhost:3000/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err.message));
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    axios
      .get("http://localhost:3000/journalists")
      .then((res) => setJournalists(res.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter"
          onChange={(e) => setFilterJournalistId(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map((journalist) => (
            <option value={journalist.id}>{journalist.name}</option>
          ))}
        </select>

        <button
          onClick={async () => {
            // Logic to apply filters
            try {
              const filteredData = await axios.get(
                `http://localhost:3000/journalists/${filterJournalistId}/articles`
              );
              setArticles(filteredData.data);
            } catch (err) {
              console.error(err.message);
            }
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            // Logic to reset filters
            fetchArticles();
            setFilterJournalistId(-1);
          }}
        >
          Reset Filters
        </button>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #
              {article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
