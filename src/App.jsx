import React, { useState, useEffect } from 'react';

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [driver, setDriver] = useState('');
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('delivery_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('groq_api_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('delivery_orders', JSON.stringify(orders));
  }, [orders]);

  const extractOrderInfo = async () => {
    if (!apiKey) {
      alert('Please enter your Groq API key first (starts with gsk_)');
      setShowKeyInput(true);
      return;
    }

    if (!rawText.trim()) {
      alert('Please enter the order message text.');
      return;
    }

    setLoading(true);
    setExtractedData(null);

    const prompt = `You are an expert delivery order extractor for Egyptian localized text. 
Extract the following fields from the Egyptian Arabic delivery text provided by the user:
- store (اسم المتجر)
- customer (اسم العميل)
- phone (رقم الهاتف)
- address (العنوان التفصيلي)
- cod (المبلغ المطلوب تحصيله بالجنيه - Cash on Delivery amount only. Do NOT confuse apartment, floor, or building numbers with the COD amount)
- item (الوصف أو الصنف)

Return strict JSON only matching this schema without markdown code blocks:
{
  "store": "",
  "customer": "",
  "phone": "",
  "address": "",
  "cod": "",
  "item": ""
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
            { role: 'system', content: prompt },
            { role: 'user', content: rawText }
          ],
          response_format: { type: 'json_object' }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to extract data');
      }

      const parsedContent = JSON.parse(data.choices[0].message.content);
      setExtractedData(parsedContent);
    } catch (err) {
      alert('Error parsing order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = () => {
    if (!extractedData) return;
    const newOrder = {
      id: Date.now(),
      ...extractedData,
      driver: driver || 'غير محدد',
      date: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };
    setOrders([newOrder, ...orders]);
    setRawText('');
    setExtractedData(null);
    setDriver('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', direction: 'rtl' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2e7d32', color: '#fff', padding: '10px 15px', borderRadius: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>تطبيق إدارة الدليفري (Groq AI)</h2>
        <button onClick={() => setShowKeyInput(!showKeyInput)} style={{ background: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          🔑 مفتاح API
        </button>
      </header>

      {showKeyInput && (
        <div style={{ background: '#fff3cd', border: '1px solid #ffeeba', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Groq API Key (يبدأ بـ gsk_):</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="gsk_..."
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
          />
          <p style={{ fontSize: '0.85rem', margin: 0, color: '#856404' }}>
            يمكنك الحصول عليه مجاناً من: <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer">console.groq.com/keys</a>
          </p>
        </div>
      )}

      <main style={{ marginTop: '20px' }}>
        <textarea
          rows={5}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="ألصق رسالة الطلب هنا (مثال: عندي أوردر من محل أبو أحمد لمحمد سامي...)"
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <button
          onClick={extractOrderInfo}
          disabled={loading}
          style={{ width: '100%', marginTop: '10px', padding: '12px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          {loading ? 'جاري الاستخراج بالذكاء الاصطناعي...' : 'استخرج بيانات الطلب (Groq AI)'}
        </button>

        {extractedData && (
          <div style={{ background: '#f5f5f5', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
            <h3>البيانات المستخرجة:</h3>
            <p><strong>المتجر:</strong> {extractedData.store}</p>
            <p><strong>العميل:</strong> {extractedData.customer}</p>
            <p><strong>الهاتف:</strong> {extractedData.phone}</p>
            <p><strong>العنوان:</strong> {extractedData.address}</p>
            <p><strong>المبلغ (COD):</strong> {extractedData.cod}</p>
            <p><strong>الصنف:</strong> {extractedData.item}</p>

            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>اختر الطيار:</label>
              <select value={driver} onChange={(e) => setDriver(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', marginBottom: '10px' }}>
                <option value="">-- اختر طيار --</option>
                <option value="أحمد">أحمد</option>
                <option value="محمود">محمود</option>
                <option value="مصطفى">مصطفى</option>
              </select>
            </div>

            <button onClick={handleAddOrder} style={{ width: '100%', padding: '10px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              تأكيد وإضافة الطلب
            </button>
          </div>
        )}

        <section style={{ marginTop: '30px' }}>
          <h3>سجل الطلبات ({orders.length}):</h3>
          {orders.map((o) => (
            <div key={o.id} style={{ background: '#fff', border: '1px solid #eee', padding: '10px', borderRadius: '6px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.85rem' }}>
                <span>{o.store}</span>
                <span>{o.date}</span>
              </div>
              <p style={{ margin: '5px 0' }}><strong>العميل:</strong> {o.customer} ({o.phone})</p>
              <p style={{ margin: '5px 0' }}><strong>العنوان:</strong> {o.address}</p>
              <p style={{ margin: '5px 0' }}><strong>المبلغ:</strong> {o.cod} ج.م | <strong>الطيار:</strong> {o.driver}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
