
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
                <h2 className="text-3xl font-black tracking-tight">{t('history_title')}</h2>
                <button
                    onClick={onClearHistory}
                    className="text-destructive text-sm font-black hover:bg-destructive/10 px-4 py-2 rounded-lg transition-all"
                >
                    {t('delete_all')}
                </button>
            </div>

            {history.length > 0 ? (
                history.map((h) => (
                    <div
                        key={h.id}
                        className="bg-card text-card-foreground p-6 rounded-2xl border border-border hover:shadow-lg transition-all transform hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-5">
                                <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                                    <Flame size={32} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black leading-none mb-2">{h.description}</p>
                                    <div className="flex gap-2">
                                        <span className="text-[11px] font-black text-muted-foreground bg-secondary px-2 py-1 rounded-md uppercase border border-border">
                                            {h.date}
                                        </span>
                                        <span className="text-[11px] font-black text-primary bg-primary/10 px-2 py-1 rounded-md uppercase border border-primary/20">
                                            {h.participantsCount} {t('people_count')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-primary tracking-tighter">{formatCurrency(h.totalCost)}</p>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('total_spent')}</p>
                            </div>
                        </div>

                        {h.participants && h.participants.length > 0 && (
                            <div className="pt-4 border-t border-border">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">{t('participants_title')}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {h.participants.map((p) => (
                                        <span
                                            key={p.id}
                                            className="text-[11px] font-bold text-secondary-foreground bg-secondary px-2.5 py-1 rounded-full border border-border"
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
                <div className="text-center py-24 bg-card rounded-3xl border-2 border-dashed border-border">
                    <HistoryIcon size={64} className="mx-auto text-muted-foreground/20 mb-6" />
                    <p className="text-muted-foreground font-bold text-lg"> {t('no_records')}</p>
                </div>
            )}
        </div>
    );
};

export default HistoryView;
