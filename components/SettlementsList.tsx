
import React from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import Card from './Card';
import { Transaction, Participant } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SettlementsListProps {
    transactions: Transaction[];
    participants: Participant[];
    totalCost: number;
    onSaveToHistory: () => void;
    formatCurrency: (val: number) => string;
}

const SettlementsList: React.FC<SettlementsListProps> = ({
    transactions,
    participants,
    totalCost,
    onSaveToHistory,
    formatCurrency,
}) => {
    const { t } = useLanguage();

    return (
        <Card title={t('settlements_title')} className="shadow-sm">
            {transactions.length > 0 ? (
                <div className="space-y-3">
                    {transactions.map((t_item, idx) => {
                        const from = participants.find((p) => p.id === t_item.from);
                        const to = participants.find((p) => p.id === t_item.to);
                        return (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-inner"
                            >
                                <div className="flex flex-col">
                                    <span className="font-black text-lg text-gray-900 leading-none mb-1">{from?.name}</span>
                                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">{t('must_pay_to')}</span>
                                </div>
                                <div className="flex flex-col items-center px-2">
                                    <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100">
                                        <ChevronRight size={18} className="text-orange-600" />
                                    </div>
                                    <span className="text-sm font-black text-orange-600 mt-1 whitespace-nowrap">
                                        {formatCurrency(t_item.amount)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end text-right">
                                    <span className="font-black text-lg text-gray-900 leading-none mb-1">{to?.name}</span>
                                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">{t('receives')}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{t('no_debts')}</p>
                </div>
            )}
            <button
                onClick={onSaveToHistory}
                disabled={totalCost === 0}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.98]"
            >
                <TrendingUp size={18} />
                {t('finish_asado')}
            </button>
        </Card>
    );
};

export default SettlementsList;
