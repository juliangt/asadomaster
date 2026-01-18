
import React from 'react';
import Card from './Card';
import { useLanguage } from '../context/LanguageContext';

interface SummaryCardProps {
    totalCost: number;
    costPerPerson: number;
    totalHeads: number;
    formatCurrency: (val: number) => string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ totalCost, costPerPerson, totalHeads, formatCurrency }) => {
    const { t } = useLanguage();

    return (
        <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-none text-white shadow-xl">
            <div className="space-y-6">
                <div>
                    <p className="text-orange-100 text-sm font-bold opacity-90 uppercase tracking-widest">{t('total_expense')}</p>
                    <p className="text-4xl font-black tracking-tight drop-shadow-sm">{formatCurrency(totalCost)}</p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/20">
                    <div>
                        <p className="text-orange-100 text-[10px] font-black uppercase tracking-wider">{t('per_person')}</p>
                        <p className="text-xl font-black">{formatCurrency(costPerPerson)}</p>
                    </div>
                    <div>
                        <p className="text-orange-100 text-[10px] font-black uppercase tracking-wider">{t('total_pax')}</p>
                        <p className="text-xl font-black">{totalHeads}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SummaryCard;
