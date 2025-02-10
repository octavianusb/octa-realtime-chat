import toast from 'react-hot-toast';
import { create } from 'zustand';
import { io, type Socket } from 'socket.io-client';

import { axiosInstance } from '../lib/axios';

type ErrorProps = {
    response: {
        data: {
            message: string;
        };
    };
};

export type SignUpFormProps = {
    fullName: string;
    email: string;
    password: string;
};

export type UserProps = {
    _id: string;
    email: string;
    fullName: string;
    profilePic: string;
    createdAt: string;
    updatedAt: string;
};

type AuthStore = {
    authUser: UserProps | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[];
    socket: Socket | null;
    checkAuth: () => void;
    connectSocket: () => void;
    disconnectSocket: () => void;
    logOut: () => void;
    signUp: (formData: SignUpFormProps) => void;
    updateProfile: (data: { profilePic: string | ArrayBuffer | null; }) => void;
    login: (formData: Omit<SignUpFormProps, 'fullName'>) => void;
};

const BASE_URL = 'http://localhost:5001';

export const useAuthStore = create<AuthStore>((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
            // Connect the socket
            get().connectSocket();
        } catch (error) {
            console.log('Error in checkAuth: ', error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (formData) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            set({ authUser: res.data });
            toast.success("Account created successfully");

            // Connect the socket
            get().connectSocket();
        } catch (error) {
            const err = error as ErrorProps;
            toast.error(err.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post('/auth/login', formData);
            set({ authUser: res.data });
            toast.success("Logged in successfully");

            // Connect the socket
            get().connectSocket();
        } catch (error) {
            const err = error as ErrorProps;
            toast.error(err.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully");

            // Disconnect the socket
            get().disconnectSocket();
        } catch (error) {
            console.log('Error in logOut: ', error);
            const err = error as ErrorProps;
            toast.error(err.response.data.message);
        }
    },

    updateProfile: async ({ profilePic }) => {
        set({ isUpdatingProfile: true });

        try {
            const res = await axiosInstance.put('/auth/update-profile', { profilePic });
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log('Error in updateProfile: ', error);
            const err = error as ErrorProps;
            toast.error(err.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();
        set({ socket });

        socket.on('getOnlineUsers', (userIds: string[]) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket?.disconnect();
        }
    },
}));