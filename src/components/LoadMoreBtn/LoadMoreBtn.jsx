import React from "react";
import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, disabled }) => {
  return (
    <div className={styles.loadMore}>
      <button onClick={onClick} disabled={disabled} className={styles.button}>
        LoadMore
      </button>
    </div>
  );
};

export default LoadMoreBtn;
