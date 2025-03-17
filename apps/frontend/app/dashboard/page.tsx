"use client";
import React, { useEffect, useState } from "react";
import Appbar from "../../components/Appbar";
import DarkButton from "../../components/buttons/DarkButton";
import axios from "axios";
import LinkButton from "../../components/buttons/LinkButton";
import { useRouter } from "next/navigation";

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
        };
    }[];
    trigger: {
        id: string;
        zapId: string;
        triggerId: string;
        type: {
            id: string;
            name: string;
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
        <div className="max-w-screen-lg p-8 w-full">
            <div className="flex">
                <div className="flex-1">Name</div>
                <div className="flex-1">Last Edit</div>
                <div className="flex-1">Running</div>
                <div className="flex-1">GO</div>
            </div>
            {zaps.map((z, idx) => (
                <div key={idx} className="flex border-b border-t py-4">
                    <div className="flex-1">
                        {z.trigger.type.name}
                        {z.actions.map((x) => x.type.name + " ")}
                    </div>
                    <div className="flex-1">{z.id}</div>
                    <div className="flex-1">Sep 9, 2024</div>
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
