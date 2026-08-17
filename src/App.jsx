import React, { useState, useEffect } from 'react';

const translations = {
  ar: {
    appTitle: 'إكسبريس دليفري PRO',
    appSubtitle: 'النظام الذكي لإدارة الطلبات واللوجستيات',
    groqConnected: '🟢 AI متصل',
    groqMissing: '🔴 المفتاح مفقود',

    navNewOrder: 'طلب جديد',
    navOrders: 'إدارة الطلبات',
    navDrivers: 'الطيارين',
    navDriverLedger: 'كشف حساب الطيارين',
    navMerchants: 'التجار',
    navCustomers: 'العملاء',
    navHistory: 'السجل والتعديلات',
    navSettings: 'الإعدادات',

    kpiTotalCod: 'إجمالي المبالغ المحصلة',
    kpiRevenue: 'إجمالي إيراد التوصيل',
    kpiActiveOrders: 'طلبات نشطة',
    kpiCompleted: 'تم التوصيل',

    aiHeader: '✨ استخراج بيانات الطلب بواسطة AI',
    placeholderOrder: 'ألصق نص الطلب هنا أو رسالة واتساب...',
    btnPaste: '📋 لصق من الحافظة',
    btnExtract: '⚡ استخراج البيانات بالذكاء الاصطناعي',
    btnExtracting: 'جاري التحليل والتدقيق...',
    reviewTitle: 'مراجعة البيانات المستخرجة:',

    store: 'المتجر',
    customer: 'العميل',
    phone: 'رقم الهاتف',
    cod: 'قيمة الطلب',
    deliveryFee: 'رسوم التوصيل',
    address: 'العنوان',
    item: 'الصنف',
    notes: 'ملاحظات الطلب',

    paymentMethod: 'طريقة الدفع',
    paymentCash: '💵 كاش عند الاستلام',
    paymentOnline: '💳 مدفوع أونلاين',
    paymentPrepaid: '✅ مدفوع مسبقًا',

    customerCollection: 'إجمالي ما يدفعه العميل',
    merchantAmount: 'مبلغ المتجر',
    revenuePercent: 'نسبتي من التوصيل',
    companyRevenue: 'إيرادي',
    driverRevenue: 'نصيب الطيار',
    driverCollection: 'ما سيحصله الطيار',

    addressWarning: '📍 تنبيه عنوان غير مكتمل: يرجى مراجعة وتأكيد العنوان!',
    selectDriver: 'اختيار طيار التوصيل:',
    chooseDriver: '-- اختر طيار --',
    chooseRevenue: 'نسبة إيرادي من رسوم التوصيل:',
    btnConfirm: '✅ تأكيد وحفظ الطلبات',

    searchPlaceholder: '🔍 بحث برقم الطلب، اسم العميل، المتجر، أو الهاتف...',
    unspecified: 'غير محدد',

    statusConfirmed: 'مؤكد',
    statusProcessing: 'قيد تجهيز الطلب',
    statusOutForDelivery: 'خرج للتوصيل',
    statusInTransit: 'جاري التوصيل',
    statusCompleted: 'مكتمل (تم التسليم)',
    statusDelayed: 'متأخر',
    statusCancelled: 'ملغي',

    addDriver: 'إضافة طيار جديد',
    driverName: 'اسم الطيار...',
    driverPhone: 'رقم هاتف الطيار...',
    btnAdd: 'إضافة',

    driverCash: 'إجمالي المبالغ المحصلة:',
    driverRevenueTotal: 'إجمالي نصيب الطيار:',
    companyRevenueTotal: 'إجمالي إيراد الشركة:',
    totalTrips: 'إجمالي الرحلات:',

    saveMerchant: 'إضافة أو تعديل تاجر',
    saveCustomer: 'إضافة عميل يدويًا',

    saveBtn: 'حفظ',
    deleteBtn: 'حذف',
    editBtn: 'تعديل',

    settingsTitle: 'إعدادات النظام المتقدمة',
    defaultRevenuePercent: 'نسبة عمولة الشركة الافتراضية (%)',
    systemCurrency: 'عملة النظام',
    autoAssignDriver: 'التعيين التلقائي لأول طيار متاح',
    backupRestore: 'النسخ الاحتياطي والاستعادة',
    downloadBackup: '💾 تحميل نسخة احتياطية (JSON)',
    restoreBackup: '📥 استعادة من نسخة احتياطية',

    historyTitle: '📜 سجل عمليات وتعديلات الطلبات',
    driverLedgerTitle: '📊 كشف حساب وتوريد الطيارين',
    filterDriver: 'تصفية بالطيار:',
    filterDate: 'التاريخ:',
    allDrivers: 'كل الطيارين',

    cashToHandIn: '💵 إجمالي التحصيل',
    companyRevenueLedger: '💰 إيراد الشركة',
    driverRevenueLedger: '🛵 نصيب الطيار',

    financialBreakdown: '💰 التفاصيل المالية',

    matchTitle: '🔍 مطابقة البيانات المسجلة',
    matchPrompt: 'تم العثور على اسم مشابه في النظام. يرجى التحديد لهذا الطلب بالتحديد:',
    createNew: '➕ إضافة كـ جديد',
    autofillBtn: '📋 استخدام البيانات المسجلة',
    updateBtn: '🔄 تحديث البيانات المسجلة بالجديدة',
    viewDetails: 'عرض التفاصيل والطلبات',
    entityNotes: 'الملاحظات الخاصة:',
    noOrdersFound: 'لا توجد طلبات مسجلة.',
    
    whatsappModalTitle: '📱 أداة واتساب والنصوص',
    btnOpenWhatsappModal: '💬 فتح معالج واتساب',
    waTextCopied: 'تم نسخ نص الواتساب بنجاح!'
  },

  en: {
    appTitle: 'Express Delivery PRO',
    appSubtitle: 'AI Logistics & Multi-Order Management Platform',
    groqConnected: '🟢 AI Active',
    groqMissing: '🔴 Key Missing',

    navNewOrder: 'New Order',
    navOrders: 'Manage Orders',
    navDrivers: 'Drivers',
    navDriverLedger: 'Driver Ledger',
    navMerchants: 'Stores',
    navCustomers: 'Customers',
    navHistory: 'Audit History',
    navSettings: 'Settings',

    kpiTotalCod: 'Total Collected',
    kpiRevenue: 'Total Delivery Revenue',
    kpiActiveOrders: 'Active Orders',
    kpiCompleted: 'Completed Orders',

    aiHeader: '✨ AI Order Extraction',
    placeholderOrder: 'Paste delivery text or WhatsApp message here...',
    btnPaste: '📋 Paste Clipboard',
    btnExtract: '⚡ Extract Data with AI',
    btnExtracting: 'Analyzing & Checking...',
    reviewTitle: 'Extracted Orders Review:',

    store: 'Store',
    customer: 'Customer',
    phone: 'Phone',
    cod: 'Order Value',
    deliveryFee: 'Delivery Fee',
    address: 'Address',
    item: 'Item Details',
    notes: 'Order Notes',

    paymentMethod: 'Payment Method',
    paymentCash: '💵 Cash on Delivery',
    paymentOnline: '💳 Paid Online',
    paymentPrepaid: '✅ Prepaid',

    customerCollection: 'Customer Total',
    merchantAmount: 'Merchant Amount',
    revenuePercent: 'My Delivery Share',
    companyRevenue: 'My Revenue',
    driverRevenue: 'Driver Share',
    driverCollection: 'Driver Collection',

    addressWarning: '📍 Incomplete Address Alert: Double check details!',
    selectDriver: 'Assign Driver:',
    chooseDriver: '-- Select Driver --',
    chooseRevenue: 'My percentage of delivery fee:',
    btnConfirm: '✅ Confirm & Save Orders',

    searchPlaceholder: '🔍 Search Order #, Customer, Store, Phone...',
    unspecified: 'N/A',

    statusConfirmed: 'Confirmed',
    statusProcessing: 'Processing',
    statusOutForDelivery: 'Out for Delivery',
    statusInTransit: 'In Transit',
    statusCompleted: 'Completed',
    statusDelayed: 'Delayed',
    statusCancelled: 'Cancelled',

    addDriver: 'Add Driver',
    driverName: 'Driver Name...',
    driverPhone: 'Driver Phone...',
    btnAdd: 'Add Driver',

    driverCash: 'Total Collected:',
    driverRevenueTotal: 'Driver Revenue:',
    companyRevenueTotal: 'Company Revenue:',
    totalTrips: 'Total Trips:',

    saveMerchant: 'Save Store Details',
    saveCustomer: 'Add Customer',

    saveBtn: 'Save',
    deleteBtn: 'Delete',
    editBtn: 'Edit',

    settingsTitle: 'Enterprise System Settings',
    defaultRevenuePercent: 'Default Company Commission Rate (%)',
    systemCurrency: 'System Currency',
    autoAssignDriver: 'Auto-assign to first available driver',
    backupRestore: 'Data Backup & System Restore',
    downloadBackup: '💾 Download JSON Backup',
    restoreBackup: '📥 Restore System JSON Backup',

    historyTitle: '📜 Audit Log & Order Edits History',
    driverLedgerTitle: '📊 Driver Cash & Revenue Ledger',
    filterDriver: 'Filter Driver:',
    filterDate: 'Filter Date:',
    allDrivers: 'All Drivers',

    cashToHandIn: '💵 Total Collected',
    companyRevenueLedger: '💰 Company Revenue',
    driverRevenueLedger: '🛵 Driver Share',

    financialBreakdown: '💰 Financial Breakdown',

    matchTitle: '🔍 Duplicate Matcher',
    matchPrompt: 'Similar match found for this order. Please select an option for this item:',
    createNew: '➕ Keep as New',
    autofillBtn: '📋 Autofill Saved Data',
    updateBtn: '🔄 Update Saved Data',
    viewDetails: 'View Profile & Orders History',
    entityNotes: 'Entity Notes:',
    noOrdersFound: 'No associated orders found.',

    whatsappModalTitle: '📱 Plain Text / WhatsApp Parser Tool',
    btnOpenWhatsappModal: '💬 Open WhatsApp Tool',
    waTextCopied: 'Copied to clipboard!'
  }
};

