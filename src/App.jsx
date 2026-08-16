import React, { useState, useEffect } from 'react';

// Language Localization Dictionary
const translations = {
  ar: {
    appTitle: '⚡ عمليات التوصيل السريع',
    appSubtitle: 'نظام الذكاء الاصطناعي وإدارة التوصيل المتقدم',
    groqConnected: '🟢 Groq متصل',
    groqMissing: '🔴 المفتاح مفقود',
    navNewOrder: '➕ طلب جديد',
    navOrders: '📋 الطلبات',
    navDrivers: '🛵 الطيارين',
    navMerchants: '🏪 التجار',
    navCustomers: '👥 العملاء',
    navSettings: '⚙️ الإعدادات',
    kpiTotalCod: 'إجمالي النقدية (COD)',
    kpiActiveOrders: 'طلبات نشطة',
    kpiCompleted: 'تم تسليمها',
    aiHeader: 'استخراج بيانات الطلب بواسطة AI',
    placeholderOrder: 'ألصق نص الطلب هنا (مثال: أوردر من صيدلية النور لمحمد...)',
    btnPaste: '📋 لصق من الحافظة',
    btnExtract: '⚡ استخراج البيانات بالذكاء الاصطناعي',
    btnExtracting: 'جاري التحليل...',
    reviewTitle: 'مراجعة البيانات المستخرجة:',
    store: 'المتجر',
    customer: 'العميل',
    phone: 'رقم الهاتف',
    cod: 'المبلغ (COD)',
    address: 'العنوان',
    item: 'الصنف',
    selectDriver: 'اختيار طيار التوصيل:',
    chooseDriver: '-- اختر طيار --',
    btnConfirm: '✅ تأكيد وحفظ الطلب',
    searchPlaceholder: '🔍 بحث عن طريق الاسم، المتجر، أو رقم الهاتف...',
    unspecified: 'غير محدد',
    currency: 'ج.م',
    statusConfirmed: 'مؤكد',
    statusInTransit: 'جاري التوصيل',
    statusDelivered: 'تم التسليم',
    statusDelayed: 'متأخر',
    statusCancelled: 'ملغي',
    cancelAlert: '⚠️ تنبيه: تم رصد طلب إلغاء في النص! لن يتم إضافة هذا الطلب إلى السجل.',
    addDriver: 'إضافة طيار جديد',
    driverName: 'اسم الطيار...',
    btnAdd: 'إضافة',
    driverCash: 'النقدية الواجب تسليمها (تم التوصيل):',
    totalTrips: 'إجمالي الرحلات:',
    saveMerchant: 'إضافة تاجر يدويًا',
    editMerchant: 'تعديل بيانات التاجر',
    merchantName: 'اسم التاجر/المحل...',
    saveCustomer: 'إضافة عميل يدويًا',
    editCustomer: 'تعديل بيانات العميل',
    saveBtn: 'حفظ',
    deleteBtn: 'حذف',
    editBtn: 'تعديل',
    settingsTitle: 'إعدادات النظام'
  },
  en: {
    appTitle: '⚡ Express Delivery Operations',
    appSubtitle: 'AI-Powered Order Extraction & Operations Dashboard',
    groqConnected: '🟢 Groq Connected',
    groqMissing: '🔴 Key Missing',
    navNewOrder: '➕ New Order',
    navOrders: '📋 Orders',
    navDrivers: '🛵 Drivers',
    navMerchants: '🏪 Stores',
    navCustomers: '👥 Customers',
    navSettings: '⚙️ Settings',
    kpiTotalCod: 'Total COD Revenue',
    kpiActiveOrders: 'Active Orders',
    kpiCompleted: 'Delivered Orders',
    aiHeader: 'AI Order Data Extraction',
    placeholderOrder: 'Paste Egyptian chat or delivery text here...',
    btnPaste: '📋 Paste Clipboard',
    btnExtract: '⚡ Extract Data with AI',
    btnExtracting: 'Analyzing...',
    reviewTitle: 'Extracted Data Review:',
    store: 'Store',
    customer: 'Customer',
    phone: 'Phone',
    cod: 'COD Amount',
    address: 'Address',
    item: 'Item Details',
    selectDriver: 'Assign Driver:',
    chooseDriver: '-- Choose Driver --',
    btnConfirm: '✅ Confirm & Save Order',
    searchPlaceholder: '🔍 Search by name, store, or phone...',
    unspecified: 'N/A',
    currency: 'EGP',
    statusConfirmed: 'Confirmed',
    statusInTransit: 'In Transit',
    statusDelivered: 'Delivered',
    statusDelayed: 'Delayed',
    statusCancelled: 'Cancelled',
    cancelAlert: '⚠️ Alert: Cancellation order detected in text! Request ignored.',
    addDriver: 'Add New Driver',
    driverName: 'Driver name...',
    btnAdd: 'Add',
    driverCash: 'Cash to Collect (Delivered):',
    totalTrips: 'Total Trips:',
    saveMerchant: 'Add Store Manually',
    editMerchant: 'Edit Store Details',
    merchantName: 'Store Name...',
    saveCustomer: 'Add Customer Manually',
    editCustomer: 'Edit Customer Details',
    saveBtn: 'Save',
    deleteBtn: 'Delete',
    editBtn: 'Edit',
    settingsTitle: 'System Settings'
  }
};

