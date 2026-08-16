import React, { useState, useEffect } from 'react';

export default function App() {
  // Navigation & Settings
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [activeTab, setActiveTab] = useState('new_order');

  // Core Persistence Databases
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_orders') || '[]'));
  const [merchants, setMerchants] = useState(() => JSON.parse(localStorage.getItem('delivery_merchants') || '[]'));
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('delivery_customers') || '[]'));
  const [drivers, setDrivers] = useState(() => JSON.parse(localStorage.getItem('delivery_drivers') || '["أحمد", "محمود", "مصطفى"]'));

  // Form States
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [newDriverName, setNewDriverName] = useState('');

  // Editing Modals State
  const [editingMerchant, setEditingMerchant] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [newMerchantName, setNewMerchantName] = useState('');
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '' });

  // Sync LocalStorage
  useEffect(() => localStorage.setItem('groq_api_key', apiKey), [apiKey]);
  useEffect(() => localStorage.setItem('delivery_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('delivery_merchants', JSON.stringify(merchants)), [merchants]);
  useEffect(() => localStorage.setItem('delivery_customers', JSON.stringify(customers)), [customers]);
  useEffect(() => localStorage.setItem('delivery_drivers', JSON.stringify(drivers)), [drivers]);

  // Groq AI Parser with Smart Auto-Detection Context
  const extractOrderInfo = async () => {
    if (!apiKey.trim()) {
      alert('يرجى إدخال مفتاح Groq API من تبويب الإعدادات أولاً.');
      setActiveTab('settings');
      return;
    }
    if (!rawText.trim()) return alert('يرجى إدخال نص الطلب.');

    setLoading(true);
    setExtractedData(null);

    const knownStores = merchants.map(m => m.name).join(', ');
    const knownCustomers = customers.map(c => `${c.name} (${c.phone})`).join(', ');

    const systemPrompt = `You are a specialized Egyptian delivery parsing AI.
Extract order details from raw Egyptian text.
Known Merchants in Database: [${knownStores || 'None'}]
Known Customers in Database: [${knownCustomers || 'None'}]

Rules:
1. If text mentions a partial store name (e.g. "العزبي"), map it to the exact known merchant name if matched.
2. Separate cash to collect (COD) from building/floor numbers.
3. Return JSON ONLY with schema:
{"store": "", "customer": "", "phone": "", "address": "", "cod": "", "item": ""}`;

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
      if (!response.ok) throw new Error(data.error?.message || 'فشل الاستخراج');
      const parsed = JSON.parse(data.choices[0].message.content);
      setExtractedData(parsed);
    } catch (err) {
      alert('خطأ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add Order & Update Database Records
  const handleConfirmOrder = () => {
    if (!extractedData) return;

    const newOrder = {
      id: Date.now(),
      ...extractedData,
      driver: selectedDriver || 'غير محدد',
      status: 'مؤكد',
      date: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setOrders([newOrder, ...orders]);

    // Auto-update Merchants
    if (extractedData.store && extractedData.store !== 'غير محدد') {
      setMerchants(prev => {
        const match = prev.find(m => m.name.toLowerCase() === extractedData.store.toLowerCase());
        if (!match) return [{ id: Date.now(), name: extractedData.store, totalOrders: 1 }, ...prev];
        return prev.map(m => m.name.toLowerCase() === extractedData.store.toLowerCase() ? { ...m, totalOrders: m.totalOrders + 1 } : m);
      });
    }

    // Auto-update Customers
    if (extractedData.customer && extractedData.customer !== 'غير محدد') {
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

  // Status Handler
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Driver Actions
  const addDriver = () => {
    if (!newDriverName.trim()) return;
    if (!drivers.includes(newDriverName.trim())) setDrivers([...drivers, newDriverName.trim()]);
    setNewDriverName('');
  };
  const removeDriver = (name) => setDrivers(drivers.filter(d => d !== name));

  // Merchant Actions
  const handleSaveMerchant = () => {
    if (!newMerchantName.trim()) return;
    if (editingMerchant) {
      setMerchants(merchants.map(m => m.id === editingMerchant.id ? { ...m, name: newMerchantName } : m));
      setEditingMerchant(null);
    } else {
      setMerchants([{ id: Date.now(), name: newMerchantName, totalOrders: 0 }, ...merchants]);
    }
    setNewMerchantName('');
  };

  // Customer Actions
  const handleSaveCustomer = () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) return alert('الاسم ورقم الهاتف مطلوبان');
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...newCustomer } : c));
      setEditingCustomer(null);
    } else {
      setCustomers([{ id: Date.now(), ...newCustomer }, ...customers]);
    }
    setNewCustomer({ name: '', phone: '', address: '' });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.appTitle}>⚡ Express Delivery Operations</h1>
          <p style={styles.appSubtitle}>نظام الذكاء الاصطناعي وإدارة التوصيل المتقدم</p>
        </div>
        <div style={{ ...styles.badge, backgroundColor: apiKey ? '#065f46' : '#991b1b' }}>
          {apiKey ? '🟢 Groq متصل' : '🔴 المفتاح مفقود'}
        </div>
      </header>

      {/* Navigation */}
      <nav style={styles.nav}>
        <button style={activeTab === 'new_order' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('new_order')}>➕ طلب جديد</button>
        <button style={activeTab === 'orders' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('orders')}>📋 الطلبات ({orders.length})</button>
        <button style={activeTab === 'drivers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('drivers')}>🛵 الطيارين ({drivers.length})</button>
        <button style={activeTab === 'merchants' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('merchants')}>🏪 التجار ({merchants.length})</button>
        <button style={activeTab === 'customers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('customers')}>👥 العملاء ({customers.length})</button>
        <button style={activeTab === 'settings' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('settings')}>⚙️ الإعدادات</button>
      </nav>

      {/* Main Container */}
      <main style={styles.main}>

        {/* TAB 1: NEW ORDER */}
        {activeTab === 'new_order' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>استخراج بيانات الطلب بواسطة AI</h2>
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="ألصق نص الطلب هنا (مثال: أوردر من العزبي لمحمد...)"
              style={styles.textarea}
            />
            <button onClick={extractOrderInfo} disabled={loading} style={styles.btnPrimary}>
              {loading ? 'جاري التحليل...' : '⚡ استخراج البيانات بالذكاء الاصطناعي'}
            </button>

            {extractedData && (
              <div style={styles.extractedBox}>
                <h3>مراجعة البيانات المستخرجة:</h3>
                <div style={styles.grid2}>
                  <div><strong>المتجر:</strong> {extractedData.store}</div>
                  <div><strong>العميل:</strong> {extractedData.customer}</div>
                  <div><strong>رقم الهاتف:</strong> {extractedData.phone}</div>
                  <div><strong>المبلغ (COD):</strong> {extractedData.cod} ج.م</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong>العنوان:</strong> {extractedData.address}</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong>الصنف:</strong> {extractedData.item}</div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <label style={styles.label}>اختيار طيار التوصيل:</label>
                  <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} style={styles.input}>
                    <option value="">-- اختر طيار --</option>
                    {drivers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </select>
                </div>

                <button onClick={handleConfirmOrder} style={styles.btnSuccess}>✅ تأكيد وحفظ الطلب</button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ORDERS LOG */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={styles.pageTitle}>سجل إدارة الطلبات</h2>
            {orders.length === 0 ? <p style={styles.empty}>لا توجد طلبات مسجلة.</p> : orders.map(order => (
              <div key={order.id} style={styles.card}>
                <div style={styles.rowBetween}>
                  <span style={styles.tagStore}>{order.store}</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={getStatusStyle(order.status)}
                  >
                    <option value="مؤكد">مؤكد</option>
                    <option value="جاري التوصيل">جاري التوصيل</option>
                    <option value="تم التسليم">تم التسليم</option>
                    <option value="متأخر">متأخر</option>
                    <option value="ملغي">ملغي</option>
                  </select>
                </div>
                <p style={styles.p}><strong>العميل:</strong> {order.customer} ({order.phone})</p>
                <p style={styles.p}><strong>العنوان:</strong> {order.address}</p>
                <p style={styles.p}><strong>المبلغ (COD):</strong> <span style={{ color: '#10b981', fontWeight: 'bold' }}>{order.cod} ج.م</span> | <strong>الطيار:</strong> {order.driver}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DRIVERS & CASH RECONCILIATION */}
        {activeTab === 'drivers' && (
          <div>
            <h2 style={styles.pageTitle}>إدارة الطيارين وتحصيل الأموال</h2>
            
            <div style={styles.card}>
              <h3 style={{ marginTop: 0 }}>إضافة طيار جديد</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="اسم الطيار..."
                  value={newDriverName}
                  onChange={(e) => setNewDriverName(e.target.value)}
                  style={styles.input}
                />
                <button onClick={addDriver} style={styles.btnPrimaryCompact}>إضافة</button>
              </div>
            </div>

            <div style={styles.grid2}>
              {drivers.map((driverName, idx) => {
                const driverOrders = orders.filter(o => o.driver === driverName);
                const totalCash = driverOrders.reduce((sum, o) => sum + (parseFloat(o.cod) || 0), 0);
                const deliveredCash = driverOrders.filter(o => o.status === 'تم التسليم').reduce((sum, o) => sum + (parseFloat(o.cod) || 0), 0);

                return (
                  <div key={idx} style={styles.card}>
                    <div style={styles.rowBetween}>
                      <h3 style={{ margin: 0 }}>🛵 {driverName}</h3>
                      <button onClick={() => removeDriver(driverName)} style={styles.btnDelete}>حذف</button>
                    </div>
                    <hr style={styles.hr} />
                    <p style={styles.p}>إجمالي الرحلات: <strong>{driverOrders.length}</strong></p>
                    <p style={styles.p}>إجمالي النقدية المسندة: <strong>{totalCash} ج.م</strong></p>
                    <p style={styles.p}>النقدية الواجب تسليمها (تم التوصيل): <strong style={{ color: '#10b981' }}>{deliveredCash} ج.م</strong></p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: MERCHANTS */}
        {activeTab === 'merchants' && (
          <div>
            <h2 style={styles.pageTitle}>سجل التجار والمحلات</h2>
            <div style={styles.card}>
              <h3>{editingMerchant ? 'تعديل بيانات التاجر' : 'إضافة تاجر يدويًا'}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="اسم التاجر/المحل..."
                  value={newMerchantName}
                  onChange={(e) => setNewMerchantName(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleSaveMerchant} style={styles.btnPrimaryCompact}>
                  {editingMerchant ? 'حفظ التعديل' : 'إضافة'}
                </button>
              </div>
            </div>

            <div style={styles.grid2}>
              {merchants.map(m => (
                <div key={m.id} style={styles.card}>
                  <div style={styles.rowBetween}>
                    <h3 style={{ margin: 0 }}>🏪 {m.name}</h3>
                    <button onClick={() => { setEditingMerchant(m); setNewMerchantName(m.name); }} style={styles.btnEdit}>تعديل</button>
                  </div>
                  <p style={{ color: '#94a3b8', margin: '10px 0 0 0' }}>إجمالي الطلبات: <strong>{m.totalOrders || 0}</strong></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div>
            <h2 style={styles.pageTitle}>دليل العملاء المسجلين</h2>
            <div style={styles.card}>
              <h3>{editingCustomer ? 'تعديل بيانات العميل' : 'إضافة عميل يدويًا'}</h3>
              <input
                type="text"
                placeholder="اسم العميل..."
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                style={styles.inputMargin}
              />
              <input
                type="text"
                placeholder="رقم الهاتف..."
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                style={styles.inputMargin}
              />
              <input
                type="text"
                placeholder="العنوان التفصيلي..."
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                style={styles.inputMargin}
              />
              <button onClick={handleSaveCustomer} style={styles.btnSuccess}>
                {editingCustomer ? 'حفظ التعديل' : 'حفظ العميل'}
              </button>
            </div>

            <div style={styles.grid2}>
              {customers.map(c => (
                <div key={c.id} style={styles.card}>
                  <div style={styles.rowBetween}>
                    <h3 style={{ margin: 0 }}>👤 {c.name}</h3>
                    <button onClick={() => { setEditingCustomer(c); setNewCustomer(c); }} style={styles.btnEdit}>تعديل</button>
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
            <h2>إعدادات النظام</h2>
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

// Dynamic Status Badge Colors
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

// UI Theme Styles
const styles = {
  container: { maxWidth: '850px', margin: '0 auto', padding: '15px', fontFamily: 'system-ui, sans-serif', direction: 'rtl', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155' },
  appTitle: { margin: 0, fontSize: '1.3rem', color: '#38bdf8' },
  appSubtitle: { margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' },
  badge: { padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' },
  nav: { display: 'flex', gap: '8px', marginTop: '15px', overflowX: 'auto', paddingBottom: '6px' },
  tab: { flex: 1, padding: '10px', border: '1px solid #334155', backgroundColor: '#1e293b', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#94a3b8', minWidth: '95px' },
  activeTab: { flex: 1, padding: '10px', border: 'none', backgroundColor: '#0284c7', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#fff', minWidth: '95px' },
  main: { marginTop: '15px' },
  card: { backgroundColor: '#1e293b', padding: '18px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '15px' },
  cardTitle: { marginTop: 0, fontSize: '1.1rem', color: '#f8fafc' },
  textarea: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', fontSize: '0.95rem' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' },
  inputMargin: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', marginBottom: '10px' },
  label: { display: 'block', fontWeight: 'bold', marginBottom: '6px', color: '#cbd5e1' },
  btnPrimary: { width: '100%', padding: '12px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  btnPrimaryCompact: { padding: '10px 20px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  btnSuccess: { width: '100%', padding: '12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '12px' },
  btnDelete: { backgroundColor: '#991b1b', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
  btnEdit: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' },
  extractedBox: { backgroundColor: '#0f172a', border: '1px solid #334155', padding: '15px', borderRadius: '10px', marginTop: '15px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  pageTitle: { fontSize: '1.2rem', color: '#f8fafc', marginBottom: '15px' },
  rowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  tagStore: { backgroundColor: '#0369a1', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem' },
  p: { margin: '6px 0', color: '#cbd5e1' },
  hr: { border: 'none', borderTop: '1px solid #334155', margin: '10px 0' },
  empty: { color: '#64748b', textAlign: 'center', marginTop: '30px' }
};
