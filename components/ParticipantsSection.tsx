
import React, { useState } from 'react';
import { Plus, Minus, Users, Trash2, CheckCircle2, Circle, UserPlus } from 'lucide-react';
import Card from './Card';
import { Participant, BalanceSheet } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ParticipantsSectionProps {
    participants: Participant[];
    balances: BalanceSheet[];
    onAddParticipant: (participant: { name: string; memberCount: number }) => void;
    onRemoveParticipant: (id: string) => void;
    onToggleConfirm: (id: string) => void;
    formatCurrency: (val: number) => string;
}

const ParticipantsSection: React.FC<ParticipantsSectionProps> = ({
    participants,
    balances,
    onAddParticipant,
    onRemoveParticipant,
    onToggleConfirm,
    formatCurrency,
}) => {
    const { t } = useLanguage();
    const [newParticipant, setNewParticipant] = useState({ name: '', memberCount: 1 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newParticipant.name.trim()) return;
        onAddParticipant(newParticipant);
        setNewParticipant({ name: '', memberCount: 1 });
    };

    return (
        <Card
            title={t('participants_title')}
            className="shadow-sm"
            footer={
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={t('name_placeholder')}
                            value={newParticipant.name}
                            onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-1 px-1 bg-gray-100 rounded-xl border border-gray-200">
                        <button
                            type="button"
                            onClick={() => setNewParticipant((prev) => ({ ...prev, memberCount: Math.max(1, prev.memberCount - 1) }))}
                            className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                        >
                            <Minus size={18} />
                        </button>
                        <div className="flex flex-col items-center min-w-[40px] px-1">
                            <span className="text-[9px] font-black text-gray-400 uppercase leading-none">{t('pax_label')}</span>
                            <span className="text-sm font-black text-gray-900 leading-tight">{newParticipant.memberCount}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setNewParticipant((prev) => ({ ...prev, memberCount: prev.memberCount + 1 }))}
                            className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-700 transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
                    >
                        <Plus size={20} />
                    </button>
                </form>
            }
        >
            <div className="space-y-3">
                {participants.length > 0 ? (
                    participants.map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-300 transition-all group shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => onToggleConfirm(p.id)}
                                    className={`transition-all transform hover:scale-110 ${p.isConfirmed ? 'text-green-500' : 'text-gray-300'}`}
                                >
                                    {p.isConfirmed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                                </button>
                                <div>
                                    <p
                                        className={`font-black text-xl leading-tight ${p.isConfirmed ? 'text-gray-900' : 'text-gray-400 line-through'}`}
                                    >
                                        {p.name}
                                    </p>
                                    <span className="text-[11px] font-black text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tighter mt-1 inline-block">
                                        {p.memberCount > 1 ? `${p.memberCount} ${t('members_count')}` : t('individual')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-sm font-black text-gray-900">
                                        {formatCurrency(balances.find((b) => b.participantId === p.id)?.paid || 0)}
                                    </p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{t('paid_label')}</p>
                                </div>
                                <button
                                    onClick={() => onRemoveParticipant(p.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-gray-300">
                        <Users size={32} strokeWidth={1} className="mb-2 opacity-50" />
                        <p className="text-xs font-bold uppercase tracking-widest">{t('load_friends')}</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ParticipantsSection;
