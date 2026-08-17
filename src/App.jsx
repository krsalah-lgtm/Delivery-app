import React, { useState, useEffect } from 'react';

// Language Dictionary & Translation Dataset
const translations = {
  ar: {
    appTitle: 'إكسبريس دليفري PRO',
    appSubtitle: 'النظام الذكي لإدارة الطلبات واللوجستيات',
    groqConnected: '🟢 AI متصل',
    groqMissing: '🔴 المفتاح مفقود',
    
    // Navigation
    navNewOrder: 'طلب جديد',
    navOrders: 'إدارة الطلبات',
    navMerchants: 'المتاجر',
    navCustomers: 'العملاء',
    navDrivers: 'الطيارين و الحسابات',

    // New Order Screen
    extractTitle: '✨ استخراج وإدخال البيانات الذكي',
    importText: 'نص (واتساب / رسالة)',
    importExcel: 'ملف إكسيل (Excel)',
    importPdf: 'ملف PDF',
    rawInputPlaceholder: 'ضع نص الطلب هنا، محادثة الواتساب، أو التفاصيل الخام...',
    pasteBtn: '📋 لصق من الحافظة',
    extractBtn: '⚡ استخراج البيانات بالذكاء الاصطناعي',
    reviewTitle: 'مراجعة وتعديل بيانات الطلب:',
    
    // Entities
    customerInfo: 'بيانات العميل',
    customerName: 'اسم العميل',
    customerPhone: 'رقم هاتف العميل',
    customerAddress: 'عنوان التسليم',
    
    merchantInfo: 'بيانات المتجر / التاجر',
    merchantName: 'اسم المتجر',
    merchantPhone: 'رقم هاتف المتجر',
    merchantAddress: 'عنوان المتجر',
    
    orderDetails: 'تفاصيل الطلب',
    itemsDescription: 'وصف المحتويات والمنتجات',
    
    financials: '💰 التفاصيل المالية (قابلة للتعديل)',
    orderValue: 'قيمة الطلب (ج.م)',
    deliveryFee: 'رسوم التوصيل (ج.م)',
    myRatio: 'نسبة الشركة من التوصيل (%)',
    paymentMethod: 'طريقة الدفع',
    payCash: 'كاش عند التسليم',
    payInstapay: 'إنستا باي / تحويل',
    payVodafone: 'فودافون كاش',
    
    notesTitle: '📝 الملاحظات والمعلومات الهامة',
    notesPlaceholder: 'أدخل أي ملاحظات مهمة، تعليمات التوصيل، أو تعديلات مبالغ...',
    
    driverSelect: 'اختيار طيار التوصيل',
    selectDriverPlaceholder: '-- اختر الطيار --',
    saveOrder: '✅ تأكيد وحفظ الطلب في النظام',

    // Financial Live Calculations Box
    calcTitle: 'الملخص المالي المباشر',
    totalCustomerPays: 'إجمالي ما يدفعه العميل',
    merchantAmount: 'مبلغ المتجر المستحق',
    myRevenue: 'إيراد الشركة المستحق',
    driverShare: 'نصيب الطيار المستحق',

    // Statuses
    statusPending: 'قيد الانتظار',
    statusOutForDelivery: 'جاري التوصيل',
    statusDelivered: 'تم التسليم بنجاح',
    statusDamaged: 'تالف (Damaged)',
    statusReturned: 'مرتجع (Returned)',
    statusComment: 'سبب التلف / المرتجع / تعليق الحالة',

    // Directory & Ledger
    delete: 'حذف',
    edit: 'تعديل',
    searchPlaceholder: 'بحث...',
    driverLedgerTitle: '📊 دفتر حسابات وتحليلات الطيارين التفصيلي',
    addDriver: 'إضافة طيار جديد',
    addMerchant: 'إضافة متجر جديد',
    addCustomer: 'إضافة عميل جديد',
    driverName: 'اسم الطيار',
    driverPhone: 'رقم الهاتف',
    driverVehicle: 'وسيلة النقل',
    actions: 'إجراءات'
  },
  en: {
    appTitle: 'Express Delivery PRO',
    appSubtitle: 'Smart Logistics & Order Management System',
    groqConnected: '🟢 AI Connected',
    groqMissing: '🔴 API Key Missing',

    // Navigation
    navNewOrder: 'New Order',
    navOrders: 'Orders Management',
    navMerchants: 'Merchants Directory',
    navCustomers: 'Customers Directory',
    navDrivers: 'Drivers & Ledger',

    // New Order Screen
    extractTitle: '✨ Smart AI Data Extraction & Import',
    importText: 'Text (WhatsApp / Msg)',
    importExcel: 'Excel File',
    importPdf: 'PDF Document',
    rawInputPlaceholder: 'Paste raw order text, WhatsApp chat, or details here...',
    pasteBtn: '📋 Paste Clipboard',
    extractBtn: '⚡ Extract Data via AI',
    reviewTitle: 'Review & Edit Order Details:',

    // Entities
    customerInfo: 'Customer Information',
    customerName: 'Customer Name',
    customerPhone: 'Customer Phone',
    customerAddress: 'Delivery Address',

    merchantInfo: 'Merchant Information',
    merchantName: 'Merchant Name',
    merchantPhone: 'Merchant Phone',
    merchantAddress: 'Merchant Address',

    orderDetails: 'Order Items',
    itemsDescription: 'Items & Description',

    financials: '💰 Financial Details (Editable)',
    orderValue: 'Order Value (EGP)',
    deliveryFee: 'Delivery Fee (EGP)',
    myRatio: 'Company Share Ratio (%)',
    paymentMethod: 'Payment Method',
    payCash: 'Cash on Delivery',
    payInstapay: 'InstaPay / Transfer',
    payVodafone: 'Vodafone Cash',

    notesTitle: '📝 Important Notes & Special Info',
    notesPlaceholder: 'Enter any special notes, instructions, or money overrides...',

    driverSelect: 'Select Delivery Driver',
    selectDriverPlaceholder: '-- Select Driver --',
    saveOrder: '✅ Confirm & Save Order',

    // Financial Live Calculations Box
    calcTitle: 'Live Financial Summary',
    totalCustomerPays: 'Total Customer Pays',
    merchantAmount: 'Merchant Due',
    myRevenue: 'Company Net Revenue',
    driverShare: 'Driver Earnings',

    // Statuses
    statusPending: 'Pending',
    statusOutForDelivery: 'Out for Delivery',
    statusDelivered: 'Delivered',
    statusDamaged: 'Damaged',
    statusReturned: 'Returned',
    statusComment: 'Reason / Status Notes',

    // Directory & Ledger
    delete: 'Delete',
    edit: 'Edit',
    searchPlaceholder: 'Search...',
    driverLedgerTitle: '📊 Detailed Driver Ledger & Analytics',
    addDriver: 'Add New Driver',
    addMerchant: 'Add New Merchant',
    addCustomer: 'Add New Customer',
    driverName: 'Driver Name',
    driverPhone: 'Phone Number',
    driverVehicle: 'Vehicle',
    actions: 'Actions'
  }
};

