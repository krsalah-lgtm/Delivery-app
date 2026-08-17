import React, { useState, useEffect } from 'react';
import { 
  Users, ShoppingBag, Truck, BookOpen, Settings, History, 
  BarChart2, Plus, Edit3, Trash2, CheckCircle, Clock, AlertTriangle, 
  X, Eye, ArrowUpRight, Search, Key, RefreshCw, ChevronRight, Package, Save
} from 'lucide-react';

const translations = {
  ar: {
    appTitle: 'إكسبريس دليفري PRO',
    appSubtitle: 'النظام الذكي لإدارة الطلبات واللوجستيات',
    groqConnected: '🟢 AI متصل',
    groqMissing: '🔴 المفتاح مفقود',
    navNewOrder: 'طلب جديد',
    navOrders: 'الطلبات',
    navCustomers: 'العملاء',
    navMerchants: 'التجار',
    navDrivers: 'الطيارين',
    navDriverLedger: 'دفتر الحسابات',
    navHistory: 'سجل النشاطات',
    navAnalytics: 'التقارير والتحليل',
    navSettings: 'الإعدادات',
    statusPreparing: 'قيد التحضير',
    statusPending: 'معلق',
    statusOutForDelivery: 'جاري التوصيل',
    statusDelivered: 'تم التسليم',
    statusCancelled: 'ملغي',
  },
  en: {
    appTitle: 'Express Delivery PRO',
    appSubtitle: 'Smart Order & Logistics Management System',
    groqConnected: '🟢 AI Connected',
    groqMissing: '🔴 Key Missing',
    navNewOrder: 'New Order',
    navOrders: 'Orders',
    navCustomers: 'Customers',
    navMerchants: 'Merchants',
    navDrivers: 'Drivers',
    navDriverLedger: 'Driver Ledger',
    navHistory: 'Activity History',
    navAnalytics: 'Analytics & Reports',
    navSettings: 'Settings',
    statusPreparing: 'Preparing',
    statusPending: 'Pending',
    statusOutForDelivery: 'Out for Delivery',
    statusDelivered: 'Delivered',
    statusCancelled: 'Cancelled',
  }
};

