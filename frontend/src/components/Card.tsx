import { ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
    className?: string;
}

export default function Card({ children, className=""}: CardProps) {
    return (
        <div className="rounded-md border border-zinc-800 bg-zinc-900 p-6">
            {children}
        </div>
    )
}