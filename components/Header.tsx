
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
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between h-auto sm:h-16 py-4 sm:py-0 gap-4 sm:gap-0">
                <div className="flex items-center gap-2">
                    <div className="bg-orange-600 p-2 rounded-lg text-white">
                        <Flame size={20} fill="currentColor" />
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                        Asado<span className="text-orange-600">Master</span>
                    </h1>
                </div>
                <nav className="flex gap-2">
                    <button
                        onClick={() => onTabChange('current')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'current' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Calculator size={16} />
                        {t('nav_current')}
                    </button>
                    <button
                        onClick={() => onTabChange('history')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'history' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
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
