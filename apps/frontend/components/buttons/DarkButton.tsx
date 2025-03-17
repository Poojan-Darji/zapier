import React from "react";

interface PrimaryButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const DarkButton = ({ children, onClick }: PrimaryButtonProps) => {
    return (
        <div
            className={`flex flex-col justify-center py-2 bg-purple-700 text-white  rounded px-8 hover:shadow-md cursor-pointer font-bold text-center `}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default DarkButton;
