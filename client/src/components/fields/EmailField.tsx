import { Mail } from "lucide-react";

type EmailFieldProps = {
    value: string;
    onChange: (val: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
};

const EmailField = ({
    value,
    onChange,
    label = "Email",
    placeholder = "you@example.com",
}: EmailFieldProps) => {
    return (
        <div className="form-control">
            <label className="label text-xs">
                <span className="label-text font-medium">{label}</span>
            </label>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                </div>

                <input
                    type="email"
                    placeholder={placeholder}
                    className="input input-bordered pl-10 w-full focus:outline-0 focus:isolation-auto shadow-none"
                    value={value}
                    onChange={(e) => onChange(e.target.value, e)}
                />
            </div>
        </div>
    );
}

export default EmailField