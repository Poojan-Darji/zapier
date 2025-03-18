"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Appbar, DarkButton, LinkButton } from "../../components";
import Image from "next/image";

interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    actions: {
        id: string;
        zapId: string;
        actionId: string;
        sortingOrder: number;
        type: {
            id: string;
            name: string;
            image: string;
        };
    }[];
    trigger: {
        id: string;
        zapId: string;
        triggerId: string;
        type: {
            id: string;
            name: string;
            image: string;
        };
    };
}

function useZaps() {
    const [loading, setLoading] = useState<boolean>(true);
    const [zaps, setZaps] = useState<Zap[]>([]);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/zap`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setZaps(res.data.zaps);
                setLoading(false);
            });
    }, []);
    return { loading, zaps };
}

const Page = () => {
    const { loading, zaps } = useZaps();
    const router = useRouter();
    return (
        <div>
            <Appbar />
            <div className="flex justify-center pt-8">
                <div className="max-w-screen-lg w-full">
                    <div className="flex justify-between pr-8">
                        <div className="text-2xl font-bold">My Zaps</div>
                        <DarkButton
                            onClick={() => {
                                router.push("/zap/create");
                            }}
                        >
                            Create
                        </DarkButton>
                    </div>
                </div>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex justify-center">
                    <ZapTable zaps={zaps} />
                </div>
            )}
        </div>
    );
};

export default Page;

const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
    const router = useRouter();
    return (
        <div className="max-w-screen-xl p-8 w-full">
            <div className="flex">
                <div className="flex-1 font-bold">Name</div>
                <div className="flex-1 font-bold">ID</div>
                <div className="flex-1 font-bold">Created At</div>
                <div className="flex-1 font-bold">Webhook URL</div>
                <div className="flex-1 font-bold">Go</div>
            </div>
            {zaps.map((z, idx) => (
                <div key={idx} className="flex border-b border-t py-4">
                    <div className="flex-1 flex gap-2 aspect-auto">
                        <Image
                            width={30}
                            height={30}
                            src={z.trigger.type.image}
                            alt="image"
                            unoptimized={true}
                            className="h-[30px] w-[30px]"
                        />
                        {z.actions.map((x) => (
                            <Image
                                key={x.id}
                                width={30}
                                height={30}
                                src={x.type.image}
                                alt="image"
                                unoptimized={true}
                                className="h-[30px] w-[30px]"
                            />
                        ))}
                    </div>
                    <div className="flex-1">{z.id}</div>
                    <div className="flex-1">Sep 9, 2024</div>
                    <div className="flex-1">{`${process.env.NEXT_PUBLIC_HOOK_BACKEND_URL}//hooks/catch/${z.userId}/${z.id}`}</div>
                    <div className="flex-1">
                        <LinkButton
                            onClick={() => {
                                router.push(`/zap/${z.id}`);
                            }}
                        >
                            Go
                        </LinkButton>
                    </div>
                </div>
            ))}
        </div>
    );
};
