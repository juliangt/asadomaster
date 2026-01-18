
export interface Participant {
  id: string;
  name: string;
  memberCount: number; // 1 for individuals, 2+ for families/couples
  isConfirmed: boolean;
}

export interface Expense {
  id: string;
  participantId: string;
  description: string;
  amount: number;
}

export interface Transaction {
  from: string; // Participant ID
  to: string;   // Participant ID
  amount: number;
}

export interface AsadoHistory {
  id: string;
  date: string;
  totalCost: number;
  participantsCount: number;
  description: string;
  participants?: Participant[];
}

export interface BalanceSheet {
  participantId: string;
  name: string;
  paid: number;
  shouldPay: number;
  balance: number;
}
