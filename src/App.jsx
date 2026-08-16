import React, { useState } from 'react';
import { 
  Package, MessageSquare, Mic, AlertCircle, Search, FileText, Wallet, RefreshCw, Copy, Store, Users, UserCheck, Key
} from 'lucide-react';

const INITIAL_ORDERS = [
  {
    id: 'ORD-1001',
    merchant: 'محل أبو أحمد',
    customer: 'محمد سامي',
    customerPhone: '01012345678',
    pickupAddress: 'سيدي بشر',
    deliveryAddress: 'شارع خالد بن الوليد، عمارة 24، الدور التالت، الشقة 7',
    area: 'سيدي بشر',
    packageDesc: 'أوردر هدوم',
    codAmount: 650,
    deliveryFee: 40,
    driverName: 'أحمد محمود',
    status: 'Awaiting Confirmation',
    paymentStatus: 'pending',
    settlementStatus: 'unsettled',
    missingFields: [],
    rawText: 'صباح الخير يا باشا، عندي أوردر من عندي في محل أبو أحمد في سيدي بشر...'
  }
];

export default function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [merchants, setMerchants] = useState([
    { id: 1, name: 'محل أبو أحمد', phone: '01200000000', area: 'سيدي بشر', fee: 40 },
    { id: 2, name: 'صيدلية العزبي', phone: '01100000000', area: 'خالد بن الوليد', fee: 35 }
  ]);
  const [customers, setCustomers] = useState([
    { id: 1, name: 'محمد سامي', phone: '01012345678', address: 'شارع خالد بن الوليد عمارة 24', area: 'سيدي بشر' }
  ]);
  const [drivers, setDrivers] = useState(['أحمد محمود', 'مصطفى علي', 'إسماعيل السائق']);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputText, setInputText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [actualCash, setActualCash] = useState('');

  // New Merchant & Customer Form States
  const [newMerchant, setNewMerchant] = useState({ name: '', phone: '', area: '', fee: 35 });
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '', area: '' });

  const saveApiKey = (key) => {
    localStorage.setItem('gemini_key', key);
    setApiKey(key);
    setShowKeyInput(false);
  };

  // True AI Extraction using Gemini 2.5 Flash API
  const parseWithGemini = async (text) => {
    if (!apiKey) {
      alert('الرجاء إدخال مفتاح Gemini API المجاني أولاً');
      setShowKeyInput(true);
      return;
    }

    setIsExtracting(true);

    const prompt = `
      You are an AI assistant for an Egyptian delivery business. Extract order details from this Egyptian Arabic message:
      "${text}"

      Return ONLY a raw JSON object with these keys (no markdown wrappers, no extra text):
      {
        "merchant": "merchant/shop name or 'مباشر'",
        "customer": "recipient name",
        "customerPhone": "recipient phone number or 'MISSING'",
        "pickupAddress": "pickup spot or area",
        "deliveryAddress": "full delivery address",
        "area": "neighborhood/district name",
        "packageDesc": "description of items",
        "codAmount": number (cash on delivery to collect for product ONLY, do not confuse with apartment/building/floor numbers),
        "deliveryFee": number (default 35 if not mentioned)
      }
    `;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await res.json();
      let responseText = data.candidates[0].content.parts[0].text.trim();
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '');
      const parsed = JSON.parse(responseText);

      const missingFields = [];
      if (!parsed.customerPhone || parsed.customerPhone === 'MISSING') missingFields.push('رقم الهاتف');
      if (!parsed.deliveryAddress) missingFields.push('العنوان');

      // Auto-save customer/merchant if new
      if (parsed.merchant && !merchants.some(m => m.name.includes(parsed.merchant))) {
        setMerchants(prev => [...prev, { id: Date.now(), name: parsed.merchant, phone: '', area: parsed.area || '', fee: parsed.deliveryFee || 35 }]);
      }
      if (parsed.customer && !customers.some(c => c.name.includes(parsed.customer))) {
        setCustomers(prev => [...prev, { id: Date.now(), name: parsed.customer, phone: parsed.customerPhone || '', address: parsed.deliveryAddress || '', area: parsed.area || '' }]);
      }

      setExtractedData({
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        ...parsed,
        driverName: drivers[0] || 'لم يحدد',
        missingFields,
        rawText: text
      });
    } catch (err) {
      alert('حدث خطأ أثناء استخراج البيانات. تأكد من صحة مفتاح Gemini API.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleConfirmOrder = () => {
    if (!extractedData) return;
    const newOrder = {
      ...extractedData,
      status: extractedData.missingFields.length > 0 ? 'Missing Information' : 'Confirmed',
      paymentStatus: 'pending',
      settlementStatus: 'unsettled'
    };
    setOrders([newOrder, ...orders]);
    setExtractedData(null);
    setInputText('');
    setActiveTab('orders');
  };

  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  const totalCOD = deliveredOrders.reduce((acc, o) => acc + (o.codAmount || 0), 0);
  const totalDeliveryFees = deliveredOrders.reduce((acc, o) => acc + (o.deliveryFee || 0), 0);
  const merchantMoney = totalCOD - totalDeliveryFees;
  const expectedCash = totalCOD;

  return (
    <div dir="rtl" className="max-w-md mx-auto min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      <header className="bg-emerald-700 text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">توصيل السريع</h1>
          <p className="text-xs text-emerald-100">إدارة الطلبات والطيارين</p>
        </div>
        <button onClick={() => setShowKeyInput(!showKeyInput)} className="bg-emerald-800 p-2 rounded-full">
          <Key className="w-4 h-4 text-emerald-200" />
        </button>
      </header>

      <main className="p-4 space-y-4">
        {/* API Key Modal */}
        {showKeyInput && (
          <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl space-y-2">
            <label className="block text-xs font-bold text-amber-900">مفتاح Google Gemini API المجاني:</label>
            <input
              type="password"
              placeholder="إلصق API Key هنا..."
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
              className="w-full p-2 border border-amber-300 rounded text-xs bg-white"
            />
            <p className="text-[10px] text-amber-700">احصل عليه مجاناً من aistudio.google.com للذكاء الاصطناعي السريع.</p>
          </div>
        )}

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                إدخال طلب جديد (رسالة / بصمة صوت)
              </label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="مثال: عندي أوردر من محل أبو أحمد في سيدي بشر ووديه لمحمد سامي..."
                className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                onClick={() => parseWithGemini(inputText)}
                disabled={!inputText || isExtracting}
                className="w-full mt-2 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isExtracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                استخراج بالذكاء الاصطناعي الذكي
              </button>
            </div>

            {/* AI Result Card */}
            {extractedData && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center border-b border-emerald-200 pb-2">
                  <span className="font-bold text-emerald-900 text-sm">تم التعرف على الطلب بنجاح</span>
                </div>
                <div className="text-xs space-y-1 text-slate-700">
                  <p><strong>المتجر:</strong> {extractedData.merchant}</p>
                  <p><strong>العميل:</strong> {extractedData.customer}</p>
                  <p><strong>الهاتف:</strong> {extractedData.customerPhone}</p>
                  <p><strong>العنوان:</strong> {extractedData.deliveryAddress}</p>
                  <p><strong>الصنف:</strong> {extractedData.packageDesc}</p>
                  <p><strong>المبلغ المطلوب (COD):</strong> <span className="font-bold text-emerald-700">{extractedData.codAmount} جنيه</span></p>
                  
                  <div className="pt-2">
                    <label className="block text-slate-500 mb-1">تعيين الطيار / المندوب:</label>
                    <select 
                      value={extractedData.driverName} 
                      onChange={(e) => setExtractedData({...extractedData, driverName: e.target.value})}
                      className="w-full p-1.5 border rounded bg-white"
                    >
                      {drivers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button onClick={handleConfirmOrder} className="flex-1 bg-emerald-600 text-white text-xs py-2 rounded font-medium">
                    تأكيد وإضافة الطلب
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">إجمالي الكاش المحصل</span>
                <span className="text-lg font-bold text-slate-800">{totalCOD} ج.م</span>
              </div>
              <div className="bg-emerald-50 p-3.5 rounded-xl shadow-sm border border-emerald-200">
                <span className="text-xs text-emerald-700 block mb-1">صافي ربح التوصيل</span>
                <span className="text-lg font-bold text-emerald-800">{totalDeliveryFees} ج.م</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
            />
            {orders.map(order => (
              <div key={order.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-slate-400">{order.id}</span>
                    <h3 className="font-bold text-slate-800">{order.merchant} ← {order.customer}</h3>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">{order.status}</span>
                </div>
                <p>📍 {order.deliveryAddress}</p>
                <div className="flex justify-between text-slate-500">
                  <span>🛵 الطيار: {order.driverName}</span>
                  <span className="font-bold text-slate-900">{order.codAmount} ج.م</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: MERCHANTS & CUSTOMERS */}
        {activeTab === 'directory' && (
          <div className="space-y-4">
            {/* Merchants Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-2">
              <h2 className="text-sm font-bold flex items-center gap-2"><Store className="w-4 h-4" /> قائمة التجار المحفوظين</h2>
              <div className="space-y-1">
                {merchants.map(m => (
                  <div key={m.id} className="p-2 bg-slate-50 rounded flex justify-between text-xs">
                    <div>
                      <p className="font-bold">{m.name}</p>
                      <p className="text-slate-500">{m.area} - {m.phone}</p>
                    </div>
                    <span className="text-emerald-700 font-bold">{m.fee} ج.م خدمة</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customers Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-2">
              <h2 className="text-sm font-bold flex items-center gap-2"><Users className="w-4 h-4" /> دليل العملاء</h2>
              <div className="space-y-1">
                {customers.map(c => (
                  <div key={c.id} className="p-2 bg-slate-50 rounded text-xs">
                    <p className="font-bold">{c.name} ({c.phone})</p>
                    <p className="text-slate-500">{c.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 flex justify-around p-2 z-10">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center text-[10px] ${activeTab === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <Package className="w-5 h-5" /> الرئيسية
        </button>
        <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center text-[10px] ${activeTab === 'orders' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <FileText className="w-5 h-5" /> الطلبات
        </button>
        <button onClick={() => setActiveTab('directory')} className={`flex flex-col items-center text-[10px] ${activeTab === 'directory' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
          <Users className="w-5 h-5" /> التجار والعملاء
        </button>
      </nav>
    </div>
  );
}
