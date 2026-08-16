import React, { useState } from 'react';
import { 
  Package, MessageSquare, Mic, AlertCircle, Search, FileText, Wallet, RefreshCw, Copy
} from 'lucide-react';

const INITIAL_ORDERS = [
  {
    id: 'ORD-1001',
    merchant: 'صيدلية العزبي',
    customer: 'محمد أحمد',
    customerPhone: '01012345678',
    pickupAddress: 'خالد بن الوليد',
    deliveryAddress: '25 شارع خليل حمادة',
    area: 'سيدي بشر',
    packageDesc: 'أدوية ومستلزمات',
    codAmount: 450,
    deliveryFee: 40,
    status: 'Awaiting Confirmation',
    paymentStatus: 'pending',
    settlementStatus: 'unsettled',
    missingFields: ['customerPhone'],
    rawText: 'خد الحاجة من صيدلية العزبي خالد بن الوليد ووديها لمحمد أحمد في سيدي بشر 25 شارع خليل حمادة وهياخد 450 جنيه'
  },
  {
    id: 'ORD-1002',
    merchant: 'محل أبو علي',
    customer: 'سارة محمود',
    customerPhone: '01298765432',
    pickupAddress: 'ميامي الشارع العام',
    deliveryAddress: 'عمارة 10 العصافرة قبالة البحر',
    area: 'العصافرة',
    packageDesc: 'حقيبة ملابس',
    codAmount: 300,
    deliveryFee: 35,
    status: 'Delivered',
    paymentStatus: 'collected',
    settlementStatus: 'unsettled',
    missingFields: [],
    rawText: 'من محل أبو علي لميامي سلم لسارة في العصافرة 300 ج والخدمة 35'
  }
];

