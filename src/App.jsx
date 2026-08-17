import React, { useState, useEffect, useRef } from 'react';

const translations = {
  ar: {
    appTitle: 'إكسبريس دليفري PRO',
    appSubtitle: 'النظام الذكي لإدارة الطلبات واللوجستيات',
    groqConnected: '🟢 AI متصل',
    groqMissing: '🔴 المفتاح مفقود',

    navNewOrder: 'طلب جديد',
    navOrders: 'إدارة الطلبات',
    navDrivers: 'الطيارين',
    navDriverLedger: 'كشف حساب الطيارين',
    navMerchants: 'التجار',
    navCustomers: 'العملاء',
    navHistory: 'السجل والتعديلات',
    navSettings: 'الإعدادات',

    kpiTotalCod: 'إجمالي المبالغ المحصلة',
    kpiRevenue: 'إجمالي إيراد التوصيل',
    kpiActiveOrders: 'طلبات نشطة',
    kpiCompleted: 'تم التوصيل',

    aiHeader: '✨ استخراج بيانات الطلب بواسطة AI',
    placeholderOrder: 'ألصق نص الطلب هنا...',
    btnPaste: '📋 لصق من الحافظة',
    btnExtract: '⚡ استخراج البيانات',
    btnExtracting: 'جاري التحليل والتدقيق...',
    reviewTitle: 'مراجعة البيانات المستخرجة:',

    store: 'المتجر',
    customer: 'العميل',
    phone: 'رقم الهاتف',
    cod: 'قيمة الطلب',
    deliveryFee: 'رسوم التوصيل',
    address: 'العنوان',
    item: 'الصنف',
    notes: 'الملاحظات',
    expectedArrival: 'وقت الوصول المتوقع',

    paymentMethod: 'طريقة الدفع',
    paymentCash: '💵 كاش عند الاستلام',
    paymentOnline: '💳 مدفوع أونلاين',
    paymentPrepaid: '✅ مدفوع مسبقًا',

    customerCollection: 'إجمالي ما يدفعه العميل',
    merchantAmount: 'مبلغ المتجر',
    revenuePercent: 'نسبتي من التوصيل',
    companyRevenue: 'إيرادي',
    driverRevenue: 'نصيب الطيار',
    driverCollection: 'ما سيحصله الطيار',

    addressWarning: '📍 تنبيه عنوان غير مكتمل: يرجى مراجعة وتأكيد العنوان!',
    selectDriver: 'اختيار طيار التوصيل:',
    chooseDriver: '-- اختر طيار --',
    chooseRevenue: 'نسبة إيرادي من رسوم التوصيل:',
    btnConfirm: '✅ تأكيد وحفظ الطلبات',

    searchPlaceholder: '🔍 بحث برقم الطلب، اسم العميل، المتجر، أو الهاتف...',
    unspecified: 'غير محدد',
    currency: 'ج.م',

    statusConfirmed: 'مؤكد',
    statusProcessing: 'قيد التجهيز',
    statusOutForDelivery: 'خرج للتوصيل',
    statusInTransit: 'جاري التوصيل',
    statusCompleted: 'مكتمل (تم التسليم)',
    statusDelayed: 'متأخر',
    statusCancelled: 'ملغي',
    statusDamaged: 'تالف',
    statusReturned: 'مرتجع',

    addDriver: 'إضافة طيار جديد',
    driverName: 'اسم الطيار...',
    btnAdd: 'إضافة',

    driverCash: 'إجمالي المبالغ المحصلة:',
    driverRevenueTotal: 'إجمالي نصيب الطيار:',
    companyRevenueTotal: 'إجمالي إيراد الشركة:',
    totalTrips: 'إجمالي الرحلات:',

    saveMerchant: 'إضافة أو تعديل تاجر',
    saveCustomer: 'إضافة عميل يدويًا',
    editCustomer: 'تعديل بيانات العميل',

    saveBtn: 'حفظ',
    deleteBtn: 'حذف',
    editBtn: 'تعديل',
    editNoteBtn: 'تعديل الملاحظات',

    settingsTitle: 'إعدادات النظام',
    enterpriseSettings: 'إعدادات المؤسسة المتقدمة',
    appName: 'اسم التطبيق',
    defaultCommission: 'النسبة الافتراضية للعمولة (%)',
    systemCurrency: 'عملة النظام',
    autoAssignDriver: 'تعيين الطيارين تلقائياً',
    dataBackup: 'النسخ الاحتياطي للبيانات',
    exportJson: 'تصدير البيانات (JSON)',
    importJson: 'استيراد البيانات (JSON)',

    confirmDbUpdateTitle: '⚠️ تأكيد تحديث بيانات قاعدة البيانات',
    confirmDbUpdateMsg: 'تم العثور على تفاصيل جديدة. هل تريد تحديث السجلات المخزنة أم ملء البيانات السابقة؟',
    confirmDeleteMsg: 'هل أنت متأكد من رغبتك في الحذف نهائيًا؟',

    typoAlertTitle: '🔍 تم رصد كلمات قد تحتوي على خطأ إملائي غير معروف:',
    historyTitle: '📜 سجل عمليات وتعديلات الطلبات',
    noHistory: 'لا توجد سجلات تعديل حتى الآن.',

    driverLedgerTitle: '📊 كشف حساب وتوريد الطيارين',
    filterDriver: 'تصفية بالطيار:',
    filterDate: 'التاريخ:',
    allDrivers: 'كل الطيارين',

    cashToHandIn: '💵 إجمالي التحصيل',
    companyRevenueLedger: '💰 إيراد الشركة',
    driverRevenueLedger: '🛵 نصيب الطيار',
    todaysOrdersCount: '📦 طلبات اليوم',
    monthsOrdersCount: '📅 طلبات الشهر الحالي',
    monthsTotalCash: '💰 إجمالي تحصيل الشهر',

    ordersHandled: 'تفاصيل الطلبات المسندة:',
    noOrdersForDate: 'لا توجد طلبات مسجلة لهذه الفلاتر.',

    financialBreakdown: '💰 التفاصيل المالية',
    cashCollection: 'المبلغ المحصل من العميل',
    merchantDue: 'مستحق المتجر',
    deliveryPool: 'رسوم التوصيل',
    myShare: 'نصيبي',
    driverShare: 'نصيب الطيار',

    onlineNoCollection: 'تم الدفع أونلاين — الطيار لا يحصّل قيمة الطلب من العميل.',
    cashCollectionExplanation: 'كاش — الطيار يحصّل قيمة الطلب + رسوم التوصيل.',
    cancelledFinancial: 'هذا الطلب ملغي — جميع المبالغ الفعلية للتسليم والإيراد = 0.',
    revenueExplanation: 'النسبة تطبق على رسوم التوصيل فقط، وليس على قيمة الطلب.',
    orderValueNotRevenue: 'قيمة الطلب ليست إيرادًا لك؛ هي مستحقات المتجر.',

    companyHandIn: 'المطلوب توريده للشركة',
    merchantHandIn: 'المطلوب توريده للمتجر',

    editDeliveryFee: 'تعديل رسوم التوصيل',
    deliveryFeeSaved: 'تم حفظ رسوم التوصيل',

    cancel: 'إلغاء',
    confirm: 'تأكيد',

    matchTitle: '🔍 مطابقة البيانات المسجلة',
    matchPrompt: 'تم العثور على سجلات مشابهة في النظام. يرجى اختيار الإجراء:',
    createNew: '➕ إنشاء سجل جديد (الاحتفاظ بكلاهما)',
    autofillBtn: '📋 استخدام البيانات المسجلة',
    updateBtn: '🔄 تحديث السجل الحالي بالبيانات الجديدة',
    viewDetails: 'عرض التفاصيل والطلبات',
    entityNotes: 'الملاحظات الخاصة:',
    addNotePlaceholder: 'أدخل ملاحظة هامة، مبالغ متعلقة، أو تذكير...',
    noOrdersFound: 'لا توجد طلبات مسجلة لهذا الاسم.',
    deletedBadge: '🗑️ محذوف',
    orderDetailsModal: 'تفاصيل الطلب والسجل التاريخي',
    fullEdit: 'تعديل شامل',
    saveChanges: 'حفظ التعديلات',
    
    importExportTitle: '📥📤 استيراد وتصدير البيانات',
    importTextWhatsapp: 'نص عادي / واتساب',
    importExcel: 'رفع ملف Excel / CSV',
    importPdf: 'رفع ملف PDF',
    dispatchDriver: '📲 إرسال للطيار عبر واتساب',
    reasonPrompt: 'يرجى إدخال سبب حالة التالف/المرتجع:',
    
    metricsDaily: 'يومي',
    metricsWeekly: 'أسبوعي',
    metricsMonthly: 'شهري'
  },

  en: {
    appTitle: 'Express Delivery PRO',
    appSubtitle: 'AI Logistics & Multi-Order Management Platform',
    groqConnected: '🟢 AI Active',
    groqMissing: '🔴 Key Missing',

    navNewOrder: 'New Order',
    navOrders: 'Manage Orders',
    navDrivers: 'Drivers',
    navDriverLedger: 'Driver Ledger',
    navMerchants: 'Stores',
    navCustomers: 'Customers',
    navHistory: 'Audit History',
    navSettings: 'Settings',

    kpiTotalCod: 'Total Collected',
    kpiRevenue: 'Total Delivery Revenue',
    kpiActiveOrders: 'Active Orders',
    kpiCompleted: 'Completed Orders',

    aiHeader: '✨ AI Order Extraction',
    placeholderOrder: 'Paste delivery text here...',
    btnPaste: '📋 Paste Clipboard',
    btnExtract: '⚡ Extract Data',
    btnExtracting: 'Analyzing & Checking...',
    reviewTitle: 'Extracted Orders Review:',

    store: 'Store',
    customer: 'Customer',
    phone: 'Phone',
    cod: 'Order Value',
    deliveryFee: 'Delivery Fee',
    address: 'Address',
    item: 'Item Details',
    notes: 'Notes',
    expectedArrival: 'Expected Arrival Time',

    paymentMethod: 'Payment Method',
    paymentCash: '💵 Cash on Delivery',
    paymentOnline: '💳 Paid Online',
    paymentPrepaid: '✅ Prepaid',

    customerCollection: 'Customer Total',
    merchantAmount: 'Merchant Amount',
    revenuePercent: 'My Delivery Share',
    companyRevenue: 'My Revenue',
    driverRevenue: 'Driver Share',
    driverCollection: 'Driver Collection',

    addressWarning: '📍 Incomplete Address Alert: Double check details!',
    selectDriver: 'Assign Driver:',
    chooseDriver: '-- Select Driver --',
    chooseRevenue: 'My percentage of delivery fee:',
    btnConfirm: '✅ Confirm & Save Orders',

    searchPlaceholder: '🔍 Search Order #, Customer, Store, Phone...',
    unspecified: 'N/A',
    currency: 'EGP',

    statusConfirmed: 'Confirmed',
    statusProcessing: 'Preparing',
    statusOutForDelivery: 'Out for Delivery',
    statusInTransit: 'In Transit',
    statusCompleted: 'Completed',
    statusDelayed: 'Delayed',
    statusCancelled: 'Cancelled',
    statusDamaged: 'Damaged',
    statusReturned: 'Returned',

    addDriver: 'Add Driver',
    driverName: 'Driver Name...',
    btnAdd: 'Add Driver',

    driverCash: 'Total Collected:',
    driverRevenueTotal: 'Driver Revenue:',
    companyRevenueTotal: 'Company Revenue:',
    totalTrips: 'Total Trips:',

    saveMerchant: 'Save Store Details',
    saveCustomer: 'Add Customer',
    editCustomer: 'Edit Customer',

    saveBtn: 'Save',
    deleteBtn: 'Delete',
    editBtn: 'Edit',
    editNoteBtn: 'Edit Note',

    settingsTitle: 'System Settings',
    enterpriseSettings: 'Enterprise Settings',
    appName: 'App Name',
    defaultCommission: 'Default Commission (%)',
    systemCurrency: 'System Currency',
    autoAssignDriver: 'Auto-Assign Drivers',
    dataBackup: 'Data Backup',
    exportJson: 'Export Data (JSON)',
    importJson: 'Import Data (JSON)',

    confirmDbUpdateTitle: '⚠️ Confirm Database Update',
    confirmDbUpdateMsg: 'New details found. Do you want to update existing records or autofill saved ones?',
    confirmDeleteMsg: 'Are you sure you want to permanently delete this?',

    typoAlertTitle: '🔍 Unrecognized words detected:',
    historyTitle: '📜 Audit Log & Order Edits History',
    noHistory: 'No edit history recorded yet.',

    driverLedgerTitle: '📊 Driver Cash & Revenue Ledger',
    filterDriver: 'Filter Driver:',
    filterDate: 'Filter Date:',
    allDrivers: 'All Drivers',

    cashToHandIn: '💵 Total Collected',
    companyRevenueLedger: '💰 Company Revenue',
    driverRevenueLedger: '🛵 Driver Share',
    todaysOrdersCount: "📦 Today's Orders",
    monthsOrdersCount: "📅 This Month's Orders",
    monthsTotalCash: "💰 This Month's Collection",

    ordersHandled: 'Assigned Orders & Financial Details:',
    noOrdersForDate: 'No orders match selected filters.',

    financialBreakdown: '💰 Financial Breakdown',
    cashCollection: 'Customer Collection',
    merchantDue: 'Merchant Due',
    deliveryPool: 'Delivery Fee',
    myShare: 'My Share',
    driverShare: 'Driver Share',

    onlineNoCollection: 'Paid online — driver does not collect the order value from the customer.',
    cashCollectionExplanation: 'Cash — driver collects the order value + delivery fee.',
    cancelledFinancial: 'This order is cancelled — all effective collection and revenue = 0.',
    revenueExplanation: 'The percentage applies only to the delivery fee, not the order value.',
    orderValueNotRevenue: 'Order value is not your revenue; it belongs to the merchant.',

    companyHandIn: 'Company Revenue Due',
    merchantHandIn: 'Merchant Amount Due',

    editDeliveryFee: 'Edit Delivery Fee',
    deliveryFeeSaved: 'Delivery fee saved',

    cancel: 'Cancel',
    confirm: 'Confirm',

    matchTitle: '🔍 Duplicate Record Matcher',
    matchPrompt: 'Similar records found in the system. Please select an action:',
    createNew: '➕ Create New Record (Keep Both)',
    autofillBtn: '📋 Autofill Existing Details',
    updateBtn: '🔄 Update Existing with New Info',
    viewDetails: 'View Profile & Orders History',
    entityNotes: 'Special Notes:',
    addNotePlaceholder: 'Enter important notes, financial amounts, or reminders...',
    noOrdersFound: 'No orders associated with this entry.',
    deletedBadge: '🗑️ Deleted',
    orderDetailsModal: 'Order Profile & Audit Log',
    fullEdit: 'Full Edit',
    saveChanges: 'Save Changes',
    
    importExportTitle: '📥📤 Data Import & Export',
    importTextWhatsapp: 'Plain Text / WhatsApp',
    importExcel: 'Upload Excel / CSV',
    importPdf: 'Upload PDF',
    dispatchDriver: '📲 Send to Driver via WhatsApp',
    reasonPrompt: 'Please enter the reason for Damaged/Returned:',
    
    metricsDaily: 'Daily',
    metricsWeekly: 'Weekly',
    metricsMonthly: 'Monthly'
  }
};

