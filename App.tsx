
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Minus,
  Users, 
  Receipt, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Flame, 
  TrendingUp, 
  History,
  Calculator,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { Participant, Expense, AsadoHistory } from './types';
import { calculateBalances, settleDebts } from './utils/calculations';
import Card from './components/Card';

const App: React.FC = () => {
  // State
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('asado_participants');
    return saved ? JSON.parse(saved) : [];
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('asado_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState<AsadoHistory[]>(() => {
    const saved = localStorage.getItem('asado_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Forms
  const [newParticipant, setNewParticipant] = useState({ name: '', memberCount: 1 });
  const [newExpense, setNewExpense] = useState({ participantId: '', description: '', amount: '' });
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  // Persistence
  useEffect(() => {
    localStorage.setItem('asado_participants', JSON.stringify(participants));
    localStorage.setItem('asado_expenses', JSON.stringify(expenses));
    localStorage.setItem('asado_history', JSON.stringify(history));
  }, [participants, expenses, history]);

  // Derived calculations
  const { balances, totalCost, costPerPerson } = useMemo(() => 
    calculateBalances(participants, expenses), 
    [participants, expenses]
  );

  const transactions = useMemo(() => settleDebts(balances), [balances]);

  const totalHeads = participants.filter(p => p.isConfirmed).reduce((sum, p) => sum + p.memberCount, 0);

  // Handlers
  const addParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParticipant.name.trim()) return;
    
    const id = crypto.randomUUID();
    setParticipants([...participants, { 
      id, 
      name: newParticipant.name, 
      memberCount: newParticipant.memberCount, 
      isConfirmed: true 
    }]);
    setNewParticipant({ name: '', memberCount: 1 });
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
    setExpenses(expenses.filter(e => e.participantId !== id));
  };

  const toggleConfirm = (id: string) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, isConfirmed: !p.isConfirmed } : p
    ));
  };

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.participantId || !newExpense.description || !newExpense.amount) return;
    
    setExpenses([...expenses, {
      id: crypto.randomUUID(),
      participantId: newExpense.participantId,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount)
    }]);
    setNewExpense({ ...newExpense, description: '', amount: '' });
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const saveToHistory = () => {
    if (totalCost === 0) return;
    const item: AsadoHistory = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
      totalCost,
      participantsCount: totalHeads,
      description: `Asado con ${totalHeads} personas`
    };
    setHistory([item, ...history]);
    setExpenses([]);
    alert("¡Asado guardado en el historial!");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(val);
  };

  return (
    <div className="min-h-screen pb-12 bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
              onClick={() => setActiveTab('current')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'current' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Calculator size={16} />
              Actual
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'history' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <History size={16} />
              Historial
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        {activeTab === 'current' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar: Summary & Settlements */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-none text-white shadow-xl">
                <div className="space-y-6">
                  <div>
                    <p className="text-orange-100 text-sm font-bold opacity-90 uppercase tracking-widest">Gasto Total</p>
                    <p className="text-4xl font-black tracking-tight drop-shadow-sm">{formatCurrency(totalCost)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-orange-100 text-[10px] font-black uppercase tracking-wider">Por Persona</p>
                      <p className="text-xl font-black">{formatCurrency(costPerPerson)}</p>
                    </div>
                    <div>
                      <p className="text-orange-100 text-[10px] font-black uppercase tracking-wider">Total Pax</p>
                      <p className="text-xl font-black">{totalHeads}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Liquidación de Cuentas" className="shadow-sm">
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((t, idx) => {
                      const from = participants.find(p => p.id === t.from);
                      const to = participants.find(p => p.id === t.to);
                      return (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                          <div className="flex flex-col">
                            <span className="font-black text-lg text-gray-900 leading-none mb-1">{from?.name}</span>
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">Debe pagar a</span>
                          </div>
                          <div className="flex flex-col items-center px-2">
                            <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100">
                              <ChevronRight size={18} className="text-orange-600" />
                            </div>
                            <span className="text-sm font-black text-orange-600 mt-1 whitespace-nowrap">{formatCurrency(t.amount)}</span>
                          </div>
                          <div className="flex flex-col items-end text-right">
                            <span className="font-black text-lg text-gray-900 leading-none mb-1">{to?.name}</span>
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">Recibe</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Sin deudas</p>
                  </div>
                )}
                <button 
                  onClick={saveToHistory}
                  disabled={totalCost === 0}
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.98]"
                >
                  <TrendingUp size={18} />
                  Finalizar Asado
                </button>
              </Card>
            </div>

            {/* Main Content: Participants & Expenses */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Participants Section */}
              <Card 
                title="Participantes" 
                className="shadow-sm"
                footer={
                  <form onSubmit={addParticipant} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Nombre o Familia" 
                        value={newParticipant.name}
                        onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm"
                      />
                    </div>
                    {/* Stepper para Integrantes */}
                    <div className="flex items-center gap-1 px-1 bg-gray-100 rounded-xl border border-gray-200">
                       <button 
                        type="button"
                        onClick={() => setNewParticipant(prev => ({...prev, memberCount: Math.max(1, prev.memberCount - 1)}))}
                        className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                       >
                         <Minus size={18} />
                       </button>
                       <div className="flex flex-col items-center min-w-[40px] px-1">
                         <span className="text-[9px] font-black text-gray-400 uppercase leading-none">Pax</span>
                         <span className="text-sm font-black text-gray-900 leading-tight">{newParticipant.memberCount}</span>
                       </div>
                       <button 
                        type="button"
                        onClick={() => setNewParticipant(prev => ({...prev, memberCount: prev.memberCount + 1}))}
                        className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                       >
                         <Plus size={18} />
                       </button>
                    </div>
                    <button type="submit" className="bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-md active:scale-95">
                      <Plus size={18} />
                      Agregar
                    </button>
                  </form>
                }
              >
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                  {participants.length > 0 ? participants.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-300 transition-all group shadow-sm">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleConfirm(p.id)}
                          className={`transition-all transform hover:scale-110 ${p.isConfirmed ? 'text-green-500' : 'text-gray-300'}`}
                        >
                          {p.isConfirmed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                        </button>
                        <div>
                          <p className={`font-black text-xl leading-tight ${p.isConfirmed ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                            {p.name}
                          </p>
                          <span className="text-[11px] font-black text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tighter mt-1 inline-block">
                            {p.memberCount > 1 ? `${p.memberCount} Integrantes` : 'Individual'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-black text-gray-900">
                            {formatCurrency(balances.find(b => b.participantId === p.id)?.paid || 0)}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Invertido</p>
                        </div>
                        <button 
                          onClick={() => removeParticipant(p.id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                      <Users size={64} strokeWidth={1} className="mb-4 opacity-50" />
                      <p className="text-base font-bold uppercase tracking-widest">Carga a los amigos</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Expenses Section */}
              <Card 
                title="Gastos / Compras" 
                className="shadow-sm"
                footer={
                  <form onSubmit={addExpense} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <select 
                      value={newExpense.participantId}
                      onChange={(e) => setNewExpense({...newExpense, participantId: e.target.value})}
                      className="sm:col-span-3 px-3 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-black text-gray-900 outline-none focus:border-orange-500"
                    >
                      <option value="">¿Quién?</option>
                      {participants.filter(p => p.isConfirmed).map(p => (
                        <option key={p.id} value={p.id} className="text-gray-900 font-bold">{p.name}</option>
                      ))}
                    </select>
                    <input 
                      type="text" 
                      placeholder="¿Qué compró?" 
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                      className="sm:col-span-6 px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500 shadow-sm"
                    />
                    <div className="sm:col-span-3 flex gap-2">
                      <input 
                        type="number" 
                        placeholder="$" 
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        className="w-full px-3 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-black text-gray-900 placeholder:text-gray-400 outline-none focus:border-orange-500 shadow-sm"
                      />
                      <button type="submit" className="bg-gray-800 text-white p-3 rounded-xl hover:bg-black transition-all shadow-md active:scale-95">
                        <Plus size={20} />
                      </button>
                    </div>
                  </form>
                }
              >
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                  {expenses.length > 0 ? expenses.map(e => {
                    const payer = participants.find(p => p.id === e.participantId);
                    return (
                      <div key={e.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-orange-200 transition-all shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600">
                            <Receipt size={22} />
                          </div>
                          <div>
                            <p className="text-lg font-black text-gray-900 leading-tight">{e.description}</p>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Pagado por {payer?.name || '?'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-black text-xl text-gray-900 whitespace-nowrap">{formatCurrency(e.amount)}</span>
                          <button 
                            onClick={() => removeExpense(e.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                      <Receipt size={64} strokeWidth={1} className="mb-4 opacity-50" />
                      <p className="text-base font-bold uppercase tracking-widest">Registra compras</p>
                    </div>
                  )}
                </div>
              </Card>

            </div>
          </div>
        ) : (
          /* History View */
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Historial de Asados</h2>
              <button 
                onClick={() => {
                  if (confirm("¿Estás seguro de borrar todo el historial?")) setHistory([]);
                }}
                className="text-red-500 text-sm font-black hover:bg-red-50 px-4 py-2 rounded-lg transition-all"
              >
                BORRAR TODO
              </button>
            </div>
            
            {history.length > 0 ? history.map(h => (
              <div key={h.id} className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center justify-between hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className="flex items-center gap-5">
                  <div className="bg-gray-100 p-4 rounded-2xl text-gray-500">
                    <Flame size={32} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900 leading-none mb-2">{h.description}</p>
                    <div className="flex gap-2">
                      <span className="text-[11px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-md uppercase border border-gray-100">{h.date}</span>
                      <span className="text-[11px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-md uppercase border border-orange-100">{h.participantsCount} personas</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-orange-600 tracking-tighter">{formatCurrency(h.totalCost)}</p>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <History size={64} className="mx-auto text-gray-200 mb-6" />
                <p className="text-gray-400 font-bold text-lg">No hay registros.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
          background-clip: content-box;
        }
        input::placeholder, select::placeholder {
          color: #9ca3af !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default App;
