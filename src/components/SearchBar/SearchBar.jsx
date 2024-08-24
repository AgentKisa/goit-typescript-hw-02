import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Empty field, enter text!");
      return;
    }
    onSearch(query);
    setQuery("");
  };

  return (
    <>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <Toaster />
        <input
          type="text"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
