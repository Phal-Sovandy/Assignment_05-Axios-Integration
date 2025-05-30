import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({ journalist: -1, category: -1 });

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
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

  const fetchCategories = async () => {
    // Fetch categories from the API
    axios
      .get("http://localhost:3000/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          onChange={(e) =>
            setFilter((f) => ({ ...f, journalist: Number(e.target.value) }))
          }
        >
          <option value="">All Journalists</option>
          {journalists.map((journalist) => (
            <option value={journalist.id}>{journalist.name}</option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          onChange={(e) =>
            setFilter((f) => ({ ...f, category: Number(e.target.value) }))
          }
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>

        <button
          onClick={async () => {
            // Logic to apply filters
            // Back-End Logic As the instruction said in words.
            try {
              const filteredData = await axios.get(
                `http://localhost:3000/articles?journalistId=${filter.journalist}&categoryId=${filter.category}`
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
          onClick={async () => {
            // Logic to reset filters
            fetchArticles();
            setFilter({ journalist: -1, category: -1 });
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
