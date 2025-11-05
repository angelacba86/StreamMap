import React from "react";
import "./Modal.css";

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-body">{children}</div>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};
