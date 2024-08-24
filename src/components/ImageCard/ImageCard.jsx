import React from "react";
import styles from "./ImageCard.module.css";

const ImageCard = ({ alt_description, urls, openModal }) => {
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
