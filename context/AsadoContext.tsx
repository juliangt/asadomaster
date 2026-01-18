
import React, { createContext, useContext, useReducer, useEffect, useMemo, ReactNode } from 'react';
import { Participant, Expense, AsadoHistory } from '../types';
import { storage } from '../services/storage';
import { logger } from '../utils/logger';
import { calculateBalances, settleDebts } from '../utils/calculations';
import { useLanguage } from './LanguageContext';

export interface AsadoState {
    participants: Participant[];
    expenses: Expense[];
    history: AsadoHistory[];
}

export type AsadoAction =
    | { type: 'SET_PARTICIPANTS'; payload: Participant[] }
    | { type: 'ADD_PARTICIPANT'; payload: Participant }
    | { type: 'REMOVE_PARTICIPANT'; payload: string }
    | { type: 'TOGGLE_CONFIRM'; payload: string }
    | { type: 'ADD_EXPENSE'; payload: Expense }
    | { type: 'REMOVE_EXPENSE'; payload: string }
    | { type: 'CLEAR_EXPENSES' }
    | { type: 'SET_HISTORY'; payload: AsadoHistory[] }
    | { type: 'ADD_HISTORY_ITEM'; payload: AsadoHistory }
    | { type: 'CLEAR_HISTORY' };

interface AsadoContextType extends AsadoState {
    addParticipant: (name: string, memberCount: number) => void;
    removeParticipant: (id: string) => void;
    toggleConfirm: (id: string) => void;
    addExpense: (participantId: string, description: string, amount: number) => void;
    removeExpense: (id: string) => void;
    saveToHistory: () => void;
    clearHistory: () => void;
    totalCost: number;
    costPerPerson: number;
    totalHeads: number;
    balances: any[];
    transactions: any[];
}

const AsadoContext = createContext<AsadoContextType | undefined>(undefined);

export const asadoReducer = (state: AsadoState, action: AsadoAction): AsadoState => {
    logger.info(`Action: ${action.type}`, 'payload' in action ? action.payload : '');

    switch (action.type) {
        case 'SET_PARTICIPANTS':
            return { ...state, participants: action.payload };
        case 'ADD_PARTICIPANT':
            return { ...state, participants: [...state.participants, action.payload] };
        case 'REMOVE_PARTICIPANT':
            return {
                ...state,
                participants: state.participants.filter((p) => p.id !== action.payload),
                expenses: state.expenses.filter((e) => e.participantId !== action.payload),
            };
        case 'TOGGLE_CONFIRM':
            return {
                ...state,
                participants: state.participants.map((p) =>
                    p.id === action.payload ? { ...p, isConfirmed: !p.isConfirmed } : p
                ),
            };
        case 'ADD_EXPENSE':
            return { ...state, expenses: [...state.expenses, action.payload] };
        case 'REMOVE_EXPENSE':
            return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };
        case 'CLEAR_EXPENSES':
            return { ...state, expenses: [] };
        case 'SET_HISTORY':
            return { ...state, history: action.payload };
        case 'ADD_HISTORY_ITEM':
            return { ...state, history: [action.payload, ...state.history] };
        case 'CLEAR_HISTORY':
            return { ...state, history: [] };
        default:
            return state;
    }
};

export const AsadoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { t } = useLanguage();
    const [state, dispatch] = useReducer(asadoReducer, {
        participants: storage.getParticipants(),
        expenses: storage.getExpenses(),
        history: storage.getHistory(),
    });

    useEffect(() => {
        storage.saveParticipants(state.participants);
    }, [state.participants]);

    useEffect(() => {
        storage.saveExpenses(state.expenses);
    }, [state.expenses]);

    useEffect(() => {
        storage.saveHistory(state.history);
    }, [state.history]);

    const { balances, totalCost, costPerPerson } = useMemo(
        () => calculateBalances(state.participants, state.expenses),
        [state.participants, state.expenses]
    );

    const transactions = useMemo(() => settleDebts(balances), [balances]);

    const totalHeads = useMemo(
        () => state.participants.filter((p) => p.isConfirmed).reduce((sum, p) => sum + p.memberCount, 0),
        [state.participants]
    );

    const addParticipant = (name: string, memberCount: number) => {
        const id = crypto.randomUUID();
        dispatch({
            type: 'ADD_PARTICIPANT',
            payload: { id, name, memberCount, isConfirmed: true },
        });
    };

    const removeParticipant = (id: string) => {
        dispatch({ type: 'REMOVE_PARTICIPANT', payload: id });
    };

    const toggleConfirm = (id: string) => {
        dispatch({ type: 'TOGGLE_CONFIRM', payload: id });
    };

    const addExpense = (participantId: string, description: string, amount: number) => {
        dispatch({
            type: 'ADD_EXPENSE',
            payload: { id: crypto.randomUUID(), participantId, description, amount },
        });
    };

    const removeExpense = (id: string) => {
        dispatch({ type: 'REMOVE_EXPENSE', payload: id });
    };

    const saveToHistory = () => {
        if (totalCost === 0) return;
        const item: AsadoHistory = {
            id: crypto.randomUUID(),
            date: new Date().toLocaleDateString(),
            totalCost,
            participantsCount: totalHeads,
            description: `${t('asado')} ${totalHeads} ${t('people_count')}`,
            participants: state.participants.filter((p) => p.isConfirmed),
        };
        dispatch({ type: 'ADD_HISTORY_ITEM', payload: item });
        dispatch({ type: 'CLEAR_EXPENSES' });
        logger.info('Asado saved to history');
    };

    const clearHistory = () => {
        if (confirm(t('delete_all_confirm'))) {
            dispatch({ type: 'CLEAR_HISTORY' });
            logger.warn('History cleared');
        }
    };

    return (
        <AsadoContext.Provider
            value={{
                ...state,
                addParticipant,
                removeParticipant,
                toggleConfirm,
                addExpense,
                removeExpense,
                saveToHistory,
                clearHistory,
                totalCost,
                costPerPerson,
                totalHeads,
                balances,
                transactions,
            }}
        >
            {children}
        </AsadoContext.Provider>
    );
};

export const useAsado = () => {
    const context = useContext(AsadoContext);
    if (context === undefined) {
        throw new Error('useAsado must be used within an AsadoProvider');
    }
    return context;
};
