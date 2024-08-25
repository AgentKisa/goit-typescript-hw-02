import React from "react";
import styles from "./ImageCard.module.css";
import { Images } from "../../types";

interface ImagesListProps {
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  openModal: (url: string, alt: string) => void;
}

const ImageCard: React.FC<ImagesListProps> = ({
  alt_description,
  urls,
  openModal,
}) => {
  return (
    <img
      src={urls.small}
      alt={alt_description}
      className={styles.img}
      onClick={() => openModal(urls.regular, alt_description)}
    />
  );
};

export default ImageCard;
