
import React, { useState, useRef, useEffect } from 'react';
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

const QUICK_ITEMS = [
    { icon: '🥩', labelKey: 'item_meat' },
    { icon: '🥖', labelKey: 'item_bread' },
    { icon: '🥗', labelKey: 'item_veggies' },
    { icon: '🏺', labelKey: 'item_oil' },
    { icon: '🥤', labelKey: 'item_soda' },
    { icon: '💧', labelKey: 'item_water' },
    { icon: '🥐', labelKey: 'item_pastries' },
    { icon: '🍖', labelKey: 'item_salami' },
    { icon: '🧀', labelKey: 'item_cheese' },
    { icon: '❓', labelKey: 'item_other' },
] as const;

const ExpensesSection: React.FC<ExpensesSectionProps> = ({
    expenses,
    participants,
    onAddExpense,
    onRemoveExpense,
    formatCurrency,
}) => {
    const { t } = useLanguage();
    const [newExpense, setNewExpense] = useState({ participantId: '', description: '', amount: '' });
    const [showQuickItems, setShowQuickItems] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const amountInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowQuickItems(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleQuickItemSelect = (item: (typeof QUICK_ITEMS)[number]) => {
        if (item.icon === '❓') {
            setShowQuickItems(false);
            return;
        }
        setNewExpense({ ...newExpense, description: t(item.labelKey as any) });
        setShowQuickItems(false);
        // Focus amount input after selection
        setTimeout(() => amountInputRef.current?.focus(), 0);
    };

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

                    <div className="flex-1 min-w-0 relative" ref={containerRef}>
                        <input
                            type="text"
                            placeholder={t('what_bought_placeholder')}
                            value={newExpense.description}
                            onFocus={() => setShowQuickItems(true)}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500 shadow-sm transition-all"
                        />
                        {showQuickItems && (
                            <div className="absolute bottom-full mb-2 left-0 right-0 bg-white border-2 border-orange-100 rounded-2xl shadow-xl p-2 z-50 transition-all duration-200">
                                <div className="grid grid-cols-5 gap-1">
                                    {QUICK_ITEMS.map((item, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleQuickItemSelect(item)}
                                            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-orange-50 transition-colors group"
                                            title={t(item.labelKey as any)}
                                        >
                                            <span className="text-xl group-hover:scale-125 transition-transform">
                                                {item.icon}
                                            </span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase mt-1 truncate w-full text-center">
                                                {t(item.labelKey as any)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-orange-100 rotate-45"></div>
                            </div>
                        )}
                    </div>

                    <div className="sm:w-44 shrink-0 flex gap-2">
                        <input
                            ref={amountInputRef}
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
                            className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-700 transition-all shadow-md active:scale-95 shrink-0"
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
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-orange-200 transition-all shadow-sm gap-4 sm:gap-0"
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
                    <div className="flex flex-col items-center justify-center py-6 text-gray-300">
                        <Receipt size={32} strokeWidth={1} className="mb-2 opacity-50" />
                        <p className="text-xs font-bold uppercase tracking-widest">{t('register_purchases')}</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ExpensesSection;
