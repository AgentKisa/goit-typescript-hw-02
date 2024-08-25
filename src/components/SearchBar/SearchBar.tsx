import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
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
