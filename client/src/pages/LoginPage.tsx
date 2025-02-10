import { useState } from "react";

import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";
import PasswordField from "../components/fields/PasswordField";
import EmailField from "../components/fields/EmailField";
import Logo from "../components/Logo";
import Button from "../components/Button";
import AuthQuestionAccount from "../components/AuthQuestionAccount";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left */}
            <div className="flex justify-center items-center flex-col p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <Logo>
                        <h1 className="text-2xl font-bold mt-2">Welcome back</h1>
                        <p className="text-base-content/60">Sign in to your account</p>
                    </Logo>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
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
                            disabled={isLoggingIn}
                        >
                            Login
                        </Button>
                    </form>

                    <AuthQuestionAccount
                        to="/signup"
                        question="Don't have an account?"
                        linkTxt="Sign up"
                    />
                </div>
            </div>

            {/* Right */}
            <AuthImagePattern
                title="Welcome back!"
                subtitle="Sign in to continue your converstions and catch up with your messages."
            />
        </div>
    )
}

export default LoginPage;
