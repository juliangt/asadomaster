
import { Participant, Expense, AsadoHistory } from '../types';
import { logger } from '../utils/logger';

const STORAGE_KEYS = {
    PARTICIPANTS: 'asado_participants',
    EXPENSES: 'asado_expenses',
    HISTORY: 'asado_history',
};

export const storage = {
    getParticipants: (): Participant[] => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.PARTICIPANTS);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            logger.error('Failed to load participants from storage', error);
            return [];
        }
    },
    saveParticipants: (participants: Participant[]) => {
        localStorage.setItem(STORAGE_KEYS.PARTICIPANTS, JSON.stringify(participants));
        logger.info('Participants saved to storage');
    },
    getExpenses: (): Expense[] => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            logger.error('Failed to load expenses from storage', error);
            return [];
        }
    },
    saveExpenses: (expenses: Expense[]) => {
        localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
        logger.info('Expenses saved to storage');
    },
    getHistory: (): AsadoHistory[] => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            logger.error('Failed to load history from storage', error);
            return [];
        }
    },
    saveHistory: (history: AsadoHistory[]) => {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
        logger.info('History saved to storage');
    },
    clearCurrentAsado: () => {
        localStorage.removeItem(STORAGE_KEYS.EXPENSES);
        logger.info('Current asado cleared from storage');
    }
};