export default function App() {
  const [lang, setLang] = useState('ar');
  const [activeTab, setActiveTab] = useState('newOrder');
  const t = translations[lang];

  // Core App State
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Data Collections with Full Persistence
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('app_orders')) || []);
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('app_customers')) || []);
  const [merchants, setMerchants] = useState(() => JSON.parse(localStorage.getItem('app_merchants')) || []);
  const [drivers, setDrivers] = useState(() => JSON.parse(localStorage.getItem('app_drivers')) || [
    { id: 'd1', name: 'أحمد محمود', phone: '01000000001', balance: 150 },
    { id: 'd2', name: 'محمد علي', phone: '01100000002', balance: -50 }
  ]);
  const [activityLogs, setActivityLogs] = useState(() => JSON.parse(localStorage.getItem('app_logs')) || []);

  // UI Modals & Detail States
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'customer' | 'merchant' | 'order' | 'duplicateCheck' | 'editEntity'
  const [pendingParsedData, setPendingParsedData] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Sync with LocalStorage
  useEffect(() => localStorage.setItem('app_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('app_customers', JSON.stringify(customers)), [customers]);
  useEffect(() => localStorage.setItem('app_merchants', JSON.stringify(merchants)), [merchants]);
  useEffect(() => localStorage.setItem('app_drivers', JSON.stringify(drivers)), [drivers]);
  useEffect(() => localStorage.setItem('app_logs', JSON.stringify(activityLogs)), [activityLogs]);
  useEffect(() => localStorage.setItem('groq_api_key', apiKey), [apiKey]);

  const logActivity = (action, details) => {
    const newLog = { id: Date.now(), timestamp: new Date().toLocaleString(), action, details };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // AI Order Parsing Logic
  const handleParseOrder = async () => {
    if (!apiKey) return alert('الرجاء إدخال مفتاح API في الإعدادات');
    if (!rawText.trim()) return alert('الرجاء إدخال نص الطلب');

    setIsProcessing(true);
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `Extract order JSON: { "customer": {"name": "", "phone": "", "address": ""}, "merchant": {"name": "", "phone": ""}, "items": "", "total": 0, "deliveryFee": 0 }`
            },
            { role: "user", content: rawText }
          ],
          response_format: { type: "json_object" }
        })
      });

      const data = await response.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      
      checkDuplicatesAndSave(parsed);
    } catch (err) {
      alert('حدث خطأ أثناء معالجة الطلب: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Duplicate Check logic for Customers and Merchants
  const checkDuplicatesAndSave = (parsed) => {
    const existingCust = customers.find(c => c.phone && c.phone === parsed.customer?.phone);
    const existingMerch = merchants.find(m => m.phone && m.phone === parsed.merchant?.phone);

    if (existingCust || existingMerch) {
      setPendingParsedData({ parsed, existingCust, existingMerch });
      setModalType('duplicateCheck');
    } else {
      finalizeOrderCreation(parsed, false, false);
    }
  };

  const finalizeOrderCreation = (parsed, updateCustomer = false, updateMerchant = false) => {
    let custId = pendingParsedData?.existingCust?.id;
    let merchId = pendingParsedData?.existingMerch?.id;

    // Save/Update Customer
    if (!custId) {
      custId = 'c_' + Date.now();
      const newCust = { id: custId, ...parsed.customer, createdAt: new Date().toLocaleDateString() };
      setCustomers(prev => [...prev, newCust]);
      logActivity('عميل جديد', `إضافة العميل ${parsed.customer?.name}`);
    } else if (updateCustomer) {
      setCustomers(prev => prev.map(c => c.id === custId ? { ...c, ...parsed.customer } : c));
      logActivity('تحديث عميل', `تحديث بيانات العميل ${parsed.customer?.name}`);
    }

    // Save/Update Merchant
    if (!merchId) {
      merchId = 'm_' + Date.now();
      const newMerch = { id: merchId, ...parsed.merchant, createdAt: new Date().toLocaleDateString() };
      setMerchants(prev => [...prev, newMerch]);
      logActivity('تاجر جديد', `إضافة التاجر ${parsed.merchant?.name}`);
    } else if (updateMerchant) {
      setMerchants(prev => prev.map(m => m.id === merchId ? { ...m, ...parsed.merchant } : m));
      logActivity('تحديث تاجر', `تحديث بيانات التاجر ${parsed.merchant?.name}`);
    }

    // Create Order with status 'قيد التحضير' (Preparing)
    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerId: custId,
      customerName: parsed.customer?.name || 'غير معروف',
      customerPhone: parsed.customer?.phone || '',
      address: parsed.customer?.address || '',
      merchantId: merchId,
      merchantName: parsed.merchant?.name || 'غير معروف',
      items: parsed.items || 'طلب متنوع',
      total: Number(parsed.total) || 0,
      deliveryFee: Number(parsed.deliveryFee) || 0,
      status: 'قيد التحضير',
      driverId: null,
      createdAt: new Date().toLocaleString()
    };

    setOrders(prev => [newOrder, ...prev]);
    logActivity('إنشاء طلب', `تم إضافة الطلب ${newOrder.id}`);
    setRawText('');
    setModalType(null);
    setPendingParsedData(null);
    setActiveTab('orders');
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    logActivity('تحديث حالة', `تغيير حالة الطلب ${orderId} إلى ${newStatus}`);
  };

  // Database Full Editing Helpers
  const handleSaveEdit = (type) => {
    if (type === 'customer') {
      setCustomers(prev => prev.map(c => c.id === editForm.id ? editForm : c));
      logActivity('تعديل قاعدة بيانات', `تعديل بيانات العميل ${editForm.name}`);
    } else if (type === 'merchant') {
      setMerchants(prev => prev.map(m => m.id === editForm.id ? editForm : m));
      logActivity('تعديل قاعدة بيانات', `تعديل بيانات التاجر ${editForm.name}`);
    } else if (type === 'driver') {
      setDrivers(prev => prev.map(d => d.id === editForm.id ? editForm : d));
      logActivity('تعديل قاعدة بيانات', `تعديل بيانات الطيار ${editForm.name}`);
    }
    setModalType(null);
    setEditForm({});
  };

  const handleDeleteEntity = (type, id, name) => {
    if (!window.confirm(`هل أنت متأكد من حذف ${name} نهائياً؟`)) return;
    if (type === 'customer') {
      setCustomers(prev => prev.filter(c => c.id !== id));
      logActivity('حذف سجل', `حذف العميل ${name}`);
    } else if (type === 'merchant') {
      setMerchants(prev => prev.filter(m => m.id !== id));
      logActivity('حذف سجل', `حذف التاجر ${name}`);
    } else if (type === 'driver') {
      setDrivers(prev => prev.filter(d => d.id !== id));
      logActivity('حذف سجل', `حذف الطيار ${name}`);
    } else if (type === 'order') {
      setOrders(prev => prev.filter(o => o.id !== id));
      logActivity('حذف سجل', `حذف الطلب ${id}`);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-md"><Package className="h-6 w-6 text-white" /></div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{t.appTitle}</h1>
              <p className="text-xs text-slate-400">{t.appSubtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className={`text-xs px-3 py-1.5 rounded-full border font-medium ${apiKey ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800' : 'bg-rose-950/50 text-rose-400 border-rose-800'}`}>
              {apiKey ? t.groqConnected : t.groqMissing}
            </span>
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition-colors"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="bg-slate-900/80 border-b border-slate-800 overflow-x-auto sticky top-[73px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex space-x-1 rtl:space-x-reverse p-2">
          {[
            { id: 'newOrder', label: t.navNewOrder, icon: Plus },
            { id: 'orders', label: t.navOrders, icon: ShoppingBag },
            { id: 'customers', label: t.navCustomers, icon: Users },
            { id: 'merchants', label: t.navMerchants, icon: BookOpen },
            { id: 'drivers', label: t.navDrivers, icon: Truck },
            { id: 'driverLedger', label: t.navDriverLedger, icon: BookOpen },
            { id: 'history', label: t.navHistory, icon: History },
            { id: 'analytics', label: t.navAnalytics, icon: BarChart2 },
            { id: 'settings', label: t.navSettings, icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* TAB 1: NEW ORDER */}
        {activeTab === 'newOrder' && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-400">
              <Plus /> إدخال طلب جديد عبر الذكاء الاصطناعي
            </h2>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="ألصق نص الطلب أو تفاصيل المحادثة هنا (العميل، العنوان، التاجر، الأصناف، المبلغ)..."
              className="w-full h-44 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-indigo-500 mb-4 font-sans leading-relaxed"
            />
            <button
              onClick={handleParseOrder}
              disabled={isProcessing}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="animate-spin h-5 w-5" /> : 'معالجة النص بالذكاء الاصطناعي وحفظ البيانات'}
            </button>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">إدارة الطلبات النشطة ({orders.length})</h2>
              <input 
                type="text" 
                placeholder="بحث في الطلبات..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {orders.filter(o => o.id.includes(searchQuery) || o.customerName.includes(searchQuery) || o.merchantName.includes(searchQuery)).map(order => (
                <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-md hover:border-slate-700 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-indigo-400 font-mono font-bold">{order.id}</span>
                      <h3 className="font-bold text-lg mt-0.5">{order.customerName}</h3>
                      <p className="text-xs text-slate-400">{order.address}</p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-slate-950 text-xs border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 font-medium text-slate-200"
                    >
                      <option value="قيد التحضير">{t.statusPreparing}</option>
                      <option value="معلق">{t.statusPending}</option>
                      <option value="جاري التوصيل">{t.statusOutForDelivery}</option>
                      <option value="تم التسليم">{t.statusDelivered}</option>
                      <option value="ملغي">{t.statusCancelled}</option>
                    </select>
                  </div>
                  <div className="border-t border-slate-800/80 pt-3 text-sm text-slate-300 space-y-1">
                    <p><span className="text-slate-500">الأصناف:</span> {order.items}</p>
                    <p><span className="text-slate-500">التاجر:</span> {order.merchantName}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-emerald-400 font-bold font-mono">{order.total} ج.م</span>
                      <span className="text-xs text-slate-500">{order.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => { setSelectedItem(order); setModalType('order'); }}
                      className="flex-1 text-xs bg-slate-800 hover:bg-slate-700 py-2.5 rounded-xl text-slate-300 transition-colors flex items-center justify-center gap-1 font-medium"
                    >
                      <Eye className="h-3.5 w-3.5" /> التفاصيل الكاملة
                    </button>
                    <button
                      onClick={() => handleDeleteEntity('order', order.id, order.id)}
                      className="p-2.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-xl border border-rose-900/50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">سجل العملاء وقاعدة البيانات ({customers.length})</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {customers.map(cust => {
                const custOrders = orders.filter(o => o.customerId === cust.id || o.customerPhone === cust.phone);
                return (
                  <div key={cust.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-md">{cust.name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{cust.phone}</p>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => { setEditForm(cust); setModalType('editCustomer'); }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteEntity('customer', cust.id, cust.name)}
                          className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{cust.address || 'لا يوجد عنوان مسجل'}</p>
                    <div className="pt-3 flex justify-between items-center text-xs text-indigo-400 border-t border-slate-800 font-medium">
                      <span>إجمالي الطلبات: {custOrders.length}</span>
                      <button 
                        onClick={() => { setSelectedItem({ ...cust, orders: custOrders }); setModalType('customer'); }}
                        className="underline hover:text-indigo-300"
                      >
                        عرض السجل الكامل
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: MERCHANTS */}
        {activeTab === 'merchants' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">سجل التجار وقاعدة البيانات ({merchants.length})</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {merchants.map(merch => {
                const merchOrders = orders.filter(o => o.merchantId === merch.id || o.merchantName === merch.name);
                return (
                  <div key={merch.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-md">{merch.name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{merch.phone || 'بدون هاتف'}</p>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => { setEditForm(merch); setModalType('editMerchant'); }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteEntity('merchant', merch.id, merch.name)}
                          className="p-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="pt-3 flex justify-between items-center text-xs text-indigo-400 border-t border-slate-800 font-medium">
                      <span>الطلبات المعالجة: {merchOrders.length}</span>
                      <button 
                        onClick={() => { setSelectedItem({ ...merch, orders: merchOrders }); setModalType('merchant'); }}
                        className="underline hover:text-indigo-300"
                      >
                        عرض التفاصيل الكاملة
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: DRIVERS */}
        {activeTab === 'drivers' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">إدارة الطيارين ({drivers.length})</h2>
              <button 
                onClick={() => {
                  const name = prompt('اسم الطيار الجديد:');
                  const phone = prompt('رقم الهاتف:');
                  if (name) {
                    const newDriver = { id: 'd_' + Date.now(), name, phone: phone || '', balance: 0 };
                    setDrivers(prev => [...prev, newDriver]);
                    logActivity('إضافة طيار', `تم إضافة الطيار ${name}`);
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors shadow-md"
              >
                + إضافة طيار جديد
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {drivers.map(driver => (
                <div key={driver.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex justify-between items-center shadow-md">
                  <div>
                    <h3 className="font-bold text-lg">{driver.name}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{driver.phone}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-slate-400">الرصيد الجاري</span>
                      <p className={`font-mono font-bold text-lg ${driver.balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {driver.balance} ج.م
                      </p>
                    </div>
                    <button 
                      onClick={() => handleDeleteEntity('driver', driver.id, driver.name)}
                      className="p-2 bg-rose-950/40 text-rose-400 rounded-xl hover:bg-rose-900/50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DRIVER LEDGER */}
        {activeTab === 'driverLedger' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">دفتر حسابات الطيارين والتحليلات المالية</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <table className="w-full text-sm text-right">
                <thead className="text-xs text-slate-500 border-b border-slate-800 pb-3">
                  <tr>
                    <th className="py-3">اسم الطيار</th>
                    <th className="py-3">رقم الهاتف</th>
                    <th className="py-3">الرصيد المالي الحالي</th>
                    <th className="py-3">خيارات وتسوية الحساب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {drivers.map(d => (
                    <tr key={d.id}>
                      <td className="py-4 font-bold">{d.name}</td>
                      <td className="py-4 font-mono text-slate-400">{d.phone}</td>
                      <td className={`py-4 font-mono font-bold ${d.balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{d.balance} ج.م</td>
                      <td className="py-4 flex gap-2">
                        <button 
                          onClick={() => {
                            const amount = Number(prompt('أدخل المبلغ لتعديل الرصيد (موجب للإضافة أو سالب للخصم):', '0'));
                            if (!isNaN(amount) && amount !== 0) {
                              setDrivers(prev => prev.map(drv => drv.id === d.id ? { ...drv, balance: drv.balance + amount } : drv));
                              logActivity('تسوية حساب طيار', `تعديل رصيد الطيار ${d.name} بمقدار ${amount}`);
                            }
                          }}
                          className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm transition-colors"
                        >
                          تسوية / تعديل الرصيد
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: ACTIVITY HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">سجل النشاطات والأحداث الكامل</h2>
              <button 
                onClick={() => { setActivityLogs([]); localStorage.removeItem('app_logs'); }}
                className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/50 px-3 py-1.5 rounded-xl hover:bg-rose-900/50"
              >
                مسح السجل
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              {activityLogs.length === 0 ? (
                <p className="text-slate-500 text-sm">لا توجد سجلات نشاط مسجلة حتى الآن.</p>
              ) : (
                <ul className="divide-y divide-slate-800/80">
                  {activityLogs.map(log => (
                    <li key={log.id} className="py-3 flex justify-between items-center text-sm">
                      <div>
                        <span className="font-bold text-indigo-400 ml-2">{log.action}:</span>
                        <span className="text-slate-300">{log.details}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{log.timestamp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* TAB 8: ANALYTICS & REPORTS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">التقارير التحليلية واللوجستية</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
                <p className="text-xs text-slate-400">إجمالي الطلبات المسجلة</p>
                <p className="text-3xl font-bold mt-1.5 font-mono">{orders.length}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
                <p className="text-xs text-slate-400">إجمالي المبيعات الكلية</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1.5 font-mono">
                  {orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0)} ج.م
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
                <p className="text-xs text-slate-400">إجمالي رسوم التوصيل</p>
                <p className="text-3xl font-bold text-indigo-400 mt-1.5 font-mono">
                  {orders.reduce((acc, o) => acc + (Number(o.deliveryFee) || 0), 0)} ج.م
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
                <p className="text-xs text-slate-400">العملاء والتجار المسجلين</p>
                <p className="text-3xl font-bold text-amber-400 mt-1.5 font-mono">{customers.length + merchants.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <h2 className="text-lg font-bold flex items-center gap-2 text-indigo-400">
              <Settings /> إعدادات النظام وتكامل الذكاء الاصطناعي
            </h2>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium">Groq API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <button
              onClick={() => alert('تم حفظ الإعدادات بنجاح')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-indigo-600/20"
            >
              حفظ الإعدادات
            </button>
          </div>
        )}

      </main>

      {/* DUPLICATE CHECK MODAL */}
      {modalType === 'duplicateCheck' && pendingParsedData && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-amber-400 flex items-center gap-2">
              <AlertTriangle /> تم العثور على سجلات مطابقة مسجلاً مسبقاً
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              بيانات العميل أو التاجر موجودة بالفعل في النظام. هل ترغب في استبدال وتحديث السجلات القديمة بالبيانات الواردة حديثاً، أم الاحتفاظ بالقديمة وإضافة الطلب فقط؟
            </p>
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => finalizeOrderCreation(pendingParsedData.parsed, true, true)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm py-3 rounded-xl font-medium shadow-md"
              >
                تحديث البيانات القديمة بالجديدة
              </button>
              <button
                onClick={() => finalizeOrderCreation(pendingParsedData.parsed, false, false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm py-3 rounded-xl font-medium"
              >
                الاحتفاظ بالبيانات القديمة وتمرير الطلب
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR CUSTOMERS/MERCHANTS */}
      {(modalType === 'editCustomer' || modalType === 'editMerchant') && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-indigo-400">تعديل بيانات {modalType === 'editCustomer' ? 'العميل' : 'التاجر'}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">الاسم</label>
                <input 
                  type="text" 
                  value={editForm.name || ''} 
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">رقم الهاتف</label>
                <input 
                  type="text" 
                  value={editForm.phone || ''} 
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm"
                />
              </div>
              {modalType === 'editCustomer' && (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">العنوان</label>
                  <input 
                    type="text" 
                    value={editForm.address || ''} 
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => handleSaveEdit(modalType === 'editCustomer' ? 'customer' : 'merchant')}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-medium"
              >
                حفظ التعديلات
              </button>
              <button 
                onClick={() => setModalType(null)}
                className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-sm"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL DRILL-DOWN RECORD MODAL */}
      {modalType && modalType !== 'duplicateCheck' && modalType !== 'editCustomer' && modalType !== 'editMerchant' && selectedItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl w-full space-y-4 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => { setModalType(null); setSelectedItem(null); }}
              className="absolute top-4 left-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/50"
            >
              <X className="h-5 w-5" />
            </button>

            {modalType === 'order' && (
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-indigo-400">تفاصيل الطلب الكاملة: {selectedItem.id}</h3>
                <div className="space-y-2 text-sm bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p><span className="text-slate-500">اسم العميل:</span> <span className="font-bold text-slate-200">{selectedItem.customerName}</span> ({selectedItem.customerPhone})</p>
                  <p><span className="text-slate-500">العنوان بالتفصيل:</span> {selectedItem.address}</p>
                  <p><span className="text-slate-500">اسم التاجر:</span> <span className="font-bold text-slate-200">{selectedItem.merchantName}</span></p>
                  <p><span className="text-slate-500">الأصناف المطلوبة:</span> {selectedItem.items}</p>
                  <p><span className="text-slate-500">المبلغ الإجمالي:</span> <span className="font-mono text-emerald-400 font-bold">{selectedItem.total} ج.م</span></p>
                  <p><span className="text-slate-500">رسوم التوصيل:</span> <span className="font-mono text-indigo-400">{selectedItem.deliveryFee} ج.م</span></p>
                  <p><span className="text-slate-500">الحالة الحالية:</span> {selectedItem.status}</p>
                  <p><span className="text-slate-500">تاريخ الإنشاء:</span> {selectedItem.createdAt}</p>
                </div>
              </div>
            )}

            {(modalType === 'customer' || modalType === 'merchant') && (
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-indigo-400">
                  {modalType === 'customer' ? 'السجل الكامل للعميل' : 'السجل الكامل للتاجر'}: {selectedItem.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">رقم الهاتف: {selectedItem.phone}</p>
                {modalType === 'customer' && <p className="text-xs text-slate-400">العنوان: {selectedItem.address}</p>}
                <h4 className="font-bold text-sm pt-2 border-t border-slate-800">الطلبات المرتبطة بهذه السجلات ({selectedItem.orders?.length || 0}):</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedItem.orders?.map(o => (
                    <div key={o.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-mono text-indigo-400 font-bold">{o.id}</span> - {o.items}
                      </div>
                      <span className="font-bold font-mono text-emerald-400">{o.total} ج.م</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
