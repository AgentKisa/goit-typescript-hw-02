import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <div className={styles.imageGallery}>
      <ul className={styles.ul}>
        {images.map(({ id, alt_description, urls }) => (
          <li key={id} className={styles.li}>
            <ImageCard
              urls={urls}
              alt_description={alt_description}
              openModal={openModal}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
