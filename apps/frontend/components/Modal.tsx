// "use client";
import Image from "next/image";
import React from "react";

interface ModalProps {
    availableItems: { name: string; id: string; image: string }[];
    index: number;
    onSelect: (
        props: null | { name: string; id: string; image: string }
    ) => void;
}

const Modal = ({ availableItems, index, onSelect }: ModalProps) => {
    return (
        <div
            id="default-modal"
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[rgba(59,61,64,0.7)]"
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                        <div className="text-xl">
                            Selecty {index == 1 ? "Trigger" : "Action"}
                        </div>
                        <button
                            onClick={() => onSelect(null)}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
                            data-modal-hide="default-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {availableItems.map(({ id, name, image }, index) => {
                            return (
                                <div
                                    onClick={() =>
                                        onSelect({ name, id, image })
                                    }
                                    key={index}
                                    className="flex border p-3 gap-x-3 cursor-pointer hover:bg-slate-50 rounded"
                                >
                                    <Image
                                        width={20}
                                        height={20}
                                        src={image}
                                        alt="image"
                                        unoptimized={true}
                                        className="rounded-full"
                                    />
                                    <div className="flex flex-col justify-center">
                                        {name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
