import React, { useEffect, useMemo, useState } from 'react';

/* =========================================================
   EXPRESS DELIVERY PRO
   Complete standalone React dashboard
   ========================================================= */

const STORAGE = {
  lang: 'express_lang',
  apiKey: 'express_groq_key',
  settings: 'express_settings_v8',
  orders: 'express_orders_v8',
  deletedOrders: 'express_deleted_orders_v8',
  merchants: 'express_merchants_v8',
  customers: 'express_customers_v8',
  drivers: 'express_drivers_v8',
  history: 'express_history_v8',
  counter: 'express_counter_v8'
};

const PAYMENT = {
  CASH: 'cash',
  ONLINE: 'online',
  PREPAID: 'prepaid'
};

const STATUS = {
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  IN_TRANSIT: 'in_transit',
  COMPLETED: 'completed',
  DELAYED: 'delayed',
  CANCELLED: 'cancelled'
};

const DEFAULT_SETTINGS = {
  currency: 'EGP',
  defaultCommission: 20,
  defaultDeliveryMinutes: 60,
  autoDriverAssignment: false,
  autoDelayStatus: true,
  soundAlerts: true,
  compactMode: false
};

/* =========================================================
   HELPERS
   ========================================================= */

const safeJSON = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeNumber = value => {
  const n = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const nowISO = () => new Date().toISOString();

const formatDateTime = (date, lang = 'en') => {
  if (!date) return '—';
  try {
    return new Date(date).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  } catch {
    return '—';
  }
};

const money = (value, currency = 'EGP') =>
  `${normalizeNumber(value).toLocaleString(undefined, {
    maximumFractionDigits: 2
  })} ${currency}`;

const isPaid = order =>
  order?.paymentMethod === PAYMENT.ONLINE ||
  order?.paymentMethod === PAYMENT.PREPAID;

const paymentLabel = (order, lang) => {
  if (isPaid(order)) {
    return lang === 'ar' ? 'مدفوع بالفعل' : 'PAID';
  }
  return lang === 'ar' ? 'غير مدفوع' : 'UNPAID';
};

const getCollection = order => {
  if (!order || order.status === STATUS.CANCELLED) return 0;
  if (isPaid(order)) {
    return normalizeNumber(order.deliveryFee);
  }
  return normalizeNumber(order.cod) + normalizeNumber(order.deliveryFee);
};

const getCompanyRevenue = order => {
  if (!order || order.status === STATUS.CANCELLED) return 0;
  const fee = normalizeNumber(order.deliveryFee);
  if (order.revenueType === 'amount') {
    return Math.min(Math.max(0, normalizeNumber(order.revenueValue)), fee);
  }
  return fee * (normalizeNumber(order.revenuePercent) / 100);
};

const getDriverRevenue = order => {
  if (!order || order.status === STATUS.CANCELLED) return 0;
  const fee = normalizeNumber(order.deliveryFee);
  return Math.max(0, fee - getCompanyRevenue(order));
};

const getCompanyPercent = order => {
  const fee = normalizeNumber(order?.deliveryFee);
  if (!fee) return 0;
  return (getCompanyRevenue(order) / fee) * 100;
};

const startOfDay = date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const isSameDay = (a, b) =>
  startOfDay(a).getTime() === startOfDay(b).getTime();

const isWithinDays = (date, days) => {
  const now = new Date();
  const d = new Date(date);
  return now >= d && now - d <= days * 24 * 60 * 60 * 1000;
};

const normalizeStatus = status => {
  const map = {
    مؤكد: STATUS.CONFIRMED,
    'قيد تجهيز الطلب': STATUS.PROCESSING,
    'قيد التجهيز': STATUS.PROCESSING,
    'خرج للتوصيل': STATUS.OUT_FOR_DELIVERY,
    'جاري التوصيل': STATUS.IN_TRANSIT,
    مكتمل: STATUS.COMPLETED,
    متأخر: STATUS.DELAYED,
    ملغي: STATUS.CANCELLED
  };
  return map[status] || status || STATUS.CONFIRMED;
};

const normalizeOrder = order => {
  const fee = normalizeNumber(order?.deliveryFee);
  let revenueType = order?.revenueType === 'amount' ? 'amount' : 'percent';
  let revenuePercent = normalizeNumber(order?.revenuePercent);
  let revenueValue = normalizeNumber(order?.revenueValue);

  if (order && order.revenueType === undefined && order.revenuePercent !== undefined) {
    revenueType = 'percent';
    revenuePercent = normalizeNumber(order.revenuePercent);
  }

  if (revenueType === 'amount') {
    revenueValue = Math.min(Math.max(0, revenueValue), fee);
    revenuePercent = fee ? (revenueValue / fee) * 100 : 0;
  } else {
    revenuePercent = Math.min(100, Math.max(0, revenuePercent));
    revenueValue = fee * (revenuePercent / 100);
  }

  return {
    ...order,
    status: normalizeStatus(order?.status),
    cod: normalizeNumber(order?.cod),
    deliveryFee: fee,
    revenueType,
    revenuePercent,
    revenueValue,
    driverId: order?.driverId || '',
    driverName: order?.driverName || '',
    paymentMethod: order?.paymentMethod || PAYMENT.CASH
  };
};

/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {
  en: {
    appTitle: 'Express Delivery PRO',
    subtitle: 'Enterprise Delivery & Logistics Control Center',
    dashboard: 'Dashboard',
    newOrder: 'New Order',
    orders: 'Orders',
    drivers: 'Drivers',
    merchants: 'Merchants',
    customers: 'Customers',
    ledger: 'Driver Ledger',
    history: 'Audit History',
    settings: 'Settings',
    importExport: 'WhatsApp / Import Center',
    active: 'Active',
    completed: 'Completed',
    delayed: 'Delayed',
    totalOrders: 'Total Orders',
    pasteText: 'Paste WhatsApp / Plain Text',
    parse: 'Parse Orders with AI',
    customer: 'Customer',
    store: 'Merchant',
    phone: 'Phone',
    address: 'Address',
    notes: 'Notes',
    item: 'Items',
    orderValue: 'Order Value',
    deliveryFee: 'Delivery Fee',
    payment: 'Payment',
    driver: 'Driver',
    status: 'Status',
    selectDriver: 'Select Driver',
    revenueType: 'Revenue Type',
    percentage: 'Percentage',
    fixedAmount: 'Fixed Amount',
    driverShare: 'Driver Share',
    companyShare: 'Company Share',
    confirmOrder: 'Confirm & Save Orders',
    noOrders: 'No orders found.',
    addDriver: 'Add Driver',
    driverName: 'Driver name',
    driverPhone: 'Driver phone',
    addMerchant: 'Add Merchant',
    addCustomer: 'Add Customer',
    save: 'Save',
    settingsTitle: 'Enterprise Settings',
    defaultCommission: 'Default Company Revenue %',
    currency: 'System Currency',
    search: 'Search orders...',
    close: 'Close',
    todayRevenue: "Today's Revenue",
    todayCollections: "Today's Collections",
    financialBreakdown: 'Financial Breakdown',
    apiKey: 'Groq API Key',
    language: 'Language',
    createdSuccessfully: 'Order created successfully.'
  },
  ar: {
    appTitle: 'إكسبريس دليفري PRO',
    subtitle: 'مركز التحكم المؤسسي للتوصيل واللوجستيات',
    dashboard: 'لوحة التحكم',
    newOrder: 'طلب جديد',
    orders: 'الطلبات',
    drivers: 'الطيارين',
    merchants: 'التجار',
    customers: 'العملاء',
    ledger: 'كشف حساب الطيارين',
    history: 'سجل التعديلات',
    settings: 'الإعدادات',
    importExport: 'مركز واتساب والاستيراد',
    active: 'نشطة',
    completed: 'مكتملة',
    delayed: 'متأخرة',
    totalOrders: 'إجمالي الطلبات',
    pasteText: 'رسائل واتساب / نص خام',
    parse: 'استخراج الطلبات بالذكاء الاصطناعي',
    customer: 'العميل',
    store: 'التاجر',
    phone: 'الهاتف',
    address: 'العنوان',
    notes: 'الملاحظات',
    item: 'الأصناف',
    orderValue: 'قيمة الطلب',
    deliveryFee: 'رسوم التوصيل',
    payment: 'الدفع',
    driver: 'الطيار',
    status: 'الحالة',
    selectDriver: 'اختيار الطيار',
    revenueType: 'نوع الإيراد',
    percentage: 'نسبة مئوية',
    fixedAmount: 'مبلغ ثابت',
    driverShare: 'نصيب الطيار',
    companyShare: 'نصيب الشركة',
    confirmOrder: 'تأكيد وحفظ الطلبات',
    noOrders: 'لا توجد طلبات.',
    addDriver: 'إضافة طيار',
    driverName: 'اسم الطيار',
    driverPhone: 'رقم هاتف الطيار',
    addMerchant: 'إضافة تاجر',
    addCustomer: 'إضافة عميل',
    save: 'حفظ',
    settingsTitle: 'إعدادات المؤسسة',
    defaultCommission: 'نسبة إيراد الشركة الافتراضية',
    currency: 'عملة النظام',
    search: 'البحث في الطلبات...',
    close: 'إغلاق',
    todayRevenue: 'إيراد اليوم',
    todayCollections: 'تحصيل اليوم',
    financialBreakdown: 'التقسيم المالي',
    apiKey: 'مفتاح Groq API',
    language: 'اللغة',
    createdSuccessfully: 'تم إنشاء الطلب بنجاح.'
  }
};

/* =========================================================
   STYLES
   ========================================================= */

const styles = {
  app: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top left, #25114A 0%, #0A0614 38%, #05030A 100%)',
    color: '#F8FAFC',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif',
    padding: 18,
    boxSizing: 'border-box'
  },
  shell: { maxWidth: 1450, margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, marginBottom: 20, flexWrap: 'wrap' },
  brand: { display: 'flex', alignItems: 'center', gap: 14 },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
    boxShadow: '0 12px 35px rgba(124,58,237,.35)'
  },
  title: { margin: 0, fontSize: 25, fontWeight: 900, letterSpacing: '-.6px' },
  subtitle: { margin: '4px 0 0', color: '#94A3B8', fontSize: 13 },
  layout: { display: 'grid', gridTemplateColumns: '250px minmax(0,1fr)', gap: 18 },
  sidebar: {
    background: 'rgba(15,10,28,.8)',
    border: '1px solid rgba(168,85,247,.18)',
    borderRadius: 22,
    padding: 12,
    height: 'fit-content',
    position: 'sticky',
    top: 18
  },
  nav: { display: 'flex', flexDirection: 'column', gap: 7 },
  navButton: {
    width: '100%',
    textAlign: 'left',
    border: '1px solid transparent',
    background: 'transparent',
    color: '#CBD5E1',
    padding: '12px 13px',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 700
  },
  navActive: {
    background: 'rgba(124,58,237,.23)',
    border: '1px solid rgba(168,85,247,.45)',
    color: '#fff'
  },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 16 },
  metric: { background: 'rgba(15,10,28,.75)', border: '1px solid rgba(168,85,247,.16)', borderRadius: 18, padding: 17 },
  metricLabel: { color: '#94A3B8', fontSize: 12, fontWeight: 700 },
  metricValue: { display: 'block', fontSize: 25, fontWeight: 900, marginTop: 6 },
  card: { background: 'rgba(15,10,28,.78)', border: '1px solid rgba(168,85,247,.17)', borderRadius: 20, padding: 20, marginBottom: 16 },
  input: { width: '100%', boxSizing: 'border-box', padding: '11px 13px', borderRadius: 11, border: '1px solid rgba(168,85,247,.25)', background: '#0B0718', color: '#fff', outline: 'none' },
  textarea: { width: '100%', boxSizing: 'border-box', padding: 14, minHeight: 180, resize: 'vertical', borderRadius: 14, border: '1px solid rgba(168,85,247,.25)', background: '#0B0718', color: '#fff', outline: 'none' },
  button: { border: 0, borderRadius: 12, padding: '11px 15px', color: '#fff', cursor: 'pointer', fontWeight: 800, background: '#1E293B' },
  primary: { background: 'linear-gradient(135deg,#7C3AED,#A855F7)' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 12 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, color: '#CBD5E1', fontWeight: 700 },
  status: { display: 'inline-flex', alignItems: 'center', padding: '6px 9px', borderRadius: 9, fontSize: 11, fontWeight: 900 },
  financialBox: { marginTop: 14, padding: 15, borderRadius: 15, background: 'linear-gradient(135deg,rgba(124,58,237,.12),rgba(236,72,153,.06))', border: '1px solid rgba(168,85,247,.2)' },
  splitGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 10, marginTop: 10 }
};

