import React from "react";
import "./UiButton.css";

export const UiButton = ({
  variant = "primary", // "primary" | "icon"
  icon = null, // JSX para íconos (FaHeart, etc.)
  active = false, // estado activo (favorito, guardado)
  children, // texto opcional
  onClick,
  className = "",
  title,
  style = {},
}) => {
  return (
    <button
      className={`ui-btn ui-btn-${variant} ${
        active ? "ui-btn-active" : ""
      } ${className}`}
      onClick={onClick}
      title={title}
      style={style}
    >
      {icon && <span className="ui-btn-icon">{icon}</span>}
      {children && <span className="ui-btn-text">{children}</span>}
    </button>
  );
};
