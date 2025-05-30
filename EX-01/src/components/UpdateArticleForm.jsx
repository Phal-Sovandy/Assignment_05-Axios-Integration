import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    journalistId: "",
    categoryId: "",
  });
  const { id } = useParams();

  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/articles/${id}`
        );
        setForm(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchArticleContent();
  }, [id]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    const updateToServer = async () => {
      try {
        await axios.put(`http://localhost:3000/articles/${id}`, form);
      } catch (err) {
        console.error(err.message);
      }
    };
    updateToServer();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <br />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <br />
      <input
        name="journalistId"
        value={form.journalistId}
        onChange={handleChange}
        placeholder="Journalist ID"
        required
      />
      <br />
      <input
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
        required
      />
      <br />
      <button type="submit">Update</button>
    </form>
  );
}
