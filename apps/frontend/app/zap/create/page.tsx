"use client";

import React, { useEffect, useState } from "react";
import { Appbar, Modal, PrimaryButton, ZapCell } from "../../../components";
import axios from "axios";
import { useRouter } from "next/navigation";

interface selectedActionType {
    index: number;
    availableActionId: string;
    availableActionName: string;
    availableActionImage: string;
    metadata: any;
}

interface selectedTriggerType {
    id: string;
    name: string;
    image: string;
}

const useAvailableActionsAndTriggers = () => {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trigger/available`
            )
            .then((res) => {
                setAvailableTriggers(res.data.availableTrigger);
            });
        axios
            .get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/action/available`
            )
            .then((res) => {
                setAvailableActions(res.data.availableAction);
            });
    }, []);

    return { availableActions, availableTriggers };
};

const Page = () => {
    const router = useRouter();

    const { availableActions, availableTriggers } =
        useAvailableActionsAndTriggers();

    const [selectedTrigger, setSelectedTrigger] =
        useState<selectedTriggerType>();
    const [selectedAction, setSelectedAction] = useState<selectedActionType[]>(
        []
    );
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
        null
    );
    return (
        <div>
            <Appbar />
            <div className="flex justify-end px-10 bg-slate-200 p-2">
                <PrimaryButton
                    size="small"
                    onClick={async () => {
                        if (!selectedTrigger?.id) return;

                        const res = await axios.post(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/zap/`,
                            {
                                availableTriggerId: selectedTrigger?.id,
                                triggerMetadata: {},
                                actions: selectedAction.map((a) => ({
                                    availableActionId: a.availableActionId,
                                    actionMetadata: a.metadata,
                                })),
                            },
                            {
                                headers: {
                                    Authorization:
                                        localStorage.getItem("token"),
                                },
                            }
                        );

                        if (res.status !== 200) return;

                        router.push("/dashboard");
                    }}
                >
                    Publish
                </PrimaryButton>
            </div>
            <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center ">
                <div className="flex justify-center w-full">
                    <ZapCell
                        name={
                            selectedTrigger?.name
                                ? selectedTrigger.name
                                : "Trigger"
                        }
                        index={1}
                        image={selectedTrigger?.image}
                        onClick={() => {
                            setSelectedModalIndex(1);
                        }}
                    />
                </div>
                <div className="py-2 w-full">
                    {selectedAction.map((action, idx) => (
                        <div key={idx} className="pt-2 flex justify-center">
                            <ZapCell
                                name={
                                    action.availableActionName
                                        ? action.availableActionName
                                        : "action"
                                }
                                index={action.index}
                                image={action.availableActionImage}
                                onClick={() => {
                                    setSelectedModalIndex(action.index);
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <PrimaryButton
                        size="small"
                        onClick={() => {
                            setSelectedAction([
                                ...selectedAction,
                                {
                                    index: selectedAction.length + 2,
                                    availableActionId: "",
                                    availableActionName: "",
                                    availableActionImage: "",
                                    metadata: {},
                                },
                            ]);
                        }}
                    >
                        <div className="text-base font-bold">+</div>
                    </PrimaryButton>
                </div>
            </div>
            {selectedModalIndex && (
                <Modal
                    availableItems={
                        selectedModalIndex === 1
                            ? availableTriggers
                            : availableActions
                    }
                    index={selectedModalIndex}
                    onSelect={(
                        props: null | {
                            name: string;
                            id: string;
                            image: string;
                            metadata: any;
                        }
                    ) => {
                        if (props === null) {
                            setSelectedModalIndex(null);
                            return;
                        }
                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name,
                                image: props.image,
                            });
                        } else {
                            setSelectedAction((a) => {
                                const newSelectedAction = [...a];
                                newSelectedAction[selectedModalIndex - 2] = {
                                    index: selectedModalIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    availableActionImage: props.image,
                                    metadata: props.metadata,
                                };
                                return newSelectedAction;
                            });
                        }
                        setSelectedModalIndex(null);
                    }}
                />
            )}
        </div>
    );
};

export default Page;