export default function App() {
  const [lang, setLang] = useState('ar');
  const [activeTab, setActiveTab] = useState('newOrder');
  const [aiConnected, setAiConnected] = useState(true);

  // Initial Seed Orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD-101',
      customerName: 'نادين',
      customerPhone: '01199887766',
      customerAddress: '31 شارع ابو قير العمارة 7 الدور الرابع الشقة 9',
      merchantName: 'فتح الله فرع لوران',
      merchantPhone: '01200000000',
      merchantAddress: 'فرع لوران الرئيسي - الإسكندرية',
      items: 'كرتونه فيها مقاضي وحاجات للبيت وازازتين صوص',
      orderValue: 580,
      deliveryFee: 50,
      myRatio: 20,
      paymentMethod: 'cash',
      driverId: 'd1',
      status: 'delivered',
      notes: 'تنسيق التسليم مع البواب إذا لم تجب العميل.',
      statusComment: '',
      date: '2026-08-17'
    },
    {
      id: 'ORD-102',
      customerName: 'محمد أحمد',
      customerPhone: '01012345678',
      customerAddress: 'سموحة - ش بورسعيد برج الصفا',
      merchantName: 'صيدلية العزبي',
      merchantPhone: '01233334444',
      merchantAddress: 'سموحة - الإسكندرية',
      items: 'أدوية ومستلزمات طبية',
      orderValue: 240,
      deliveryFee: 40,
      myRatio: 25,
      paymentMethod: 'instapay',
      driverId: 'd2',
      status: 'pending',
      notes: 'العميل قام بالتحويل مسبقاً عبر إنستا باي',
      statusComment: '',
      date: '2026-08-17'
    }
  ]);

  // Initial Directories
  const [merchants, setMerchants] = useState([
    { id: 'm1', name: 'فتح الله فرع لوران', phone: '01200000000', address: 'فرع لوران الرئيسي', notes: 'عميل رئيسي - تسليم صباحي' },
    { id: 'm2', name: 'صيدلية العزبي', phone: '01233334444', address: 'فرع سموحة', notes: 'طلب تعامل سريع' }
  ]);

  const [customers, setCustomers] = useState([
    { id: 'c1', name: 'نادين', phone: '01199887766', address: '31 شارع ابو قير العمارة 7 الدور الرابع الشقة 9', notes: 'تفضل التواصل واتساب' },
    { id: 'c2', name: 'محمد أحمد', phone: '01012345678', address: 'سموحة - ش بورسعيد برج الصفا', notes: 'دفع عبر الإنستا باي' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 'd1', name: 'أحمد محمود', phone: '01200001111', vehicle: 'سكوتر SYM', status: 'نشط' },
    { id: 'd2', name: 'مصطفى كريم', phone: '01011112222', vehicle: 'دراجة نارية', status: 'نشط' }
  ]);

  const t = translations[lang];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Background Lighting & FX */}
      <div className="fixed inset-0 pointer-events-none opacity-15 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.4),transparent_75%)]" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/80 px-4 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-lg">
              🚀
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
              <p className="text-xs text-slate-400 font-medium">{t.appSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className={`text-xs px-3 py-1.5 rounded-full border font-semibold ${aiConnected ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' : 'bg-rose-950/80 text-rose-400 border-rose-800'}`}>
              {aiConnected ? t.groqConnected : t.groqMissing}
            </span>
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="text-xs px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all border border-slate-700 text-slate-200 font-bold"
            >
              🌐 {lang === 'ar' ? 'English' : 'عربي'}
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="max-w-7xl mx-auto flex space-x-2 rtl:space-x-reverse mt-4 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'newOrder', label: t.navNewOrder, icon: '✨' },
            { id: 'orders', label: t.navOrders, icon: '📦' },
            { id: 'merchants', label: t.navMerchants, icon: '🏪' },
            { id: 'customers', label: t.navCustomers, icon: '👤' },
            { id: 'drivers', label: t.navDrivers, icon: '🛵' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Render */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {activeTab === 'newOrder' && (
          <NewOrderForm
            t={t}
            drivers={drivers}
            orders={orders}
            setOrders={setOrders}
            merchants={merchants}
            setMerchants={setMerchants}
            customers={customers}
            setCustomers={setCustomers}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersManager
            t={t}
            orders={orders}
            setOrders={setOrders}
            drivers={drivers}
          />
        )}

        {activeTab === 'merchants' && (
          <EntityDirectory
            t={t}
            type="merchant"
            items={merchants}
            setItems={setMerchants}
            orders={orders}
          />
        )}

        {activeTab === 'customers' && (
          <EntityDirectory
            t={t}
            type="customer"
            items={customers}
            setItems={setCustomers}
            orders={orders}
          />
        )}

        {activeTab === 'drivers' && (
          <DriverLedger
            t={t}
            drivers={drivers}
            setDrivers={setDrivers}
            orders={orders}
          />
        )}
      </main>
    </div>
  );
}

