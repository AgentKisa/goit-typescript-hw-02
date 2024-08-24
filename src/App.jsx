import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImage } from "./Api/Api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [showedModal, setShowedModal] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query) {
        return;
      }
      try {
        setLoading(true);
        const response = await fetchImage(query, page);
        const { results, total_pages } = response || {};

        if (!results || results.length === 0) {
          toast.error("Something went wrong!");

          return;
        }

        setImages((prev) => (page === 1 ? results : [...prev, ...results]));
        setIsVisible(page < total_pages);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [query, page]);

  const onHandleSubmit = (value) => {
    if (value !== query) {
      setQuery(value);
      setImages([]);
      setPage(1);
      setIsVisible(false);
      setError(null);
    }
  };
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setShowedModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const closeModal = () => {
    setShowedModal(false);
    setModalUrl("");
    setModalAlt("");
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={onHandleSubmit} />
      <Toaster />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      {isVisible && (
        <LoadMoreBtn onClick={loadMore} disabled={loading}></LoadMoreBtn>
      )}
      <ImageModal
        modalIsOpen={showedModal}
        closeModal={closeModal}
        src={modalUrl}
        alt={modalAlt}
      />
    </div>
  );
}

export default App;