const REVENUE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 90, 100];
const PAYMENT_CASH = 'cash';
const PAYMENT_ONLINE = 'online';
const PAYMENT_PREPAID = 'prepaid';

const normalizeNumber = value => {
  const n = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const styles = {
  appWrapper: {
    backgroundColor: '#0A0614',
    minHeight: '100vh',
    color: '#F1F5F9',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    padding: '16px'
  },
  container: {
    maxWidth: '520px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '10px'
  },
  logoBox: {
    width: '72px',
    height: '72px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(168, 85, 247, 0.4)',
    marginBottom: '14px'
  },
  logoIcon: { fontSize: '32px', color: '#FFF' },
  appTitle: { fontSize: '1.6rem', margin: 0, fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' },
  appSubtitle: { fontSize: '0.85rem', color: '#C084FC', margin: '6px 0 0 0', fontWeight: '500' },
  kpiRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  kpiCard: {
    padding: '16px',
    borderRadius: '18px',
    background: 'rgba(23, 15, 38, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  kpiLabel: { fontSize: '0.78rem', color: '#94A3B8', fontWeight: '500' },
  kpiValue: { fontSize: '1.4rem', fontWeight: '800' },
  navList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  primaryBtn: {
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    color: '#FFF',
    border: '1px solid rgba(192, 132, 252, 0.3)',
    padding: '16px 20px',
    borderRadius: '18px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  navItem: {
    background: 'rgba(23, 15, 38, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    color: '#E2E8F0',
    padding: '14px 18px',
    borderRadius: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    fontWeight: '600'
  },
  navItemActive: {
    background: 'rgba(124, 58, 237, 0.25)',
    border: '1px solid #A855F7',
    color: '#FFF',
    padding: '14px 18px',
    borderRadius: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    fontWeight: '700'
  },
  countBadge: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '2px 10px',
    fontSize: '0.8rem',
    color: '#CBD5E1'
  },
  bottomSection: { display: 'flex', flexDirection: 'column', gap: '10px' },
  langPill: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(51, 65, 85, 0.8)',
    color: '#E2E8F0',
    padding: '12px',
    borderRadius: '14px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center'
  },
  main: { display: 'flex', flexDirection: 'column', gap: '16px' },
  card: {
    background: 'rgba(23, 15, 38, 0.75)',
    border: '1px solid rgba(168, 85, 247, 0.15)',
    borderRadius: '20px',
    padding: '20px',
    backdropFilter: 'blur(12px)'
  },
  clickableCard: {
    background: 'rgba(23, 15, 38, 0.85)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '16px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  cardTitle: { margin: '0 0 15px 0', fontSize: '1.15rem', color: '#C084FC', fontWeight: '700' },
  rowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  btnGradientCompact: {
    background: 'linear-gradient(135deg, #0284C7, #2563EB)',
    color: '#FFF',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem'
  },
  btnPrimaryGradient: {
    background: 'linear-gradient(135deg, #A855F7, #EC4899)',
    color: '#FFF',
    border: 'none',
    padding: '14px 20px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: '700',
    width: '100%',
    marginTop: '12px',
    fontSize: '0.95rem'
  },
  btnSuccessGradient: {
    background: 'linear-gradient(135deg, #059669, #10B981)',
    color: '#FFF',
    border: 'none',
    padding: '14px 20px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: '700',
    width: '100%',
    marginTop: '15px',
    fontSize: '0.95rem'
  },
  textarea: {
    width: '100%',
    backgroundColor: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    borderRadius: '14px',
    color: '#FFF',
    padding: '14px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    outline: 'none'
  },
  extractedBox: { marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' },
  extractedSubCard: {
    background: 'rgba(11, 7, 24, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '15px'
  },
  orderHero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '12px',
    marginBottom: '15px'
  },
  miniLabel: { fontSize: '0.72rem', color: '#94A3B8' },
  heroCustomer: { fontSize: '1.05rem', fontWeight: '700', marginTop: '2px' },
  heroMoney: { fontSize: '1.3rem', fontWeight: '800', color: '#38BDF8' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' },
  financePanel: {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(51, 65, 85, 0.6)',
    borderRadius: '12px',
    padding: '14px',
    marginTop: '15px'
  },
  financeTitle: { fontSize: '0.9rem', fontWeight: '700', color: '#FACC15', marginBottom: '10px' },
  financeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' },
  financeBox: { display: 'flex', flexDirection: 'column', gap: '4px' },
  financeInput: {
    background: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    color: '#FFF',
    padding: '8px',
    borderRadius: '8px',
    outline: 'none'
  },
  calculationStrip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
    gap: '10px',
    background: 'rgba(11, 7, 24, 0.8)',
    padding: '12px',
    borderRadius: '10px',
    marginTop: '10px'
  },
  confirmationPanel: {
    background: 'rgba(11, 7, 24, 0.7)',
    border: '1px solid #7C3AED',
    borderRadius: '16px',
    padding: '16px',
    marginTop: '20px'
  },
  label: { display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '6px' },
  input: {
    width: '100%',
    background: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    color: '#FFF',
    padding: '10px 14px',
    borderRadius: '10px',
    boxSizing: 'border-box',
    outline: 'none'
  },
  revenueSelect: {
    width: '100%',
    background: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid #10B981',
    color: '#34D399',
    padding: '10px 14px',
    borderRadius: '10px',
    fontWeight: '700',
    boxSizing: 'border-box'
  },
  searchInput: {
    width: '100%',
    background: 'rgba(23, 15, 38, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    color: '#FFF',
    padding: '14px',
    borderRadius: '14px',
    marginBottom: '15px',
    boxSizing: 'border-box'
  },
  empty: { textAlign: 'center', color: '#64748B', padding: '30px 0' },
  orderNumTag: { background: '#2563EB', color: '#FFF', padding: '3px 10px', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem' },
  tagStore: { background: 'rgba(255,255,255,0.1)', color: '#E2E8F0', padding: '3px 10px', borderRadius: '8px', fontSize: '0.85rem' },
  p: { margin: '6px 0', color: '#CBD5E1', fontSize: '0.9rem' },
  addressWarningBox: {
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid #EF4444',
    color: '#FCA5A5',
    padding: '10px',
    borderRadius: '10px',
    margin: '8px 0',
    fontSize: '0.82rem'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '16px'
  },
  modalCard: {
    background: '#160E2E',
    border: '1px solid #7C3AED',
    borderRadius: '20px',
    padding: '24px',
    maxWidth: '520px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto'
  }
};

const getStatusStyle = status => {
  const base = { padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', border: 'none', color: '#FFF' };
  switch (status) {
    case 'مكتمل': return { ...base, background: '#059669' };
    case 'ملغي': return { ...base, background: '#DC2626' };
    case 'متأخر': return { ...base, background: '#D97706' };
    default: return { ...base, background: '#2563EB' };
  }
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'ar');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [activeTab, setActiveTab] = useState('new_order');
  const [searchQuery, setSearchQuery] = useState('');

  const [defaultRevenuePercent, setDefaultRevenuePercent] = useState(() => parseInt(localStorage.getItem('sys_default_revenue') || '20'));
  const [systemCurrency, setSystemCurrency] = useState(() => localStorage.getItem('sys_currency') || 'EGP');
  const [autoAssignDriverEnabled, setAutoAssignDriverEnabled] = useState(() => localStorage.getItem('sys_auto_assign') === 'true');

  const [orderCounter, setOrderCounter] = useState(() => parseInt(localStorage.getItem('order_counter_num') || '1001'));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_orders_v6') || '[]'));
  const [merchants, setMerchants] = useState(() => JSON.parse(localStorage.getItem('delivery_merchants_v6') || '[]'));
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('delivery_customers_v6') || '[]'));
  const [driverObjects, setDriverObjects] = useState(() => {
    const saved = localStorage.getItem('delivery_driver_objs_v6');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'd1', name: 'أحمد', phone: '01000000001', notes: '' },
      { id: 'd2', name: 'محمود', phone: '01100000002', notes: '' }
    ];
  });
  const [historyLogs, setHistoryLogs] = useState(() => JSON.parse(localStorage.getItem('delivery_history_v6') || '[]'));

  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedOrders, setExtractedOrders] = useState([]);
  const [pendingMatches, setPendingMatches] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedRevenuePercent, setSelectedRevenuePercent] = useState(defaultRevenuePercent);
  const [newDriver, setNewDriver] = useState({ name: '', phone: '', notes: '' });

  const [ledgerDriver, setLedgerDriver] = useState('');
  const [ledgerDate, setLedgerDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [merchantForm, setMerchantForm] = useState({ id: null, name: '', phone: '', address: '', notes: '' });
  const [customerForm, setCustomerForm] = useState({ id: null, name: '', phone: '', address: '', notes: '' });

  const [activeModal, setActiveModal] = useState(null); // { type: 'order'|'driver'|'merchant'|'customer', data }
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [whatsappFormattedText, setWhatsappFormattedText] = useState('');

  const t = translations[lang];

  useEffect(() => { localStorage.setItem('app_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('groq_api_key', apiKey); }, [apiKey]);
  useEffect(() => { localStorage.setItem('sys_default_revenue', defaultRevenuePercent.toString()); }, [defaultRevenuePercent]);
  useEffect(() => { localStorage.setItem('sys_currency', systemCurrency); }, [systemCurrency]);
  useEffect(() => { localStorage.setItem('sys_auto_assign', autoAssignDriverEnabled.toString()); }, [autoAssignDriverEnabled]);
  useEffect(() => { localStorage.setItem('order_counter_num', orderCounter.toString()); }, [orderCounter]);
  useEffect(() => { localStorage.setItem('delivery_orders_v6', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('delivery_merchants_v6', JSON.stringify(merchants)); }, [merchants]);
  useEffect(() => { localStorage.setItem('delivery_customers_v6', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('delivery_driver_objs_v6', JSON.stringify(driverObjects)); }, [driverObjects]);
  useEffect(() => { localStorage.setItem('delivery_history_v6', JSON.stringify(historyLogs)); }, [historyLogs]);

  const isCancelled = order => order?.status === 'ملغي';
  const getOrderValue = order => normalizeNumber(order?.cod);
  const getDeliveryFee = order => normalizeNumber(order?.deliveryFee);
  const getRevenuePercent = order => normalizeNumber(order?.revenuePercent);

  const getCompanyRevenue = order => (isCancelled(order) ? 0 : getDeliveryFee(order) * (getRevenuePercent(order) / 100));
  const getDriverRevenue = order => (isCancelled(order) ? 0 : getDeliveryFee(order) * (1 - getRevenuePercent(order) / 100));

  const getCustomerCollection = order => {
    if (isCancelled(order)) return 0;
    if (order?.paymentMethod === PAYMENT_ONLINE || order?.paymentMethod === PAYMENT_PREPAID) return getDeliveryFee(order);
    return getOrderValue(order) + getDeliveryFee(order);
  };

  const getOrderEffectiveCash = order => (isCancelled(order) ? 0 : getCustomerCollection(order));

  const addAuditLog = (orderNum, action, details) => {
    const log = {
      id: Date.now() + Math.random(),
      orderNum,
      action,
      details,
      time: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')
    };
    setHistoryLogs(prev => [log, ...prev]);
  };

  const extractOrderInfo = async () => {
    if (!apiKey.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال مفتاح Groq API في الإعدادات.' : 'Please enter your Groq API key.');
      setActiveTab('settings');
      return;
    }
    if (!rawText.trim()) return;

    setLoading(true);
    setExtractedOrders([]);
    setPendingMatches([]);

    const systemPrompt = `
Extract orders in JSON format:
{
  "orders": [
    {
      "store": "",
      "customer": "",
      "phone": "",
      "address": "",
      "cod": 0,
      "deliveryFee": 0,
      "paymentMethod": "cash",
      "item": "",
      "notes": ""
    }
  ]
}
`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey.trim()}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: rawText }],
          response_format: { type: 'json_object' },
          temperature: 0.1
        })
      });

      const data = await response.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      const normalizedOrders = (parsed.orders || []).map(order => ({
        ...order,
        cod: normalizeNumber(order.cod),
        deliveryFee: normalizeNumber(order.deliveryFee),
        paymentMethod: [PAYMENT_ONLINE, PAYMENT_PREPAID].includes(order.paymentMethod) ? order.paymentMethod : PAYMENT_CASH
      }));

      setExtractedOrders(normalizedOrders);
      if (autoAssignDriverEnabled && driverObjects.length > 0) setSelectedDriver(driverObjects[0].name);

      // Build sequential duplicate prompt queue per individual order
      const matchesQueue = [];
      normalizedOrders.forEach((ord, orderIndex) => {
        if (ord.customer) {
          const matchedCust = customers.filter(c => c.name.toLowerCase().includes(ord.customer.toLowerCase()));
          if (matchedCust.length > 0) matchesQueue.push({ orderIndex, type: 'customer', name: ord.customer, matches: matchedCust });
        }
        if (ord.store) {
          const matchedMerch = merchants.filter(m => m.name.toLowerCase().includes(ord.store.toLowerCase()));
          if (matchedMerch.length > 0) matchesQueue.push({ orderIndex, type: 'store', name: ord.store, matches: matchedMerch });
        }
      });
      setPendingMatches(matchesQueue);
    } catch (err) {
      alert(`Error parsing order: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveMatching = (selectedMatch, action) => {
    if (pendingMatches.length === 0) return;
    const currentPrompt = pendingMatches[0];
    const { orderIndex, type } = currentPrompt;

    setExtractedOrders(prev => prev.map((ord, idx) => {
      if (idx !== orderIndex) return ord;
      if (action === 'autofill') {
        return {
          ...ord,
          [type === 'customer' ? 'customer' : 'store']: selectedMatch.name,
          phone: selectedMatch.phone || ord.phone,
          address: selectedMatch.address || ord.address
        };
      } else if (action === 'update') {
        if (type === 'customer') {
          setCustomers(cList => cList.map(c => c.id === selectedMatch.id ? { ...c, phone: ord.phone || c.phone, address: ord.address || c.address } : c));
        } else {
          setMerchants(mList => mList.map(m => m.id === selectedMatch.id ? { ...m, phone: ord.phone || m.phone, address: ord.address || m.address } : m));
        }
        return { ...ord, [type === 'customer' ? 'customer' : 'store']: selectedMatch.name };
      }
      return ord;
    }));

    setPendingMatches(prev => prev.slice(1));
  };

  const updateExtractedOrder = (index, field, value) => {
    setExtractedOrders(prev => prev.map((ord, i) => i === index ? { ...ord, [field]: ['cod', 'deliveryFee'].includes(field) ? normalizeNumber(value) : value } : ord));
  };

  const handleConfirmOrder = () => {
    if (extractedOrders.length === 0) return;
    if (!selectedDriver) {
      alert(lang === 'ar' ? 'يرجى اختيار طيار أولاً.' : 'Please select a driver.');
      return;
    }

    let currentNum = orderCounter;
    const isoDateStr = new Date().toISOString().split('T')[0];

    const newCreatedOrders = extractedOrders.map(ord => {
      const orderNumber = `#${currentNum++}`;
      const newOrder = {
        id: Date.now() + Math.random(),
        orderNum: orderNumber,
        store: ord.store || t.unspecified,
        customer: ord.customer || t.unspecified,
        phone: ord.phone || '',
        address: ord.address || t.unspecified,
        cod: normalizeNumber(ord.cod),
        deliveryFee: normalizeNumber(ord.deliveryFee),
        paymentMethod: ord.paymentMethod || PAYMENT_CASH,
        revenuePercent: selectedRevenuePercent,
        item: ord.item || '',
        notes: ord.notes || '',
        driver: selectedDriver,
        status: 'مؤكد',
        isoDate: isoDateStr,
        date: new Date().toLocaleTimeString()
      };
      addAuditLog(orderNumber, 'Created', `Order created for ${newOrder.customer}`);
      return newOrder;
    });

    setOrderCounter(currentNum);
    setOrders(prev => [...newCreatedOrders, ...prev]);

    // Auto add new merchants/customers
    extractedOrders.forEach(ord => {
      if (ord.store && ord.store !== t.unspecified) {
        setMerchants(prev => prev.some(m => m.name.toLowerCase() === ord.store.toLowerCase()) ? prev : [{ id: Date.now() + Math.random(), name: ord.store, phone: ord.phone || '', address: ord.address || '', notes: '' }, ...prev]);
      }
      if (ord.customer && ord.customer !== t.unspecified) {
        setCustomers(prev => prev.some(c => c.name.toLowerCase() === ord.customer.toLowerCase()) ? prev : [{ id: Date.now() + Math.random(), name: ord.customer, phone: ord.phone || '', address: ord.address || '', notes: '' }, ...prev]);
      }
    });

    setRawText('');
    setExtractedOrders([]);
    setActiveTab('orders');
  };

  const handleAddDriver = () => {
    if (!newDriver.name.trim()) return;
    setDriverObjects(prev => [...prev, { id: 'd_' + Date.now(), ...newDriver }]);
    setNewDriver({ name: '', phone: '', notes: '' });
  };

  const handleSaveMerchant = () => {
    if (!merchantForm.name.trim()) return;
    setMerchants(prev => merchantForm.id ? prev.map(m => m.id === merchantForm.id ? merchantForm : m) : [{ ...merchantForm, id: Date.now() }, ...prev]);
    setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
  };

  const handleSaveCustomer = () => {
    if (!customerForm.name.trim()) return;
    setCustomers(prev => customerForm.id ? prev.map(c => c.id === customerForm.id ? customerForm : c) : [{ ...customerForm, id: Date.now() }, ...prev]);
    setCustomerForm({ id: null, name: '', phone: '', address: '', notes: '' });
  };

  const filteredOrders = orders.filter(o => {
    const q = searchQuery.toLowerCase();
    return (o.orderNum || '').toLowerCase().includes(q) || (o.customer || '').toLowerCase().includes(q) || (o.store || '').toLowerCase().includes(q) || (o.phone || '').includes(searchQuery);
  });

  const filteredLedgerOrders = orders.filter(o => (!ledgerDriver || o.driver === ledgerDriver) && o.isoDate === ledgerDate);
  const dailyCollected = filteredLedgerOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);

  return (
    <div style={styles.appWrapper}>
      <div style={{ ...styles.container, direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        
        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.logoBox}><span style={styles.logoIcon}>⚡</span></div>
          <h1 style={styles.appTitle}>🚀 {t.appTitle}</h1>
          <p style={styles.appSubtitle}>{t.appSubtitle}</p>
        </header>

        {/* KPIS */}
        <div style={styles.kpiRow}>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>⏱️ {t.kpiActiveOrders}</span>
            <span style={{ ...styles.kpiValue, color: '#C084FC' }}>{orders.filter(o => !['مكتمل', 'ملغي'].includes(o.status)).length}</span>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>📦 {t.kpiCompleted}</span>
            <span style={{ ...styles.kpiValue, color: '#38BDF8' }}>{orders.filter(o => o.status === 'مكتمل').length}</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <div style={styles.navList}>
          <button style={styles.primaryBtn} onClick={() => setActiveTab('new_order')}>➕ {t.navNewOrder}</button>
          <button style={activeTab === 'orders' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('orders')}>
            <span>📦 {t.navOrders}</span><span style={styles.countBadge}>{orders.length}</span>
          </button>
          <button style={activeTab === 'driver_ledger' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('driver_ledger')}>
            <span>📋 {t.navDriverLedger}</span>
          </button>
          <button style={activeTab === 'drivers' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('drivers')}>
            <span>🛵 {t.navDrivers}</span><span style={styles.countBadge}>{driverObjects.length}</span>
          </button>
          <button style={activeTab === 'merchants' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('merchants')}>
            <span>🏪 {t.navMerchants}</span><span style={styles.countBadge}>{merchants.length}</span>
          </button>
          <button style={activeTab === 'customers' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('customers')}>
            <span>👥 {t.navCustomers}</span><span style={styles.countBadge}>{customers.length}</span>
          </button>
          <button style={activeTab === 'history' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('history')}>
            <span>🕒 {t.navHistory}</span>
          </button>
          <button style={activeTab === 'settings' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('settings')}>
            <span>⚙️ {t.navSettings}</span>
          </button>
        </div>

        <button style={styles.langPill} onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
          🌐 {lang === 'ar' ? 'English' : 'العربية'}
        </button>

        {/* MAIN BODY */}
        <main style={styles.main}>
          {/* NEW ORDER */}
          {activeTab === 'new_order' && (
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{t.aiHeader}</h2>
              <textarea rows={6} value={rawText} onChange={e => setRawText(e.target.value)} placeholder={t.placeholderOrder} style={styles.textarea} />
              <button onClick={extractOrderInfo} disabled={loading} style={styles.btnPrimaryGradient}>
                {loading ? t.btnExtracting : t.btnExtract}
              </button>

              {extractedOrders.length > 0 && (
                <div style={styles.extractedBox}>
                  <h3 style={{ color: '#FACC15' }}>{t.reviewTitle}</h3>
                  {extractedOrders.map((ord, idx) => (
                    <div key={idx} style={styles.extractedSubCard}>
                      <div style={styles.grid2}>
                        <div><strong>{t.customer}:</strong> {ord.customer}</div>
                        <div><strong>{t.store}:</strong> {ord.store}</div>
                        <div><strong>{t.phone}:</strong> {ord.phone}</div>
                        <div style={{ gridColumn: '1 / -1' }}><strong>{t.address}:</strong> {ord.address}</div>
                      </div>
                      <div style={styles.financeGrid}>
                        <div><span>{t.cod}</span><input type="number" value={ord.cod} onChange={e => updateExtractedOrder(idx, 'cod', e.target.value)} style={styles.financeInput} /></div>
                        <div><span>{t.deliveryFee}</span><input type="number" value={ord.deliveryFee} onChange={e => updateExtractedOrder(idx, 'deliveryFee', e.target.value)} style={styles.financeInput} /></div>
                      </div>
                    </div>
                  ))}

                  <div style={styles.confirmationPanel}>
                    <label style={styles.label}>{t.selectDriver}</label>
                    <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} style={styles.input}>
                      <option value="">{t.chooseDriver}</option>
                      {driverObjects.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>

                  <button onClick={handleConfirmOrder} style={styles.btnSuccessGradient}>{t.btnConfirm}</button>
                </div>
              )}
            </div>
          )}

          {/* MANAGING ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={styles.searchInput} />
              {filteredOrders.map(order => (
                <div key={order.id} style={{ ...styles.card, cursor: 'pointer' }} onClick={() => setActiveModal({ type: 'order', data: order })}>
                  <div style={styles.rowBetween}>
                    <span style={styles.orderNumTag}>{order.orderNum}</span>
                    <select value={order.status} onClick={e => e.stopPropagation()} onChange={e => {
                      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: e.target.value } : o));
                    }} style={getStatusStyle(order.status)}>
                      <option value="مؤكد">{t.statusConfirmed}</option>
                      <option value="مكتمل">{t.statusCompleted}</option>
                      <option value="ملغي">{t.statusCancelled}</option>
                    </select>
                  </div>
                  <p style={styles.p}><strong>👤 {order.customer}</strong> ({order.phone})</p>
                  <p style={styles.p}>🏪 {order.store} | 🛵 {order.driver}</p>
                </div>
              ))}
            </div>
          )}

          {/* DRIVER LEDGER */}
          {activeTab === 'driver_ledger' && (
            <div style={styles.card}>
              <h2 style={{ color: '#67E8F9', marginTop: 0 }}>{t.driverLedgerTitle}</h2>
              <div style={styles.grid2}>
                <select value={ledgerDriver} onChange={e => setLedgerDriver(e.target.value)} style={styles.input}>
                  <option value="">-- {t.allDrivers} --</option>
                  {driverObjects.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
                <input type="date" value={ledgerDate} onChange={e => setLedgerDate(e.target.value)} style={styles.input} />
              </div>
              <div style={{ marginTop: '20px', fontSize: '1.2rem', color: '#34D399', fontWeight: '800' }}>
                {t.cashToHandIn}: {dailyCollected.toLocaleString()} {systemCurrency}
              </div>
            </div>
          )}

          {/* DRIVERS */}
          {activeTab === 'drivers' && (
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{t.addDriver}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                <input type="text" placeholder={t.driverName} value={newDriver.name} onChange={e => setNewDriver({ ...newDriver, name: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.driverPhone} value={newDriver.phone} onChange={e => setNewDriver({ ...newDriver, phone: e.target.value })} style={styles.input} />
                <button onClick={handleAddDriver} style={styles.btnGradientCompact}>{t.btnAdd}</button>
              </div>
              <div style={styles.grid2}>
                {driverObjects.map(d => (
                  <div key={d.id} style={styles.clickableCard} onClick={() => setActiveModal({ type: 'driver', data: d })}>
                    <h3 style={{ margin: 0, color: '#38BDF8' }}>🛵 {d.name}</h3>
                    <p style={styles.p}>📞 {d.phone || t.unspecified}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MERCHANTS */}
          {activeTab === 'merchants' && (
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{t.saveMerchant}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                <input type="text" placeholder={t.store} value={merchantForm.name} onChange={e => setMerchantForm({ ...merchantForm, name: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.phone} value={merchantForm.phone} onChange={e => setMerchantForm({ ...merchantForm, phone: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.address} value={merchantForm.address} onChange={e => setMerchantForm({ ...merchantForm, address: e.target.value })} style={styles.input} />
                <button onClick={handleSaveMerchant} style={styles.btnGradientCompact}>{t.saveBtn}</button>
              </div>
              <div style={styles.grid2}>
                {merchants.map(m => (
                  <div key={m.id} style={styles.clickableCard} onClick={() => setActiveModal({ type: 'merchant', data: m })}>
                    <h3 style={{ margin: 0, color: '#FACC15' }}>🏪 {m.name}</h3>
                    <p style={styles.p}>📞 {m.phone || t.unspecified}</p>
                    <p style={styles.p}>📍 {m.address || t.unspecified}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOMERS */}
          {activeTab === 'customers' && (
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{t.saveCustomer}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                <input type="text" placeholder={t.customer} value={customerForm.name} onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.phone} value={customerForm.phone} onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.address} value={customerForm.address} onChange={e => setCustomerForm({ ...customerForm, address: e.target.value })} style={styles.input} />
                <button onClick={handleSaveCustomer} style={styles.btnGradientCompact}>{t.saveBtn}</button>
              </div>
              <div style={styles.grid2}>
                {customers.map(c => (
                  <div key={c.id} style={styles.clickableCard} onClick={() => setActiveModal({ type: 'customer', data: c })}>
                    <h3 style={{ margin: 0, color: '#38BDF8' }}>👤 {c.name}</h3>
                    <p style={styles.p}>📞 {c.phone || t.unspecified}</p>
                    <p style={styles.p}>📍 {c.address || t.unspecified}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HISTORY */}
          {activeTab === 'history' && (
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{t.historyTitle}</h2>
              {historyLogs.map(log => (
                <div key={log.id} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={styles.orderNumTag}>{log.orderNum}</span> - {log.details}
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{t.settingsTitle}</h2>
              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="Groq API Key..." style={styles.input} />
            </div>
          )}
        </main>

        {/* DUPLICATE MATCHER MODAL QUEUE */}
        {pendingMatches.length > 0 && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <h3 style={{ color: '#FACC15', marginTop: 0 }}>{t.matchTitle}</h3>
              <p style={styles.p}>{t.matchPrompt}</p>
              <p style={{ ...styles.p, color: '#38BDF8', fontWeight: '700' }}>
                Item: {pendingMatches[0].name} ({pendingMatches[0].type})
              </p>
              {pendingMatches[0].matches.map(m => (
                <div key={m.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px', marginBottom: '10px' }}>
                  <strong>{m.name}</strong> - 📞 {m.phone || 'N/A'} - 📍 {m.address || 'N/A'}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={() => handleResolveMatching(m, 'autofill')} style={styles.btnGradientCompact}>{t.autofillBtn}</button>
                    <button onClick={() => handleResolveMatching(m, 'update')} style={{ ...styles.btnGradientCompact, background: '#059669' }}>{t.updateBtn}</button>
                  </div>
                </div>
              ))}
              <button onClick={() => handleResolveMatching(null, 'create')} style={{ ...styles.btnGradientCompact, background: '#475569', width: '100%', marginTop: '10px' }}>{t.createNew}</button>
            </div>
          </div>
        )}

        {/* DETAILS MODAL FOR ORDERS / DRIVERS / MERCHANTS / CUSTOMERS */}
        {activeModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <div style={styles.rowBetween}>
                <h3 style={{ margin: 0, color: '#C084FC' }}>
                  {activeModal.type === 'order' && `Order ${activeModal.data.orderNum}`}
                  {activeModal.type === 'driver' && `🛵 Driver: ${activeModal.data.name}`}
                  {activeModal.type === 'merchant' && `🏪 Merchant: ${activeModal.data.name}`}
                  {activeModal.type === 'customer' && `👤 Customer: ${activeModal.data.name}`}
                </h3>
                <button onClick={() => setActiveModal(null)} style={{ background: '#EF4444', color: '#FFF', border: 'none', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ margin: '15px 0' }}>
                {activeModal.type === 'order' && (
                  <>
                    <p style={styles.p}><strong>Customer:</strong> {activeModal.data.customer} ({activeModal.data.phone})</p>
                    <p style={styles.p}><strong>Store:</strong> {activeModal.data.store}</p>
                    <p style={styles.p}><strong>Driver:</strong> {activeModal.data.driver}</p>
                    <p style={styles.p}><strong>Address:</strong> {activeModal.data.address}</p>
                    <p style={styles.p}><strong>Value:</strong> {getOrderValue(activeModal.data)} {systemCurrency}</p>
                    <p style={styles.p}><strong>Delivery Fee:</strong> {getDeliveryFee(activeModal.data)} {systemCurrency}</p>
                  </>
                )}

                {activeModal.type !== 'order' && (
                  <>
                    <p style={styles.p}>📞 Phone: {activeModal.data.phone || 'N/A'}</p>
                    {activeModal.data.address && <p style={styles.p}>📍 Address: {activeModal.data.address}</p>}
                    <h4 style={{ color: '#FACC15', marginBottom: '8px' }}>Associated Orders</h4>
                    {orders.filter(o => {
                      if (activeModal.type === 'driver') return o.driver === activeModal.data.name;
                      if (activeModal.type === 'merchant') return o.store?.toLowerCase() === activeModal.data.name?.toLowerCase();
                      if (activeModal.type === 'customer') return o.customer?.toLowerCase() === activeModal.data.name?.toLowerCase() || o.phone === activeModal.data.phone;
                      return false;
                    }).map(o => (
                      <div key={o.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '8px', marginBottom: '6px' }}>
                        <strong>{o.orderNum}</strong> - {o.status} ({o.cod} {systemCurrency})
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
