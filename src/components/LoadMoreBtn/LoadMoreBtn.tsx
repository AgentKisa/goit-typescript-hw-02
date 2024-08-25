import React from "react";
import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
  disabled: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, disabled }) => {
  return (
    <div className={styles.loadMore}>
      <button onClick={onClick} disabled={disabled} className={styles.button}>
        LoadMore
      </button>
    </div>
  );
};

export default LoadMoreBtn;
