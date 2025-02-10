import toast from 'react-hot-toast';
import  { create } from 'zustand';

import { axiosInstance } from '../lib/axios';

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
    onlineUsers: UserProps[];
    checkAuth: () => void;
    logOut: () => void;
    signUp: (formData: SignUpFormProps) => void;
    updateProfile: (data: { profilePic: string | ArrayBuffer | null; }) => void;
    login: (formData: Omit<SignUpFormProps, 'fullName'>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
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
        } catch (error) {
            toast.error(error.response.data.message);
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
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            console.log('Error in logOut: ', error);
            toast.error(error.response.data.message);
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
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}));