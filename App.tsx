

import React, { useState } from 'react';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import SettlementsList from './components/SettlementsList';
import ExpensesSection from './components/ExpensesSection';
import ParticipantsSection from './components/ParticipantsSection';
import HistoryView from './components/HistoryView';
import SuccessModal from './components/SuccessModal';
import { AsadoProvider, useAsado } from './context/AsadoContext';
import { LanguageProvider } from './context/LanguageContext';
import { formatCurrency } from './utils/formatters';

const AsadoApp: React.FC = () => {
  const {
    participants,
    expenses,
    history,
    totalCost,
    costPerPerson,
    totalHeads,
    balances,
    transactions,
    addParticipant,
    removeParticipant,
    toggleConfirm,
    addExpense,
    removeExpense,
    saveToHistory,
    clearHistory,
  } = useAsado();

  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSaveToHistory = () => {
    saveToHistory();
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen pb-12 bg-gray-50 text-gray-900">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        {activeTab === 'current' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content: Participants & Expenses (Top on mobile, Right on desktop) */}
            <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
              <ParticipantsSection
                participants={participants}
                balances={balances}
                onAddParticipant={({ name, memberCount }) => addParticipant(name, memberCount)}
                onRemoveParticipant={removeParticipant}
                onToggleConfirm={toggleConfirm}
                formatCurrency={formatCurrency}
              />
              <ExpensesSection
                expenses={expenses}
                participants={participants}
                onAddExpense={({ participantId, description, amount }) =>
                  addExpense(participantId, description, parseFloat(amount))
                }
                onRemoveExpense={removeExpense}
                formatCurrency={formatCurrency}
              />
            </div>

            {/* Sidebar: Summary & Settlements (Bottom on mobile, Left on desktop) */}
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <SummaryCard
                totalCost={totalCost}
                costPerPerson={costPerPerson}
                totalHeads={totalHeads}
                formatCurrency={formatCurrency}
              />
              <SettlementsList
                transactions={transactions}
                participants={participants}
                totalCost={totalCost}
                onSaveToHistory={handleSaveToHistory}
                formatCurrency={formatCurrency}
              />
            </div>
          </div>
        ) : (
          <HistoryView
            history={history}
            onClearHistory={clearHistory}
            formatCurrency={formatCurrency}
          />
        )}
      </main>

      {showSuccessModal && (
        <SuccessModal
          onClose={() => setShowSuccessModal(false)}
          onViewHistory={() => {
            setShowSuccessModal(false);
            setActiveTab('history');
          }}
        />
      )}

      <GlobalStyles />
    </div>
  );
};

const GlobalStyles: React.FC = () => (
  <style>{`
    input::placeholder, select::placeholder {
      color: #9ca3af !important;
      opacity: 1;
    }
    /* Remove number input arrows */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes zoom-in-95 {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-in {
      animation-fill-mode: forwards;
    }
    .fade-in {
      animation-name: fade-in;
    }
    .zoom-in-95 {
      animation-name: zoom-in-95;
    }
  `}</style>
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AsadoProvider>
        <AsadoApp />
      </AsadoProvider>
    </LanguageProvider>
  );
};

export default App;
