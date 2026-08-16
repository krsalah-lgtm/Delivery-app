import React, { useState, useEffect } from 'react';

export default function App() {
  // Global State & Persistence
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [activeTab, setActiveTab] = useState('new_order');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [driver, setDriver] = useState('');

  // Local Storage Databases
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('delivery_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [merchants, setMerchants] = useState(() => {
    const saved = localStorage.getItem('delivery_merchants');
    return saved ? JSON.parse(saved) : [];
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('delivery_customers');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('groq_api_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('delivery_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('delivery_merchants', JSON.stringify(merchants));
  }, [merchants]);

  useEffect(() => {
    localStorage.setItem('delivery_customers', JSON.stringify(customers));
  }, [customers]);

  // AI Order Parser Function
  const extractOrderInfo = async () => {
    if (!apiKey.trim()) {
      alert('يرجى إدخال مفتاح Groq API في تبويب الإعدادات أولاً.');
      setActiveTab('settings');
      return;
    }

    if (!rawText.trim()) {
      alert('يرجى إدخال نص الطلب.');
      return;
    }

    setLoading(true);
    setExtractedData(null);

    const systemPrompt = `You are a specialized Egyptian delivery order information extraction system.
Parse the user's Egyptian Arabic message and extract the following entity fields:
- store: Store or merchant name (اسم المحل/المتجر).
- customer: Customer full name (اسم العميل).
- phone: Egyptian phone number (رقم الهاتف - standard 11 digits starting with 01).
- address: Full street, neighborhood, building, floor, apartment detail (العنوان التفصيلي).
- cod: Exact numeric money amount to collect upon delivery in EGP (مبلغ التحصيل فقط).
- item: Description of items or packages being delivered (الصنف/الوصف).

Extraction Rules:
1. Ignore floor (دور), apartment (شقة), or building (عمارة/رقم) numbers when determining "cod".
2. Format output strictly as JSON. No markdown blocks, no commentary.
Schema: {"store":"", "customer":"", "phone":"", "address":"", "cod":"", "item":""}`;

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
      if (!response.ok) throw new Error(data.error?.message || 'فشل في استخراج البيانات');

      const parsed = JSON.parse(data.choices[0].message.content);
      setExtractedData(parsed);
    } catch (err) {
      alert('خطأ أثناء معالجة الطلب: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Confirm Order & Update Databases
  const handleConfirmOrder = () => {
    if (!extractedData) return;

    const newOrder = {
      id: Date.now(),
      ...extractedData,
      driver: driver || 'غير محدد',
      date: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      status: 'قيد التوصيل'
    };

    // Save Order
    setOrders([newOrder, ...orders]);

    // Save/Update Merchant Database
    if (extractedData.store && extractedData.store !== 'غير محدد') {
      setMerchants(prev => {
        const exists = prev.find(m => m.name.toLowerCase() === extractedData.store.toLowerCase());
        if (!exists) {
          return [{ id: Date.now(), name: extractedData.store, totalOrders: 1 }, ...prev];
        }
        return prev.map(m => m.name.toLowerCase() === extractedData.store.toLowerCase() ? { ...m, totalOrders: m.totalOrders + 1 } : m);
      });
    }

    // Save/Update Customer Database
    if (extractedData.customer && extractedData.customer !== 'غير محدد') {
      setCustomers(prev => {
        const exists = prev.find(c => c.phone === extractedData.phone || c.name === extractedData.customer);
        if (!exists) {
          return [{ id: Date.now(), name: extractedData.customer, phone: extractedData.phone, address: extractedData.address }, ...prev];
        }
        return prev;
      });
    }

    // Reset Form
    setRawText('');
    setExtractedData(null);
    setDriver('');
    setActiveTab('orders');
  };

  return (
    <div style={styles.appContainer}>
      {/* Top Header & Branding */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.logoTitle}>🚚 Egyptian Express Log</h1>
          <p style={styles.logoSubtitle}>نظام إدارة التوصيل والذكاء الاصطناعي</p>
        </div>
        <div style={styles.statusBadge}>
          {apiKey ? '🟢 الذكاء متصل' : '🔴 المفتاح مفقود'}
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav style={styles.navBar}>
        <button style={activeTab === 'new_order' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('new_order')}>
          ➕ طلب جديد
        </button>
        <button style={activeTab === 'orders' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('orders')}>
          📋 السجل ({orders.length})
        </button>
        <button style={activeTab === 'merchants' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('merchants')}>
          🏪 التجار ({merchants.length})
        </button>
        <button style={activeTab === 'customers' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('customers')}>
          👥 العملاء ({customers.length})
        </button>
        <button style={activeTab === 'settings' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('settings')}>
          ⚙️ الإعدادات
        </button>
      </nav>

      {/* Dynamic Tab Views */}
      <main style={styles.mainContent}>

        {/* Tab 1: New Order Extraction */}
        {activeTab === 'new_order' && (
          <div style={styles.card}>
            <h2 style={styles.cardHeader}>استخراج بيانات الطلب بواسطة Groq AI</h2>
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="ألصق نص أوردر الواتساب هنا..."
              style={styles.textarea}
            />
            <button onClick={extractOrderInfo} disabled={loading} style={styles.primaryBtn}>
              {loading ? 'جاري تحليل النص...' : '⚡ استخراج البيانات بالذكاء الاصطناعي'}
            </button>

            {extractedData && (
              <div style={styles.extractedBox}>
                <h3 style={{ marginTop: 0, color: '#1e293b' }}>البيانات المستخرجة (مراجعة):</h3>
                <div style={styles.grid}>
                  <div><strong>المتجر:</strong> {extractedData.store}</div>
                  <div><strong>العميل:</strong> {extractedData.customer}</div>
                  <div><strong>الهاتف:</strong> {extractedData.phone}</div>
                  <div><strong>المبلغ (COD):</strong> {extractedData.cod} ج.م</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong>العنوان:</strong> {extractedData.address}</div>
                  <div style={{ gridColumn: '1 / -1' }}><strong>الصنف:</strong> {extractedData.item}</div>
                </div>

                <div style={{ marginTop: '15px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>تعيين طيار التوصيل:</label>
                  <select value={driver} onChange={(e) => setDriver(e.target.value)} style={styles.input}>
                    <option value="">-- اختر طيار --</option>
                    <option value="أحمد">أحمد</option>
                    <option value="محمود">محمود</option>
                    <option value="مصطفى">مصطفى</option>
                  </select>
                </div>

                <button onClick={handleConfirmOrder} style={styles.successBtn}>
                  ✅ تأكيد وحفظ الطلب في السجل
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders Log */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={styles.pageTitle}>سجل الطلبات الحالية</h2>
            {orders.length === 0 ? <p style={styles.emptyText}>لا توجد طلبات مسجلة حتى الآن.</p> : orders.map(order => (
              <div key={order.id} style={styles.card}>
                <div style={styles.cardRow}>
                  <span style={styles.storeBadge}>{order.store}</span>
                  <span style={styles.timeBadge}>{order.date}</span>
                </div>
                <p><strong>العميل:</strong> {order.customer} ({order.phone})</p>
                <p><strong>العنوان:</strong> {order.address}</p>
                <p><strong>المبلغ المطلوب (COD):</strong> <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{order.cod} ج.م</span></p>
                <p><strong>الطيار:</strong> {order.driver}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Merchants Database */}
        {activeTab === 'merchants' && (
          <div>
            <h2 style={styles.pageTitle}>سجل التجار والمحلات</h2>
            {merchants.length === 0 ? <p style={styles.emptyText}>سيتم حفظ التجار تلقائياً فور إضافة طلباتهم.</p> : (
              <div style={styles.grid}>
                {merchants.map(m => (
                  <div key={m.id} style={styles.card}>
                    <h3 style={{ margin: 0, color: '#0f172a' }}>🏪 {m.name}</h3>
                    <p style={{ margin: '10px 0 0 0', color: '#64748b' }}>إجمالي الطلبات: <strong>{m.totalOrders}</strong></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Customers Database */}
        {activeTab === 'customers' && (
          <div>
            <h2 style={styles.pageTitle}>دليل العملاء المسجلين</h2>
            {customers.length === 0 ? <p style={styles.emptyText}>سيتم حفظ بيانات العملاء تلقائياً هنا.</p> : (
              <div style={styles.grid}>
                {customers.map(c => (
                  <div key={c.id} style={styles.card}>
                    <h3 style={{ margin: 0, color: '#0f172a' }}>👤 {c.name}</h3>
                    <p style={{ margin: '5px 0', color: '#0284c7' }}>📞 {c.phone}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>📍 {c.address}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && (
          <div style={styles.card}>
            <h2>إعدادات الربط والنظام</h2>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>مفتاح Groq API Key:</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_..."
              style={styles.input}
            />
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '5px' }}>
              يمكنك الحصول عليه مجاناً من <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer">Groq Console</a>.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}

// Styling Object
const styles = {
  appContainer: { maxWidth: '750px', margin: '0 auto', padding: '15px', fontFamily: 'system-ui, sans-serif', direction: 'rtl', backgroundColor: '#f8fafc', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', color: '#fff', padding: '15px 20px', borderRadius: '12px' },
  logoTitle: { margin: 0, fontSize: '1.3rem' },
  logoSubtitle: { margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' },
  statusBadge: { backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem' },
  navBar: { display: 'flex', gap: '8px', marginTop: '15px', overflowX: 'auto', paddingBottom: '5px' },
  tab: { flex: 1, padding: '10px 12px', border: '1px solid #cbd5e1', backgroundColor: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569', minWidth: '90px' },
  activeTab: { flex: 1, padding: '10px 12px', border: 'none', backgroundColor: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#fff', minWidth: '90px' },
  mainContent: { marginTop: '15px' },
  card: { backgroundColor: '#fff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  cardHeader: { marginTop: 0, fontSize: '1.1rem', color: '#1e293b' },
  textarea: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.95rem' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', marginTop: '5px' },
  primaryBtn: { width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  successBtn: { width: '100%', padding: '12px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' },
  extractedBox: { backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: '15px', borderRadius: '10px', marginTop: '15px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  pageTitle: { fontSize: '1.2rem', color: '#0f172a', marginBottom: '15px' },
  cardRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  storeBadge: { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.85rem' },
  timeBadge: { color: '#94a3b8', fontSize: '0.85rem' },
  emptyText: { color: '#64748b', textAlign: 'center', marginTop: '30px' }
};
