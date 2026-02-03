import type { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    bgColor: string;
    textColor: string;
}

const StatCard = ({ title, value, icon, bgColor, textColor }: StatCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm ${textColor} opacity-70 mb-1`}>{title}</p>
                    <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
                </div>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl text-white ${bgColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
