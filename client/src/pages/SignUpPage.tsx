import { useState } from "react";
import toast from "react-hot-toast";

import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";
import PasswordField from "../components/fields/PasswordField";
import EmailField from "../components/fields/EmailField";
import TextField from "../components/fields/TextField";
import Logo from "../components/Logo";
import Button from "../components/Button";
import AuthQuestionAccount from "../components/AuthQuestionAccount";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const { isSigningUp, signUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return  toast.error('Full name is required');
        if (!formData.email.trim()) return  toast.error('Email is required');
        if (!/\S+@\S+\.\S+/.test(formData.email)) return  toast.error('Invalid email format');
        if (!formData.password) return  toast.error('Password is required');
        if (formData.password.length < 6) return  toast.error('Password must be at least 6 characters long');

        return true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid === true) signUp(formData);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left */}
            <div className="flex justify-center items-center flex-col p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <Logo>
                        <h1 className="text-2xl font-bold mt-2">Create account</h1>
                        <p className="text-base-content/60">Get started with your free account</p>
                    </Logo>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <TextField
                            value={formData.fullName}
                            onChange={(fullName) => setFormData({ ...formData, fullName })}
                        />

                        <EmailField
                            value={formData.email}
                            onChange={(email) => setFormData({ ...formData, email })}
                        />

                        <PasswordField
                            value={formData.password}
                            onChange={(password) => setFormData({ ...formData, password })}
                        />

                        <Button
                            className="w-full"
                            disabled={isSigningUp}
                        >
                            Create account
                        </Button>
                    </form>

                    <AuthQuestionAccount
                        to="/login"
                        question="Already have an account?"
                        linkTxt="Sign in"
                    />
                </div>
            </div>

            {/* Right */}
            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments and stay in touch with the loved ones."
            />
        </div>
    )
}

export default SignUpPage;
