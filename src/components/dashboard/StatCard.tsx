import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
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
                <div className={`text-4xl ${textColor} opacity-60`}>{icon}</div>
            </div>
        </div>
    );
};

export default StatCard;
