import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategoryId, setFilterCategoryId] = useState(-1);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    axios
      .get("http://localhost:3000/articles")
      .then((res) => setArticles(res.data))
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
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          onChange={(e) => setFilterCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>

        <button
          onClick={async () => {
            // Logic to apply filters
            try {
              const filteredData = await axios.get(
                `http://localhost:3000/categories/${filterCategoryId}/articles`
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
            setFilterCategoryId(-1);
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
