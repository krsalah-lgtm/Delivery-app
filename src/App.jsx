import React, { useState, useEffect } from 'react';

const translations = {
  ar: {
    appTitle: '🚀 إكسبريس دليفري PRO',
    appSubtitle: 'النظام الذكي لإدارة الطلبات واللوجستيات',
    groqConnected: '🟢 AI متصل',
    groqMissing: '🔴 المفتاح مفقود',
    navNewOrder: '➕ طلب جديد',
    navOrders: '📋 إدارة الطلبات',
    navDrivers: '🛵 الطيارين',
    navDriverLedger: '📊 كشف حساب الطيارين',
    navMerchants: '🏪 التجار',
    navCustomers: '👥 العملاء',
    navHistory: '📜 السجل والتعديلات',
    navSettings: '⚙️ الإعدادات',
    kpiTotalCod: 'إجمالي النقدية (COD)',
    kpiActiveOrders: 'طلبات نشطة',
    kpiCompleted: 'تم التوصيل',
    aiHeader: '✨ استخراج بيانات الطلب بواسطة AI',
    placeholderOrder: 'ألصق نص الطلب هنا...',
    btnPaste: '📋 لصق من الحافظة',
    btnExtract: '⚡ استخراج البيانات بالذكاء الاصطناعي',
    btnExtracting: 'جاري التحليل والتدقيق...',
    reviewTitle: 'مراجعة البيانات المستخرجة:',
    store: 'المتجر',
    customer: 'العميل',
    phone: 'رقم الهاتف',
    cod: 'المبلغ (COD)',
    address: 'العنوان',
    item: 'الصنف',
    notes: 'ملاحظات الطلب',
    addressWarning: '📍 تنبيه عنوان غير مكتمل: يرجى مراجعة وتأكيد العنوان!',
    selectDriver: 'اختيار طيار التوصيل:',
    chooseDriver: '-- اختر طيار --',
    btnConfirm: '✅ تأكيد وحفظ الطلبات',
    searchPlaceholder: '🔍 بحث برقم الطلب، اسم العميل، المتجر، أو الهاتف...',
    unspecified: 'غير محدد',
    currency: 'ج.م',
    statusConfirmed: 'مؤكد',
    statusProcessing: 'قيد تجهيز الطلب',
    statusOutForDelivery: 'خرج للتوصيل',
    statusInTransit: 'جاري التوصيل',
    statusCompleted: 'مكتمل (تم التسليم)',
    statusDelayed: 'متأخر',
    statusCancelled: 'ملغي',
    addDriver: 'إضافة طيار جديد',
    driverName: 'اسم الطيار...',
    btnAdd: 'إضافة',
    driverCash: 'النقدية المطلوب تسليمها (المكتملة):',
    totalTrips: 'إجمالي الرحلات:',
    saveMerchant: 'إضافة أو تعديل تاجر',
    saveCustomer: 'إضافة عميل يدويًا',
    editCustomer: 'تعديل بيانات العميل',
    saveBtn: 'حفظ',
    deleteBtn: 'حذف',
    editBtn: 'تعديل',
    editNoteBtn: 'تعديل الملاحظات',
    settingsTitle: 'إعدادات النظام',
    editAmount: 'تعديل المبلغ',
    saveAmount: 'تم الحفظ',
    confirmDbUpdateTitle: '⚠️ تأكيد تحديث بيانات قاعدة البيانات',
    confirmDbUpdateMsg: 'تم العثور على تفاصيل جديدة تملأ بيانات مفقودة لعميل/متجر. هل تريد تحديث السجلات المخزنة؟',
    confirmDeleteMsg: 'هل أنت تأكد من رغبتك في حذف هذا الطلب نهائياً؟',
    typoAlertTitle: '🔍 تم رصد كلمات قد تحتوي على خطأ إملائي غير معروف:',
    historyTitle: '📜 سجل عمليات وتعديلات الطلبات',
    noHistory: 'لا توجد سجلات تعديل حتى الآن.',
    driverLedgerTitle: '📊 كشف حساب وتوريد الطيارين اليومي والشهري',
    filterDriver: 'تصفية بالطيار:',
    filterDate: 'التاريخ:',
    allDrivers: 'كل الطيارين',
    cashToHandIn: '💵 النقدية الواجب تسليمها اليوم',
    todaysOrdersCount: '📦 طلبات اليوم',
    monthsOrdersCount: '📅 طلبات الشهر الحالي',
    monthsTotalCash: '💰 إجمالي تحصيل الشهر',
    ordersHandled: 'تفاصيل الطلبات المسندة:',
    noOrdersForDate: 'لا توجد طلبات مسجلة لهذه الفلاتر.'
  },
  en: {
    appTitle: '🚀 Express Delivery PRO',
    appSubtitle: 'AI Logistics & Multi-Order Management Platform',
    groqConnected: '🟢 AI Active',
    groqMissing: '🔴 Key Missing',
    navNewOrder: '➕ New Order',
    navOrders: '📋 Manage Orders',
    navDrivers: '🛵 Drivers',
    navDriverLedger: '📊 Driver Ledger',
    navMerchants: '🏪 Stores',
    navCustomers: '👥 Customers',
    navHistory: '📜 Audit History',
    navSettings: '⚙️ Settings',
    kpiTotalCod: 'Total Earned (COD)',
    kpiActiveOrders: 'Active Orders',
    kpiCompleted: 'Completed Orders',
    aiHeader: '✨ AI Order Extraction',
    placeholderOrder: 'Paste delivery text here...',
    btnPaste: '📋 Paste Clipboard',
    btnExtract: '⚡ Extract Data with AI',
    btnExtracting: 'Analyzing & Checking...',
    reviewTitle: 'Extracted Orders Review:',
    store: 'Store',
    customer: 'Customer',
    phone: 'Phone',
    cod: 'COD Amount',
    address: 'Address',
    item: 'Item Details',
    notes: 'Order Notes',
    addressWarning: '📍 Incomplete Address Alert: Double check details!',
    selectDriver: 'Assign Driver:',
    chooseDriver: '-- Select Driver --',
    btnConfirm: '✅ Confirm & Save Orders',
    searchPlaceholder: '🔍 Search Order #, Customer, Store, Phone...',
    unspecified: 'N/A',
    currency: 'EGP',
    statusConfirmed: 'Confirmed',
    statusProcessing: 'Processing',
    statusOutForDelivery: 'Out for Delivery',
    statusInTransit: 'In Transit',
    statusCompleted: 'Completed',
    statusDelayed: 'Delayed',
    statusCancelled: 'Cancelled',
    addDriver: 'Add Driver',
    driverName: 'Driver Name...',
    btnAdd: 'Add Driver',
    driverCash: 'Cash to Hand In (Completed):',
    totalTrips: 'Total Trips:',
    saveMerchant: 'Save Store Details',
    saveCustomer: 'Add Customer',
    editCustomer: 'Edit Customer',
    saveBtn: 'Save',
    deleteBtn: 'Delete',
    editBtn: 'Edit',
    editNoteBtn: 'Edit Note',
    settingsTitle: 'System Settings',
    editAmount: 'Edit Amount',
    saveAmount: 'Save',
    confirmDbUpdateTitle: '⚠️ Confirm Database Update',
    confirmDbUpdateMsg: 'New details found that fill in missing customer/store entries. Update database records?',
    confirmDeleteMsg: 'Are you sure you want to permanently delete this order?',
    typoAlertTitle: '🔍 Unrecognized words detected:',
    historyTitle: '📜 Audit Log & Order Edits History',
    noHistory: 'No edit history recorded yet.',
    driverLedgerTitle: '📊 Daily & Monthly Driver Cash & Orders Ledger',
    filterDriver: 'Filter Driver:',
    filterDate: 'Filter Date:',
    allDrivers: 'All Drivers',
    cashToHandIn: '💵 Cash to Hand In Today',
    todaysOrdersCount: "📦 Today's Orders",
    monthsOrdersCount: "📅 This Month's Orders",
    monthsTotalCash: "💰 This Month's Total Cash",
    ordersHandled: 'Assigned Orders & Details:',
    noOrdersForDate: 'No orders match selected filters.'
  }
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'ar');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [activeTab, setActiveTab] = useState('new_order');
  const [searchQuery, setSearchQuery] = useState('');

  // Databases & Counters
  const [orderCounter, setOrderCounter] = useState(() => parseInt(localStorage.getItem('order_counter_num') || '1001'));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_orders_v5') || '[]'));
  const [merchants, setMerchants] = useState(() => JSON.parse(localStorage.getItem('delivery_merchants_v5') || '[]'));
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('delivery_customers_v5') || '[]'));
  const [drivers, setDrivers] = useState(() => JSON.parse(localStorage.getItem('delivery_drivers_v5') || '["أحمد", "محمود", "مصطفى"]'));
  const [historyLogs, setHistoryLogs] = useState(() => JSON.parse(localStorage.getItem('delivery_history_v5') || '[]'));

  // Form & Extraction States
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedOrders, setExtractedOrders] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [newDriverName, setNewDriverName] = useState('');
  
  // Ledger Filters
  const [ledgerDriver, setLedgerDriver] = useState('');
  const [ledgerDate, setLedgerDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Typo Verification Dialog
  const [typoFlags, setTypoFlags] = useState([]);
  const [showTypoModal, setShowTypoModal] = useState(false);

  // Inline Edits
  const [editingAmountId, setEditingAmountId] = useState(null);
  const [tempAmount, setTempAmount] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  // Forms
  const [merchantForm, setMerchantForm] = useState({ id: null, name: '', phone: '', address: '', notes: '' });
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  const t = translations[lang];

  useEffect(() => localStorage.setItem('app_lang', lang), [lang]);
  useEffect(() => localStorage.setItem('groq_api_key', apiKey), [apiKey]);
  useEffect(() => localStorage.setItem('order_counter_num', orderCounter.toString()), [orderCounter]);
  useEffect(() => localStorage.setItem('delivery_orders_v5', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('delivery_merchants_v5', JSON.stringify(merchants)), [merchants]);
  useEffect(() => localStorage.setItem('delivery_customers_v5', JSON.stringify(customers)), [customers]);
  useEffect(() => localStorage.setItem('delivery_drivers_v5', JSON.stringify(drivers)), [drivers]);
  useEffect(() => localStorage.setItem('delivery_history_v5', JSON.stringify(historyLogs)), [historyLogs]);

  const addAuditLog = (orderNum, action, details) => {
    const log = {
      id: Date.now(),
      orderNum,
      action,
      details,
      time: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')
    };
    setHistoryLogs(prev => [log, ...prev]);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch (err) {
      alert('Clipboard permission denied.');
    }
  };

  const isIncompleteAddress = (addressStr) => {
    if (!addressStr || addressStr === t.unspecified || addressStr.length < 10) return true;
    const lower = addressStr.toLowerCase();
    const keywords = ['شارع', 'ش', 'دور', 'شقة', 'عمارة', 'مبنى', 'street', 'st', 'floor', 'apt', 'flat'];
    return !keywords.some(k => lower.includes(k));
  };

  const extractOrderInfo = async () => {
    if (!apiKey.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال مفتاح Groq API في الإعدادات.' : 'Please add your Groq API key in Settings.');
      setActiveTab('settings');
      return;
    }
    if (!rawText.trim()) return alert(lang === 'ar' ? 'يرجى إدخال نص الطلب أولاً.' : 'Please enter order text.');

    setLoading(true);
    setExtractedOrders([]);
    setTypoFlags([]);

    const systemPrompt = `You are an Egyptian delivery parser. Extract details from Egyptian Arabic input accurately.

CRITICAL RULES FOR COD AMOUNT & CORRECTIONS:
1. Pay strict attention to mid-text corrections, cancellations, or updates to item lists.
2. Always use the FINAL agreed total (COD). If the user states items were canceled (e.g. "الميه اتلغت") and confirms a final lower total (e.g. "يبقى 840 جنيه؟ آه بالضبط"), extract 840 as "cod", NOT any previously mentioned intermediate total (like 930).
3. "store": Include branch names (e.g., "بي تك - سموحه", "كارفور - سموحه").
4. "notes": Include delivery fee breakdown, call instructions ("كلمه قبل ما تطلعله"), timing constraints ("وصل بعد الساعة ٧"), and handling notes.
5. "ambiguous_flags": Standard Egyptian Arabic terms (like "مقاضي", "كيسين", "شغال", "شقه", "عماره", "ساقعة") are NOT typos. Only highlight genuine unintelligible errors or ambiguous words.

JSON output structure:
{
  "ambiguous_flags": [],
  "orders": [
    {
      "store": "Store name and branch",
      "customer": "Customer/Recipient name",
      "phone": "Phone number",
      "address": "Delivery address",
      "cod": 0,
      "item": "Items description",
      "notes": "Delivery fee, call instructions, and notes"
    }
  ]
}`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: rawText }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Extraction Failed');

      const parsed = JSON.parse(data.choices[0].message.content);

      if (parsed.ambiguous_flags && parsed.ambiguous_flags.length > 0) {
        setTypoFlags(parsed.ambiguous_flags);
        setShowTypoModal(true);
      }

      setExtractedOrders(parsed.orders || []);
    } catch (err) {
      alert('Error parsing order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = () => {
    if (extractedOrders.length === 0) return;

    let currentNum = orderCounter;
    const now = new Date();
    const isoDateStr = now.toISOString().split('T')[0];

    const newCreatedOrders = extractedOrders.map(ord => {
      const orderNumber = `#${currentNum++}`;
      addAuditLog(orderNumber, 'Created', `Order created for ${ord.customer} (${ord.cod} ${t.currency})`);
      return {
        id: Date.now() + Math.random(),
        orderNum: orderNumber,
        ...ord,
        driver: selectedDriver || t.unspecified,
        status: 'مؤكد',
        isoDate: isoDateStr,
        date: now.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      };
    });

    setOrderCounter(currentNum);
    setOrders([...newCreatedOrders, ...orders]);

    extractedOrders.forEach(ord => {
      if (ord.store && ord.store !== t.unspecified) {
        setMerchants(prev => {
          const match = prev.find(m => m.name.toLowerCase() === ord.store.toLowerCase());
          if (!match) return [{ id: Date.now() + Math.random(), name: ord.store, phone: '', address: '', notes: '', totalOrders: 1 }, ...prev];
          return prev.map(m => m.name.toLowerCase() === ord.store.toLowerCase() ? { ...m, totalOrders: (m.totalOrders || 0) + 1 } : m);
        });
      }
      if (ord.customer && ord.customer !== t.unspecified) {
        setCustomers(prev => {
          const match = prev.find(c => c.phone === ord.phone || c.name === ord.customer);
          if (!match) return [{ id: Date.now() + Math.random(), name: ord.customer, phone: ord.phone, address: ord.address }, ...prev];
          return prev.map(c => (c.name === ord.customer || c.phone === ord.phone) ? { ...c, address: ord.address || c.address } : c);
        });
      }
    });

    setRawText('');
    setExtractedOrders([]);
    setSelectedDriver('');
    setActiveTab('orders');
  };

  const handleDeleteOrder = (order) => {
    if (window.confirm(`${t.confirmDeleteMsg} (${order.orderNum})`)) {
      setOrders(orders.filter(o => o.id !== order.id));
      addAuditLog(order.orderNum, 'Deleted', `Order for ${order.customer} deleted.`);
    }
  };

  const handleStatusChange = (order, newStatus) => {
    setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
    addAuditLog(order.orderNum, 'Status Change', `Status changed to "${newStatus}"`);
  };

  const handleDriverReassign = (order, newDriver) => {
    setOrders(orders.map(o => o.id === order.id ? { ...o, driver: newDriver } : o));
    addAuditLog(order.orderNum, 'Driver Reassigned', `Driver changed to "${newDriver}"`);
  };

  const handleAmountSave = (order) => {
    const oldAmount = order.cod;
    setOrders(orders.map(o => o.id === order.id ? { ...o, cod: tempAmount } : o));
    addAuditLog(order.orderNum, 'Amount Edited', `COD updated from ${oldAmount} to ${tempAmount} ${t.currency}`);
    setEditingAmountId(null);
  };

  const handleNoteSave = (order) => {
    const oldNote = order.notes;
    setOrders(orders.map(o => o.id === order.id ? { ...o, notes: tempNote } : o));
    addAuditLog(order.orderNum, 'Notes Edited', `Notes updated to "${tempNote}"`);
    setEditingNoteId(null);
  };

  const handleSaveCustomerExplicit = () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) return alert('Name and phone required');

    const match = customers.find(c => c.id === editingCustomer?.id);
    const fillsMissing = match && (!match.address && newCustomer.address);

    if (fillsMissing) {
      const confirmOk = window.confirm(`${t.confirmDbUpdateTitle}\n\n${t.confirmDbUpdateMsg}`);
      if (!confirmOk) return;
    }

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...newCustomer } : c));
      setEditingCustomer(null);
    } else {
      setCustomers([{ id: Date.now(), ...newCustomer }, ...customers]);
    }
    setNewCustomer({ name: '', phone: '', address: '' });
  };

  // Calculations
  // Direct Fix: Cancelled status (ملغي) returns 0 cash automatically across global and driver totals
  const getOrderEffectiveCash = (order) => {
    if (order.status === 'ملغي') return 0;
    return parseFloat(order.cod) || 0;
  };

  const totalEarnedSum = orders.filter(o => o.status === 'مكتمل').reduce((acc, o) => acc + getOrderEffectiveCash(o), 0);
  const activeOrdersCount = orders.filter(o => !['مكتمل', 'ملغي'].includes(o.status)).length;
  const completedOrdersCount = orders.filter(o => o.status === 'مكتمل').length;

  const filteredOrders = orders.filter(o => 
    (o.orderNum || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.customer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.store || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.phone || '').includes(searchQuery)
  );

  // Ledger Filter Calculations
  const selectedYearMonth = ledgerDate.substring(0, 7); // e.g., "2026-08"

  const filteredLedgerOrders = orders.filter(o => {
    const matchDriver = !ledgerDriver || o.driver === ledgerDriver;
    const matchDate = o.isoDate === ledgerDate;
    return matchDriver && matchDate;
  });

  const dailyCashToHandIn = filteredLedgerOrders
    .filter(o => o.status === 'مكتمل')
    .reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);

  const monthlyOrders = orders.filter(o => {
    const matchDriver = !ledgerDriver || o.driver === ledgerDriver;
    const matchMonth = (o.isoDate || '').startsWith(selectedYearMonth);
    return matchDriver && matchMonth;
  });

  const monthlyTotalCash = monthlyOrders
    .filter(o => o.status === 'مكتمل')
    .reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);

  return (
    <div style={{ ...styles.container, direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.appTitle}>{t.appTitle}</h1>
          <p style={styles.appSubtitle}>{t.appSubtitle}</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.langBtn} onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            {lang === 'ar' ? '🌐 English' : '🌐 العربية'}
          </button>
          <div style={{ ...styles.badge, background: apiKey ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
            {apiKey ? t.groqConnected : t.groqMissing}
          </div>
        </div>
      </header>

      {/* KPI Row */}
      <div style={styles.kpiRow}>
        <div style={{ ...styles.kpiCard, background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
          <span style={styles.kpiLabel}>{t.kpiTotalCod}</span>
          <span style={{ ...styles.kpiValue, color: '#38bdf8' }}>{totalEarnedSum.toLocaleString()} {t.currency}</span>
        </div>
        <div style={{ ...styles.kpiCard, background: 'linear-gradient(135deg, #064e3b, #047857)' }}>
          <span style={styles.kpiLabel}>{t.kpiActiveOrders}</span>
          <span style={{ ...styles.kpiValue, color: '#34d399' }}>{activeOrdersCount}</span>
        </div>
        <div style={{ ...styles.kpiCard, background: 'linear-gradient(135deg, #701a75, #a21caf)' }}>
          <span style={styles.kpiLabel}>{t.kpiCompleted}</span>
          <span style={{ ...styles.kpiValue, color: '#f472b6' }}>{completedOrdersCount}</span>
        </div>
      </div>

      {/* Nav Bar */}
      <nav style={styles.nav}>
        <button style={activeTab === 'new_order' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('new_order')}>{t.navNewOrder}</button>
        <button style={activeTab === 'orders' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('orders')}>{t.navOrders} ({orders.length})</button>
        <button style={activeTab === 'driver_ledger' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('driver_ledger')}>{t.navDriverLedger}</button>
        <button style={activeTab === 'drivers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('drivers')}>{t.navDrivers} ({drivers.length})</button>
        <button style={activeTab === 'merchants' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('merchants')}>{t.navMerchants} ({merchants.length})</button>
        <button style={activeTab === 'customers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('customers')}>{t.navCustomers} ({customers.length})</button>
        <button style={activeTab === 'history' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('history')}>{t.navHistory}</button>
        <button style={activeTab === 'settings' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('settings')}>{t.navSettings}</button>
      </nav>

      <main style={styles.main}>

        {/* TAB 1: NEW ORDER */}
        {activeTab === 'new_order' && (
          <div style={styles.card}>
            <div style={styles.rowBetween}>
              <h2 style={styles.cardTitle}>{t.aiHeader}</h2>
              <button onClick={handlePasteClipboard} style={styles.btnGradientCompact}>{t.btnPaste}</button>
            </div>
            
            <textarea
              rows={6}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={t.placeholderOrder}
              style={styles.textarea}
            />
            
            <button onClick={extractOrderInfo} disabled={loading} style={styles.btnPrimaryGradient}>
              {loading ? t.btnExtracting : t.btnExtract}
            </button>

            {/* Typo Modal */}
            {showTypoModal && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalCard}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#facc15' }}>{t.typoAlertTitle}</h3>
                  <ul style={{ paddingLeft: '20px', color: '#fca5a5' }}>
                    {typoFlags.map((flag, idx) => (
                      <li key={idx}><strong>{flag}</strong></li>
                    ))}
                  </ul>
                  <button onClick={() => setShowTypoModal(false)} style={styles.btnSuccessGradient}>OK, Continue</button>
                </div>
              </div>
            )}

            {extractedOrders.length > 0 && (
              <div style={styles.extractedBox}>
                <h3 style={{ marginTop: 0, color: '#facc15' }}>{t.reviewTitle}</h3>

                {extractedOrders.map((ord, idx) => (
                  <div key={idx} style={styles.extractedSubCard}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#38bdf8' }}>📦 {t.customer}: {ord.customer}</h4>
                    
                    {isIncompleteAddress(ord.address) && (
                      <div style={styles.addressWarningBox}>
                        <span>{t.addressWarning}</span>
                      </div>
                    )}

                    <div style={styles.grid2}>
                      <div><strong>{t.store}:</strong> {ord.store || t.unspecified}</div>
                      <div><strong>{t.customer}:</strong> {ord.customer || t.unspecified}</div>
                      <div><strong>{t.phone}:</strong> {ord.phone || t.unspecified}</div>
                      <div><strong>{t.cod}:</strong> {ord.cod || '0'} {t.currency}</div>
                      <div style={{ gridColumn: '1 / -1' }}><strong>{t.address}:</strong> {ord.address || t.unspecified}</div>
                      <div style={{ gridColumn: '1 / -1' }}><strong>{t.item}:</strong> {ord.item || t.unspecified}</div>
                      {ord.notes && (
                        <div style={{ gridColumn: '1 / -1', color: '#facc15' }}><strong>📌 {t.notes}:</strong> {ord.notes}</div>
                      )}
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: '12px' }}>
                  <label style={styles.label}>{t.selectDriver}</label>
                  <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} style={styles.input}>
                    <option value="">{t.chooseDriver}</option>
                    {drivers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </select>
                </div>

                <button onClick={handleConfirmOrder} style={styles.btnSuccessGradient}>{t.btnConfirm}</button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT LOG */}
        {activeTab === 'orders' && (
          <div>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />

            {filteredOrders.length === 0 ? <p style={styles.empty}>No orders found.</p> : filteredOrders.map(order => (
              <div key={order.id} style={styles.card}>
                <div style={styles.rowBetween}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={styles.orderNumTag}>{order.orderNum || '#1000'}</span>
                    <span style={styles.tagStore}>{order.store}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      style={getStatusStyle(order.status)}
                    >
                      <option value="مؤكد">{t.statusConfirmed}</option>
                      <option value="قيد تجهيز الطلب">{t.statusProcessing}</option>
                      <option value="خرج للتوصيل">{t.statusOutForDelivery}</option>
                      <option value="جاري التوصيل">{t.statusInTransit}</option>
                      <option value="مكتمل">{t.statusCompleted}</option>
                      <option value="متأخر">{t.statusDelayed}</option>
                      <option value="ملغي">{t.statusCancelled}</option>
                    </select>

                    <button onClick={() => handleDeleteOrder(order)} style={styles.btnDeleteCompact}>
                      🗑️ {t.deleteBtn}
                    </button>
                  </div>
                </div>

                <p style={styles.p}><strong>{t.customer}:</strong> {order.customer} ({order.phone})</p>
                
                {isIncompleteAddress(order.address) && (
                  <div style={styles.addressWarningBox}>
                    <span>{t.addressWarning}</span>
                  </div>
                )}
                
                <p style={styles.p}><strong>{t.address}:</strong> {order.address}</p>

                {/* EDITABLE NOTE SECTION */}
                <div style={{ backgroundColor: 'rgba(250, 204, 21, 0.08)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(250, 204, 21, 0.2)', margin: '10px 0' }}>
                  {editingNoteId === order.id ? (
                    <div>
                      <textarea
                        rows={2}
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        style={styles.textareaMargin}
                      />
                      <button onClick={() => handleNoteSave(order)} style={styles.btnSaveCompact}>{t.saveBtn}</button>
                    </div>
                  ) : (
                    <div style={styles.rowBetween}>
                      <span style={{ color: '#facc15' }}><strong>📌 {t.notes}:</strong> {order.notes || t.unspecified}</span>
                      <button onClick={() => { setEditingNoteId(order.id); setTempNote(order.notes || ''); }} style={styles.btnEditCompact}>
                        ✏️ {t.editNoteBtn}
                      </button>
                    </div>
                  )}
                </div>

                <div style={styles.amountRow}>
                  <div>
                    <strong>{t.cod}: </strong>
                    {editingAmountId === order.id ? (
                      <span style={{ display: 'inline-flex', gap: '5px' }}>
                        <input
                          type="number"
                          value={tempAmount}
                          onChange={(e) => setTempAmount(e.target.value)}
                          style={styles.inlineInput}
                        />
                        <button onClick={() => handleAmountSave(order)} style={styles.btnSaveCompact}>{t.saveAmount}</button>
                      </span>
                    ) : (
                      <span style={{ color: order.status === 'ملغي' ? '#ef4444' : '#34d399', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: order.status === 'ملغي' ? 'line-through' : 'none' }}>
                        {order.cod} {t.currency} {order.status === 'ملغي' ? '(0 ج.م للتسليم)' : ''}
                      </span>
                    )}
                  </div>

                  {editingAmountId !== order.id && (
                    <button onClick={() => { setEditingAmountId(order.id); setTempAmount(order.cod); }} style={styles.btnEditCompact}>
                      ✏️ {t.editAmount}
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <p style={{ ...styles.p, fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                    <strong>🕒 Time:</strong> {order.date} ({order.isoDate || 'Today'})
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}><strong>🛵 Driver:</strong></span>
                    <select
                      value={order.driver}
                      onChange={(e) => handleDriverReassign(order, e.target.value)}
                      style={{ ...styles.inlineInput, width: 'auto', padding: '4px' }}
                    >
                      <option value={t.unspecified}>{t.unspecified}</option>
                      {drivers.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: NEW DAILY & MONTHLY DRIVER LEDGER TAB */}
        {activeTab === 'driver_ledger' && (
          <div>
            <div style={styles.card}>
              <h2 style={{ marginTop: 0, color: '#38bdf8' }}>{t.driverLedgerTitle}</h2>
              
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>{t.filterDriver}</label>
                  <select value={ledgerDriver} onChange={(e) => setLedgerDriver(e.target.value)} style={styles.input}>
                    <option value="">-- {t.allDrivers} --</option>
                    {drivers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label style={styles.label}>{t.filterDate}</label>
                  <input type="date" value={ledgerDate} onChange={(e) => setLedgerDate(e.target.value)} style={styles.input} />
                </div>
              </div>
            </div>

            {/* Ledger KPI Cards */}
            <div style={styles.kpiRow}>
              <div style={{ ...styles.kpiCard, background: 'linear-gradient(135deg, #065f46, #047857)' }}>
                <span style={styles.kpiLabel}>{t.cashToHandIn}</span>
                <span style={{ ...styles.kpiValue, color: '#34d399' }}>{dailyCashToHandIn.toLocaleString()} {t.currency}</span>
              </div>
              <div style={{ ...styles.kpiCard, background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)' }}>
                <span style={styles.kpiLabel}>{t.todaysOrdersCount}</span>
                <span style={{ ...styles.kpiValue, color: '#60a5fa' }}>{filteredLedgerOrders.length}</span>
              </div>
              <div style={{ ...styles.kpiCard, background: 'linear-gradient(135deg, #581c87, #7e22ce)' }}>
                <span style={styles.kpiLabel}>{t.monthsTotalCash} ({selectedYearMonth})</span>
                <span style={{ ...styles.kpiValue, color: '#c084fc' }}>{monthlyTotalCash.toLocaleString()} {t.currency}</span>
              </div>
            </div>

            {/* Order Details Handled */}
            <div style={{ ...styles.card, marginTop: '18px' }}>
              <h3 style={{ marginTop: 0, color: '#facc15' }}>{t.ordersHandled}</h3>

              {filteredLedgerOrders.length === 0 ? (
                <p style={styles.empty}>{t.noOrdersForDate}</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeader}>
                        <th style={styles.th}>Order #</th>
                        <th style={styles.th}>Driver</th>
                        <th style={styles.th}>Customer</th>
                        <th style={styles.th}>Store</th>
                        <th style={styles.th}>COD</th>
                        <th style={styles.th}>Effective Cash</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLedgerOrders.map(o => {
                        const effCash = getOrderEffectiveCash(o);
                        return (
                          <tr key={o.id} style={styles.tableRow}>
                            <td style={styles.td}><strong>{o.orderNum}</strong></td>
                            <td style={styles.td}>{o.driver}</td>
                            <td style={styles.td}>{o.customer} ({o.phone})</td>
                            <td style={styles.td}>{o.store}</td>
                            <td style={{ ...styles.td, textDecoration: o.status === 'ملغي' ? 'line-through' : 'none' }}>{o.cod} {t.currency}</td>
                            <td style={{ ...styles.td, color: effCash > 0 ? '#34d399' : '#ef4444', fontWeight: 'bold' }}>{effCash} {t.currency}</td>
                            <td style={styles.td}>
                              <span style={{ ...getStatusStyle(o.status), padding: '2px 8px', fontSize: '0.75rem' }}>{o.status}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT HISTORY */}
        {activeTab === 'history' && (
          <div style={styles.card}>
            <h2 style={{ marginTop: 0, color: '#38bdf8' }}>{t.historyTitle}</h2>
            {historyLogs.length === 0 ? (
              <p style={styles.empty}>{t.noHistory}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {historyLogs.map(log => (
                  <div key={log.id} style={styles.historyCard}>
                    <div style={styles.rowBetween}>
                      <span style={styles.orderNumTag}>{log.orderNum}</span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>🕒 {log.time}</span>
                    </div>
                    <p style={{ margin: '4px 0', color: '#facc15', fontWeight: 'bold' }}>{log.action}</p>
                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem' }}>{log.details}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: DRIVERS */}
        {activeTab === 'drivers' && (
          <div>
            <div style={styles.card}>
              <h3 style={{ marginTop: 0 }}>{t.addDriver}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder={t.driverName} value={newDriverName} onChange={(e) => setNewDriverName(e.target.value)} style={styles.input} />
                <button onClick={() => {
                  if (newDriverName.trim() && !drivers.includes(newDriverName.trim())) {
                    setDrivers([...drivers, newDriverName.trim()]);
                    setNewDriverName('');
                  }
                }} style={styles.btnPrimaryGradient}>{t.btnAdd}</button>
              </div>
            </div>

            <div style={styles.grid2}>
              {drivers.map((driverName, idx) => {
                const driverOrders = orders.filter(o => o.driver === driverName);
                const completedCash = driverOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);

                return (
                  <div key={idx} style={styles.card}>
                    <div style={styles.rowBetween}>
                      <h3 style={{ margin: 0, color: '#38bdf8' }}>🛵 {driverName}</h3>
                      <button onClick={() => setDrivers(drivers.filter(d => d !== driverName))} style={styles.btnDeleteCompact}>{t.deleteBtn}</button>
                    </div>
                    <hr style={styles.hr} />
                    <p style={styles.p}>{t.totalTrips} <strong>{driverOrders.length}</strong></p>
                    <p style={styles.p}>{t.driverCash} <strong style={{ color: '#34d399' }}>{completedCash} {t.currency}</strong></p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: MERCHANTS */}
        {activeTab === 'merchants' && (
          <div>
            <div style={styles.card}>
              <h3 style={{ marginTop: 0 }}>{t.saveMerchant}</h3>
              <input type="text" placeholder="Store Name..." value={merchantForm.name} onChange={(e) => setMerchantForm({ ...merchantForm, name: e.target.value })} style={styles.inputMargin} />
              <input type="text" placeholder="Store Phone..." value={merchantForm.phone} onChange={(e) => setMerchantForm({ ...merchantForm, phone: e.target.value })} style={styles.inputMargin} />
              <input type="text" placeholder="Store Address..." value={merchantForm.address} onChange={(e) => setMerchantForm({ ...merchantForm, address: e.target.value })} style={styles.inputMargin} />
              <textarea rows={2} placeholder="Store Notes..." value={merchantForm.notes} onChange={(e) => setMerchantForm({ ...merchantForm, notes: e.target.value })} style={styles.textareaMargin} />
              <button onClick={() => {
                if (!merchantForm.name.trim()) return alert('Merchant name required');
                if (merchantForm.id) {
                  setMerchants(merchants.map(m => m.id === merchantForm.id ? merchantForm : m));
                } else {
                  setMerchants([{ id: Date.now(), ...merchantForm, totalOrders: 0 }, ...merchants]);
                }
                setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
              }} style={styles.btnSuccessGradient}>{t.saveBtn}</button>
            </div>

            <div style={styles.grid2}>
              {merchants.map(m => (
                <div key={m.id} style={styles.card}>
                  <div style={styles.rowBetween}>
                    <h3 style={{ margin: 0, color: '#facc15' }}>🏪 {m.name}</h3>
                    <button onClick={() => setMerchantForm(m)} style={styles.btnEditCompact}>{t.editBtn}</button>
                  </div>
                  <p style={{ color: '#38bdf8', margin: '6px 0' }}>📞 {m.phone || 'N/A'}</p>
                  <p style={{ color: '#94a3b8', margin: '6px 0' }}>📍 {m.address || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div>
            <div style={styles.card}>
              <h3>{editingCustomer ? t.editCustomer : t.saveCustomer}</h3>
              <input type="text" placeholder={t.customer} value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} style={styles.inputMargin} />
              <input type="text" placeholder={t.phone} value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} style={styles.inputMargin} />
              <input type="text" placeholder={t.address} value={newCustomer.address} onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })} style={styles.inputMargin} />
              <button onClick={handleSaveCustomerExplicit} style={styles.btnSuccessGradient}>{t.saveBtn}</button>
            </div>

            <div style={styles.grid2}>
              {customers.map(c => (
                <div key={c.id} style={styles.card}>
                  <div style={styles.rowBetween}>
                    <h3 style={{ margin: 0, color: '#a855f7' }}>👤 {c.name}</h3>
                    <button onClick={() => { setEditingCustomer(c); setNewCustomer(c); }} style={styles.btnEditCompact}>{t.editBtn}</button>
                  </div>
                  <p style={{ color: '#38bdf8', margin: '5px 0' }}>📞 {c.phone}</p>
                  <p style={{ color: '#94a3b8', margin: 0 }}>📍 {c.address}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SETTINGS */}
        {activeTab === 'settings' && (
          <div style={styles.card}>
            <h2>{t.settingsTitle}</h2>
            <label style={styles.label}>Groq API Key:</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_..."
              style={styles.input}
            />
          </div>
        )}

      </main>
    </div>
  );
}

const getStatusStyle = (status) => {
  const base = { padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '0.85rem' };
  switch (status) {
    case 'مؤكد': return { ...base, background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' };
    case 'قيد تجهيز الطلب': return { ...base, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' };
    case 'خرج للتوصيل': return { ...base, background: 'linear-gradient(135deg, #0284c7, #0369a1)' };
    case 'جاري التوصيل': return { ...base, background: 'linear-gradient(135deg, #d97706, #b45309)' };
    case 'مكتمل': return { ...base, background: 'linear-gradient(135deg, #059669, #047857)' };
    case 'متأخر': return { ...base, background: 'linear-gradient(135deg, #dc2626, #b91c1c)' };
    case 'ملغي': return { ...base, background: 'linear-gradient(135deg, #4b5563, #374151)' };
    default: return base;
  }
};

const styles = {
  container: { maxWidth: '980px', margin: '0 auto', padding: '15px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '18px 22px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' },
  headerRight: { display: 'flex', gap: '10px', alignItems: 'center' },
  appTitle: { margin: 0, fontSize: '1.4rem', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  appSubtitle: { margin: '4px 0 0 0', fontSize: '0.82rem', color: '#94a3b8' },
  badge: { padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' },
  langBtn: { padding: '6px 12px', backgroundColor: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' },
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '18px' },
  kpiCard: { border: '1px solid rgba(255,255,255,0.1)', padding: '14px 18px', borderRadius: '14px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  kpiLabel: { fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 'bold' },
  kpiValue: { fontSize: '1.35rem', fontWeight: 'bold', marginTop: '4px' },
  nav: { display: 'flex', gap: '8px', marginTop: '18px', overflowX: 'auto', paddingBottom: '6px' },
  tab: { flex: 1, padding: '11px', border: '1px solid #334155', backgroundColor: '#1e293b', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', color: '#94a3b8', minWidth: '90px', fontSize: '0.85rem' },
  activeTab: { flex: 1, padding: '11px', border: 'none', background: 'linear-gradient(135deg, #0284c7, #2563eb)', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', color: '#fff', minWidth: '90px', fontSize: '0.85rem', boxShadow: '0 4px 12px rgba(37,99,235,0.4)' },
  main: { marginTop: '18px' },
  card: { backgroundColor: '#131c2e', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b', marginBottom: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.25)' },
  historyCard: { backgroundColor: '#0a0f1d', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '10px' },
  cardTitle: { marginTop: 0, fontSize: '1.15rem', color: '#f8fafc' },
  textarea: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0a0f1d', color: '#fff', boxSizing: 'border-box', fontSize: '0.95rem' },
  textareaMargin: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0a0f1d', color: '#fff', boxSizing: 'border-box', marginBottom: '10px' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0a0f1d', color: '#fff', boxSizing: 'border-box' },
  inlineInput: { width: '80px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #38bdf8', backgroundColor: '#0a0f1d', color: '#fff', fontWeight: 'bold' },
  inputMargin: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0a0f1d', color: '#fff', boxSizing: 'border-box', marginBottom: '10px' },
  searchInput: { width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #0284c7', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', marginBottom: '18px', fontSize: '0.95rem' },
  label: { display: 'block', fontWeight: 'bold', marginBottom: '6px', color: '#cbd5e1' },
  btnPrimaryGradient: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' },
  btnGradientCompact: { padding: '6px 14px', background: 'linear-gradient(135deg, #334155, #475569)', color: '#38bdf8', border: '1px solid #0284c7', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' },
  btnSuccessGradient: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' },
  btnDeleteCompact: { background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' },
  btnEditCompact: { background: 'linear-gradient(135deg, #0284c7, #0369a1)', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' },
  btnSaveCompact: { background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' },
  extractedBox: { backgroundColor: '#0a0f1d', border: '1px solid #334155', padding: '16px', borderRadius: '12px', marginTop: '16px' },
  extractedSubCard: { border: '1px solid #1e293b', padding: '14px', borderRadius: '10px', marginBottom: '12px', backgroundColor: '#131c2e' },
  addressWarningBox: { background: 'linear-gradient(135deg, #7f1d1d, #991b1b)', border: '1px solid #f87171', padding: '8px 12px', borderRadius: '8px', color: '#fecaca', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalCard: { backgroundColor: '#131c2e', border: '1px solid #ca8a04', padding: '20px', borderRadius: '14px', maxWidth: '400px', width: '90%' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  rowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  orderNumTag: { background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem' },
  tagStore: { backgroundColor: '#0369a1', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem' },
  p: { margin: '6px 0', color: '#cbd5e1' },
  amountRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', padding: '8px 12px', backgroundColor: '#0a0f1d', borderRadius: '8px', border: '1px solid #1e293b' },
  hr: { border: 'none', borderTop: '1px solid #334155', margin: '10px 0' },
  empty: { color: '#64748b', textAlign: 'center', marginTop: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', textAlign: 'left' },
  tableHeader: { borderBottom: '2px solid #334155', backgroundColor: '#0f172a' },
  tableRow: { borderBottom: '1px solid #1e293b' },
  th: { padding: '10px', color: '#94a3b8', fontSize: '0.85rem' },
  td: { padding: '10px', fontSize: '0.85rem', color: '#e2e8f0' }
};
