import { describe, it, expect } from 'vitest';
import { asadoReducer, AsadoState } from './AsadoContext';
import { Participant, Expense } from '../types';

describe('asadoReducer', () => {
    const initialState: AsadoState = {
        participants: [],
        expenses: [],
        history: [],
    };

    it('should handle ADD_PARTICIPANT', () => {
        const participant: Participant = { id: '1', name: 'Alice', memberCount: 1, isConfirmed: true };
        const newState = asadoReducer(initialState, { type: 'ADD_PARTICIPANT', payload: participant });

        expect(newState.participants).toHaveLength(1);
        expect(newState.participants[0]).toEqual(participant);
    });

    it('should handle REMOVE_PARTICIPANT and clean up their expenses', () => {
        const state: AsadoState = {
            ...initialState,
            participants: [{ id: '1', name: 'Alice', memberCount: 1, isConfirmed: true }],
            expenses: [{ id: 'e1', participantId: '1', description: 'Meat', amount: 100 }],
        };

        const newState = asadoReducer(state, { type: 'REMOVE_PARTICIPANT', payload: '1' });

        expect(newState.participants).toHaveLength(0);
        expect(newState.expenses).toHaveLength(0);
    });

    it('should handle ADD_EXPENSE', () => {
        const expense: Expense = { id: 'e1', participantId: '1', description: 'Meat', amount: 100 };
        const newState = asadoReducer(initialState, { type: 'ADD_EXPENSE', payload: expense });

        expect(newState.expenses).toHaveLength(1);
        expect(newState.expenses[0]).toEqual(expense);
    });

    it('should handle TOGGLE_CONFIRM', () => {
        const state: AsadoState = {
            ...initialState,
            participants: [{ id: '1', name: 'Alice', memberCount: 1, isConfirmed: true }],
        };

        const newState = asadoReducer(state, { type: 'TOGGLE_CONFIRM', payload: '1' });

        expect(newState.participants[0].isConfirmed).toBe(false);
    });
});
