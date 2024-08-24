import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={styles.errorMessage}>Error! Please try again later</div>
  );
};

export default ErrorMessage;
