import { useEffect, useRef } from "react";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMsgTime } from "../lib/utils";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
    const {
        messages,
        selectedUser,
        getMessages,
        isMessagesLoading,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedUser) getMessages(selectedUser._id);
        subscribeToMessages();

        return () => {
            unsubscribeFromMessages();
        };
    }, [
        getMessages,
        selectedUser,
        selectedUser?._id,
        subscribeToMessages,
        unsubscribeFromMessages,
    ]);

    useEffect(() => {
        if (messages) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${
                            message.senderId === authUser?._id ? "chat-end" : "chat-start"
                        }`}
                        ref={messagesEndRef}
                    >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser?._id
                                            ? authUser?.profilePic || "/default-avatar.png"
                                            : selectedUser?.profilePic || "/default-avatar.png"
                                    }
                                    alt={
                                        message.senderId === authUser?._id
                                            ? authUser?.fullName
                                            : selectedUser?.fullName
                                    }
                                />
                            </div>
                        </div>

                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMsgTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col shadow-xs">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="attachment"
                                    className="rounded-md sm:max-w-[200px]"
                                />
                            )}
                            {!!message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatContainer;