export default function App() {
  // Config & Preferences
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'ar');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [activeTab, setActiveTab] = useState('new_order');
  const [searchQuery, setSearchQuery] = useState('');

  // Core Databases
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_orders') || '[]'));
  const [merchants, setMerchants] = useState(() => JSON.parse(localStorage.getItem('delivery_merchants') || '[]'));
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('delivery_customers') || '[]'));
  const [drivers, setDrivers] = useState(() => JSON.parse(localStorage.getItem('delivery_drivers') || '["أحمد", "محمود", "مصطفى"]'));

  // Input States
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [newDriverName, setNewDriverName] = useState('');

  // Editing Modals
  const [editingMerchant, setEditingMerchant] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [newMerchantName, setNewMerchantName] = useState('');
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' });

  const t = translations[lang];

  // Sync LocalStorage
  useEffect(() => localStorage.setItem('app_lang', lang), [lang]);
  useEffect(() => localStorage.setItem('groq_api_key', apiKey), [apiKey]);
  useEffect(() => localStorage.setItem('delivery_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('delivery_merchants', JSON.stringify(merchants)), [merchants]);
  useEffect(() => localStorage.setItem('delivery_customers', JSON.stringify(customers)), [customers]);
  useEffect(() => localStorage.setItem('delivery_drivers', JSON.stringify(drivers)), [drivers]);

  // Clipboard Quick Actions
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch (err) {
      alert('Failed to read clipboard.');
    }
  };

  // AI Parser Engine
  const extractOrderInfo = async () => {
    if (!apiKey.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال مفتاح Groq API من تبويب الإعدادات أولاً.' : 'Please enter your Groq API key in Settings.');
      setActiveTab('settings');
      return;
    }
    if (!rawText.trim()) return alert(lang === 'ar' ? 'يرجى إدخال نص الطلب.' : 'Please enter order text.');

    setLoading(true);
    setExtractedData(null);

    const knownStores = merchants.map(m => m.name).join(', ');
    const knownCustomers = customers.map(c => `${c.name} (${c.phone})`).join(', ');

    const systemPrompt = `You are an elite Egyptian dialect (عامية مصرية) Information Extraction Agent for delivery operations.

### KNOWN DATABASE REPOSITORY:
- Known Stores in System: [${knownStores || 'None'}]
- Known Customers in System: [${knownCustomers || 'None'}]

### CRITICAL PARSING & LOGIC RULES:
1. ORDER CANCELLATION DETECTOR:
   - If the user explicitly cancels or says "الغي الأوردر", "خلاص متروحش", "أدغى", or similar cancellation phrases anywhere in the text, set "is_cancelled": true and leave other fields empty.
2. CORRECTION RESOLUTION RULE:
   - Egyptian texts frequently contain self-corrections (e.g., "استنى بس مش أحمد اسمه محمود", "مش محل كذا ده محل كذا"). ALWAYS prefer the final corrected entity mentioned.
3. STORE VS CUSTOMER RECOGNITION:
   - Do NOT confuse store names with customer names. Read carefully: "من محل X لـ Y" -> Store is X, Customer is Y.
   - NEVER hallucinate a store name if the text specifies a different one. If no store is mentioned, return "غير محدد".
4. COD (CASH ON DELIVERY) MONEY CALCULATION:
   - "cod" must ONLY be the numeric total money to be collected from customer upon arrival.
   - Separate building number (عمارة), floor (دور), apartment (شقة), or phone numbers from prices.
   - If item cost is 300 and delivery fee is 40, sum them to 340 ONLY IF both are paid by customer on delivery.

### STRICT JSON SCHEMA (NO MARKDOWN CODEBLOCKS):
{
  "is_cancelled": false,
  "store": "Exact store name mentioned in text",
  "customer": "Customer name",
  "phone": "Phone number (standard digits)",
  "address": "Full location details",
  "cod": "Exact numeric amount (e.g., 340)",
  "item": "Description of items"
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
          temperature: 0.0
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Extraction Failed');
      
      const parsed = JSON.parse(data.choices[0].message.content);

      if (parsed.is_cancelled || parsed.status === 'CANCELLED') {
        alert(t.cancelAlert);
        setLoading(false);
        return;
      }

      setExtractedData(parsed);
    } catch (err) {
      alert('Parsing Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Confirm Order Handler
  const handleConfirmOrder = () => {
    if (!extractedData) return;

    const newOrder = {
      id: Date.now(),
      ...extractedData,
      driver: selectedDriver || t.unspecified,
      status: 'مؤكد',
      date: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setOrders([newOrder, ...orders]);

    // Save Merchants & Customers automatically
    if (extractedData.store && extractedData.store !== t.unspecified) {
      setMerchants(prev => {
        const match = prev.find(m => m.name.toLowerCase() === extractedData.store.toLowerCase());
        if (!match) return [{ id: Date.now(), name: extractedData.store, totalOrders: 1 }, ...prev];
        return prev.map(m => m.name.toLowerCase() === extractedData.store.toLowerCase() ? { ...m, totalOrders: m.totalOrders + 1 } : m);
      });
    }

    if (extractedData.customer && extractedData.customer !== t.unspecified) {
      setCustomers(prev => {
        const match = prev.find(c => c.phone === extractedData.phone || c.name === extractedData.customer);
        if (!match) return [{ id: Date.now(), name: extractedData.customer, phone: extractedData.phone, address: extractedData.address }, ...prev];
        return prev;
      });
    }

    setRawText('');
    setExtractedData(null);
    setSelectedDriver('');
    setActiveTab('orders');
  };

  // Calculated Metrics
  const totalCodSum = orders.reduce((acc, o) => acc + (parseFloat(o.cod) || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'تم التسليم' && o.status !== 'ملغي').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'تم التسليم').length;

  // Filtered Lists
  const filteredOrders = orders.filter(o => 
    (o.customer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.store || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.phone || '').includes(searchQuery)
  );

  return (
    <div style={{ ...styles.container, direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      
      {/* Header Bar */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.appTitle}>{t.appTitle}</h1>
          <p style={styles.appSubtitle}>{t.appSubtitle}</p>
        </div>
        <div style={styles.headerRight}>
          <button 
            style={styles.langBtn} 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          >
            {lang === 'ar' ? '🇬🇧 English' : '🇪🇬 العربية'}
          </button>
          <div style={{ ...styles.badge, backgroundColor: apiKey ? '#065f46' : '#991b1b' }}>
            {apiKey ? t.groqConnected : t.groqMissing}
          </div>
        </div>
      </header>

      {/* KPI Operational Summary Cards */}
      <div style={styles.kpiRow}>
        <div style={styles.kpiCard}>
          <span style={styles.kpiLabel}>{t.kpiTotalCod}</span>
          <span style={styles.kpiValue}>{totalCodSum.toLocaleString()} {t.currency}</span>
        </div>
        <div style={styles.kpiCard}>
          <span style={styles.kpiLabel}>{t.kpiActiveOrders}</span>
          <span style={{ ...styles.kpiValue, color: '#38bdf8' }}>{activeOrdersCount}</span>
        </div>
        <div style={styles.kpiCard}>
          <span style={styles.kpiLabel}>{t.kpiCompleted}</span>
          <span style={{ ...styles.kpiValue, color: '#10b981' }}>{deliveredOrdersCount}</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={styles.nav}>
        <button style={activeTab === 'new_order' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('new_order')}>{t.navNewOrder}</button>
        <button style={activeTab === 'orders' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('orders')}>{t.navOrders} ({orders.length})</button>
        <button style={activeTab === 'drivers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('drivers')}>{t.navDrivers} ({drivers.length})</button>
        <button style={activeTab === 'merchants' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('merchants')}>{t.navMerchants} ({merchants.length})</button>
        <button style={activeTab === 'customers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('customers')}>{t.navCustomers} ({customers.length})</button>
        <button style={activeTab === 'settings' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('settings')}>{t.navSettings}</button>
      </nav>

      {/* Main Content Viewport */}
      <main style={styles.main}>

        {/* TAB 1: NEW ORDER PARSER */}
        {activeTab === 'new_order' && (
          <div style={styles.card}>
            <div style={styles.rowBetween}>
              <h2 style={styles.cardTitle}>{t.aiHeader}</h2>
              <button onClick={handlePasteClipboard} style={styles.btnSecondaryCompact}>{t.btnPaste}</button>
            </div>
            
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={t.placeholderOrder}
              style={styles.textarea}
            />
            
            <button onClick={extractOrderInfo} disabled={loading} style={styles.btnPrimary}>
              {loading ? t.btnExtracting : t.btnExtract}
            </button>

            {extractedData && (
              <div style={styles.extractedBox}>
                <h3 style={{ marginTop: 0 }}>{t.reviewTitle}</h3>
                <div style={styles.grid2}>
                  <div><strong>{t.store}:</strong> {extractedData.store || t.unspecified}</div>
                  <div><strong>{t.customer}:</strong> {extractedData.customer || t.unspecified}</div>
                  <div><strong>{t.phone}:</strong> {extractedData.phone || t.unspecified}</div>
                  <div><strong>{t.cod}:</strong> {extractedData.cod || '0'} {t.currency}</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong>{t.address}:</strong> {extractedData.address || t.unspecified}</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong>{t.item}:</strong> {extractedData.item || t.unspecified}</div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <label style={styles.label}>{t.selectDriver}</label>
                  <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} style={styles.input}>
                    <option value="">{t.chooseDriver}</option>
                    {drivers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </select>
                </div>

                <button onClick={handleConfirmOrder} style={styles.btnSuccess}>{t.btnConfirm}</button>
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

            {filteredOrders.length === 0 ? <p style={styles.empty}>No orders match search query.</p> : filteredOrders.map(order => (
              <div key={order.id} style={styles.card}>
                <div style={styles.rowBetween}>
                  <span style={styles.tagStore}>{order.store}</span>
                  <select
                    value={order.status}
                    onChange={(e) => setOrders(orders.map(o => o.id === order.id ? { ...o, status: e.target.value } : o))}
                    style={getStatusStyle(order.status)}
                  >
                    <option value="مؤكد">{t.statusConfirmed}</option>
                    <option value="جاري التوصيل">{t.statusInTransit}</option>
                    <option value="تم التسليم">{t.statusDelivered}</option>
                    <option value="متأخر">{t.statusDelayed}</option>
                    <option value="ملغي">{t.statusCancelled}</option>
                  </select>
                </div>
                <p style={styles.p}><strong>{t.customer}:</strong> {order.customer} ({order.phone})</p>
                <p style={styles.p}><strong>{t.address}:</strong> {order.address}</p>
                <p style={styles.p}><strong>{t.cod}:</strong> <span style={{ color: '#10b981', fontWeight: 'bold' }}>{order.cod} {t.currency}</span> | <strong>Driver:</strong> {order.driver}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DRIVER ACCOUNTING */}
        {activeTab === 'drivers' && (
          <div>
            <div style={styles.card}>
              <h3 style={{ marginTop: 0 }}>{t.addDriver}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder={t.driverName}
                  value={newDriverName}
                  onChange={(e) => setNewDriverName(e.target.value)}
                  style={styles.input}
                />
                <button onClick={() => {
                  if (newDriverName.trim() && !drivers.includes(newDriverName.trim())) {
                    setDrivers([...drivers, newDriverName.trim()]);
                    setNewDriverName('');
                  }
                }} style={styles.btnPrimaryCompact}>{t.btnAdd}</button>
              </div>
            </div>

            <div style={styles.grid2}>
              {drivers.map((driverName, idx) => {
                const driverOrders = orders.filter(o => o.driver === driverName);
                const deliveredCash = driverOrders.filter(o => o.status === 'تم التسليم').reduce((sum, o) => sum + (parseFloat(o.cod) || 0), 0);

                return (
                  <div key={idx} style={styles.card}>
                    <div style={styles.rowBetween}>
                      <h3 style={{ margin: 0 }}>🛵 {driverName}</h3>
                      <button onClick={() => setDrivers(drivers.filter(d => d !== driverName))} style={styles.btnDelete}>{t.deleteBtn}</button>
                    </div>
                    <hr style={styles.hr} />
                    <p style={styles.p}>{t.totalTrips} <strong>{driverOrders.length}</strong></p>
                    <p style={styles.p}>{t.driverCash} <strong style={{ color: '#10b981' }}>{deliveredCash} {t.currency}</strong></p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: MERCHANTS REPOSITORY */}
        {activeTab === 'merchants' && (
          <div>
            <div style={styles.card}>
              <h3>{editingMerchant ? t.editMerchant : t.saveMerchant}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder={t.merchantName}
                  value={newMerchantName}
                  onChange={(e) => setNewMerchantName(e.target.value)}
                  style={styles.input}
                />
                <button onClick={() => {
                  if (!newMerchantName.trim()) return;
                  if (editingMerchant) {
                    setMerchants(merchants.map(m => m.id === editingMerchant.id ? { ...m, name: newMerchantName } : m));
                    setEditingMerchant(null);
                  } else {
                    setMerchants([{ id: Date.now(), name: newMerchantName, totalOrders: 0 }, ...merchants]);
                  }
                  setNewMerchantName('');
                }} style={styles.btnPrimaryCompact}>{t.saveBtn}</button>
              </div>
            </div>

            <div style={styles.grid2}>
              {merchants.map(m => (
                <div key={m.id} style={styles.card}>
                  <div style={styles.rowBetween}>
                    <h3 style={{ margin: 0 }}>🏪 {m.name}</h3>
                    <button onClick={() => { setEditingMerchant(m); setNewMerchantName(m.name); }} style={styles.btnEdit}>{t.editBtn}</button>
                  </div>
                  <p style={{ color: '#94a3b8', margin: '10px 0 0 0' }}>Orders: <strong>{m.totalOrders || 0}</strong></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER DIRECTORY */}
        {activeTab === 'customers' && (
          <div>
            <div style={styles.card}>
              <h3>{editingCustomer ? t.editCustomer : t.saveCustomer}</h3>
              <input
                type="text"
                placeholder={t.customer}
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                style={styles.inputMargin}
              />
              <input
                type="text"
                placeholder={t.phone}
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                style={styles.inputMargin}
              />
              <input
                type="text"
                placeholder={t.address}
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                style={styles.inputMargin}
              />
              <button onClick={() => {
                if (!newCustomer.name.trim() || !newCustomer.phone.trim()) return alert('Name and phone required');
                if (editingCustomer) {
                  setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...newCustomer } : c));
                  setEditingCustomer(null);
                } else {
                  setCustomers([{ id: Date.now(), ...newCustomer }, ...customers]);
                }
                setNewCustomer({ name: '', phone: '', address: '' });
              }} style={styles.btnSuccess}>{t.saveBtn}</button>
            </div>

            <div style={styles.grid2}>
              {customers.map(c => (
                <div key={c.id} style={styles.card}>
                  <div style={styles.rowBetween}>
                    <h3 style={{ margin: 0 }}>👤 {c.name}</h3>
                    <button onClick={() => { setEditingCustomer(c); setNewCustomer(c); }} style={styles.btnEdit}>{t.editBtn}</button>
                  </div>
                  <p style={{ color: '#38bdf8', margin: '5px 0' }}>📞 {c.phone}</p>
                  <p style={{ color: '#94a3b8', margin: 0 }}>📍 {c.address}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
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

// Status Badges Styling
const getStatusStyle = (status) => {
  const base = { padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', color: '#fff' };
  switch (status) {
    case 'مؤكد': return { ...base, backgroundColor: '#2563eb' };
    case 'جاري التوصيل': return { ...base, backgroundColor: '#d97706' };
    case 'تم التسليم': return { ...base, backgroundColor: '#059669' };
    case 'متأخر': return { ...base, backgroundColor: '#dc2626' };
    case 'ملغي': return { ...base, backgroundColor: '#4b5563' };
    default: return base;
  }
};

// Application UI Theme
const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '15px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155' },
  headerRight: { display: 'flex', gap: '10px', alignItems: 'center' },
  appTitle: { margin: 0, fontSize: '1.3rem', color: '#38bdf8' },
  appSubtitle: { margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' },
  badge: { padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' },
  langBtn: { padding: '6px 12px', backgroundColor: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' },
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '15px' },
  kpiCard: { backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px 15px', borderRadius: '10px', display: 'flex', flexDirection: 'column' },
  kpiLabel: { fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' },
  kpiValue: { fontSize: '1.2rem', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' },
  nav: { display: 'flex', gap: '8px', marginTop: '15px', overflowX: 'auto', paddingBottom: '6px' },
  tab: { flex: 1, padding: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#94a3b8', minWidth: '95px' },
  activeTab: { flex: 1, padding: '10px', border: 'none', backgroundColor: '#0284c7', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#fff', minWidth: '95px' },
  main: { marginTop: '15px' },
  card: { backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '15px' },
  cardTitle: { marginTop: 0, fontSize: '1.1rem', color: '#f8fafc' },
  textarea: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', fontSize: '0.95rem' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' },
  inputMargin: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', marginBottom: '10px' },
  searchInput: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #0284c7', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', marginBottom: '15px' },
  label: { display: 'block', fontWeight: 'bold', marginBottom: '6px', color: '#cbd5e1' },
  btnPrimary: { width: '100%', padding: '12px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  btnPrimaryCompact: { padding: '10px 20px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  btnSecondaryCompact: { padding: '6px 12px', backgroundColor: '#334155', color: '#38bdf8', border: '1px solid #0284c7', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' },
  btnSuccess: { width: '100%', padding: '12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' },
  btnDelete: { backgroundColor: '#991b1b', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
  btnEdit: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
  extractedBox: { backgroundColor: '#0f172a', border: '1px solid #334155', padding: '15px', borderRadius: '10px', marginTop: '15px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  rowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  tagStore: { backgroundColor: '#0369a1', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem' },
  p: { margin: '6px 0', color: '#cbd5e1' },
  hr: { border: 'none', borderTop: '1px solid #334155', margin: '10px 0' },
  empty: { color: '#64748b', textAlign: 'center', marginTop: '30px' }
};