const statusColor = status => {
  switch (status) {
    case STATUS.COMPLETED: return '#10B981';
    case STATUS.DELAYED: return '#F59E0B';
    case STATUS.CANCELLED: return '#EF4444';
    case STATUS.IN_TRANSIT:
    case STATUS.OUT_FOR_DELIVERY: return '#3B82F6';
    case STATUS.PROCESSING: return '#8B5CF6';
    case STATUS.CONFIRMED: return '#A78BFA';
    default: return '#64748B';
  }
};

const statusLabel = (status, lang) => {
  const map = {
    [STATUS.CONFIRMED]: lang === 'ar' ? 'مؤكد' : 'Confirmed',
    [STATUS.PROCESSING]: lang === 'ar' ? 'قيد التجهيز' : 'Processing',
    [STATUS.OUT_FOR_DELIVERY]: lang === 'ar' ? 'خرج للتوصيل' : 'Out for Delivery',
    [STATUS.IN_TRANSIT]: lang === 'ar' ? 'جاري التوصيل' : 'In Transit',
    [STATUS.COMPLETED]: lang === 'ar' ? 'مكتمل' : 'Completed',
    [STATUS.DELAYED]: lang === 'ar' ? 'متأخر' : 'Delayed',
    [STATUS.CANCELLED]: lang === 'ar' ? 'ملغي' : 'Cancelled'
  };
  return map[status] || status;
};

