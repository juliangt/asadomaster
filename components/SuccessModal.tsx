
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SuccessModalProps {
    onClose: () => void;
    onViewHistory: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, onViewHistory }) => {
    const { t } = useLanguage();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-card text-card-foreground rounded-3xl p-8 max-w-sm w-full shadow-2xl transform animate-in zoom-in-95 duration-300 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-2">{t('mission_accomplished')}</h3>
                <p className="text-muted-foreground font-medium mb-8">{t('save_success')}</p>
                <button
                    onClick={onViewHistory}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                >
                    {t('view_history_btn')}
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
