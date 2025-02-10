import clsx from "clsx";

type InfoFieldsProps = {
    title: string;
    children: React.ReactNode;
};

type InfoFieldsRowProps = {
    label: string;
    value?: string;
    className?: string;
    active?: boolean;
};

export const InfoFields = ({ title, children }: InfoFieldsProps) => {
    return (
        <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>{title}</h2>

            <div className='space-y-3 text-sm'>
                {children}
            </div>
        </div>
    );
}

export const InfoFieldsRow = ({ active = false, label, value, className }: InfoFieldsRowProps) => {
    return (
        <div className={clsx('flex items-center justify-between py-2', className)}>
            <span>{label}</span>
            <span className={clsx({'text-green-500': active })}>{value || ''}</span>
        </div>
    );
}