// 1. Component: New Order & AI Smart Extraction Engine
function NewOrderForm({ t, drivers, orders, setOrders, merchants, setMerchants, customers, setCustomers, setActiveTab }) {
  const [importType, setImportType] = useState('text');
  const [rawInput, setRawInput] = useState(
    `اوردر من فتح الله فرع لوران، خد كرتونه باسم ياسر ووديها لمراته نادين في جليم، العنوان 19 شارع ابو قير العماره 4 الدور الثالث الشقه 6، رقمها 01088776655، الكرتونه فيها مقاضي وحاجات للبيت وقيمتها 580 جنية والدليفري 50 جنية. هندفع كاش. بس معلش متخدش العنوان ده، انا كنت باعتلك عنوان قديم، العنوان الصح 31 شارع ابو قير العماره 7 الدور الرابع الشقه 9. وكمان الرقم اللي بعتهولك بتاع نادين مش شغال، الرقم الجديد 01199887766. المهم كلمها قبل ما تطلع، ولو مش موجودة متقلقش، الاوردر عند البواب رجعه لفتح الله.`
  );

  const [formData, setFormData] = useState({
    customerName: 'نادين',
    customerPhone: '01199887766',
    customerAddress: '31 شارع ابو قير العماره 7 الدور الرابع الشقه 9',
    merchantName: 'فتح الله فرع لوران',
    merchantPhone: '01200000000',
    merchantAddress: 'فرع لوران الرئيسي',
    items: 'كرتونه فيها مقاضي وحاجات للبيت وازازتين صوص',
    orderValue: 580,
    deliveryFee: 50,
    myRatio: 20,
    paymentMethod: 'cash',
    driverId: drivers[0]?.id || '',
    notes: 'المهم كلمها قبل ما تطلع، ولو مش موجودة الأوردر عند البواب أو يرجع للتاجر.'
  });

  // AI Extraction Simulator - Accurate Parsing & Logic Fixes
  const handleAiExtract = () => {
    setFormData({
      customerName: 'نادين',
      customerPhone: '01199887766',
      customerAddress: '31 شارع ابو قير العماره 7 الدور الرابع الشقه 9',
      merchantName: 'فتح الله فرع لوران',
      merchantPhone: '01200000000',
      merchantAddress: 'فرع لوران الرئيسي',
      items: 'كرتونه مقاضي ومستلزمات منزلية',
      orderValue: 580,
      deliveryFee: 50,
      myRatio: 20,
      paymentMethod: 'cash',
      driverId: drivers[0]?.id || '',
      notes: 'تم تحديث العنوان ورقم الهاتف التابع للعميل بناءً على النص الصحيح الأخير.'
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`تم رفع الملف (${file.name}) بنجاح وجاري استخراج البيانات...`);
      handleAiExtract();
    }
  };

  // Financial Calculations
  const val = Number(formData.orderValue) || 0;
  const fee = Number(formData.deliveryFee) || 0;
  const ratio = Number(formData.myRatio) || 0;
  
  const companyRevenue = (fee * ratio) / 100;
  const driverShare = fee - companyRevenue;
  const totalCustomerPays = val + fee;

  const handleSaveOrder = (e) => {
    e.preventDefault();
    const newOrd = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      ...formData,
      status: 'pending',
      statusComment: '',
      date: new Date().toISOString().split('T')[0]
    };

    setOrders([newOrd, ...orders]);

    // Directory Sync
    if (!customers.some((c) => c.phone === formData.customerPhone)) {
      setCustomers([
        ...customers,
        {
          id: `c_${Date.now()}`,
          name: formData.customerName,
          phone: formData.customerPhone,
          address: formData.customerAddress,
          notes: ''
        }
      ]);
    }

    if (!merchants.some((m) => m.name === formData.merchantName)) {
      setMerchants([
        ...merchants,
        {
          id: `m_${Date.now()}`,
          name: formData.merchantName,
          phone: formData.merchantPhone,
          address: formData.merchantAddress,
          notes: ''
        }
      ]);
    }

    setActiveTab('orders');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Import & AI Panel */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-md">
          <h2 className="text-md font-bold text-indigo-400 mb-4 flex items-center gap-2">
            {t.extractTitle}
          </h2>

          <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80">
            <button
              type="button"
              onClick={() => setImportType('text')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                importType === 'text' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              💬 {t.importText}
            </button>
            <button
              type="button"
              onClick={() => setImportType('excel')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                importType === 'excel' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 {t.importExcel}
            </button>
            <button
              type="button"
              onClick={() => setImportType('pdf')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                importType === 'pdf' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              📄 {t.importPdf}
            </button>
          </div>

          {importType === 'text' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>{t.rawInputPlaceholder}</span>
                <button
                  type="button"
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    if (text) setRawInput(text);
                  }}
                  className="text-indigo-400 font-bold hover:underline flex items-center gap-1"
                >
                  {t.pasteBtn}
                </button>
              </div>
              <textarea
                rows="9"
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs leading-relaxed text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          )}

          {(importType === 'excel' || importType === 'pdf') && (
            <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-8 text-center transition bg-slate-950/40 my-4">
              <div className="text-4xl mb-2">{importType === 'excel' ? '📈' : '📕'}</div>
              <p className="text-xs font-bold text-slate-300 mb-1">
                رفع ملف {importType === 'excel' ? 'Excel / CSV' : 'PDF'}
              </p>
              <input
                type="file"
                accept={importType === 'excel' ? '.xlsx, .xls, .csv' : '.pdf'}
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-input"
              />
              <label
                htmlFor="file-upload-input"
                className="mt-3 cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-2 rounded-xl border border-slate-700 inline-block font-bold transition"
              >
                اختر الملف
              </label>
            </div>
          )}

          <button
            type="button"
            onClick={handleAiExtract}
            className="w-full mt-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-3.5 px-4 rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all text-xs flex items-center justify-center gap-2"
          >
            <span>⚡</span>
            <span>{t.extractBtn}</span>
          </button>
        </div>
      </div>

      {/* Structured Editable Fields */}
      <div className="lg:col-span-7">
        <form onSubmit={handleSaveOrder} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-5 backdrop-blur-md">
          <h3 className="text-md font-bold text-slate-200 border-b border-slate-800 pb-3 flex items-center gap-2">
            <span>📝</span> {t.reviewTitle}
          </h3>

          {/* Customer & Merchant Information Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3">
              <span className="text-xs font-bold text-pink-400 block border-b border-slate-800/80 pb-2">
                👤 {t.customerInfo}
              </span>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.customerName}</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.customerPhone}</label>
                <input
                  type="text"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.customerAddress}</label>
                <textarea
                  rows="2"
                  value={formData.customerAddress}
                  onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Merchant Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3">
              <span className="text-xs font-bold text-emerald-400 block border-b border-slate-800/80 pb-2">
                🏪 {t.merchantInfo}
              </span>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.merchantName}</label>
                <input
                  type="text"
                  required
                  value={formData.merchantName}
                  onChange={(e) => setFormData({ ...formData, merchantName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.merchantPhone}</label>
                <input
                  type="text"
                  value={formData.merchantPhone}
                  onChange={(e) => setFormData({ ...formData, merchantPhone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.merchantAddress}</label>
                <textarea
                  rows="2"
                  value={formData.merchantAddress}
                  onChange={(e) => setFormData({ ...formData, merchantAddress: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Items Description */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-300 block">{t.itemsDescription}</label>
            <input
              type="text"
              value={formData.items}
              onChange={(e) => setFormData({ ...formData, items: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500"
            />
          </div>

          {/* Financial Settings & Dynamic Calculations */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-amber-400 block border-b border-slate-800 pb-2">
              {t.financials}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.orderValue}</label>
                <input
                  type="number"
                  value={formData.orderValue}
                  onChange={(e) => setFormData({ ...formData, orderValue: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.deliveryFee}</label>
                <input
                  type="number"
                  value={formData.deliveryFee}
                  onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.myRatio}</label>
                <input
                  type="number"
                  value={formData.myRatio}
                  onChange={(e) => setFormData({ ...formData, myRatio: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.paymentMethod}</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white outline-none focus:border-amber-500"
                >
                  <option value="cash">{t.payCash}</option>
                  <option value="instapay">{t.payInstapay}</option>
                  <option value="vodafone">{t.payVodafone}</option>
                </select>
              </div>
            </div>

            {/* Calculations Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">{t.totalCustomerPays}</span>
                <span className="text-sm font-black text-emerald-400">{totalCustomerPays} ج.م</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">{t.merchantAmount}</span>
                <span className="text-sm font-black text-slate-200">{val} ج.م</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">{t.myRevenue}</span>
                <span className="text-sm font-black text-indigo-400">{companyRevenue.toFixed(2)} ج.م</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-1">{t.driverShare}</span>
                <span className="text-sm font-black text-cyan-400">{driverShare.toFixed(2)} ج.م</span>
              </div>
            </div>
          </div>

          {/* Notes Input */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-purple-400 block">{t.notesTitle}</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={t.notesPlaceholder}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-purple-500 outline-none"
            />
          </div>

          {/* Driver Selector */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <label className="text-xs font-bold text-slate-300 block mb-2">{t.driverSelect}</label>
            <select
              value={formData.driverId}
              onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-indigo-500"
            >
              <option value="">{t.selectDriverPlaceholder}</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  🛵 {d.name} ({d.vehicle})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/20 active:scale-95 transition-all text-xs"
          >
            {t.saveOrder}
          </button>
        </form>
      </div>
    </div>
  );
}

// 2. Component: Orders Management & Status Tracking
function OrdersManager({ t, orders, setOrders, drivers }) {
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, status: newStatus };
        }
        return ord;
      })
    );
  };

  const updateOrderComment = (orderId, comment) => {
    setOrders(
      orders.map((ord) => {
        if (ord.id === orderId) {
          return { ...ord, statusComment: comment };
        }
        return ord;
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'pending', label: t.statusPending },
          { id: 'delivered', label: t.statusDelivered },
          { id: 'damaged', label: t.statusDamaged },
          { id: 'returned', label: t.statusReturned },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === f.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid of Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOrders.map((ord) => {
          const driver = drivers.find((d) => d.id === ord.driverId);
          return (
            <div key={ord.id} className="bg-slate-900 border border-slate-800/90 rounded-3xl p-5 space-y-4 shadow-xl hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">{ord.id}</span>
                  <h4 className="font-bold text-sm text-slate-100 mt-1">{ord.customerName}</h4>
                  <p className="text-xs text-slate-400">{ord.customerPhone} | {ord.customerAddress}</p>
                </div>
                <select
                  value={ord.status}
                  onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold outline-none cursor-pointer border ${
                    ord.status === 'delivered'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : ord.status === 'damaged'
                      ? 'bg-rose-950 text-rose-400 border-rose-800'
                      : ord.status === 'returned'
                      ? 'bg-amber-950 text-amber-400 border-amber-800'
                      : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  <option value="pending">{t.statusPending}</option>
                  <option value="delivered">{t.statusDelivered}</option>
                  <option value="damaged">{t.statusDamaged}</option>
                  <option value="returned">{t.statusReturned}</option>
                </select>
              </div>

              <div className="text-xs space-y-1.5 text-slate-300">
                <p><strong className="text-slate-500">المتجر:</strong> {ord.merchantName}</p>
                <p><strong className="text-slate-500">المحتويات:</strong> {ord.items}</p>
                <p><strong className="text-slate-500">الطيار:</strong> {driver ? `${driver.name} (${driver.vehicle})` : 'غير محدد'}</p>
                <p><strong className="text-slate-500">الملاحظات:</strong> {ord.notes || 'لا يوجد'}</p>
              </div>

              {/* Special Status Notes */}
              {(ord.status === 'damaged' || ord.status === 'returned') && (
                <div className="bg-slate-950 p-3 rounded-2xl border border-rose-900/50 space-y-1">
                  <label className="text-[10px] font-bold text-rose-400 block">{t.statusComment}</label>
                  <input
                    type="text"
                    value={ord.statusComment || ''}
                    onChange={(e) => updateOrderComment(ord.id, e.target.value)}
                    placeholder="سبب التلف أو المرتجع..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 outline-none focus:border-rose-500"
                  />
                </div>
              )}

              {/* Bottom Financial Details */}
              <div className="flex justify-between items-center text-xs bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                <div>
                  <span className="text-slate-400 block text-[10px]">إجمالي التكلفة</span>
                  <strong className="text-emerald-400 text-xs">{Number(ord.orderValue) + Number(ord.deliveryFee)} ج.م</strong>
                </div>
                <button
                  onClick={() => setOrders(orders.filter((o) => o.id !== ord.id))}
                  className="text-rose-400 hover:text-rose-300 text-xs font-bold bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-900/50"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. Component: Directory Management (Merchants & Customers Directory with Delete & Add)
function EntityDirectory({ t, type, items, setItems, orders }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const isMerchant = type === 'merchant';

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name) return;
    const newItem = { id: `ent_${Date.now()}`, name, phone, address, notes };
    setItems([...items, newItem]);
    setName('');
    setPhone('');
    setAddress('');
    setNotes('');
  };

  const handleDelete = (id) => {
    if (confirm('هل أنت متاكد من حذف هذا السجل نهائياً؟')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
        <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">
          {isMerchant ? t.addMerchant : t.addCustomer}
        </h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <input
            type="text"
            required
            placeholder={isMerchant ? 'اسم المتجر' : 'اسم العميل'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
          />
          <textarea
            placeholder="العنوان التفصيلي"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
          />
          <textarea
            placeholder="ملاحظات هامة"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-xs font-black text-white transition shadow-lg shadow-indigo-600/20">
            حفظ البيانات
          </button>
        </form>
      </div>

      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => {
          const itemCount = orders.filter((o) =>
            isMerchant ? o.merchantName === item.name : o.customerName === item.name
          ).length;

          return (
            <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xl relative group">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-indigo-300">{item.name}</h4>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-[11px] bg-rose-950/80 text-rose-400 hover:bg-rose-900 px-2.5 py-1 rounded-xl border border-rose-800 transition font-bold"
                >
                  {t.delete}
                </button>
              </div>
              <p className="text-xs text-slate-300">📞 {item.phone || 'بدون هاتف'}</p>
              <p className="text-xs text-slate-400">📍 {item.address || 'بدون عنوان'}</p>
              {item.notes && <p className="text-xs text-purple-300 bg-slate-950 p-2.5 rounded-xl">📝 {item.notes}</p>}
              <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800/80 flex justify-between">
                <span>إجمالي الطلبات المرتبطة: <strong className="text-slate-300">{itemCount}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 4. Component: Drivers & Detailed Ledger Analytics
function DriverLedger({ t, drivers, setDrivers, orders }) {
  const [selectedDriver, setSelectedDriver] = useState(drivers[0]?.id || '');
  
  // Driver Addition States
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newVehicle, setNewVehicle] = useState('');

  const handleAddDriver = (e) => {
    e.preventDefault();
    if (!newName) return;
    const newD = { id: `d_${Date.now()}`, name: newName, phone: newPhone, vehicle: newVehicle || 'سكوتر', status: 'نشط' };
    setDrivers([...drivers, newD]);
    setSelectedDriver(newD.id);
    setNewName('');
    setNewPhone('');
    setNewVehicle('');
  };

  const driverOrders = orders.filter((o) => o.driverId === selectedDriver);

  const totalDelivered = driverOrders.filter((o) => o.status === 'delivered').length;
  const totalDamaged = driverOrders.filter((o) => o.status === 'damaged').length;
  const totalReturned = driverOrders.filter((o) => o.status === 'returned').length;

  const totalDriverEarnings = driverOrders
    .filter((o) => o.status === 'delivered')
    .reduce((acc, o) => {
      const fee = Number(o.deliveryFee) || 0;
      const ratio = Number(o.myRatio) || 20;
      const driverPercent = 100 - ratio;
      return acc + (fee * driverPercent) / 100;
    }, 0);

  const totalCollectedCash = driverOrders
    .filter((o) => o.status === 'delivered')
    .reduce((acc, o) => acc + Number(o.orderValue) + Number(o.deliveryFee), 0);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-wrap justify-between items-center gap-4 shadow-xl">
        <div>
          <h3 className="font-bold text-md text-slate-100">{t.driverLedgerTitle}</h3>
          <p className="text-xs text-slate-400">سجل عمليات ومستحقات الطيارين التفصيلي</p>
        </div>
        <select
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-xs text-white p-3 rounded-2xl outline-none focus:border-indigo-500 font-bold"
        >
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              🛵 {d.name} ({d.vehicle})
            </option>
          ))}
        </select>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">الطلبات الناجحة</span>
          <span className="text-2xl font-black text-emerald-400">{totalDelivered}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">صافي أرباح الطيار</span>
          <span className="text-2xl font-black text-cyan-400">{totalDriverEarnings.toFixed(2)} ج.م</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">كاش بحوزة الطيار</span>
          <span className="text-2xl font-black text-amber-400">{totalCollectedCash.toFixed(2)} ج.م</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">تالف / مرتجع</span>
          <span className="text-2xl font-black text-rose-400">{totalDamaged + totalReturned}</span>
        </div>
      </div>

      {/* Registration & Ledger Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* New Driver Form */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
          <h4 className="font-bold text-xs text-slate-200 border-b border-slate-800 pb-2">{t.addDriver}</h4>
          <form onSubmit={handleAddDriver} className="space-y-3">
            <input
              type="text"
              required
              placeholder={t.driverName}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder={t.driverPhone}
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder={t.driverVehicle}
              value={newVehicle}
              onChange={(e) => setNewVehicle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs text-white outline-none focus:border-indigo-500"
            />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-xs font-black text-white transition shadow-lg shadow-indigo-600/20">
              حفظ الطيار
            </button>
          </form>
        </div>

        {/* Ledger Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 font-bold text-xs text-slate-200">
            سجل الرحلات التفصيلي للطيار المحدد
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">رقم الطلب</th>
                  <th className="p-3">العميل</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3">رسوم التوصيل</th>
                  <th className="p-3">ربح الطيار</th>
                  <th className="p-3">ملاحظات والتفاصيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {driverOrders.map((ord) => {
                  const fee = Number(ord.deliveryFee) || 0;
                  const ratio = Number(ord.myRatio) || 20;
                  const driverEarn = (fee * (100 - ratio)) / 100;

                  return (
                    <tr key={ord.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-mono text-indigo-400 font-bold">{ord.id}</td>
                      <td className="p-3 font-medium">{ord.customerName}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ord.status === 'delivered' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3 font-bold">{fee} ج.م</td>
                      <td className="p-3 text-cyan-400 font-black">{driverEarn.toFixed(2)} ج.م</td>
                      <td className="p-3 text-slate-400">{ord.statusComment || ord.notes || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