const REVENUE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 90, 100];
const CURRENCIES = ['EGP', 'USD', 'SAR', 'AED'];

const PAYMENT_CASH = 'cash';
const PAYMENT_ONLINE = 'online';
const PAYMENT_PREPAID = 'prepaid';

const normalizeNumber = value => {
  const n = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

// Injected Styles for Hover & Micro-Animations
const globalCSS = `
  .animate-fade-in { animation: fadeIn 0.3s ease forwards; }
  .hover-scale { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .hover-scale:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4); }
  .hover-glow:hover { box-shadow: 0 0 15px rgba(168, 85, 247, 0.6); }
  .smooth-transition { transition: all 0.3s ease; }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: rgba(23, 15, 38, 0.5); border-radius: 10px; }
  ::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.5); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.8); }
`;

const styles = {
  appWrapper: {
    backgroundColor: '#0A0614',
    minHeight: '100vh',
    color: '#F1F5F9',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    padding: '16px'
  },
  container: {
    maxWidth: '560px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px'
  },
  logoBox: {
    width: '72px',
    height: '72px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(168, 85, 247, 0.4)',
    marginBottom: '14px'
  },
  logoIcon: { fontSize: '32px', color: '#FFF' },
  appTitle: { fontSize: '1.6rem', margin: 0, fontWeight: '800', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' },
  appSubtitle: { fontSize: '0.85rem', color: '#C084FC', margin: '6px 0 0 0', fontWeight: '500' },
  kpiRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' },
  kpiCard: {
    padding: '16px',
    borderRadius: '18px',
    background: 'rgba(23, 15, 38, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  kpiLabel: { fontSize: '0.78rem', color: '#94A3B8', fontWeight: '500' },
  kpiValue: { fontSize: '1.4rem', fontWeight: '800' },
  navList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  primaryBtn: {
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    color: '#FFF',
    border: '1px solid rgba(192, 132, 252, 0.3)',
    padding: '16px 20px',
    borderRadius: '18px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
    transition: 'transform 0.2s ease, opacity 0.2s ease'
  },
  navItem: {
    background: 'rgba(23, 15, 38, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    color: '#E2E8F0',
    padding: '14px 18px',
    borderRadius: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  },
  navItemActive: {
    background: 'rgba(124, 58, 237, 0.25)',
    border: '1px solid #A855F7',
    color: '#FFF',
    padding: '14px 18px',
    borderRadius: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    fontWeight: '700',
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)'
  },
  navLeftLabel: { display: 'flex', alignItems: 'center', gap: '12px' },
  navIcon: { fontSize: '1.2rem', opacity: 0.85 },
  countBadge: { background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '2px 10px', fontSize: '0.8rem', fontWeight: '700', color: '#CBD5E1' },
  bottomSection: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' },
  langPill: { background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(51, 65, 85, 0.8)', color: '#E2E8F0', padding: '12px', borderRadius: '14px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  aiStatusPill: { padding: '12px', borderRadius: '14px', fontSize: '0.88rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  main: { display: 'flex', flexDirection: 'column', gap: '16px' },
  card: { background: 'rgba(23, 15, 38, 0.75)', border: '1px solid rgba(168, 85, 247, 0.15)', borderRadius: '20px', padding: '20px', backdropFilter: 'blur(12px)', marginBottom: '10px' },
  clickableCard: { background: 'rgba(23, 15, 38, 0.75)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '16px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s ease' },
  cardTitle: { margin: '0 0 15px 0', fontSize: '1.15rem', color: '#C084FC', fontWeight: '700' },
  rowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' },
  btnGradientCompact: { background: 'linear-gradient(135deg, #0284C7, #2563EB)', color: '#FFF', border: 'none', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },
  btnPrimaryGradient: { background: 'linear-gradient(135deg, #A855F7, #EC4899)', color: '#FFF', border: 'none', padding: '14px 20px', borderRadius: '14px', cursor: 'pointer', fontWeight: '700', width: '100%', marginTop: '12px', fontSize: '0.95rem', boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)' },
  btnSuccessGradient: { background: 'linear-gradient(135deg, #059669, #10B981)', color: '#FFF', border: 'none', padding: '14px 20px', borderRadius: '14px', cursor: 'pointer', fontWeight: '700', width: '100%', marginTop: '15px', fontSize: '0.95rem' },
  textarea: { width: '100%', backgroundColor: 'rgba(11, 7, 24, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '14px', color: '#FFF', padding: '14px', boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', resize: 'vertical' },
  extractedBox: { marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' },
  extractedSubCard: { background: 'rgba(11, 7, 24, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px', marginBottom: '15px' },
  orderHero: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '12px', marginBottom: '15px' },
  miniLabel: { fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' },
  heroCustomer: { fontSize: '1.05rem', fontWeight: '700', marginTop: '2px' },
  heroMoney: { fontSize: '1.3rem', fontWeight: '800', color: '#38BDF8' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' },
  financePanel: { background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(51, 65, 85, 0.6)', borderRadius: '12px', padding: '14px', marginTop: '15px' },
  financeTitle: { fontSize: '0.9rem', fontWeight: '700', color: '#FACC15', marginBottom: '10px' },
  financeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' },
  financeBox: { display: 'flex', flexDirection: 'column', gap: '4px' },
  financeInput: { background: 'rgba(11, 7, 24, 0.8)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#FFF', padding: '8px', borderRadius: '8px', outline: 'none' },
  calculationStrip: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', background: 'rgba(11, 7, 24, 0.8)', padding: '12px', borderRadius: '10px', marginTop: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' },
  confirmationPanel: { background: 'rgba(11, 7, 24, 0.7)', border: '1px solid #7C3AED', borderRadius: '16px', padding: '16px', marginTop: '20px' },
  label: { display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '6px', fontWeight: '500' },
  input: { width: '100%', background: 'rgba(11, 7, 24, 0.8)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#FFF', padding: '10px 14px', borderRadius: '10px', boxSizing: 'border-box', outline: 'none' },
  revenueSelect: { width: '100%', background: 'rgba(11, 7, 24, 0.8)', border: '1px solid #10B981', color: '#34D399', padding: '10px 14px', borderRadius: '10px', fontWeight: '700', boxSizing: 'border-box', outline: 'none' },
  searchInput: { width: '100%', background: 'rgba(23, 15, 38, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)', color: '#FFF', padding: '14px', borderRadius: '14px', marginBottom: '15px', boxSizing: 'border-box', outline: 'none' },
  empty: { textAlign: 'center', color: '#64748B', padding: '40px 0' },
  orderNumTag: { background: '#2563EB', color: '#FFF', padding: '3px 10px', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem' },
  tagStore: { background: 'rgba(255,255,255,0.1)', color: '#E2E8F0', padding: '3px 10px', borderRadius: '8px', fontSize: '0.85rem' },
  btnDeleteCompact: { background: '#EF4444', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' },
  p: { margin: '6px 0', color: '#CBD5E1', fontSize: '0.9rem' },
  addressWarningBox: { background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', color: '#FCA5A5', padding: '10px', borderRadius: '10px', margin: '8px 0', fontSize: '0.82rem' },
  monthlySummary: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', background: 'rgba(23, 15, 38, 0.7)', padding: '15px', borderRadius: '14px', marginTop: '15px', border: '1px solid rgba(255, 255, 255, 0.08)' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '16px' },
  modalCard: { background: '#160E2E', border: '1px solid #7C3AED', borderRadius: '20px', padding: '24px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' },
  formGroup: { marginBottom: '12px' }
};

const getStatusStyle = status => {
  const base = { padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', border: 'none', color: '#FFF', cursor: 'pointer' };
  switch (status) {
    case 'مكتمل': case 'Completed': return { ...base, background: '#059669' };
    case 'ملغي': case 'Cancelled': return { ...base, background: '#DC2626' };
    case 'متأخر': case 'Delayed': return { ...base, background: '#D97706' };
    case 'خرج للتوصيل': case 'Out for Delivery':
    case 'جاري التوصيل': case 'In Transit': return { ...base, background: '#2563EB' };
    case 'تالف': case 'Damaged': return { ...base, background: '#991B1B' };
    case 'مرتجع': case 'Returned': return { ...base, background: '#B45309' };
    default: return { ...base, background: '#475569' };
  }
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'ar');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [activeTab, setActiveTab] = useState('new_order');
  const [searchQuery, setSearchQuery] = useState('');

  // Enterprise Settings
  const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('delivery_settings_v2')) || {
    appName: 'Express Delivery PRO',
    defaultCommission: 20,
    currency: 'EGP',
    autoAssign: false
  });

  const [orderCounter, setOrderCounter] = useState(() => parseInt(localStorage.getItem('order_counter_num') || '1001'));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_orders_v5') || '[]'));
  const [deletedOrders, setDeletedOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_deleted_orders_v5') || '[]'));
  
  const [merchants, setMerchants] = useState(() => JSON.parse(localStorage.getItem('delivery_merchants_v5') || '[]'));
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('delivery_customers_v5') || '[]'));
  
  // Migrate drivers from string[] to object[] if needed
  const [drivers, setDrivers] = useState(() => {
    const raw = JSON.parse(localStorage.getItem('delivery_drivers_v6') || '[]');
    if (raw.length === 0) return [{id: 1, name: 'أحمد', phone: '', notes: ''}, {id: 2, name: 'محمود', phone: '', notes: ''}];
    return raw.map(d => typeof d === 'string' ? { id: Date.now() + Math.random(), name: d, phone: '', notes: '' } : d);
  });
  
  const [historyLogs, setHistoryLogs] = useState(() => JSON.parse(localStorage.getItem('delivery_history_v5') || '[]'));

  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedOrders, setExtractedOrders] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedRevenuePercent, setSelectedRevenuePercent] = useState(settings.defaultCommission);
  
  const [newDriverName, setNewDriverName] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');

  const [ledgerDriver, setLedgerDriver] = useState('');
  const [ledgerDate, setLedgerDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [typoFlags, setTypoFlags] = useState([]);
  const [showTypoModal, setShowTypoModal] = useState(false);

  // Forms for completely separated data
  const [merchantForm, setMerchantForm] = useState({ id: null, name: '', phone: '', address: '', notes: '' });
  const [customerForm, setCustomerForm] = useState({ id: null, name: '', phone: '', address: '', notes: '' });

  // Modals state
  const [activeEntityModal, setActiveEntityModal] = useState(null); // { type: 'customer'|'merchant'|'driver', data: object }
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null);
  const [editOrderModal, setEditOrderModal] = useState(null);
  const [matchingPromptModal, setMatchingPromptModal] = useState(null); // Explicit duplicate handling

  const [fileInputMethod, setFileInputMethod] = useState('');
  
  const t = translations[lang];

  useEffect(() => { localStorage.setItem('app_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('groq_api_key', apiKey); }, [apiKey]);
  useEffect(() => { localStorage.setItem('delivery_settings_v2', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('order_counter_num', orderCounter.toString()); }, [orderCounter]);
  useEffect(() => { localStorage.setItem('delivery_orders_v5', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('delivery_deleted_orders_v5', JSON.stringify(deletedOrders)); }, [deletedOrders]);
  useEffect(() => { localStorage.setItem('delivery_merchants_v5', JSON.stringify(merchants)); }, [merchants]);
  useEffect(() => { localStorage.setItem('delivery_customers_v5', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('delivery_drivers_v6', JSON.stringify(drivers)); }, [drivers]);
  useEffect(() => { localStorage.setItem('delivery_history_v5', JSON.stringify(historyLogs)); }, [historyLogs]);

  // Auto-Late Tracker Effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let updated = false;
      const newOrders = orders.map(o => {
        if (o.expectedArrival && !['مكتمل', 'ملغي', 'تالف', 'مرتجع', 'متأخر'].includes(o.status)) {
          const expectedTime = new Date(o.expectedArrival);
          if (now > expectedTime) {
            updated = true;
            addAuditLog(o.orderNum, 'Auto-Status Update', `System marked order as Delayed because Expected Time passed.`);
            return { ...o, status: 'متأخر' };
          }
        }
        return o;
      });
      if (updated) setOrders(newOrders);
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [orders]);

  /* Financial logic */
  const isCancelled = order => ['ملغي', 'تالف', 'مرتجع'].includes(order?.status);
  const getOrderValue = order => normalizeNumber(order?.cod);
  const getDeliveryFee = order => normalizeNumber(order?.deliveryFee);
  const getRevenuePercent = order => normalizeNumber(order?.revenuePercent);

  const getCompanyRevenue = order => isCancelled(order) ? 0 : getDeliveryFee(order) * (getRevenuePercent(order) / 100);
  const getDriverRevenue = order => isCancelled(order) ? 0 : getDeliveryFee(order) * (1 - getRevenuePercent(order) / 100);
  
  const getCustomerCollection = order => {
    if (isCancelled(order)) return 0;
    if (order?.paymentMethod === PAYMENT_ONLINE || order?.paymentMethod === PAYMENT_PREPAID) return getDeliveryFee(order);
    return getOrderValue(order) + getDeliveryFee(order);
  };

  const getOrderEffectiveCash = order => isCancelled(order) ? 0 : getCustomerCollection(order);

  const addAuditLog = (orderNum, action, details) => {
    const log = { id: Date.now() + Math.random(), orderNum, action, details, time: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US') };
    setHistoryLogs(prev => [log, ...prev]);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch { alert(lang === 'ar' ? 'تم رفض صلاحية الحافظة.' : 'Clipboard permission denied.'); }
  };

  const isIncompleteAddress = addressStr => {
    if (!addressStr || addressStr === t.unspecified || addressStr.length < 10) return true;
    const lower = addressStr.toLowerCase();
    return !['شارع', 'ش', 'دور', 'شقة', 'عمارة', 'مبنى', 'street', 'st', 'floor', 'apt', 'flat'].some(k => lower.includes(k));
  };

  /* AI Order Extraction */
  const extractOrderInfo = async () => {
    if (!apiKey.trim()) { alert(lang === 'ar' ? 'يرجى إدخال مفتاح Groq API في الإعدادات.' : 'Please add your API key in Settings.'); setActiveTab('settings'); return; }
    if (!rawText.trim()) { alert(lang === 'ar' ? 'يرجى إدخال نص.' : 'Please enter text.'); return; }

    setLoading(true); setExtractedOrders([]); setTypoFlags([]);

    const systemPrompt = `
You are an expert delivery-order parser. Extract delivery orders from text.
RULES:
1. STORE: Extract merchant name.
2. CUSTOMER: Extract customer name.
3. PHONE: Extract phone numbers.
4. ADDRESS: Full address.
5. COD: Merchandise value ONLY.
6. DELIVERY FEE: Explicit delivery fee or 0.
7. PAYMENT METHOD: 'cash', 'online', or 'prepaid'.
8. NOTES: Any extra info.
9. EXPECTED ARRIVAL: ISO datetime string if mentioned, else null.
Output JSON: { "ambiguous_flags": [], "orders": [{ "store":"", "customer":"", "phone":"", "address":"", "cod":0, "deliveryFee":0, "paymentMethod":"cash", "item":"", "notes":"", "expectedArrival": null }] }`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey.trim()}` },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: rawText }], response_format: { type: 'json_object' }, temperature: 0.1 })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Extraction Failed');

      const parsed = JSON.parse(data.choices[0].message.content);
      if (parsed.ambiguous_flags?.length) { setTypoFlags(parsed.ambiguous_flags); setShowTypoModal(true); }

      const normalizedOrders = (parsed.orders || []).map(order => ({
        ...order,
        cod: normalizeNumber(order.cod),
        deliveryFee: normalizeNumber(order.deliveryFee),
        paymentMethod: ['online','prepaid'].includes(order.paymentMethod) ? order.paymentMethod : PAYMENT_CASH
      }));

      setExtractedOrders(normalizedOrders);
      checkDuplicateMatchesForExtraction(normalizedOrders);

      if(settings.autoAssign && drivers.length > 0) {
        setSelectedDriver(drivers[0].name); // Simple auto-assign
      }

    } catch (err) { alert(`Error: ${err.message}`); } finally { setLoading(false); }
  };

  const checkDuplicateMatchesForExtraction = (extractedList) => {
    // Only keeping UI flow simple, matching logic during Confirm
  };

  const updateExtractedOrder = (index, field, value) => {
    setExtractedOrders(prev => prev.map((order, i) => i === index ? { ...order, [field]: ['cod','deliveryFee'].includes(field) ? normalizeNumber(value) : value } : order));
  };

  /* Confirm Orders */
  const handleConfirmOrder = () => {
    if (!extractedOrders.length) return;
    if (!selectedDriver) { alert(t.chooseDriver); return; }

    let currentNum = orderCounter;
    const now = new Date();
    const isoDateStr = now.toISOString().split('T')[0];

    const newCreatedOrders = extractedOrders.map(ord => {
      const orderNumber = `#${currentNum++}`;
      const newOrder = {
        id: Date.now() + Math.random(),
        orderNum: orderNumber,
        store: ord.store || t.unspecified,
        customer: ord.customer || t.unspecified,
        phone: ord.phone || '',
        address: ord.address || t.unspecified,
        cod: ord.cod,
        deliveryFee: ord.deliveryFee,
        paymentMethod: ord.paymentMethod || PAYMENT_CASH,
        revenuePercent: selectedRevenuePercent,
        item: ord.item || '',
        notes: ord.notes || '',
        expectedArrival: ord.expectedArrival || '',
        driver: selectedDriver,
        status: 'مؤكد',
        isoDate: isoDateStr,
        date: now.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      };

      addAuditLog(orderNumber, 'Created', `Order created for ${newOrder.customer}. COD: ${newOrder.cod}, Fee: ${newOrder.deliveryFee}.`);

      // Independent Merchant / Customer handling
      if (ord.store && ord.store !== t.unspecified) {
        setMerchants(prev => {
          const exists = prev.find(m => m.name.toLowerCase() === ord.store.toLowerCase());
          if (exists) return prev;
          return [{ id: Date.now() + Math.random(), name: ord.store, phone: ord.phone, address: '', notes: '' }, ...prev];
        });
      }
      if (ord.customer && ord.customer !== t.unspecified) {
        setCustomers(prev => {
          const exists = prev.find(c => c.name.toLowerCase() === ord.customer.toLowerCase() || c.phone === ord.phone);
          if (exists) return prev;
          return [{ id: Date.now() + Math.random(), name: ord.customer, phone: ord.phone, address: ord.address, notes: '' }, ...prev];
        });
      }

      return newOrder;
    });

    setOrderCounter(currentNum);
    setOrders(prev => [...newCreatedOrders, ...prev]);
    setRawText(''); setExtractedOrders([]); setSelectedDriver('');
    setActiveTab('orders');
  };

  /* Actions */
  const handleDeleteOrder = order => {
    if (window.confirm(`${t.confirmDeleteMsg} (${order.orderNum})`)) {
      setOrders(prev => prev.filter(o => o.id !== order.id));
      setDeletedOrders(prev => [{ ...order, deletedAt: new Date().toLocaleString() }, ...prev]);
      addAuditLog(order.orderNum, 'Deleted', `Order for ${order.customer} permanently deleted.`);
    }
  };

  const handleStatusChange = (order, newStatus) => {
    let extraNote = '';
    if (newStatus === 'تالف' || newStatus === 'مرتجع') {
      const reason = window.prompt(t.reasonPrompt);
      if(reason) extraNote = ` | Reason: ${reason}`;
    }
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, status: newStatus, notes: o.notes + (extraNote ? `\n[${newStatus}]: ${extraNote}` : '') } : o)));
    addAuditLog(order.orderNum, 'Status Change', `Status changed to "${newStatus}"${extraNote}`);
  };

  // Manual Creation logic w/ Duplicate Checks
  const handleSaveCustomer = () => {
    if (!customerForm.name.trim() || !customerForm.phone.trim()) return alert('Name/Phone required');
    
    // Check dupe
    if (!customerForm.id) {
      const matches = customers.filter(c => c.name.toLowerCase() === customerForm.name.toLowerCase() || c.phone === customerForm.phone);
      if (matches.length > 0) {
        setMatchingPromptModal({ type: 'customer', form: customerForm, matches });
        return;
      }
    }

    if (customerForm.id) {
      setCustomers(prev => prev.map(c => c.id === customerForm.id ? { ...customerForm } : c));
    } else {
      setCustomers(prev => [{ ...customerForm, id: Date.now() }, ...prev]);
    }
    setCustomerForm({ id: null, name: '', phone: '', address: '', notes: '' });
  };

  const handleSaveMerchant = () => {
    if (!merchantForm.name.trim()) return alert('Name required');

    if (!merchantForm.id) {
      const matches = merchants.filter(m => m.name.toLowerCase() === merchantForm.name.toLowerCase() || (m.phone && m.phone === merchantForm.phone));
      if (matches.length > 0) {
        setMatchingPromptModal({ type: 'merchant', form: merchantForm, matches });
        return;
      }
    }

    if (merchantForm.id) {
      setMerchants(prev => prev.map(m => m.id === merchantForm.id ? { ...merchantForm } : m));
    } else {
      setMerchants(prev => [{ ...merchantForm, id: Date.now() }, ...prev]);
    }
    setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
  };

  const handleResolveDuplicate = (action, matchRecord = null) => {
    const { type, form } = matchingPromptModal;
    if (action === 'create_new') {
      if(type === 'customer') setCustomers(prev => [{ ...form, id: Date.now() }, ...prev]);
      if(type === 'merchant') setMerchants(prev => [{ ...form, id: Date.now() }, ...prev]);
    } else if (action === 'update') {
      if(type === 'customer') setCustomers(prev => prev.map(c => c.id === matchRecord.id ? { ...c, ...form, id: c.id } : c));
      if(type === 'merchant') setMerchants(prev => prev.map(m => m.id === matchRecord.id ? { ...m, ...form, id: m.id } : m));
    }
    setMatchingPromptModal(null);
    setCustomerForm({ id: null, name: '', phone: '', address: '', notes: '' });
    setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
  };

  const handleDeleteEntity = (type, id) => {
    if (window.confirm(t.confirmDeleteMsg)) {
      if (type === 'customer') setCustomers(prev => prev.filter(c => c.id !== id));
      if (type === 'merchant') setMerchants(prev => prev.filter(m => m.id !== id));
      if (type === 'driver') setDrivers(prev => prev.filter(d => d.id !== id));
      setActiveEntityModal(null);
    }
  };

  const handleAddDriver = () => {
    if (!newDriverName.trim()) return;
    setDrivers(prev => [...prev, { id: Date.now(), name: newDriverName.trim(), phone: newDriverPhone.trim(), notes: '' }]);
    setNewDriverName(''); setNewDriverPhone('');
  };

  const exportJSON = () => {
    const data = { settings, orders, merchants, customers, drivers, historyLogs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `ExpressDelivery_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if(!file) return;
    
    // Fake parsing to inject into AI flow since we lack actual libraries
    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target.result;
      if (file.name.endsWith('.json')) {
        try {
          const parsed = JSON.parse(result);
          if (parsed.orders) setOrders(parsed.orders);
          if (parsed.customers) setCustomers(parsed.customers);
          if (parsed.merchants) setMerchants(parsed.merchants);
          if (parsed.drivers) setDrivers(parsed.drivers);
          alert('Import Successful!');
        } catch(e) { alert('Invalid JSON file.'); }
      } else {
        setRawText(`[Extracted from ${file.name}]\n\n${result}`);
        setActiveTab('new_order');
        alert('File contents moved to New Order text area for AI extraction.');
      }
    };
    reader.readAsText(file);
  };

  const generateWhatsAppLink = (order) => {
    const msg = `طلب جديد📦\nرقم: ${order.orderNum}\nالمتجر: ${order.store}\nالعميل: ${order.customer}\nالهاتف: ${order.phone}\nالعنوان: ${order.address}\nالتحصيل: ${getOrderEffectiveCash(order)} ${t.currency}\nملاحظات: ${order.notes}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  /* Calculated metrics */
  const completedOrders = orders.filter(o => o.status === 'مكتمل');
  const activeOrdersCount = orders.filter(o => !['مكتمل', 'ملغي', 'تالف', 'مرتجع'].includes(o.status)).length;
  const filteredOrders = orders.filter(o => (o.orderNum||'').toLowerCase().includes(searchQuery.toLowerCase()) || (o.customer||'').toLowerCase().includes(searchQuery.toLowerCase()) || (o.store||'').toLowerCase().includes(searchQuery.toLowerCase()) || (o.phone||'').includes(searchQuery));

  /* Ledger calculations */
  const selectedYearMonth = ledgerDate.substring(0, 7);
  const filteredLedgerOrders = orders.filter(o => (!ledgerDriver || o.driver === ledgerDriver) && o.isoDate === ledgerDate);
  const dailyCollected = filteredLedgerOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);
  const dailyCompanyRevenue = filteredLedgerOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getCompanyRevenue(o), 0);
  const dailyDriverRevenue = filteredLedgerOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getDriverRevenue(o), 0);

  const monthlyOrders = orders.filter(o => (!ledgerDriver || o.driver === ledgerDriver) && (o.isoDate || '').startsWith(selectedYearMonth));
  const monthlyTotalCash = monthlyOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);
  const monthlyCompanyRevenue = monthlyOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getCompanyRevenue(o), 0);
  const monthlyDriverRevenue = monthlyOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getDriverRevenue(o), 0);

  return (
    <div style={styles.appWrapper} className="animate-fade-in">
      <style>{globalCSS}</style>
      <div style={{ ...styles.container, direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
        
        {/* HEADER */}
        <header style={styles.header}>
          <div style={{...styles.logoBox, transition: 'transform 0.3s ease'}} className="hover-glow"><span style={styles.logoIcon}>⚡</span></div>
          <h1 style={styles.appTitle}><span>🚀</span> {settings.appName || t.appTitle}</h1>
          <p style={styles.appSubtitle}>{t.appSubtitle}</p>
        </header>

        {/* KPIS */}
        <div style={styles.kpiRow}>
          <div style={styles.kpiCard} className="hover-scale">
            <span style={styles.kpiLabel}>⏱️ {t.kpiActiveOrders}</span>
            <span style={{ ...styles.kpiValue, color: '#C084FC' }}>{activeOrdersCount}</span>
          </div>
          <div style={styles.kpiCard} className="hover-scale">
            <span style={styles.kpiLabel}>📦 {t.kpiCompleted}</span>
            <span style={{ ...styles.kpiValue, color: '#38BDF8' }}>{completedOrders.length}</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <div style={styles.navList}>
          <button style={styles.primaryBtn} className="hover-scale" onClick={() => setActiveTab('new_order')}>
            <span>➕</span> {t.navNewOrder}
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button style={activeTab === 'orders' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('orders')}>
              <div style={styles.navLeftLabel}><span style={styles.navIcon}>📦</span><span>{t.navOrders}</span></div><span style={styles.countBadge}>{orders.length}</span>
            </button>
            <button style={activeTab === 'driver_ledger' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('driver_ledger')}>
              <div style={styles.navLeftLabel}><span style={styles.navIcon}>📋</span><span>{t.navDriverLedger}</span></div>
            </button>
            <button style={activeTab === 'drivers' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('drivers')}>
              <div style={styles.navLeftLabel}><span style={styles.navIcon}>🛵</span><span>{t.navDrivers}</span></div><span style={styles.countBadge}>{drivers.length}</span>
            </button>
            <button style={activeTab === 'merchants' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('merchants')}>
              <div style={styles.navLeftLabel}><span style={styles.navIcon}>🏪</span><span>{t.navMerchants}</span></div><span style={styles.countBadge}>{merchants.length}</span>
            </button>
            <button style={activeTab === 'customers' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('customers')}>
              <div style={styles.navLeftLabel}><span style={styles.navIcon}>👥</span><span>{t.navCustomers}</span></div><span style={styles.countBadge}>{customers.length}</span>
            </button>
            <button style={activeTab === 'history' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('history')}>
              <div style={styles.navLeftLabel}><span style={styles.navIcon}>🕒</span><span>{t.navHistory}</span></div>
            </button>
          </div>
          <button style={activeTab === 'settings' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('settings')}>
            <div style={styles.navLeftLabel}><span style={styles.navIcon}>⚙️</span><span>{t.navSettings}</span></div>
          </button>
        </div>

        {/* BOTTOM SECTION */}
        <div style={styles.bottomSection}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
             <button style={styles.langPill} className="hover-scale" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}><span>🌐</span> {lang === 'ar' ? 'English' : 'العربية'}</button>
             <div style={{ ...styles.aiStatusPill, background: apiKey ? 'rgba(6, 78, 59, 0.6)' : 'rgba(127, 29, 29, 0.6)', border: apiKey ? '1px solid #10B981' : '1px solid #EF4444', color: apiKey ? '#A7F3D0' : '#FCA5A5' }}>
               {apiKey ? t.groqConnected : t.groqMissing}
             </div>
          </div>
        </div>

        {/* MAIN VIEWS */}
        <main style={styles.main}>
          {/* NEW ORDER */}
          {activeTab === 'new_order' && (
            <div style={styles.card} className="animate-fade-in">
              <div style={styles.rowBetween}>
                <h2 style={styles.cardTitle}>{t.aiHeader}</h2>
                <button onClick={handlePasteClipboard} style={styles.btnGradientCompact} className="hover-scale">{t.btnPaste}</button>
              </div>
              <textarea rows={7} value={rawText} onChange={e => setRawText(e.target.value)} placeholder={t.placeholderOrder} style={styles.textarea} />
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <input type="file" id="fileUpload" style={{ display: 'none' }} accept=".txt,.csv,.json,.pdf" onChange={handleFileUpload} />
                <button onClick={() => document.getElementById('fileUpload').click()} style={{...styles.btnGradientCompact, background: '#475569', flex: 1}} className="hover-scale">📄 {t.importTextWhatsapp}</button>
                <button onClick={() => document.getElementById('fileUpload').click()} style={{...styles.btnGradientCompact, background: '#059669', flex: 1}} className="hover-scale">📊 {t.importExcel}</button>
              </div>

              <button onClick={extractOrderInfo} disabled={loading} style={styles.btnPrimaryGradient} className="hover-scale">
                {loading ? t.btnExtracting : t.btnExtract}
              </button>

              {/* DUPLICATE/MATCH PROMPT MODAL */}
              {matchingPromptModal && (
                <div style={styles.modalOverlay}>
                  <div style={styles.modalCard} className="animate-fade-in">
                    <h3 style={{ margin: '0 0 10px', color: '#38BDF8' }}>{t.matchTitle}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>{t.matchPrompt}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
                      {matchingPromptModal.matches.map((match, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
                          <strong style={{ color: '#FACC15' }}>{match.name}</strong> ({match.phone || 'N/A'})
                          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                            <button onClick={() => handleResolveDuplicate('update', match)} style={{ ...styles.btnGradientCompact, background: 'linear-gradient(135deg,#059669,#10B981)' }} className="hover-scale">
                              {t.updateBtn}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => handleResolveDuplicate('create_new')} style={{ ...styles.btnSuccessGradient, background: '#475569' }} className="hover-scale">
                      {t.createNew}
                    </button>
                  </div>
                </div>
              )}

              {/* EXTRACTED ORDERS REVIEW */}
              {extractedOrders.length > 0 && (
                <div style={styles.extractedBox}>
                  <h3 style={{ marginTop: 0, color: '#FACC15' }}>{t.reviewTitle}</h3>
                  {extractedOrders.map((ord, idx) => {
                    const collection = ord.paymentMethod === PAYMENT_ONLINE || ord.paymentMethod === PAYMENT_PREPAID ? normalizeNumber(ord.deliveryFee) : normalizeNumber(ord.cod) + normalizeNumber(ord.deliveryFee);
                    return (
                      <div key={idx} style={styles.extractedSubCard}>
                        <div style={{ ...styles.orderHero, background: 'linear-gradient(135deg,rgba(168,85,247,0.2),rgba(236,72,153,0.2))' }}>
                          <div><div style={styles.miniLabel}>{t.customer}</div><div style={styles.heroCustomer}>👤 {ord.customer || t.unspecified}</div></div>
                          <div style={styles.heroMoney}>{collection.toLocaleString()} {settings.currency}</div>
                        </div>
                        {isIncompleteAddress(ord.address) && <div style={styles.addressWarningBox}>{t.addressWarning}</div>}
                        <div style={styles.grid2}>
                          <div><strong>{t.store}:</strong> {ord.store || t.unspecified}</div>
                          <div><strong>{t.phone}:</strong> {ord.phone || t.unspecified}</div>
                          <div style={{ gridColumn: '1 / -1' }}><strong>{t.address}:</strong> {ord.address || t.unspecified}</div>
                          <div style={{ gridColumn: '1 / -1' }}><strong>{t.notes}:</strong> <input type="text" value={ord.notes} onChange={e => updateExtractedOrder(idx, 'notes', e.target.value)} style={styles.input} /></div>
                          <div style={{ gridColumn: '1 / -1' }}><strong>{t.expectedArrival}:</strong> <input type="datetime-local" value={ord.expectedArrival||''} onChange={e => updateExtractedOrder(idx, 'expectedArrival', e.target.value)} style={styles.input} /></div>
                        </div>
                        <div style={styles.financePanel}>
                          <div style={styles.financeTitle}>💰 {t.financialBreakdown}</div>
                          <div style={styles.financeGrid}>
                            <div style={styles.financeBox}><span>{t.cod}</span><input type="number" value={ord.cod} onChange={e => updateExtractedOrder(idx, 'cod', e.target.value)} style={styles.financeInput} /></div>
                            <div style={styles.financeBox}><span>{t.deliveryFee}</span><input type="number" value={ord.deliveryFee} onChange={e => updateExtractedOrder(idx, 'deliveryFee', e.target.value)} style={styles.financeInput} /></div>
                            <div style={styles.financeBox}><span>{t.paymentMethod}</span><select value={ord.paymentMethod||PAYMENT_CASH} onChange={e => updateExtractedOrder(idx, 'paymentMethod', e.target.value)} style={styles.financeInput}><option value="cash">{t.paymentCash}</option><option value="online">{t.paymentOnline}</option><option value="prepaid">{t.paymentPrepaid}</option></select></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div style={styles.confirmationPanel}>
                    <div style={styles.grid2}>
                      <div>
                        <label style={styles.label}>{t.selectDriver}</label>
                        <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} style={styles.input}>
                          <option value="">{t.chooseDriver}</option>
                          {drivers.map(d => (<option key={d.id} value={d.name}>{d.name}</option>))}
                        </select>
                      </div>
                      <div>
                        <label style={styles.label}>{t.chooseRevenue}</label>
                        <select value={selectedRevenuePercent} onChange={e => setSelectedRevenuePercent(Number(e.target.value))} style={styles.revenueSelect}>
                          {REVENUE_OPTIONS.map(p => (<option key={p} value={p}>{p}%</option>))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleConfirmOrder} style={styles.btnSuccessGradient} className="hover-scale">{t.btnConfirm}</button>
                </div>
              )}
            </div>
          )}

          {/* MANAGING ORDERS */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in">
              <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={styles.searchInput} />
              {filteredOrders.length === 0 ? (<p style={styles.empty}>No orders found.</p>) : (
                filteredOrders.map(order => (
                  <div key={order.id} style={styles.card} className="hover-scale">
                    <div style={styles.rowBetween}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{...styles.orderNumTag, cursor: 'pointer'}} onClick={() => setSelectedOrderForDetails(order)}>{order.orderNum}</span>
                        <span style={styles.tagStore}>{order.store}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select value={order.status} onChange={e => handleStatusChange(order, e.target.value)} style={getStatusStyle(order.status)}>
                          <option value="مؤكد">{t.statusConfirmed}</option>
                          <option value="قيد التجهيز">{t.statusProcessing}</option>
                          <option value="خرج للتوصيل">{t.statusOutForDelivery}</option>
                          <option value="جاري التوصيل">{t.statusInTransit}</option>
                          <option value="مكتمل">{t.statusCompleted}</option>
                          <option value="متأخر">{t.statusDelayed}</option>
                          <option value="ملغي">{t.statusCancelled}</option>
                          <option value="تالف">{t.statusDamaged}</option>
                          <option value="مرتجع">{t.statusReturned}</option>
                        </select>
                        <button onClick={() => setEditOrderModal(order)} style={{...styles.btnDeleteCompact, background:'#3B82F6'}}>✏️</button>
                      </div>
                    </div>
                    <p style={styles.p}><strong>{t.customer}:</strong> {order.customer} ({order.phone})</p>
                    <p style={styles.p}><strong>{t.address}:</strong> {order.address}</p>
                    <div style={styles.calculationStrip}>
                      <div><span>{t.cod}</span><strong>{getOrderValue(order)} {settings.currency}</strong></div>
                      <div><span>{t.deliveryFee}</span><strong>{getDeliveryFee(order)} {settings.currency}</strong></div>
                      <div><span>{t.companyRevenue}</span><strong style={{ color: '#34D399' }}>{getCompanyRevenue(order).toFixed(2)}</strong></div>
                      <div><span>{t.driverRevenue}</span><strong style={{ color: '#60A5FA' }}>{getDriverRevenue(order).toFixed(2)}</strong></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* LEDGER */}
          {activeTab === 'driver_ledger' && (
            <div style={styles.card} className="animate-fade-in">
              <h2 style={{ color: '#67E8F9', marginTop: 0 }}>{t.driverLedgerTitle}</h2>
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>{t.filterDriver}</label>
                  <select value={ledgerDriver} onChange={e => setLedgerDriver(e.target.value)} style={styles.input}>
                    <option value="">-- {t.allDrivers} --</option>
                    {drivers.map(d => (<option key={d.id} value={d.name}>{d.name}</option>))}
                  </select>
                </div>
                <div><label style={styles.label}>{t.filterDate}</label><input type="date" value={ledgerDate} onChange={e => setLedgerDate(e.target.value)} style={styles.input} /></div>
              </div>
              <div style={styles.monthlySummary} className="hover-scale">
                <div><span>{t.cashToHandIn} ({t.metricsDaily})</span><br /><strong>{dailyCollected.toLocaleString()} {settings.currency}</strong></div>
                <div><span>{t.companyRevenueLedger}</span><br /><strong style={{ color: '#34D399' }}>{dailyCompanyRevenue.toFixed(2)}</strong></div>
                <div><span>{t.driverRevenueLedger}</span><br /><strong style={{ color: '#60A5FA' }}>{dailyDriverRevenue.toFixed(2)}</strong></div>
              </div>
              <div style={styles.monthlySummary} className="hover-scale">
                <div><span>{t.monthsTotalCash} ({t.metricsMonthly})</span><br /><strong>{monthlyTotalCash.toLocaleString()} {settings.currency}</strong></div>
                <div><span>{t.companyRevenueLedger}</span><br /><strong style={{ color: '#34D399' }}>{monthlyCompanyRevenue.toFixed(2)}</strong></div>
                <div><span>{t.driverRevenueLedger}</span><br /><strong style={{ color: '#60A5FA' }}>{monthlyDriverRevenue.toFixed(2)}</strong></div>
              </div>
            </div>
          )}

          {/* DRIVERS TAB */}
          {activeTab === 'drivers' && (
            <div style={styles.card} className="animate-fade-in">
              <h2 style={styles.cardTitle}>{t.addDriver}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder={t.driverName} value={newDriverName} onChange={e => setNewDriverName(e.target.value)} style={{...styles.input, flex: 1, minWidth: '150px'}} />
                <input type="text" placeholder={t.phone} value={newDriverPhone} onChange={e => setNewDriverPhone(e.target.value)} style={{...styles.input, flex: 1, minWidth: '150px'}} />
                <button onClick={handleAddDriver} style={styles.btnGradientCompact} className="hover-scale">{t.btnAdd}</button>
              </div>
              <div style={styles.grid2}>
                {drivers.map(d => {
                  const driverOrders = orders.filter(o => o.driver === d.name);
                  return (
                    <div key={d.id} style={styles.clickableCard} className="hover-scale" onClick={() => setActiveEntityModal({ type: 'driver', data: d })}>
                      <h3 style={{ margin: '0 0 8px', color: '#38BDF8' }}>🛵 {d.name}</h3>
                      <p style={styles.p}>📞 {d.phone || t.unspecified}</p>
                      <p style={styles.p}>{t.totalTrips} <strong>{driverOrders.length}</strong></p>
                      <button style={{ ...styles.btnGradientCompact, width:'100%', marginTop: '8px' }}>{t.viewDetails}</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MERCHANTS TAB */}
          {activeTab === 'merchants' && (
            <div style={styles.card} className="animate-fade-in">
              <h2 style={styles.cardTitle}>{t.saveMerchant}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder={t.store} value={merchantForm.name} onChange={e => setMerchantForm({ ...merchantForm, name: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.phone} value={merchantForm.phone} onChange={e => setMerchantForm({ ...merchantForm, phone: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.address} value={merchantForm.address} onChange={e => setMerchantForm({ ...merchantForm, address: e.target.value })} style={styles.input} />
                <textarea placeholder={t.addNotePlaceholder} value={merchantForm.notes} onChange={e => setMerchantForm({ ...merchantForm, notes: e.target.value })} style={styles.textarea} rows={2} />
                <button onClick={handleSaveMerchant} style={styles.btnGradientCompact} className="hover-scale">{t.saveBtn}</button>
              </div>
              <div style={styles.grid2}>
                {merchants.map(m => {
                  const merchantOrders = orders.filter(o => o.store?.toLowerCase() === m.name?.toLowerCase());
                  return (
                    <div key={m.id} style={styles.clickableCard} className="hover-scale" onClick={() => setActiveEntityModal({ type: 'merchant', data: m })}>
                      <h3 style={{ margin: '0 0 8px', color: '#FACC15' }}>🏪 {m.name}</h3>
                      <p style={styles.p}>📞 {m.phone || t.unspecified}</p>
                      <p style={styles.p}>📦 Orders: {merchantOrders.length}</p>
                      <button style={{ ...styles.btnGradientCompact, width:'100%', marginTop: '8px' }}>{t.viewDetails}</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CUSTOMERS TAB */}
          {activeTab === 'customers' && (
            <div style={styles.card} className="animate-fade-in">
              <h2 style={styles.cardTitle}>{t.saveCustomer}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder={t.customer} value={customerForm.name} onChange={e => setCustomerForm({ ...customerForm, name: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.phone} value={customerForm.phone} onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.address} value={customerForm.address} onChange={e => setCustomerForm({ ...customerForm, address: e.target.value })} style={styles.input} />
                <textarea placeholder={t.addNotePlaceholder} value={customerForm.notes} onChange={e => setCustomerForm({ ...customerForm, notes: e.target.value })} style={styles.textarea} rows={2} />
                <button onClick={handleSaveCustomer} style={styles.btnGradientCompact} className="hover-scale">{t.saveBtn}</button>
              </div>
              <div style={styles.grid2}>
                {customers.map(c => {
                  const customerOrders = orders.filter(o => o.customer?.toLowerCase() === c.name?.toLowerCase() || o.phone === c.phone);
                  return (
                    <div key={c.id} style={styles.clickableCard} className="hover-scale" onClick={() => setActiveEntityModal({ type: 'customer', data: c })}>
                      <h3 style={{ margin: '0 0 8px', color: '#38BDF8' }}>👤 {c.name}</h3>
                      <p style={styles.p}>📞 {c.phone}</p>
                      <p style={styles.p}>📦 Orders: {customerOrders.length}</p>
                      <button style={{ ...styles.btnGradientCompact, width:'100%', marginTop: '8px' }}>{t.viewDetails}</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AUDIT LOG & DELETED ORDERS */}
          {activeTab === 'history' && (
            <div style={styles.card} className="animate-fade-in">
              <h2 style={styles.cardTitle}>{t.historyTitle}</h2>
              {historyLogs.map(log => {
                const isDeleted = log.action === 'Deleted';
                return (
                  <div key={log.id} onClick={() => { const foundOrder = [...orders, ...deletedOrders].find(o => o.orderNum === log.orderNum); if (foundOrder) setSelectedOrderForDetails(foundOrder); }} style={{ padding: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer', background: isDeleted ? 'rgba(239, 68, 68, 0.1)' : 'transparent', borderRadius: '8px', marginBottom: '6px' }} className="hover-scale">
                    <span style={styles.orderNumTag}>{log.orderNum}</span> <strong style={{ color: isDeleted ? '#FCA5A5' : '#38BDF8' }}>[{log.action}]</strong> — {log.details}
                    {isDeleted && <span style={{ marginLeft: '8px', color: '#EF4444', fontWeight: 'bold' }}>({t.deletedBadge})</span>}
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>🕒 {log.time}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SETTINGS (Enterprise) */}
          {activeTab === 'settings' && (
            <div style={styles.card} className="animate-fade-in">
              <h2 style={styles.cardTitle}>{t.enterpriseSettings}</h2>
              <div style={styles.formGroup}><label style={styles.label}>Groq API Key</label><input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="API Key..." style={styles.input} /></div>
              <div style={styles.formGroup}><label style={styles.label}>{t.appName}</label><input type="text" value={settings.appName} onChange={e => setSettings({...settings, appName: e.target.value})} style={styles.input} /></div>
              <div style={styles.formGroup}><label style={styles.label}>{t.defaultCommission}</label><select value={settings.defaultCommission} onChange={e => setSettings({...settings, defaultCommission: Number(e.target.value)})} style={styles.input}>{REVENUE_OPTIONS.map(p => (<option key={p} value={p}>{p}%</option>))}</select></div>
              <div style={styles.formGroup}><label style={styles.label}>{t.systemCurrency}</label><select value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})} style={styles.input}>{CURRENCIES.map(c => (<option key={c} value={c}>{c}</option>))}</select></div>
              <div style={styles.formGroup} style={{display:'flex', alignItems:'center', gap:'10px', margin:'15px 0'}}><input type="checkbox" checked={settings.autoAssign} onChange={e => setSettings({...settings, autoAssign: e.target.checked})} style={{width:'20px', height:'20px'}} /><label style={{...styles.label, margin:0}}>{t.autoAssignDriver}</label></div>
              
              <h3 style={{color: '#FACC15', marginTop: '20px'}}>{t.dataBackup}</h3>
              <div style={{display:'flex', gap:'10px'}}>
                <button onClick={exportJSON} style={{...styles.btnGradientCompact, flex:1, background: '#059669'}} className="hover-scale">📤 {t.exportJson}</button>
                <input type="file" id="jsonUpload" style={{display:'none'}} accept=".json" onChange={handleFileUpload} />
                <button onClick={() => document.getElementById('jsonUpload').click()} style={{...styles.btnGradientCompact, flex:1, background: '#3B82F6'}} className="hover-scale">📥 {t.importJson}</button>
              </div>
            </div>
          )}
        </main>

        {/* ENTITY DRILL-DOWN MODAL */}
        {activeEntityModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard} className="animate-fade-in">
              <div style={styles.rowBetween}>
                <h2 style={{ margin: 0, color: '#C084FC' }}>
                  {activeEntityModal.type === 'driver' && `🛵 ${activeEntityModal.data.name}`}
                  {activeEntityModal.type === 'merchant' && `🏪 ${activeEntityModal.data.name}`}
                  {activeEntityModal.type === 'customer' && `👤 ${activeEntityModal.data.name}`}
                </h2>
                <div style={{display:'flex', gap:'8px'}}>
                  <button onClick={() => {
                    const dt = activeEntityModal.data;
                    if(activeEntityModal.type === 'customer') setCustomerForm(dt);
                    if(activeEntityModal.type === 'merchant') setMerchantForm(dt);
                    setActiveEntityModal(null);
                    if(activeEntityModal.type !== 'driver') setActiveTab(`${activeEntityModal.type}s`);
                  }} style={{...styles.btnDeleteCompact, background:'#3B82F6'}}>{t.editBtn}</button>
                  <button onClick={() => handleDeleteEntity(activeEntityModal.type, activeEntityModal.data.id)} style={styles.btnDeleteCompact}>{t.deleteBtn}</button>
                  <button onClick={() => setActiveEntityModal(null)} style={{...styles.btnDeleteCompact, background:'#475569'}}>✕</button>
                </div>
              </div>

              <div style={{ margin: '15px 0' }}>
                <p style={styles.p}>📞 {activeEntityModal.data.phone}</p>
                {activeEntityModal.data.address && <p style={styles.p}>📍 {activeEntityModal.data.address}</p>}
                <label style={{...styles.label, marginTop:'10px'}}>{t.entityNotes}</label>
                <textarea rows={3} placeholder={t.addNotePlaceholder} value={activeEntityModal.data.notes || ''} onChange={e => {
                  const val = e.target.value;
                  const type = activeEntityModal.type;
                  const id = activeEntityModal.data.id;
                  if(type === 'driver') setDrivers(prev => prev.map(x => x.id === id ? {...x, notes: val} : x));
                  if(type === 'merchant') setMerchants(prev => prev.map(x => x.id === id ? {...x, notes: val} : x));
                  if(type === 'customer') setCustomers(prev => prev.map(x => x.id === id ? {...x, notes: val} : x));
                  setActiveEntityModal(prev => ({...prev, data: {...prev.data, notes: val}}));
                }} style={styles.textarea} />
              </div>

              <h3 style={{ color: '#FACC15', marginBottom: '10px' }}>Orders History</h3>
              {(() => {
                const assocOrders = orders.filter(o => {
                  if (activeEntityModal.type === 'driver') return o.driver === activeEntityModal.data.name;
                  if (activeEntityModal.type === 'merchant') return o.store?.toLowerCase() === activeEntityModal.data.name?.toLowerCase();
                  if (activeEntityModal.type === 'customer') return o.customer?.toLowerCase() === activeEntityModal.data.name?.toLowerCase() || o.phone === activeEntityModal.data.phone;
                  return false;
                });
                if (assocOrders.length === 0) return <p style={styles.empty}>{t.noOrdersFound}</p>;
                return assocOrders.map(o => (
                  <div key={o.id} onClick={() => setSelectedOrderForDetails(o)} style={{ ...styles.extractedSubCard, cursor: 'pointer', marginBottom: '8px' }} className="hover-scale">
                    <div style={styles.rowBetween}><span style={styles.orderNumTag}>{o.orderNum}</span><span style={getStatusStyle(o.status)}>{o.status}</span></div>
                    <div><strong>{t.cod}:</strong> {o.cod} {settings.currency} | <strong>{t.deliveryFee}:</strong> {o.deliveryFee} {settings.currency}</div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* FULL ORDER EDIT MODAL */}
        {editOrderModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard} className="animate-fade-in">
              <div style={styles.rowBetween}>
                <h3 style={{ margin: 0, color: '#38BDF8' }}>{t.fullEdit} ({editOrderModal.orderNum})</h3>
                <button onClick={() => setEditOrderModal(null)} style={{...styles.btnDeleteCompact, background:'#475569'}}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop:'15px' }}>
                <div><label style={styles.label}>{t.customer}</label><input type="text" value={editOrderModal.customer} onChange={e => setEditOrderModal({...editOrderModal, customer: e.target.value})} style={styles.input} /></div>
                <div><label style={styles.label}>{t.phone}</label><input type="text" value={editOrderModal.phone} onChange={e => setEditOrderModal({...editOrderModal, phone: e.target.value})} style={styles.input} /></div>
                <div style={{gridColumn: '1 / -1'}}><label style={styles.label}>{t.address}</label><input type="text" value={editOrderModal.address} onChange={e => setEditOrderModal({...editOrderModal, address: e.target.value})} style={styles.input} /></div>
                <div><label style={styles.label}>{t.cod}</label><input type="number" value={editOrderModal.cod} onChange={e => setEditOrderModal({...editOrderModal, cod: normalizeNumber(e.target.value)})} style={styles.input} /></div>
                <div><label style={styles.label}>{t.deliveryFee}</label><input type="number" value={editOrderModal.deliveryFee} onChange={e => setEditOrderModal({...editOrderModal, deliveryFee: normalizeNumber(e.target.value)})} style={styles.input} /></div>
                <div style={{gridColumn: '1 / -1'}}><label style={styles.label}>{t.notes}</label><textarea value={editOrderModal.notes} onChange={e => setEditOrderModal({...editOrderModal, notes: e.target.value})} style={styles.textarea} rows={2} /></div>
                <div style={{gridColumn: '1 / -1'}}><label style={styles.label}>{t.expectedArrival}</label><input type="datetime-local" value={editOrderModal.expectedArrival||''} onChange={e => setEditOrderModal({...editOrderModal, expectedArrival: e.target.value})} style={styles.input} /></div>
              </div>
              <button onClick={() => {
                setOrders(prev => prev.map(o => o.id === editOrderModal.id ? editOrderModal : o));
                addAuditLog(editOrderModal.orderNum, 'Full Edit', 'Order manually updated via full edit modal.');
                setEditOrderModal(null);
              }} style={styles.btnSuccessGradient} className="hover-scale">{t.saveChanges}</button>
            </div>
          </div>
        )}

        {/* ORDER DETAILS & AUDIT MODAL */}
        {selectedOrderForDetails && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard} className="animate-fade-in">
              <div style={styles.rowBetween}>
                <h3 style={{ margin: 0, color: '#38BDF8' }}>{t.orderDetailsModal} ({selectedOrderForDetails.orderNum})</h3>
                <button onClick={() => setSelectedOrderForDetails(null)} style={{...styles.btnDeleteCompact, background:'#475569'}}>✕</button>
              </div>
              <button onClick={() => generateWhatsAppLink(selectedOrderForDetails)} style={{...styles.btnGradientCompact, width:'100%', margin:'10px 0', background:'#059669'}} className="hover-scale">{t.dispatchDriver}</button>
              <div style={{ margin: '15px 0' }}>
                <p style={styles.p}><strong>{t.customer}:</strong> {selectedOrderForDetails.customer} ({selectedOrderForDetails.phone})</p>
                <p style={styles.p}><strong>{t.store}:</strong> {selectedOrderForDetails.store}</p>
                <p style={styles.p}><strong>{t.address}:</strong> {selectedOrderForDetails.address}</p>
                <p style={styles.p}><strong>{t.cod}:</strong> {selectedOrderForDetails.cod} {settings.currency}</p>
                <p style={styles.p}><strong>{t.deliveryFee}:</strong> {selectedOrderForDetails.deliveryFee} {settings.currency}</p>
                <p style={styles.p}><strong>{t.notes}:</strong> {selectedOrderForDetails.notes}</p>
              </div>
              <h4 style={{ color: '#FACC15', marginBottom: '8px' }}>Audit Trail</h4>
              <div style={{maxHeight:'200px', overflowY:'auto'}}>
                {historyLogs.filter(log => log.orderNum === selectedOrderForDetails.orderNum).map(log => (
                  <div key={log.id} style={{ fontSize: '0.82rem', padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <strong style={{color:'#C084FC'}}>[{log.action}]</strong> <span style={{color:'#E2E8F0'}}>{log.details}</span>
                    <div style={{ color: '#64748B', fontSize: '0.72rem', marginTop:'4px' }}>{log.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
