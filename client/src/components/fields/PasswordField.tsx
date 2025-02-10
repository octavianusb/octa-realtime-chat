import { Lock, EyeOff, Eye } from "lucide-react";
import { useState } from "react";

type PasswordFieldProps = {
    value: string;
    onChange: (val: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
};

const PasswordField = ({
    value,
    onChange,
    label = "Password",
    placeholder = "••••••••",
}: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-control">
            <label className="label text-xs">
                <span className="label-text font-medium">{label}</span>
            </label>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="size-5 text-base-content/40" />
                </div>

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="input input-bordered pl-10 w-full focus:outline-0 focus:isolation-auto shadow-none"
                    value={value}
                    onChange={(e) => onChange(e.target.value, e)}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                        <Eye className="size-5 text-base-content/40" />
                    )}
                </button>
            </div>
        </div>
    )
}

export default PasswordField;
