import { describe, it, expect } from 'vitest';
import { calculateBalances, settleDebts } from './calculations';
import { Participant, Expense } from '../types';

describe('calculations', () => {
    const participants: Participant[] = [
        { id: '1', name: 'Alice', memberCount: 1, isConfirmed: true },
        { id: '2', name: 'Bob', memberCount: 1, isConfirmed: true },
        { id: '3', name: 'Charlie', memberCount: 2, isConfirmed: true },
    ];

    const expenses: Expense[] = [
        { id: 'e1', participantId: '1', description: 'Meat', amount: 4000 },
        { id: 'e2', participantId: '2', description: 'Wine', amount: 2000 },
    ];

    describe('calculateBalances', () => {
        it('should calculate correct total cost and cost per person', () => {
            const { totalCost, costPerPerson, totalHeads } = calculateBalances(participants, expenses) as any;
            // totalHeads = 1 + 1 + 2 = 4
            // totalCost = 4000 + 2000 = 6000
            // costPerPerson = 6000 / 4 = 1500
            expect(totalCost).toBe(6000);
            expect(costPerPerson).toBe(1500);
        });

        it('should calculate correct individual balances', () => {
            const { balances } = calculateBalances(participants, expenses);

            const alice = balances.find(b => b.participantId === '1');
            const bob = balances.find(b => b.participantId === '2');
            const charlie = balances.find(b => b.participantId === '3');

            // Alice paid 4000, should pay 1500 * 1 = 1500. Balance = 2500
            expect(alice?.balance).toBe(2500);
            // Bob paid 2000, should pay 1500 * 1 = 1500. Balance = 500
            expect(bob?.balance).toBe(500);
            // Charlie paid 0, should pay 1500 * 2 = 3000. Balance = -3000
            expect(charlie?.balance).toBe(-3000);
        });
    });

    describe('settleDebts', () => {
        it('should generate correct transactions to settle debts', () => {
            const { balances } = calculateBalances(participants, expenses);
            const transactions = settleDebts(balances);

            // Charlie owes 3000. Alice is owed 2500. Bob is owed 500.
            expect(transactions).toHaveLength(2);

            const t1 = transactions.find(t => t.from === '3' && t.to === '1');
            const t2 = transactions.find(t => t.from === '3' && t.to === '2');

            expect(t1?.amount).toBe(2500);
            expect(t2?.amount).toBe(500);
        });
    });
});
