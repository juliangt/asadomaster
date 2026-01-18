import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SummaryCard from './SummaryCard';
import { LanguageProvider } from '../context/LanguageContext';

describe('SummaryCard', () => {
    it('renders total cost and cost per person', () => {
        const totalCost = 5000;
        const costPerPerson = 2500;
        const totalHeads = 2;
        const formatCurrency = (val: number) => `$${val}`;

        render(
            <LanguageProvider initialLanguage="es">
                <SummaryCard
                    totalCost={totalCost}
                    costPerPerson={costPerPerson}
                    totalHeads={totalHeads}
                    formatCurrency={formatCurrency}
                />
            </LanguageProvider>
        );

        expect(screen.getByText('$5000')).toBeInTheDocument();
        expect(screen.getByText('$2500')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText(/Gasto Total/i)).toBeInTheDocument();
    });
});
