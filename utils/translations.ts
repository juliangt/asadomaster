
export type TranslationKey = keyof typeof translations.es;

export const translations = {
    es: {
        // Header
        nav_current: 'Actual',
        nav_history: 'Historial',
        // SummaryCard
        total_expense: 'Gasto Total',
        per_person: 'Por Persona',
        total_pax: 'Total Pax',
        // SettlementsList
        settlements_title: 'Liquidación de Cuentas',
        must_pay_to: 'Debe pagar a',
        receives: 'Recibe',
        no_debts: 'Sin deudas',
        finish_asado: 'Finalizar Asado',
        // ExpensesSection
        expenses_title: 'Compras',
        who_placeholder: '¿Quién?',
        what_bought_placeholder: 'Carne, Bebidas, Pan...',
        amount_placeholder: 'Importe',
        paid_by: 'Pagado por',
        register_purchases: 'Registra compras',
        // ParticipantsSection
        participants_title: 'Participantes',
        name_placeholder: 'Nombre o Familia',
        pax_label: 'Pax',
        add_btn: 'Agregar',
        members_count: 'Integrantes',
        individual: 'Individual',
        paid_label: 'Pagado',
        load_friends: 'Carga a los amigos',
        // HistoryView
        history_title: 'Historial de Asados',
        delete_all: 'BORRAR TODO',
        people_count: 'personas',
        total_spent: 'Total Gasto',
        no_records: 'No hay registros.',
        // SuccessModal
        mission_accomplished: '¡Misión Cumplida!',
        save_success: 'El asado ha sido guardado exitosamente en tu historial.',
        view_history_btn: 'Ver Historial',
        // Modals/Confirms
        delete_all_confirm: '¿Estás seguro de borrar todo el historial?',
        // Generic
        asado: 'Asado',
    },
    en: {
        // Header
        nav_current: 'Current',
        nav_history: 'History',
        // SummaryCard
        total_expense: 'Total Expense',
        per_person: 'Per Person',
        total_pax: 'Total Pax',
        // SettlementsList
        settlements_title: 'Account Settlement',
        must_pay_to: 'Must pay to',
        receives: 'Receives',
        no_debts: 'No debts',
        finish_asado: 'Finish BBQ',
        // ExpensesSection
        expenses_title: 'Purchases',
        who_placeholder: 'Who?',
        what_bought_placeholder: 'Meat, drinks, bread...',
        amount_placeholder: 'Amount',
        paid_by: 'Paid by',
        register_purchases: 'Register purchases',
        // ParticipantsSection
        participants_title: 'Participants',
        name_placeholder: 'Name or Family',
        pax_label: 'Pax',
        add_btn: 'Add',
        members_count: 'Members',
        individual: 'Individual',
        paid_label: 'Paid',
        load_friends: 'Add your friends',
        // HistoryView
        history_title: 'BBQ History',
        delete_all: 'CLEAR ALL',
        people_count: 'people',
        total_spent: 'Total Spent',
        no_records: 'No records found.',
        // SuccessModal
        mission_accomplished: 'Mission Accomplished!',
        save_success: 'The BBQ has been successfully saved to your history.',
        view_history_btn: 'View History',
        // Modals/Confirms
        delete_all_confirm: 'Are you sure you want to clear the entire history?',
        // Generic
        asado: 'BBQ',
    },
};

export const getBrowserLanguage = (): 'es' | 'en' => {
    const lang = navigator.language.split('-')[0];
    return lang === 'es' ? 'es' : 'en';
};
