import { User } from 'lucide-react';

type TextFieldProps = {
    value: string;
    onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
};

const TextField = ({
    value,
    onChange,
    label = 'Full Name',
    placeholder = 'John Doe',
}: TextFieldProps) => {
    return (
        <div className="form-control">
            <label className="label text-xs">
                <span className="label-text font-medium">{label}</span>
            </label>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="size-5 text-base-content/40" />
                </div>

                <input
                    type="text"
                    placeholder={placeholder}
                    className="input input-bordered pl-10 w-full focus:outline-0 focus:isolation-auto shadow-none"
                    value={value}
                    onChange={(e) => onChange(e.target.value, e)}
                />
            </div>
        </div>
    )
}

export default TextField;
