
import React from 'react';
import { Flame, History as HistoryIcon } from 'lucide-react';
import { AsadoHistory } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HistoryViewProps {
    history: AsadoHistory[];
    onClearHistory: () => void;
    formatCurrency: (val: number) => string;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onClearHistory, formatCurrency }) => {
    const { t } = useLanguage();

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t('history_title')}</h2>
                <button
                    onClick={onClearHistory}
                    className="text-red-500 text-sm font-black hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
                >
                    {t('delete_all')}
                </button>
            </div>

            {history.length > 0 ? (
                history.map((h) => (
                    <div
                        key={h.id}
                        className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all transform hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-5">
                                <div className="bg-orange-50 p-4 rounded-2xl text-orange-600">
                                    <Flame size={32} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-gray-900 leading-none mb-2">{h.description}</p>
                                    <div className="flex gap-2">
                                        <span className="text-[11px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-md uppercase border border-gray-100">
                                            {h.date}
                                        </span>
                                        <span className="text-[11px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-md uppercase border border-orange-100">
                                            {h.participantsCount} {t('people_count')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-orange-600 tracking-tighter">{formatCurrency(h.totalCost)}</p>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t('total_spent')}</p>
                            </div>
                        </div>

                        {h.participants && h.participants.length > 0 && (
                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">{t('participants_title')}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {h.participants.map((p) => (
                                        <span
                                            key={p.id}
                                            className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200"
                                        >
                                            {p.name} {p.memberCount > 1 ? `(${p.memberCount})` : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <HistoryIcon size={64} className="mx-auto text-gray-200 mb-6" />
                    <p className="text-gray-400 font-bold text-lg"> {t('no_records')}</p>
                </div>
            )}
        </div>
    );
};

export default HistoryView;
