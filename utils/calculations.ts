
import { Participant, Expense, BalanceSheet, Transaction } from '../types';

export const calculateBalances = (
  participants: Participant[],
  expenses: Expense[]
): { balances: BalanceSheet[]; totalCost: number; costPerPerson: number } => {
  const confirmedParticipants = participants.filter(p => p.isConfirmed);
  const totalHeads = confirmedParticipants.reduce((sum, p) => sum + p.memberCount, 0);
  const totalCost = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const costPerPerson = totalHeads > 0 ? totalCost / totalHeads : 0;

  const balances: BalanceSheet[] = confirmedParticipants.map(participant => {
    const paid = expenses
      .filter(e => e.participantId === participant.id)
      .reduce((sum, e) => sum + e.amount, 0);
    
    const shouldPay = costPerPerson * participant.memberCount;
    const balance = paid - shouldPay;

    return {
      participantId: participant.id,
      name: participant.name,
      paid,
      shouldPay,
      balance
    };
  });

  return { balances, totalCost, costPerPerson };
};

export const settleDebts = (balances: BalanceSheet[]): Transaction[] => {
  const debtors = balances
    .filter(b => b.balance < -0.01)
    .map(b => ({ ...b, balance: Math.abs(b.balance) }))
    .sort((a, b) => b.balance - a.balance);

  const creditors = balances
    .filter(b => b.balance > 0.01)
    .sort((a, b) => b.balance - a.balance);

  const transactions: Transaction[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = Math.min(debtor.balance, creditor.balance);
    
    if (amount > 0.01) {
      transactions.push({
        from: debtor.participantId,
        to: creditor.participantId,
        amount: Number(amount.toFixed(2))
      });
    }

    debtor.balance -= amount;
    creditor.balance -= amount;

    if (debtor.balance < 0.01) i++;
    if (creditor.balance < 0.01) j++;
  }

  return transactions;
};
