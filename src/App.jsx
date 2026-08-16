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
    placeholderOrder: 'ألصق نص الطلب هنا (مثال: بص يا باشا الطلب ده من كارفور...)',
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
    notes: 'ملاحظات الطلب',
    missingInfoAlert: '⚠️ تنبيه: توجد بيانات ناقصة (مثل الهاتف أو العنوان). اضغط هنا لنسخ رسالة استفسار.',
    copyMissingMsg: '📋 نسخ رسالة طلب البيانات الناقصة',
    copiedMsg: '✅ تم نسخ الرسالة بنجاح!',
    selectDriver: 'اختيار طيار التوصيل:',
    chooseDriver: '-- اختر طيار --',
    btnConfirm: '✅ تأكيد وحفظ الطلبات',
    searchPlaceholder: '🔍 بحث عن طريق الاسم، المتجر، أو رقم الهاتف...',
    unspecified: 'غير محدد',
    currency: 'ج.م',
    statusConfirmed: 'مؤكد',
    statusInTransit: 'جاري التوصيل',
    statusDelivered: 'تم التسليم',
    statusDelayed: 'متأخر',
    statusCancelled: 'ملغي',
    cancelAlert: '⚠️ تنبيه: تم رصد طلب إلغاء في النص! لن يتم إضافة هذا الطلب.',
    addDriver: 'إضافة طيار جديد',
    driverName: 'اسم الطيار...',
    btnAdd: 'إضافة',
    driverCash: 'النقدية الواجب تسليمها (تم التوصيل):',
    totalTrips: 'إجمالي الرحلات:',
    saveMerchant: 'إضافة أو تعديل تاجر',
    merchantName: 'اسم التاجر/المحل...',
    merchantPhone: 'هاتف التاجر...',
    merchantAddress: 'عنوان التاجر...',
    merchantNotes: 'ملاحظات وتعليقات التاجر...',
    saveCustomer: 'إضافة عميل يدويًا',
    editCustomer: 'تعديل بيانات العميل',
    saveBtn: 'حفظ',
    deleteBtn: 'حذف',
    editBtn: 'تعديل',
    settingsTitle: 'إعدادات النظام',
    matchPrompt: 'تم العثور على أكثر من عميل مطابق للأسماء المسجلة. هل تقصد أحد هؤلاء أم عميل جديد؟',
    newCustomerOption: '+ تسجيل كعميل جديد تماماً',
    discrepancyAlert: '⚠️ تنبيه اختلاف بيانات: العنوان أو الهاتف المدخل يختلف عن المسجل مسبقاً لهذا العميل!',
    multiOrderNotice: '💡 تم اكتشاف طلب مجزأ لأكثر من عنوان/عميل! تم تقسيمه تلقائياً:'
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
    notes: 'Order Notes',
    missingInfoAlert: '⚠️ Notice: Missing required information (phone or address). Click to copy inquiry message.',
    copyMissingMsg: '📋 Copy Missing Info Inquiry',
    copiedMsg: '✅ Message copied successfully!',
    selectDriver: 'Assign Driver:',
    chooseDriver: '-- Choose Driver --',
    btnConfirm: '✅ Confirm & Save Orders',
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
    saveMerchant: 'Add or Edit Store',
    merchantName: 'Store Name...',
    merchantPhone: 'Store Phone...',
    merchantAddress: 'Store Address...',
    merchantNotes: 'Store Notes & Details...',
    saveCustomer: 'Add Customer Manually',
    editCustomer: 'Edit Customer Details',
    saveBtn: 'Save',
    deleteBtn: 'Delete',
    editBtn: 'Edit',
    settingsTitle: 'System Settings',
    matchPrompt: 'Multiple matching customers found. Did you mean one of these or a new customer?',
    newCustomerOption: '+ Register as Brand New Customer',
    discrepancyAlert: '⚠️ Data Discrepancy Warning: Entered address or phone differs from existing records for this customer!',
    multiOrderNotice: '💡 Multi-destination delivery detected! Split into individual orders:'
  }
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'ar');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [activeTab, setActiveTab] = useState('new_order');
  const [searchQuery, setSearchQuery] = useState('');

  // Core Databases
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_orders') || '[]'));
  const [merchants, setMerchants] = useState(() => JSON.parse(localStorage.getItem('delivery_merchants') || '[]'));
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('delivery_customers') || '[]'));
  const [drivers, setDrivers] = useState(() => JSON.parse(localStorage.getItem('delivery_drivers') || '["أحمد", "محمود", "مصطفى"]'));

  // Input & Extraction States
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedOrders, setExtractedOrders] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [newDriverName, setNewDriverName] = useState('');

  // Disambiguation & Discrepancy State per Sub-order
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [customerMatches, setCustomerMatches] = useState([]);
  const [discrepancyWarning, setDiscrepancyWarning] = useState(false);

  // Merchant Editing State
  const [merchantForm, setMerchantForm] = useState({ id: null, name: '', phone: '', address: '', notes: '' });

  // Customer Form State
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' });

  const t = translations[lang];

  useEffect(() => localStorage.setItem('app_lang', lang), [lang]);
  useEffect(() => localStorage.setItem('groq_api_key', apiKey), [apiKey]);
  useEffect(() => localStorage.setItem('delivery_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('delivery_merchants', JSON.stringify(merchants)), [merchants]);
  useEffect(() => localStorage.setItem('delivery_customers', JSON.stringify(customers)), [customers]);
  useEffect(() => localStorage.setItem('delivery_drivers', JSON.stringify(drivers)), [drivers]);

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch (err) {
      alert('Failed to read clipboard.');
    }
  };

  // Enhanced AI Parser with Multi-Order / Multi-Recipient Logic
  const extractOrderInfo = async () => {
    if (!apiKey.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال مفتاح Groq API من تبويب الإعدادات أولاً.' : 'Please enter your Groq API key in Settings.');
      setActiveTab('settings');
      return;
    }
    if (!rawText.trim()) return alert(lang === 'ar' ? 'يرجى إدخال نص الطلب.' : 'Please enter order text.');

    setLoading(true);
    setExtractedOrders([]);
    setCustomerMatches([]);
    setDiscrepancyWarning(false);

    const knownStores = merchants.map(m => m.name).join(', ');
    const knownCustomers = customers.map(c => `${c.name} (${c.phone})`).join(', ');

    const systemPrompt = `You are an elite Egyptian dialect (عامية مصرية) Order Extraction Agent for delivery operations.

### KNOWN DATABASE REPOSITORY:
- Known Stores: [${knownStores || 'None'}]
- Known Customers: [${knownCustomers || 'None'}]

### CRITICAL RULES:
1. MULTI-RECIPIENT / SPLIT ORDERS:
   - If a message contains multiple drop-off points, distinct recipients, or split deliveries (e.g., "واحدة لمحمود في سموحة والتانية لأخته منى في كامب شيزار"), split them into separate order objects in the "orders" array.
   - Calculate math carefully: If total price is 1150 and delivery is 40 per address, calculate individual COD payments properly based on instructions (e.g. Mahmoud pays 600 + 40 delivery = 640).
2. STORE VS CUSTOMER RECOGNITION:
   - Correctly identify the store (e.g., "من كارفور") and assign it to each sub-order.
3. NOTES EXTRACTION:
   - Extract extra operational notes (e.g., gate codes, special instructions) into "notes".

### STRICT JSON SCHEMA:
{
  "is_cancelled": false,
  "orders": [
    {
      "store": "Store name",
      "customer": "Customer name",
      "phone": "Phone number",
      "address": "Full delivery address",
      "cod": "Numeric amount to collect",
      "item": "Item description",
      "notes": "Specific notes for this delivery"
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
          temperature: 0.0
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Extraction Failed');
      
      const parsed = JSON.parse(data.choices[0].message.content);

      if (parsed.is_cancelled) {
        alert(t.cancelAlert);
        setLoading(false);
        return;
      }

      const extractedList = parsed.orders || [];
      setExtractedOrders(extractedList);

      // Perform initial check on first sub-order
      if (extractedList.length > 0) {
        checkCustomerMatches(extractedList[0]);
      }

    } catch (err) {
      alert('Parsing Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkCustomerMatches = (orderObj) => {
    if (orderObj?.customer && orderObj.customer !== t.unspecified) {
      const queryName = orderObj.customer.trim().toLowerCase();
      const matches = customers.filter(c => c.name.toLowerCase().includes(queryName) || queryName.includes(c.name.toLowerCase()));
      
      if (matches.length > 1) {
        setCustomerMatches(matches);
      } else if (matches.length === 1) {
        const existing = matches[0];
        if ((orderObj.phone && orderObj.phone !== existing.phone) || (orderObj.address && orderObj.address !== existing.address)) {
          setDiscrepancyWarning(true);
        } else {
          setDiscrepancyWarning(false);
        }
      } else {
        setCustomerMatches([]);
        setDiscrepancyWarning(false);
      }
    }
  };

  const handleSelectMatchedCustomer = (cust, subIndex) => {
    setExtractedOrders(prev => prev.map((ord, idx) => idx === subIndex ? {
      ...ord,
      customer: cust.name,
      phone: cust.phone || ord.phone,
      address: cust.address || ord.address
    } : ord));
    setCustomerMatches([]);
    setDiscrepancyWarning(false);
  };

  const handleConfirmOrder = () => {
    if (extractedOrders.length === 0) return;

    const newCreatedOrders = extractedOrders.map(ord => ({
      id: Date.now() + Math.random(),
      ...ord,
      driver: selectedDriver || t.unspecified,
      status: 'مؤكد',
      date: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }));

    setOrders([...newCreatedOrders, ...orders]);

    // Save/Update Stores and Customers
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
          return prev;
        });
      }
    });

    setRawText('');
    setExtractedOrders([]);
    setSelectedDriver('');
    setCustomerMatches([]);
    setDiscrepancyWarning(false);
    setActiveTab('orders');
  };

  const copyMissingInfoMessage = (ord) => {
    const missingFields = [];
    if (!ord.phone || ord.phone === t.unspecified) missingFields.push(lang === 'ar' ? 'رقم الهاتف' : 'phone number');
    if (!ord.address || ord.address === t.unspecified) missingFields.push(lang === 'ar' ? 'العنوان بالتفصيل' : 'detailed address');
    
    const msg = lang === 'ar' 
      ? `مرحباً، برجاء تزويدنا بالبيانات الناقصة للطلب الخاصة بـ (${ord.customer || 'العميل'}) (${missingFields.join(' و ')}) لضمان سرعة التوصيل.`
      : `Hello, please provide the missing information (${missingFields.join(' and ')}) for ${ord.customer || 'customer'} to ensure prompt delivery.`;
    
    navigator.clipboard.writeText(msg);
    alert(t.copiedMsg);
  };

  const totalCodSum = orders.reduce((acc, o) => acc + (parseFloat(o.cod) || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'تم التسليم' && o.status !== 'ملغي').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'تم التسليم').length;

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
          <button style={styles.langBtn} onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            {lang === 'ar' ? '🇬🇧 English' : '🇪🇬 العربية'}
          </button>
          <div style={{ ...styles.badge, backgroundColor: apiKey ? '#065f46' : '#991b1b' }}>
            {apiKey ? t.groqConnected : t.groqMissing}
          </div>
        </div>
      </header>

      {/* KPI Cards */}
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

      {/* Nav Tabs */}
      <nav style={styles.nav}>
        <button style={activeTab === 'new_order' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('new_order')}>{t.navNewOrder}</button>
        <button style={activeTab === 'orders' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('orders')}>{t.navOrders} ({orders.length})</button>
        <button style={activeTab === 'drivers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('drivers')}>{t.navDrivers} ({drivers.length})</button>
        <button style={activeTab === 'merchants' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('merchants')}>{t.navMerchants} ({merchants.length})</button>
        <button style={activeTab === 'customers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('customers')}>{t.navCustomers} ({customers.length})</button>
        <button style={activeTab === 'settings' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('settings')}>{t.navSettings}</button>
      </nav>

      <main style={styles.main}>

        {/* TAB 1: NEW ORDER */}
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

            {/* Extracted Orders Display */}
            {extractedOrders.length > 0 && (
              <div style={styles.extractedBox}>
                <h3 style={{ marginTop: 0 }}>{t.reviewTitle}</h3>

                {extractedOrders.length > 1 && (
                  <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>{t.multiOrderNotice}</p>
                )}

                {extractedOrders.map((ord, idx) => (
                  <div key={idx} style={{ border: '1px solid #334155', padding: '12px', borderRadius: '8px', marginBottom: '12px', backgroundColor: '#1e293b' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#facc15' }}>📦 {t.customer}: {ord.customer}</h4>
                    
                    {(!ord.phone || ord.phone === t.unspecified || !ord.address || ord.address === t.unspecified) && (
                      <div style={styles.missingBox} onClick={() => copyMissingInfoMessage(ord)}>
                        <span>{t.missingInfoAlert}</span>
                        <button style={styles.copyMsgBtn}>{t.copyMissingMsg}</button>
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

                {/* Disambiguation Box */}
                {customerMatches.length > 0 && (
                  <div style={styles.warningBox}>
                    <p style={{ fontWeight: 'bold', color: '#facc15', margin: '0 0 10px 0' }}>{t.matchPrompt}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {customerMatches.map(c => (
                        <button key={c.id} onClick={() => handleSelectMatchedCustomer(c, activeSubIndex)} style={styles.matchOptionBtn}>
                          👤 <strong>{c.name}</strong> - 📞 {c.phone} - 📍 {c.address}
                        </button>
                      ))}
                      <button onClick={() => setCustomerMatches([])} style={styles.newCustOptionBtn}>{t.newCustomerOption}</button>
                    </div>
                  </div>
                )}

                {discrepancyWarning && customerMatches.length === 0 && (
                  <div style={styles.warningBox}>
                    <p style={{ color: '#f87171', margin: 0, fontWeight: 'bold' }}>{t.discrepancyAlert}</p>
                  </div>
                )}

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

            {filteredOrders.length === 0 ? <p style={styles.empty}>No orders found.</p> : filteredOrders.map(order => (
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
                {order.notes && (
                  <p style={{ ...styles.p, color: '#facc15', backgroundColor: '#332900', padding: '6px', borderRadius: '6px' }}>
                    <strong>📌 {t.notes}:</strong> {order.notes}
                  </p>
                )}
                <p style={styles.p}><strong>{t.cod}:</strong> <span style={{ color: '#10b981', fontWeight: 'bold' }}>{order.cod} {t.currency}</span> | <strong>Driver:</strong> {order.driver}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DRIVERS */}
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

        {/* TAB 4: MERCHANTS */}
        {activeTab === 'merchants' && (
          <div>
            <div style={styles.card}>
              <h3 style={{ marginTop: 0 }}>{t.saveMerchant}</h3>
              <input
                type="text"
                placeholder={t.merchantName}
                value={merchantForm.name}
                onChange={(e) => setMerchantForm({ ...merchantForm, name: e.target.value })}
                style={styles.inputMargin}
              />
              <input
                type="text"
                placeholder={t.merchantPhone}
                value={merchantForm.phone}
                onChange={(e) => setMerchantForm({ ...merchantForm, phone: e.target.value })}
                style={styles.inputMargin}
              />
              <input
                type="text"
                placeholder={t.merchantAddress}
                value={merchantForm.address}
                onChange={(e) => setMerchantForm({ ...merchantForm, address: e.target.value })}
                style={styles.inputMargin}
              />
              <textarea
                rows={3}
                placeholder={t.merchantNotes}
                value={merchantForm.notes}
                onChange={(e) => setMerchantForm({ ...merchantForm, notes: e.target.value })}
                style={styles.textareaMargin}
              />
              <button onClick={() => {
                if (!merchantForm.name.trim()) return alert('Merchant name required');
                if (merchantForm.id) {
                  setMerchants(merchants.map(m => m.id === merchantForm.id ? merchantForm : m));
                } else {
                  setMerchants([{ id: Date.now(), ...merchantForm, totalOrders: 0 }, ...merchants]);
                }
                setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
              }} style={styles.btnSuccess}>{t.saveBtn}</button>
            </div>

            <div style={styles.grid2}>
              {merchants.map(m => (
                <div key={m.id} style={styles.card}>
                  <div style={styles.rowBetween}>
                    <h3 style={{ margin: 0 }}>🏪 {m.name}</h3>
                    <button onClick={() => setMerchantForm(m)} style={styles.btnEdit}>{t.editBtn}</button>
                  </div>
                  <p style={{ color: '#38bdf8', margin: '6px 0' }}>📞 {m.phone || 'N/A'}</p>
                  <p style={{ color: '#94a3b8', margin: '6px 0' }}>📍 {m.address || 'N/A'}</p>
                  {m.notes && <p style={{ color: '#facc15', margin: '6px 0' }}>💬 {m.notes}</p>}
                  <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '0.85rem' }}>Orders: <strong>{m.totalOrders || 0}</strong></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS */}
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
  textareaMargin: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', marginBottom: '10px' },
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
  warningBox: { backgroundColor: '#422006', border: '1px solid #ca8a04', padding: '15px', borderRadius: '10px', marginTop: '15px' },
  matchOptionBtn: { width: '100%', padding: '10px', backgroundColor: '#713f12', color: '#fff', border: '1px solid #ca8a04', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' },
  newCustOptionBtn: { width: '100%', padding: '10px', backgroundColor: '#0369a1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  missingBox: { backgroundColor: '#7f1d1d', border: '1px solid #dc2626', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem', color: '#fca5a5' },
  copyMsgBtn: { padding: '4px 8px', backgroundColor: '#991b1b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  rowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  tagStore: { backgroundColor: '#0369a1', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem' },
  p: { margin: '6px 0', color: '#cbd5e1' },
  hr: { border: 'none', borderTop: '1px solid #334155', margin: '10px 0' },
  empty: { color: '#64748b', textAlign: 'center', marginTop: '30px' }
};
