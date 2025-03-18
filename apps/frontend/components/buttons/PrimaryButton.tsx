import React from "react";

interface PrimaryButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    size?: "small" | "large";
}

const PrimaryButton = ({
    children,
    onClick,
    size = "small",
}: PrimaryButtonProps) => {
    return (
        <div
            className={`${size == "small" ? "text-sm" : "text-xl"} ${size == "small" ? "px-4 py-2" : "py-2 px-20"} bg-[#ff4f00] text-white  rounded-full hover:shadow-md cursor-pointer font-bold text-center flex justify-center items-center`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default PrimaryButton;
