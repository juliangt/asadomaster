
import React, { useState } from 'react';
import { Plus, Receipt, Trash2, ChevronDown } from 'lucide-react';
import Card from './Card';
import { Expense, Participant } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ExpensesSectionProps {
    expenses: Expense[];
    participants: Participant[];
    onAddExpense: (expense: { participantId: string; description: string; amount: string }) => void;
    onRemoveExpense: (id: string) => void;
    formatCurrency: (val: number) => string;
}

const ExpensesSection: React.FC<ExpensesSectionProps> = ({
    expenses,
    participants,
    onAddExpense,
    onRemoveExpense,
    formatCurrency,
}) => {
    const { t } = useLanguage();
    const [newExpense, setNewExpense] = useState({ participantId: '', description: '', amount: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newExpense.participantId || !newExpense.description || !newExpense.amount) return;
        onAddExpense(newExpense);
        setNewExpense({ participantId: '', description: '', amount: '' });
    };

    return (
        <Card
            title={t('expenses_title')}
            className="shadow-sm"
            footer={
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <div className="sm:w-32 shrink-0 relative">
                        <select
                            value={newExpense.participantId}
                            onChange={(e) => setNewExpense({ ...newExpense, participantId: e.target.value })}
                            className="w-full px-3 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-black text-gray-900 outline-none focus:border-orange-500 cursor-pointer appearance-none"
                        >
                            <option value="">{t('who_placeholder')}</option>
                            {participants
                                .filter((p) => p.isConfirmed)
                                .map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                        </select>
                        <ChevronDown
                            size={14}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder={t('what_bought_placeholder')}
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        className="flex-1 min-w-0 px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500 shadow-sm"
                    />

                    <div className="sm:w-44 shrink-0 flex gap-2">
                        <input
                            type="text"
                            placeholder={t('amount_placeholder')}
                            value={newExpense.amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) || value === '') {
                                    setNewExpense({ ...newExpense, amount: value });
                                }
                            }}
                            className="flex-1 min-w-0 px-3 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-black text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500 shadow-sm"
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 text-white p-3 rounded-xl hover:bg-black transition-all shadow-md active:scale-95 shrink-0"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </form>
            }
        >
            <div className="space-y-3">
                {expenses.length > 0 ? (
                    expenses.map((e) => {
                        const payer = participants.find((p) => p.id === e.participantId);
                        return (
                            <div
                                key={e.id}
                                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-orange-200 transition-all shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600">
                                        <Receipt size={22} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-gray-900 leading-tight">{e.description}</p>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                                            {t('paid_by')} {payer?.name || '?'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-black text-xl text-gray-900 whitespace-nowrap">
                                        {formatCurrency(e.amount)}
                                    </span>
                                    <button
                                        onClick={() => onRemoveExpense(e.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                        <Receipt size={64} strokeWidth={1} className="mb-4 opacity-50" />
                        <p className="text-base font-bold uppercase tracking-widest">{t('register_purchases')}</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ExpensesSection;
