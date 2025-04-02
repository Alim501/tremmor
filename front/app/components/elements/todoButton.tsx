import { useState } from "react";
import styles from "./Button.module.css";

interface TodoButtonProps {
  onClick: () => void;
  text: string;
  color: string;
}

export default function TodoButton({ onClick, text, color }: TodoButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-white rounded  bg-${color}-500 ${styles.button}`}
    >
      {text}
    </button>
  );
}