/* =========================================================
   MAIN APP COMPONENT
   ========================================================= */

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE.lang) || 'ar');
  const t = translations[lang] || translations.ar;
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE.apiKey) || '');
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_SETTINGS, ...safeJSON(STORAGE.settings, {}) }));
  const [orders, setOrders] = useState(() => safeJSON(STORAGE.orders, []).map(normalizeOrder));
  const [drivers, setDrivers] = useState(() => safeJSON(STORAGE.drivers, [{ id: 'd1', name: 'أحمد', phone: '' }, { id: 'd2', name: 'محمود', phone: '' }]));
  const [merchants, setMerchants] = useState(() => safeJSON(STORAGE.merchants, []));
  const [customers, setCustomers] = useState(() => safeJSON(STORAGE.customers, []));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedOrders, setExtractedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { localStorage.setItem(STORAGE.lang, lang); }, [lang]);
  useEffect(() => { localStorage.setItem(STORAGE.apiKey, apiKey); }, [apiKey]);
  useEffect(() => { localStorage.setItem(STORAGE.settings, JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem(STORAGE.orders, JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem(STORAGE.drivers, JSON.stringify(drivers)); }, [drivers]);

  const extractOrders = async () => {
    if (!apiKey.trim()) {
      alert(lang === 'ar' ? 'أضف Groq API Key من الإعدادات أولاً.' : 'Add your Groq API Key in Settings first.');
      setActiveTab('settings');
      return;
    }
    if (!rawText.trim()) return;
    setLoading(true);

    const systemPrompt = `Parse messy WhatsApp messages into delivery orders JSON array under "orders". Schema: {"orders": [{"store":"", "customer":"", "phone":"", "address":"", "cod":0, "deliveryFee":0, "paymentMethod":"cash", "item":"", "notes":""}]}`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.1,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: rawText }
          ]
        })
      });

      const data = await response.json();
      const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');
      setExtractedOrders((parsed.orders || []).map(o => ({ ...o, driverId: '', revenueType: 'percent', revenuePercent: settings.defaultCommission, revenueValue: 0 })));
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmExtractedOrders = () => {
    const created = extractedOrders.map((o, idx) => normalizeOrder({
      ...o,
      id: uid(),
      orderNum: `#${Date.now().toString().slice(-4)}${idx}`,
      status: STATUS.CONFIRMED,
      createdAt: nowISO()
    }));
    setOrders(prev => [...created, ...prev]);
    setExtractedOrders([]);
    setRawText('');
    setActiveTab('orders');
    alert(t.createdSuccessfully);
  };

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(o => [o.orderNum, o.customer, o.store, o.phone, o.address, o.status].some(val => String(val || '').toLowerCase().includes(q)));
  }, [orders, searchQuery]);

  return (
    <div style={styles.app}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div style={styles.brand}>
            <div style={styles.logo}>🚚</div>
            <div>
              <h1 style={styles.title}>{t.appTitle}</h1>
              <p style={styles.subtitle}>{t.subtitle}</p>
            </div>
          </div>
          <button style={{ ...styles.button, ...styles.primary }} onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}>
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </header>

        <div style={styles.layout}>
          <aside style={styles.sidebar}>
            <nav style={styles.nav}>
              {[
                ['dashboard', '📊', t.dashboard],
                ['new_order', '➕', t.newOrder],
                ['orders', '📦', t.orders],
                ['drivers', '🛵', t.drivers],
                ['settings', '⚙️', t.settings]
              ].map(([key, icon, label]) => (
                <button
                  key={key}
                  style={{ ...styles.navButton, ...(activeTab === key ? styles.navActive : {}) }}
                  onClick={() => setActiveTab(key)}
                >
                  {icon} {label}
                </button>
              ))}
            </nav>
          </aside>

          <main>
            {activeTab === 'dashboard' && (
              <div>
                <div style={styles.grid4}>
                  <div style={styles.metric}>
                    <span style={styles.metricLabel}>{t.active}</span>
                    <span style={styles.metricValue}>{orders.filter(o => o.status !== STATUS.COMPLETED).length}</span>
                  </div>
                  <div style={styles.metric}>
                    <span style={styles.metricLabel}>{t.completed}</span>
                    <span style={styles.metricValue}>{orders.filter(o => o.status === STATUS.COMPLETED).length}</span>
                  </div>
                  <div style={styles.metric}>
                    <span style={styles.metricLabel}>{t.todayCollections}</span>
                    <span style={styles.metricValue}>{money(orders.reduce((sum, o) => sum + getCollection(o), 0), settings.currency)}</span>
                  </div>
                  <div style={styles.metric}>
                    <span style={styles.metricLabel}>{t.todayRevenue}</span>
                    <span style={styles.metricValue}>{money(orders.reduce((sum, o) => sum + getCompanyRevenue(o), 0), settings.currency)}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'new_order' && (
              <div style={styles.card}>
                <h2>{t.importExport}</h2>
                <textarea
                  style={styles.textarea}
                  placeholder={t.pasteText}
                  value={rawText}
                  onChange={e => setRawText(e.target.value)}
                />
                <button style={{ ...styles.button, ...styles.primary, marginTop: 10 }} onClick={extractOrders} disabled={loading}>
                  {loading ? '...' : t.parse}
                </button>

                {extractedOrders.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <h3>Extracted ({extractedOrders.length})</h3>
                    {extractedOrders.map((ord, idx) => (
                      <div key={idx} style={{ ...styles.card, background: '#0A0614' }}>
                        <p><strong>{t.store}:</strong> {ord.store} | <strong>{t.customer}:</strong> {ord.customer} ({ord.phone})</p>
                        <p><strong>{t.address}:</strong> {ord.address}</p>
                        <p><strong>{t.deliveryFee}:</strong> {ord.deliveryFee} {settings.currency}</p>
                      </div>
                    ))}
                    <button style={{ ...styles.button, ...styles.primary }} onClick={confirmExtractedOrders}>
                      {t.confirmOrder}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div style={styles.card}>
                <input
                  style={styles.input}
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <div style={{ marginTop: 15 }}>
                  {filteredOrders.length === 0 ? (
                    <p>{t.noOrders}</p>
                  ) : (
                    filteredOrders.map(o => (
                      <div key={o.id} style={{ ...styles.card, background: '#0B0718' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <strong>{o.orderNum} - {o.customer}</strong>
                          <span style={{ ...styles.status, background: `${statusColor(o.status)}22`, color: statusColor(o.status) }}>
                            {statusLabel(o.status, lang)}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 5 }}>
                          {o.store} • {o.address} • {money(o.deliveryFee, settings.currency)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'drivers' && (
              <div style={styles.card}>
                <h2>{t.drivers}</h2>
                {drivers.map(d => (
                  <div key={d.id} style={{ ...styles.card, background: '#0B0718' }}>
                    <strong>{d.name}</strong> {d.phone && `(${d.phone})`}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div style={styles.card}>
                <h2>{t.settingsTitle}</h2>
                <div style={styles.formGrid}>
                  <div style={styles.field}>
                    <label style={styles.label}>{t.apiKey}</label>
                    <input style={styles.input} type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>{t.defaultCommission} (%)</label>
                    <input
                      style={styles.input}
                      type="number"
                      value={settings.defaultCommission}
                      onChange={e => setSettings(s => ({ ...s, defaultCommission: normalizeNumber(e.target.value) }))}
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