export default function App() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputText, setInputText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [actualCash, setActualCash] = useState('');
  const [recording, setRecording] = useState(false);

  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  const totalCOD = deliveredOrders.reduce((acc, o) => acc + o.codAmount, 0);
  const totalDeliveryFees = deliveredOrders.reduce((acc, o) => acc + o.deliveryFee, 0);
  const merchantMoney = totalCOD - totalDeliveryFees;
  const expectedCash = totalCOD;

  const parseEgyptianText = (text) => {
    setIsExtracting(true);
    setTimeout(() => {
      const hasPhone = text.match(/01[0-2,5]\d{8}/);
      const hasAmount = text.match(/(\d+)\s*(ج|جنيه|EGP)?/) || text.match(/(\d+)/);
      
      const extracted = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        merchant: text.includes('محل') ? text.split('محل')[1]?.split(' ')[1] || 'محل محلي' : 'طلب مباشر',
        customer: text.includes('وديها ل') ? text.split('وديها ل')[1]?.split(' ')[0] : 'غير محدد',
        customerPhone: hasPhone ? hasPhone[0] : 'MISSING',
        deliveryAddress: text.includes('شارع') ? text.substring(text.indexOf('شارع') - 5, text.indexOf('شارع') + 20) : 'NEEDS CONFIRMATION',
        area: text.includes('سيدي بشر') ? 'سيدي بشر' : text.includes('العصافرة') ? 'العصافرة' : 'الإسكندرية',
        codAmount: hasAmount ? parseInt(hasAmount[1]) : 0,
        deliveryFee: 35,
        missingFields: [],
        rawText: text
      };

      if (extracted.customerPhone === 'MISSING') extracted.missingFields.push('رقم الهاتف');
      if (extracted.deliveryAddress === 'NEEDS CONFIRMATION') extracted.missingFields.push('العنوان بالكامل');

      setExtractedData(extracted);
      setIsExtracting(false);
    }, 1200);
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

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        const isDelivered = newStatus === 'Delivered';
        return {
          ...o,
          status: newStatus,
          paymentStatus: isDelivered ? 'collected' : o.paymentStatus
        };
      }
      return o;
    }));
  };

  return (
    <div dir="rtl" className="max-w-md mx-auto min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      <header className="bg-emerald-700 text-white p-4 sticky top-0 z-10 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">توصيل السريع</h1>
          <p className="text-xs text-emerald-100">إدارة الطلبات | الإسكندرية</p>
        </div>
        <span className="bg-emerald-800 text-emerald-200 text-xs px-2.5 py-1 rounded-full font-mono">
          {orders.length} طلبات اليوم
        </span>
      </header>

      <main className="p-4 space-y-4">
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                إدخال طلب جديد (نص واتساب / صوت)
              </label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="انسخ رسالة الواتساب هنا... مثال: خد الطلب من محل أبو علي في خالد بن الوليد ووديه لمحمد في سيدي بشر..."
                className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => parseEgyptianText(inputText)}
                  disabled={!inputText || isExtracting}
                  className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  {isExtracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                  استخرج بالذكاء الاصطناعي
                </button>
                <button 
                  onClick={() => setRecording(!recording)}
                  className={`p-2.5 rounded-lg border ${recording ? 'bg-red-100 border-red-500 text-red-600' : 'border-slate-300 text-slate-600'}`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>

            {extractedData && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                  <span className="font-bold text-amber-900 text-sm">بيانات الطلب المكتشفة</span>
                  <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">مراجعة</span>
                </div>
                <div className="text-xs space-y-1.5 text-slate-700">
                  <p><strong>المتجر:</strong> {extractedData.merchant}</p>
                  <p><strong>العميل:</strong> {extractedData.customer}</p>
                  <p><strong>الهاتف:</strong> {extractedData.customerPhone === 'MISSING' ? <span className="text-red-600 font-bold">⚠️ غير متاح</span> : extractedData.customerPhone}</p>
                  <p><strong>المنطقة/العنوان:</strong> {extractedData.area} - {extractedData.deliveryAddress}</p>
                  <p><strong>المبلغ المطلوب (COD):</strong> {extractedData.codAmount} جنيه</p>
                </div>

                {extractedData.missingFields.length > 0 && (
                  <div className="bg-red-100 text-red-800 p-2 rounded text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>بيانات مفقودة: {extractedData.missingFields.join('، ')}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <button onClick={handleConfirmOrder} className="flex-1 bg-emerald-600 text-white text-xs py-2 rounded font-medium">
                    تأكيد الطلب
                  </button>
                  <button 
                    onClick={() => {
                      const msg = `تمام يا باشا، استلمت أوردر ${extractedData.customer}. بس محتاج رقم الموبايل لتأكيد التسليم.`;
                      navigator.clipboard.writeText(msg);
                      alert('تم نسخ رد الواتساب المقترح!');
                    }}
                    className="flex-1 bg-white border border-slate-300 text-slate-700 text-xs py-2 rounded flex items-center justify-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    طلب الناقص بالواتساب
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

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500">مستحقات التجار المعلقة</span>
                <p className="text-base font-bold text-amber-600">{merchantMoney} ج.م</p>
              </div>
              <button onClick={() => setActiveTab('finance')} className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
                تصفية الحسابات
              </button>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="بحث برقم الطلب، اسم العميل، المنطقة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-9 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              {orders.filter(o => o.customer.includes(searchQuery) || o.area.includes(searchQuery) || o.id.includes(searchQuery)).map(order => (
                <div key={order.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400">{order.id}</span>
                      <h3 className="text-sm font-bold text-slate-800">{order.merchant} ← {order.customer}</h3>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Missing Information' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 flex justify-between">
                    <span>📍 {order.area} - {order.deliveryAddress}</span>
                    <span className="font-bold text-slate-900">{order.codAmount} ج.م</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex gap-1 overflow-x-auto">
                    {['Out for Delivery', 'Delivered', 'Cancelled'].map(st => (
                      <button
                        key={st}
                        onClick={() => updateOrderStatus(order.id, st)}
                        className={`text-[10px] px-2 py-1 rounded border whitespace-nowrap ${
                          order.status === st ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
              <h2 className="text-sm font-bold border-b pb-2 text-slate-800">التأقفيل اليومي وإغلاق الخزينة</h2>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">إجمالي النقدية المتوقعة مع المندوب:</span>
                  <span className="font-mono font-bold">{expectedCash} ج.م</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>حقوق التوصيل (عمولتك):</span>
                  <span className="font-mono font-bold">+{totalDeliveryFees} ج.م</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span>مستحقات مستوجبة الدفع للتجار:</span>
                  <span className="font-mono font-bold">-{merchantMoney} ج.م</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <label className="block text-xs text-slate-700 mb-1 font-semibold">الكاش الفعلي في الجيب:</label>
                <input
                  type="number"
                  placeholder="أدخل المبلغ الفعلي"
                  value={actualCash}
                  onChange={(e) => setActualCash(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-sm mb-2"
                />
                
                {actualCash && (
                  <div className={`p-2 rounded text-xs flex justify-between font-bold ${
                    parseFloat(actualCash) === expectedCash ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <span>الفارق / العجز:</span>
                    <span>{parseFloat(actualCash) - expectedCash} ج.م</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 flex justify-around p-2 z-10">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex flex-col items-center gap-1 text-[10px] ${activeTab === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}
        >
          <Package className="w-5 h-5" />
          الرئيسية
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={`flex flex-col items-center gap-1 text-[10px] ${activeTab === 'orders' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}
        >
          <FileText className="w-5 h-5" />
          الطلبات
        </button>
        <button 
          onClick={() => setActiveTab('finance')} 
          className={`flex flex-col items-center gap-1 text-[10px] ${activeTab === 'finance' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}
        >
          <Wallet className="w-5 h-5" />
          الحسابات
        </button>
      </nav>
    </div>
  );
}
