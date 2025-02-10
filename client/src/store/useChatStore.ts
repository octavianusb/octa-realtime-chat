import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";
import { useAuthStore, type UserProps } from "./useAuthStore";

export type MessageProps = {
    _id: string;
    text: string;
    image: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
    updatedAt: string;
};

type ChatProps = {
    messages: MessageProps[];
    users: UserProps[];
    selectedUser: UserProps | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;

    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
    getUsers: () => Promise<void>;
    getMessages: (userId: string) => Promise<void>;
    setSelectedUser: (selectedUser: UserProps | null) => void;
    sendMessage: (messageData: { text: string; image: string | null }) => void;
};

type ErrorProps = {
    response: {
        data: {
            message: string;
        };
    };
};

export const useChatStore = create<ChatProps>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });

        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            const err = error as ErrorProps;
            toast.error(err.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true });

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            const err = error as ErrorProps;
            toast.error(err.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData: { text: string; image: string | null }) => {
        const { selectedUser, messages } = get();

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            const err = error as ErrorProps;
            toast.error(err.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        const { socket } = useAuthStore.getState();
        if (!socket || !selectedUser) return;

        socket.on("newMessage", (newMessage: MessageProps) => {
            const isMsgSentFromSelectedUser = newMessage.senderId === selectedUser._id;

            if (isMsgSentFromSelectedUser) {
                set({ messages: [...get().messages, newMessage] });
            }
        });
    },

    unsubscribeFromMessages: () => {
        const { socket } = useAuthStore.getState();
        if (!socket) return;

        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));