import React from "react";

interface SecondaryButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    size?: "small" | "large";
}

const SecondaryButton = ({
    children,
    onClick,
    size = "small",
}: SecondaryButtonProps) => {
    return (
        <div
            className={`${size == "small" ? "text-sm" : "text-xl"} ${size == "small" ? "px-4 py-2" : "py-2 px-20"} flex items-center rounded-full px-8 hover:shadow-md border border-black cursor-pointer font-bold`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default SecondaryButton;
