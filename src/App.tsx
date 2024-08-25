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
import { Image } from "./types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");
  const [showedModal, setShowedModal] = useState<boolean>(false);

  useEffect((): void => {
    const handleSearch = async (): Promise<void> => {
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

  const onHandleSubmit = (value: string): void => {
    if (value !== query) {
      setQuery(value);
      setImages([]);
      setPage(1);
      setIsVisible(false);
      setError(null);
    }
  };
  const loadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url: string, alt: string): void => {
    setShowedModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };

  const closeModal = (): void => {
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
