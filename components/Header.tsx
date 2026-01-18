
import React from 'react';
import { Flame, Calculator, History as HistoryIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
    activeTab: 'current' | 'history';
    onTabChange: (tab: 'current' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
    const { t } = useLanguage();

    return (
        <header className="bg-card border-b border-border sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between h-auto sm:h-16 py-4 sm:py-0 gap-4 sm:gap-0">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg text-primary-foreground">
                        <Flame size={20} fill="currentColor" />
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight">
                        Asado<span className="text-primary">Master</span>
                    </h1>
                </div>
                <nav className="flex gap-2">
                    <button
                        onClick={() => onTabChange('current')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'current' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-accent'
                            }`}
                    >
                        <Calculator size={16} />
                        {t('nav_current')}
                    </button>
                    <button
                        onClick={() => onTabChange('history')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'history' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-accent'
                            }`}
                    >
                        <HistoryIcon size={16} />
                        {t('nav_history')}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
