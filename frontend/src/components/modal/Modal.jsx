import React from "react";
import { IoMdClose } from "react-icons/io";

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                 style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    minWidth: "300px",
                }}
                className="relative py-10 min-h-20  "
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                <IoMdClose className=" absolute top-2 right-2 h-5 w-5" onClick={() => onClose()} />
                {children}
            </div>

        </div>
    )
}