import React from "react";
import styles from "./modal.module.css";
interface ModalProps {
  title: string;
  subtitle: string;
  onConfirmation: () => void;
  onDecline: () => void;
}

const Modal = ({ title, subtitle, onConfirmation, onDecline }: ModalProps) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles.modal}>
        <div className={styles.icon}></div>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => onConfirmation()}>
            Confirm
          </button>
          <button className={styles.button} onClick={() => onDecline()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
