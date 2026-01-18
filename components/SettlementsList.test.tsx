import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SettlementsList from './SettlementsList';
import { Participant, Transaction } from '../types';
import { LanguageProvider } from '../context/LanguageContext';

describe('SettlementsList', () => {
    const participants: Participant[] = [
        { id: '1', name: 'Alice', memberCount: 1, isConfirmed: true },
        { id: '2', name: 'Bob', memberCount: 1, isConfirmed: true },
    ];
    const formatCurrency = (val: number) => `$${val}`;

    it('renders "Sin deudas" when there are no transactions', () => {
        render(
            <LanguageProvider initialLanguage="es">
                <SettlementsList
                    transactions={[]}
                    participants={participants}
                    totalCost={100}
                    onSaveToHistory={() => { }}
                    formatCurrency={formatCurrency}
                />
            </LanguageProvider>
        );

        expect(screen.getByText(/Sin deudas/i)).toBeInTheDocument();
    });

    it('renders transactions when they exist', () => {
        const transactions: Transaction[] = [
            { from: '2', to: '1', amount: 50 },
        ];

        render(
            <LanguageProvider initialLanguage="es">
                <SettlementsList
                    transactions={transactions}
                    participants={participants}
                    totalCost={100}
                    onSaveToHistory={() => { }}
                    formatCurrency={formatCurrency}
                />
            </LanguageProvider>
        );

        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('$50')).toBeInTheDocument();
        expect(screen.getByText(/Debe pagar a/i)).toBeInTheDocument();
    });
});
