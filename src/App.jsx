import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';

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
    btnExtract: '⚡ استخراج البيانات بالذكاء الاصطناعي',
    btnExtracting: 'جاري التحليل والتدقيق...',
    reviewTitle: 'مراجعة البيانات المستخرجة:',

    store: 'المتجر',
    customer: 'العميل',
    phone: 'رقم الهاتف',
    cod: 'قيمة الطلب',
    deliveryFee: 'رسوم التوصيل',
    address: 'العنوان',
    item: 'الصنف',
    notes: 'ملاحظات الطلب',

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
    expectedArrival: 'الوقت المتوقع للوصول',
    btnConfirm: '✅ تأكيد وحفظ الطلبات',

    searchPlaceholder: '🔍 بحث برقم الطلب، اسم العميل، المتجر، أو الهاتف...',
    unspecified: 'غير محدد',
    currency: 'ج.م',

    statusConfirmed: 'مؤكد',
    statusPreparing: 'قيد التحضير',
    statusProcessing: 'قيد تجهيز الطلب',
    statusOutForDelivery: 'خرج للتوصيل',
    statusInTransit: 'جاري التوصيل',
    statusCompleted: 'مكتمل (تم التسليم)',
    statusDelayed: 'متأخر',
    statusCancelled: 'ملغي',
    statusDamaged: 'تالف',
    statusReturned: 'مرتجع',
    statusFilterAll: 'كل الحالات',
    statusCommentLabel: 'تفاصيل الحالة (تالف / مرتجع):',
    statusCommentPlaceholder: 'وضّح ما الذي حدث...',

    addDriver: 'إضافة طيار جديد',
    driverName: 'اسم الطيار...',
    driverPhone: 'رقم هاتف الطيار...',
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
    settingsAppName: 'اسم التطبيق',
    settingsCommission: 'نسبة العمولة الافتراضية',
    settingsCurrency: 'العملة المستخدمة',
    settingsAutoAssign: 'التعيين التلقائي للطيار',
    settingsAutoAssignHint: 'عند التفعيل، سيتم اختيار الطيار الأقل انشغالًا تلقائيًا إذا لم يتم اختيار طيار.',
    settingsBackup: 'نسخة احتياطية كاملة (JSON)',
    settingsExport: '⬇️ تصدير نسخة احتياطية',
    settingsImport: '⬆️ استيراد نسخة احتياطية',
    settingsApiKey: 'مفتاح Groq API',
    editAmount: 'تعديل المبلغ',
    saveAmount: 'تم الحفظ',

    confirmDbUpdateTitle: '⚠️ تأكيد تحديث بيانات قاعدة البيانات',
    confirmDbUpdateMsg: 'تم العثور على تفاصيل جديدة. هل تريد تحديث السجلات المخزنة أم ملء البيانات السابقة؟',

    confirmDeleteMsg: 'هل أنت متأكد من رغبتك في حذف هذا الطلب نهائيًا؟',
    confirmDeleteEntity: 'هل أنت متأكد من رغبتك في حذف هذا السجل نهائيًا؟',
    confirmDeleteDriver: 'هل أنت متأكد من رغبتك في حذف هذا الطيار؟',

    typoAlertTitle: '🔍 تم رصد كلمات قد تحتوي على خطأ إملائي غير معروف:',
    historyTitle: '📜 سجل عمليات وتعديلات الطلبات',
    noHistory: 'لا توجد سجلات تعديل حتى الآن.',

    driverLedgerTitle: '📊 كشف حساب وتوريد الطيارين',
    filterDriver: 'تصفية بالطيار:',
    filterDate: 'التاريخ:',
    allDrivers: 'كل الطيارين',
    dailyReport: 'تقرير اليوم',
    weeklyReport: 'تقرير الأسبوع',
    monthlyReport: 'تقرير الشهر',

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
    matchPrompt: 'تم العثور على أسماء مشابهة في النظام. يرجى اختيار جهة معينة أو إنشائها كجديدة:',
    createNew: '➕ إضافة كـ جديد',
    autofillBtn: '📋 استخدام البيانات المسجلة',
    updateBtn: '🔄 تحديث بالبيانات الجديدة',
    viewDetails: 'عرض التفاصيل والطلبات',
    entityNotes: 'الملاحظات الخاصة:',
    addNotePlaceholder: 'أدخل ملاحظة هنا...',
    noOrdersFound: 'لا توجد طلبات مسجلة لهذا الاسم.',
    deletedBadge: '🗑️ طلب محذوف',
    orderDetailsModal: 'تفاصيل الطلب والسجل التاريخي',

    duplicateFoundTitle: '⚠️ يوجد سجل مطابق بالفعل',
    duplicateFoundMsg: 'وجدنا سجلًا بنفس الاسم أو رقم الهاتف. ماذا تريد أن تفعل؟',
    duplicateOverwrite: '🔄 تحديث السجل الموجود',
    duplicateKeepBoth: '➕ الاحتفاظ بالاثنين كسجلين منفصلين',

    importExportTitle: '📥 استيراد / تصدير البيانات',
    importPlainText: '📋 نص عادي / واتساب',
    importExcel: '📊 رفع ملف إكسل',
    importPdf: '📄 رفع ملف PDF',
    dispatchTitle: '🚚 رسالة إرسال للطيار (واتساب)',
    dispatchCopy: '📋 نسخ الرسالة',
    dispatchCopied: '✅ تم النسخ!',
    generateDispatch: '🚚 رسالة الطيار',
    exportData: '⬇️ تصدير',
    editOrderTitle: '✏️ تعديل بيانات الطلب كاملة',
    saveChanges: '💾 حفظ التعديلات',
    driverProfileMetrics: 'إحصائيات الطيار',
    daily: 'اليوم',
    weekly: 'الأسبوع',
    monthly: 'الشهر',
    ordersCount: 'عدد الطلبات',
    cashCollected: 'المبلغ المحصل',
    revenue: 'الإيراد'
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
    btnExtract: '⚡ Extract Data with AI',
    btnExtracting: 'Analyzing & Checking...',
    reviewTitle: 'Extracted Orders Review:',

    store: 'Store',
    customer: 'Customer',
    phone: 'Phone',
    cod: 'Order Value',
    deliveryFee: 'Delivery Fee',
    address: 'Address',
    item: 'Item Details',
    notes: 'Order Notes',

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
    expectedArrival: 'Expected Arrival Time',
    btnConfirm: '✅ Confirm & Save Orders',

    searchPlaceholder: '🔍 Search Order #, Customer, Store, Phone...',
    unspecified: 'N/A',
    currency: 'EGP',

    statusConfirmed: 'Confirmed',
    statusPreparing: 'Preparing',
    statusProcessing: 'Processing',
    statusOutForDelivery: 'Out for Delivery',
    statusInTransit: 'In Transit',
    statusCompleted: 'Completed',
    statusDelayed: 'Late',
    statusCancelled: 'Cancelled',
    statusDamaged: 'Damaged',
    statusReturned: 'Returned',
    statusFilterAll: 'All Statuses',
    statusCommentLabel: 'Status details (Damaged / Returned):',
    statusCommentPlaceholder: 'Explain what happened...',

    addDriver: 'Add Driver',
    driverName: 'Driver Name...',
    driverPhone: 'Driver Phone...',
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
    settingsAppName: 'App Name',
    settingsCommission: 'Default Commission %',
    settingsCurrency: 'System Currency',
    settingsAutoAssign: 'Auto Driver Assignment',
    settingsAutoAssignHint: 'When enabled, the least-busy driver is auto-selected if none is chosen.',
    settingsBackup: 'Full Backup (JSON)',
    settingsExport: '⬇️ Export Backup',
    settingsImport: '⬆️ Import Backup',
    settingsApiKey: 'Groq API Key',
    editAmount: 'Edit Amount',
    saveAmount: 'Save',

    confirmDbUpdateTitle: '⚠️ Confirm Database Update',
    confirmDbUpdateMsg: 'New details found. Do you want to update existing records or autofill saved ones?',

    confirmDeleteMsg: 'Are you sure you want to permanently delete this order?',
    confirmDeleteEntity: 'Are you sure you want to permanently delete this record?',
    confirmDeleteDriver: 'Are you sure you want to delete this driver?',

    typoAlertTitle: '🔍 Unrecognized words detected:',
    historyTitle: '📜 Audit Log & Order Edits History',
    noHistory: 'No edit history recorded yet.',

    driverLedgerTitle: '📊 Driver Cash & Revenue Ledger',
    filterDriver: 'Filter Driver:',
    filterDate: 'Filter Date:',
    allDrivers: 'All Drivers',
    dailyReport: "Today's Report",
    weeklyReport: 'Weekly Report',
    monthlyReport: 'Monthly Report',

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

    matchTitle: '🔍 Duplicate Name Matcher',
    matchPrompt: 'Multiple matches found. Select an existing record or create a new entry:',
    createNew: '➕ Create New Entry',
    autofillBtn: '📋 Autofill Saved Details',
    updateBtn: '🔄 Update Saved Details',
    viewDetails: 'View Profile & Orders History',
    entityNotes: 'Entity Notes:',
    addNotePlaceholder: 'Add a note here...',
    noOrdersFound: 'No orders associated with this entry.',
    deletedBadge: '🗑️ Deleted Order',
    orderDetailsModal: 'Order Profile & Audit Log',

    duplicateFoundTitle: '⚠️ A matching record already exists',
    duplicateFoundMsg: 'We found a record with the same name or phone number. What would you like to do?',
    duplicateOverwrite: '🔄 Update Existing Record',
    duplicateKeepBoth: '➕ Keep Both as Separate Entries',

    importExportTitle: '📥 Import / Export Data',
    importPlainText: '📋 Plain Text / WhatsApp',
    importExcel: '📊 Upload Excel File',
    importPdf: '📄 Upload PDF File',
    dispatchTitle: '🚚 Driver Dispatch Message (WhatsApp)',
    dispatchCopy: '📋 Copy Message',
    dispatchCopied: '✅ Copied!',
    generateDispatch: '🚚 Driver Message',
    exportData: '⬇️ Export',
    editOrderTitle: '✏️ Edit Full Order Details',
    saveChanges: '💾 Save Changes',
    driverProfileMetrics: 'Driver Metrics',
    daily: 'Today',
    weekly: 'This Week',
    monthly: 'This Month',
    ordersCount: 'Orders',
    cashCollected: 'Cash Collected',
    revenue: 'Revenue'
  }
};

const REVENUE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 90, 100];
const CURRENCY_OPTIONS = ['EGP', 'USD', 'SAR', 'AED'];

const PAYMENT_CASH = 'cash';
const PAYMENT_ONLINE = 'online';
const PAYMENT_PREPAID = 'prepaid';

const STATUS_ACTIVE_EXCLUDED = ['مكتمل', 'ملغي', 'متأخر', 'تالف', 'مرتجع'];

const normalizeNumber = value => {
  const n = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

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
    maxWidth: '520px',
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
    marginBottom: '14px',
    transition: 'transform 0.3s ease'
  },
  logoIcon: {
    fontSize: '32px',
    color: '#FFF'
  },
  appTitle: {
    fontSize: '1.6rem',
    margin: 0,
    fontWeight: '800',
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  appSubtitle: {
    fontSize: '0.85rem',
    color: '#C084FC',
    margin: '6px 0 0 0',
    fontWeight: '500'
  },
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '10px'
  },
  kpiCard: {
    padding: '16px',
    borderRadius: '18px',
    background: 'rgba(23, 15, 38, 0.6)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    transition: 'transform 0.2s ease'
  },
  kpiLabel: { fontSize: '0.78rem', color: '#94A3B8', fontWeight: '500' },
  kpiValue: { fontSize: '1.4rem', fontWeight: '800' },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
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
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)',
    transition: 'all 0.2s ease'
  },
  navLeftLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  navIcon: {
    fontSize: '1.2rem',
    opacity: 0.85
  },
  countBadge: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '2px 10px',
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#CBD5E1'
  },
  bottomSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px'
  },
  langPill: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(51, 65, 85, 0.8)',
    color: '#E2E8F0',
    padding: '12px',
    borderRadius: '14px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  aiStatusPill: {
    padding: '12px',
    borderRadius: '14px',
    fontSize: '0.88rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  main: { display: 'flex', flexDirection: 'column', gap: '16px' },
  card: {
    background: 'rgba(23, 15, 38, 0.75)',
    border: '1px solid rgba(168, 85, 247, 0.15)',
    borderRadius: '20px',
    padding: '20px',
    backdropFilter: 'blur(12px)',
    marginBottom: '10px',
    animation: 'fadeIn 0.25s ease'
  },
  clickableCard: {
    background: 'rgba(23, 15, 38, 0.75)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    borderRadius: '16px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  cardTitle: { margin: '0 0 15px 0', fontSize: '1.15rem', color: '#C084FC', fontWeight: '700' },
  rowBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' },
  btnGradientCompact: {
    background: 'linear-gradient(135deg, #0284C7, #2563EB)',
    color: '#FFF',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem',
    transition: 'transform 0.15s ease'
  },
  btnPrimaryGradient: {
    background: 'linear-gradient(135deg, #A855F7, #EC4899)',
    color: '#FFF',
    border: 'none',
    padding: '14px 20px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: '700',
    width: '100%',
    marginTop: '12px',
    fontSize: '0.95rem',
    boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)',
    transition: 'transform 0.15s ease'
  },
  btnSuccessGradient: {
    background: 'linear-gradient(135deg, #059669, #10B981)',
    color: '#FFF',
    border: 'none',
    padding: '14px 20px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: '700',
    width: '100%',
    marginTop: '15px',
    fontSize: '0.95rem',
    transition: 'transform 0.15s ease'
  },
  textarea: {
    width: '100%',
    backgroundColor: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    borderRadius: '14px',
    color: '#FFF',
    padding: '14px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    outline: 'none'
  },
  extractedBox: { marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' },
  extractedSubCard: {
    background: 'rgba(11, 7, 24, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '15px'
  },
  orderHero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '12px',
    marginBottom: '15px'
  },
  miniLabel: { fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' },
  heroCustomer: { fontSize: '1.05rem', fontWeight: '700', marginTop: '2px' },
  heroMoney: { fontSize: '1.3rem', fontWeight: '800', color: '#38BDF8' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' },
  financePanel: {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(51, 65, 85, 0.6)',
    borderRadius: '12px',
    padding: '14px',
    marginTop: '15px'
  },
  financeTitle: { fontSize: '0.9rem', fontWeight: '700', color: '#FACC15', marginBottom: '10px' },
  financeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' },
  financeBox: { display: 'flex', flexDirection: 'column', gap: '4px' },
  financeInput: {
    background: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    color: '#FFF',
    padding: '8px',
    borderRadius: '8px',
    outline: 'none'
  },
  calculationStrip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
    gap: '10px',
    background: 'rgba(11, 7, 24, 0.8)',
    padding: '12px',
    borderRadius: '10px',
    marginTop: '10px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  infoMessage: { fontSize: '0.78rem', color: '#94A3B8', marginTop: '8px' },
  confirmationPanel: {
    background: 'rgba(11, 7, 24, 0.7)',
    border: '1px solid #7C3AED',
    borderRadius: '16px',
    padding: '16px',
    marginTop: '20px'
  },
  confirmationHeader: { marginBottom: '12px' },
  label: { display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '6px', fontWeight: '500' },
  input: {
    width: '100%',
    background: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    color: '#FFF',
    padding: '10px 14px',
    borderRadius: '10px',
    boxSizing: 'border-box',
    outline: 'none'
  },
  revenueSelect: {
    width: '100%',
    background: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid #10B981',
    color: '#34D399',
    padding: '10px 14px',
    borderRadius: '10px',
    fontWeight: '700',
    boxSizing: 'border-box',
    outline: 'none'
  },
  revenueExplanationBox: {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px dashed #38BDF8',
    padding: '12px',
    borderRadius: '12px',
    marginTop: '15px'
  },
  searchInput: {
    width: '100%',
    background: 'rgba(23, 15, 38, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    color: '#FFF',
    padding: '14px',
    borderRadius: '14px',
    marginBottom: '15px',
    boxSizing: 'border-box',
    outline: 'none'
  },
  empty: { textAlign: 'center', color: '#64748B', padding: '40px 0' },
  orderNumTag: { background: '#2563EB', color: '#FFF', padding: '3px 10px', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem' },
  tagStore: { background: 'rgba(255,255,255,0.1)', color: '#E2E8F0', padding: '3px 10px', borderRadius: '8px', fontSize: '0.85rem' },
  btnDeleteCompact: {
    background: '#EF4444',
    color: '#FFF',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  p: { margin: '6px 0', color: '#CBD5E1', fontSize: '0.9rem' },
  addressWarningBox: {
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid #EF4444',
    color: '#FCA5A5',
    padding: '10px',
    borderRadius: '10px',
    margin: '8px 0',
    fontSize: '0.82rem'
  },
  orderFinancialCard: {
    background: 'rgba(11, 7, 24, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '14px',
    margin: '10px 0'
  },
  summaryMetric: { display: 'flex', flexDirection: 'column', gap: '2px' },
  btnSaveCompact: {
    background: '#10B981',
    color: '#FFF',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  btnEditTiny: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.85rem',
    marginLeft: '4px'
  },
  cancelledBox: {
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#FCA5A5',
    padding: '8px',
    borderRadius: '8px',
    textAlign: 'center',
    marginTop: '8px',
    fontSize: '0.85rem'
  },
  btnEditCompact: {
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#CBD5E1',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  amountRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0' },
  inlineInput: {
    background: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    color: '#FFF',
    padding: '4px 8px',
    borderRadius: '6px',
    width: '80px',
    outline: 'none'
  },
  monthlySummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px',
    background: 'rgba(23, 15, 38, 0.7)',
    padding: '15px',
    borderRadius: '14px',
    marginTop: '15px',
    border: '1px solid rgba(255, 255, 255, 0.08)'
  },
  ledgerOrderCard: {
    background: 'rgba(11, 7, 24, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '12px',
    marginTop: '10px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '16px',
    animation: 'fadeIn 0.2s ease'
  },
  modalCard: {
    background: '#160E2E',
    border: '1px solid #7C3AED',
    borderRadius: '20px',
    padding: '24px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    animation: 'slideUp 0.25s ease'
  },
  toggleRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '12px 0' },
  toggleTrack: {
    width: '46px',
    height: '26px',
    borderRadius: '13px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background 0.2s ease',
    border: 'none',
    flexShrink: 0
  },
  toggleThumb: {
    position: 'absolute',
    top: '3px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#FFF',
    transition: 'left 0.2s ease'
  },
  fileImportRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginTop: '10px' },
  fileImportBtn: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px dashed rgba(168, 85, 247, 0.4)',
    color: '#E2E8F0',
    padding: '10px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.82rem',
    fontWeight: '600',
    textAlign: 'center'
  },
  dispatchPre: {
    whiteSpace: 'pre-wrap',
    background: 'rgba(11, 7, 24, 0.8)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    borderRadius: '12px',
    padding: '14px',
    fontSize: '0.85rem',
    color: '#E2E8F0',
    lineHeight: '1.6'
  }
};

const keyframesCss = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
`;

const getStatusStyle = status => {
  const base = {
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '700',
    border: 'none',
    color: '#FFF',
    cursor: 'pointer'
  };
  switch (status) {
    case 'مكتمل':
      return { ...base, background: '#059669' };
    case 'ملغي':
      return { ...base, background: '#DC2626' };
    case 'متأخر':
      return { ...base, background: '#D97706' };
    case 'تالف':
      return { ...base, background: '#B91C1C' };
    case 'مرتجع':
      return { ...base, background: '#EA580C' };
    case 'قيد التحضير':
      return { ...base, background: '#7C3AED' };
    case 'خرج للتوصيل':
    case 'جاري التوصيل':
      return { ...base, background: '#2563EB' };
    default:
      return { ...base, background: '#475569' };
  }
};

const DEFAULT_SETTINGS = {
  appName: '',
  defaultCommission: 20,
  currency: 'EGP',
  autoAssign: false
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'ar');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [activeTab, setActiveTab] = useState('new_order');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [orderCounter, setOrderCounter] = useState(() => parseInt(localStorage.getItem('order_counter_num') || '1001'));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_orders_v5') || '[]'));
  const [deletedOrders, setDeletedOrders] = useState(() => JSON.parse(localStorage.getItem('delivery_deleted_orders_v5') || '[]'));

  const [merchants, setMerchants] = useState(() => JSON.parse(localStorage.getItem('delivery_merchants_v5') || '[]'));
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem('delivery_customers_v5') || '[]'));

  const [drivers, setDrivers] = useState(() => {
    const raw = JSON.parse(localStorage.getItem('delivery_drivers_v5') || '["أحمد", "محمود", "مصطفى"]');
    // Migration: older versions stored drivers as plain strings.
    return raw.map((d, i) => (typeof d === 'string' ? { id: `legacy_${i}_${d}`, name: d, phone: '' } : d));
  });

  const [driverNotes, setDriverNotes] = useState(() => JSON.parse(localStorage.getItem('delivery_driver_notes_v5') || '{}'));
  const [historyLogs, setHistoryLogs] = useState(() => JSON.parse(localStorage.getItem('delivery_history_v5') || '[]'));
  const [settings, setSettings] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('delivery_settings_v1') || 'null');
    return saved ? { ...DEFAULT_SETTINGS, ...saved } : DEFAULT_SETTINGS;
  });

  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedOrders, setExtractedOrders] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedRevenuePercent, setSelectedRevenuePercent] = useState(20);
  const [expectedArrivalInput, setExpectedArrivalInput] = useState('');
  const [newDriverName, setNewDriverName] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');

  const [ledgerDriver, setLedgerDriver] = useState('');
  const [ledgerDate, setLedgerDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [typoFlags, setTypoFlags] = useState([]);
  const [showTypoModal, setShowTypoModal] = useState(false);

  const [editingAmountId, setEditingAmountId] = useState(null);
  const [tempAmount, setTempAmount] = useState('');
  const [editingDeliveryId, setEditingDeliveryId] = useState(null);
  const [tempDeliveryFee, setTempDeliveryFee] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [tempComment, setTempComment] = useState('');
  const [editingArrivalId, setEditingArrivalId] = useState(null);
  const [tempArrival, setTempArrival] = useState('');

  const [merchantForm, setMerchantForm] = useState({ id: null, name: '', phone: '', address: '', notes: '' });
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', address: '', notes: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [activeEntityModal, setActiveEntityModal] = useState(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null);
  const [matchingPromptModal, setMatchingPromptModal] = useState(null);
  const [manualDuplicateModal, setManualDuplicateModal] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [dispatchOrder, setDispatchOrder] = useState(null);
  const [dispatchCopied, setDispatchCopied] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const excelInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const backupInputRef = useRef(null);

  const t = translations[lang];
  const curr = settings.currency || t.currency;
  const displayAppTitle = settings.appName?.trim() ? settings.appName.trim() : t.appTitle;

  useEffect(() => { localStorage.setItem('app_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('groq_api_key', apiKey); }, [apiKey]);
  useEffect(() => { localStorage.setItem('order_counter_num', orderCounter.toString()); }, [orderCounter]);
  useEffect(() => { localStorage.setItem('delivery_orders_v5', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('delivery_deleted_orders_v5', JSON.stringify(deletedOrders)); }, [deletedOrders]);
  useEffect(() => { localStorage.setItem('delivery_merchants_v5', JSON.stringify(merchants)); }, [merchants]);
  useEffect(() => { localStorage.setItem('delivery_customers_v5', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('delivery_drivers_v5', JSON.stringify(drivers)); }, [drivers]);
  useEffect(() => { localStorage.setItem('delivery_driver_notes_v5', JSON.stringify(driverNotes)); }, [driverNotes]);
  useEffect(() => { localStorage.setItem('delivery_history_v5', JSON.stringify(historyLogs)); }, [historyLogs]);
  useEffect(() => { localStorage.setItem('delivery_settings_v1', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { setSelectedRevenuePercent(settings.defaultCommission ?? 20); }, [settings.defaultCommission]);

  /* Auto-Late status checker */
  useEffect(() => {
    const checkLate = () => {
      const now = Date.now();
      setOrders(prevOrders => {
        let changed = false;
        const updated = prevOrders.map(o => {
          if (
            o.expectedArrival &&
            !STATUS_ACTIVE_EXCLUDED.includes(o.status) &&
            new Date(o.expectedArrival).getTime() < now
          ) {
            changed = true;
            return { ...o, status: 'متأخر' };
          }
          return o;
        });
        if (changed) {
          updated.forEach((o, i) => {
            if (o.status === 'متأخر' && prevOrders[i].status !== 'متأخر') {
              setHistoryLogs(h => [
                {
                  id: Date.now() + Math.random(),
                  orderNum: o.orderNum,
                  action: 'Auto Status',
                  details:
                    lang === 'ar'
                      ? 'تم تحديث الحالة تلقائيًا إلى "متأخر" لتجاوز الوقت المتوقع للوصول.'
                      : 'Status auto-updated to "Late" — expected arrival time passed.',
                  time: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')
                },
                ...h
              ]);
            }
          });
          return updated;
        }
        return prevOrders;
      });
    };
    checkLate();
    const iv = setInterval(checkLate, 60000);
    return () => clearInterval(iv);
  }, [lang]);

  /* Financial logic */
  const isCancelled = order => order?.status === 'ملغي';
  const getOrderValue = order => normalizeNumber(order?.cod);
  const getDeliveryFee = order => normalizeNumber(order?.deliveryFee);
  const getRevenuePercent = order => normalizeNumber(order?.revenuePercent);

  const getCompanyRevenue = order => {
    if (isCancelled(order)) return 0;
    return getDeliveryFee(order) * (getRevenuePercent(order) / 100);
  };

  const getDriverRevenue = order => {
    if (isCancelled(order)) return 0;
    return getDeliveryFee(order) * (1 - getRevenuePercent(order) / 100);
  };

  const getCustomerCollection = order => {
    if (isCancelled(order)) return 0;
    if (order?.paymentMethod === PAYMENT_ONLINE || order?.paymentMethod === PAYMENT_PREPAID) {
      return getDeliveryFee(order);
    }
    return getOrderValue(order) + getDeliveryFee(order);
  };

  const getMerchantDue = order => {
    if (isCancelled(order)) return 0;
    if (order?.paymentMethod === PAYMENT_ONLINE || order?.paymentMethod === PAYMENT_PREPAID) return 0;
    return getOrderValue(order);
  };

  const getOrderEffectiveCash = order => (isCancelled(order) ? 0 : getCustomerCollection(order));

  const addAuditLog = (orderNum, action, details) => {
    const log = {
      id: Date.now() + Math.random(),
      orderNum,
      action,
      details,
      time: new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')
    };
    setHistoryLogs(prev => [log, ...prev]);
  };

  const toast = msg => {
    setCopiedToast(msg);
    setTimeout(() => setCopiedToast(false), 1800);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch {
      alert(lang === 'ar' ? 'تم رفض صلاحية الحافظة.' : 'Clipboard permission denied.');
    }
  };

  const isIncompleteAddress = addressStr => {
    if (!addressStr || addressStr === t.unspecified || addressStr.length < 10) return true;
    const lower = addressStr.toLowerCase();
    const keywords = ['شارع', 'ش', 'دور', 'شقة', 'عمارة', 'مبنى', 'street', 'st', 'floor', 'apt', 'flat'];
    return !keywords.some(k => lower.includes(k));
  };

  /* AI Order Extraction */
  const extractOrderInfo = async () => {
    if (!apiKey.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال مفتاح Groq API في الإعدادات.' : 'Please add your Groq API key in Settings.');
      setActiveTab('settings');
      return;
    }
    if (!rawText.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال نص الطلب أولاً.' : 'Please enter order text.');
      return;
    }

    setLoading(true);
    setExtractedOrders([]);
    setTypoFlags([]);

    const systemPrompt = `
You are an expert Egyptian Arabic delivery-order parser.
Your job is to extract one or multiple delivery orders from messy text.

STRICT RULES:
1. FINAL AGREED ORDER VALUE: Always use final agreed order value.
2. CANCELLATIONS: Omit cancelled items.
3. STORE: Preserve merchant and branch names.
4. CUSTOMER: Extract customer name.
5. PHONE: Extract Egyptian phone numbers.
6. ADDRESS: Preserve complete address.
7. DELIVERY FEE: Extract explicitly stated delivery fee or 0.
8. PAYMENT METHOD: Detect cash, online, prepaid. Default to cash.
9. COD / ORDER VALUE: ONLY merchandise value excluding delivery fee.
10. NOTES: Include timing or delivery instructions.
11. MULTIPLE ORDERS: Extract each as separate JSON entry.
12. JSON ONLY: Output strict JSON.

OUTPUT FORMAT:
{
  "ambiguous_flags": [],
  "orders": [
    {
      "store": "",
      "customer": "",
      "phone": "",
      "address": "",
      "cod": 0,
      "deliveryFee": 0,
      "paymentMethod": "cash",
      "item": "",
      "notes": ""
    }
  ]
}
`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`
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
      if (!response.ok) throw new Error(data.error?.message || 'Extraction Failed');

      const parsed = JSON.parse(data.choices[0].message.content);

      if (parsed.ambiguous_flags && parsed.ambiguous_flags.length > 0) {
        setTypoFlags(parsed.ambiguous_flags);
        setShowTypoModal(true);
      }

      const normalizedOrders = (parsed.orders || []).map(order => ({
        ...order,
        cod: normalizeNumber(order.cod),
        deliveryFee: normalizeNumber(order.deliveryFee),
        paymentMethod:
          order.paymentMethod === PAYMENT_ONLINE || order.paymentMethod === PAYMENT_PREPAID
            ? order.paymentMethod
            : PAYMENT_CASH
      }));

      setExtractedOrders(prev => [...prev, ...normalizedOrders]);
      checkDuplicateMatches(normalizedOrders);
    } catch (err) {
      alert(lang === 'ar' ? `حدث خطأ أثناء تحليل الطلب: ${err.message}` : `Error parsing order: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkDuplicateMatches = extractedList => {
    for (let i = 0; i < extractedList.length; i++) {
      const ord = extractedList[i];
      if (ord.customer) {
        const matches = customers.filter(c => c.name.toLowerCase().includes(ord.customer.toLowerCase()));
        if (matches.length > 0) {
          setMatchingPromptModal({ index: i, type: 'customer', name: ord.customer, extracted: ord, matches });
          break;
        }
      }
      if (ord.store) {
        const matches = merchants.filter(m => m.name.toLowerCase().includes(ord.store.toLowerCase()));
        if (matches.length > 0) {
          setMatchingPromptModal({ index: i, type: 'store', name: ord.store, extracted: ord, matches });
          break;
        }
      }
    }
  };

  const handleResolveMatching = (selectedMatch, action) => {
    const { index, type, extracted } = matchingPromptModal;
    setExtractedOrders(prev =>
      prev.map((ord, idx) => {
        if (idx !== index) return ord;
        if (action === 'autofill') {
          if (type === 'customer') {
            return {
              ...ord,
              customer: selectedMatch.name,
              phone: selectedMatch.phone || ord.phone,
              address: selectedMatch.address || ord.address
            };
          }
          return { ...ord, store: selectedMatch.name };
        } else if (action === 'update') {
          if (type === 'customer') {
            // Customer contact fields legitimately come from the order's own customer data.
            setCustomers(cList =>
              cList.map(c =>
                c.id === selectedMatch.id
                  ? { ...c, phone: extracted.phone || c.phone, address: extracted.address || c.address }
                  : c
              )
            );
            return { ...ord, customer: selectedMatch.name };
          } else {
            // Bug fix: a merchant's phone/address must NEVER be overwritten from the
            // customer's delivery phone/address embedded in the extracted order.
            setMerchants(mList => mList.map(m => (m.id === selectedMatch.id ? { ...m } : m)));
            return { ...ord, store: selectedMatch.name };
          }
        }
        return ord;
      })
    );
    setMatchingPromptModal(null);
  };

  const updateExtractedOrder = (index, field, value) => {
    setExtractedOrders(prev =>
      prev.map((order, i) =>
        i === index
          ? {
              ...order,
              [field]: field === 'cod' || field === 'deliveryFee' ? normalizeNumber(value) : value
            }
          : order
      )
    );
  };

  const removeExtractedOrder = index => {
    setExtractedOrders(prev => prev.filter((_, i) => i !== index));
  };

  /* Excel / PDF import */
  const handleExcelFile = async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      const getField = (row, keys) => {
        const rowKeys = Object.keys(row);
        for (const k of keys) {
          const found = rowKeys.find(rk => rk.toLowerCase().trim() === k);
          if (found) return row[found];
        }
        return '';
      };
      const mapped = rows
        .map(r => ({
          store: getField(r, ['store', 'متجر', 'المتجر']),
          customer: getField(r, ['customer', 'name', 'عميل', 'العميل', 'اسم']),
          phone: String(getField(r, ['phone', 'هاتف', 'رقم الهاتف', 'تليفون'])),
          address: getField(r, ['address', 'عنوان', 'العنوان']),
          cod: normalizeNumber(getField(r, ['cod', 'order value', 'قيمة الطلب', 'قيمة'])),
          deliveryFee: normalizeNumber(getField(r, ['deliveryfee', 'delivery fee', 'رسوم التوصيل', 'توصيل'])),
          paymentMethod: PAYMENT_CASH,
          item: getField(r, ['item', 'صنف', 'الصنف']),
          notes: getField(r, ['notes', 'ملاحظات'])
        }))
        .filter(r => r.customer || r.store);

      if (mapped.length === 0) {
        alert(lang === 'ar' ? 'لم يتم العثور على بيانات صالحة في الملف.' : 'No valid rows found in this file.');
        return;
      }
      setExtractedOrders(prev => [...prev, ...mapped]);
      checkDuplicateMatches(mapped);
    } catch (err) {
      alert(lang === 'ar' ? 'تعذرت قراءة ملف الإكسل.' : 'Could not read the Excel file.');
    } finally {
      e.target.value = '';
    }
  };

  const handlePdfFile = async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const buf = await file.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let raw = '';
      for (let i = 0; i < bytes.length; i++) raw += String.fromCharCode(bytes[i]);
      const matches = raw.match(/\(([^()\\]{2,}?)\)\s*Tj/g) || [];
      const text = matches.map(m => m.replace(/^\(/, '').replace(/\)\s*Tj$/, '')).join(' ');
      if (text.trim().length > 5) {
        setRawText(prev => (prev ? `${prev}\n${text}` : text));
        alert(
          lang === 'ar'
            ? 'تم استخراج نص تقريبي من ملف الـ PDF (استخراج مبدئي). يرجى المراجعة قبل الضغط على "استخراج البيانات".'
            : 'Best-effort text extracted from the PDF. Please review it before clicking "Extract Data".'
        );
      } else {
        alert(
          lang === 'ar'
            ? 'تعذر استخراج نص من هذا الملف (قد يكون صورة ممسوحة ضوئيًا أو ملف مضغوط). يرجى لصق النص يدويًا.'
            : 'Could not extract text from this file (it may be a scanned image or compressed PDF). Please paste the text manually.'
        );
      }
    } catch (err) {
      alert(lang === 'ar' ? 'خطأ أثناء قراءة ملف PDF.' : 'Error reading the PDF file.');
    } finally {
      e.target.value = '';
    }
  };

  /* Auto-assign least-busy driver */
  const pickAutoDriver = () => {
    if (drivers.length === 0) return '';
    const counts = drivers.map(d => ({
      name: d.name,
      active: orders.filter(o => o.driver === d.name && !STATUS_ACTIVE_EXCLUDED.includes(o.status)).length
    }));
    counts.sort((a, b) => a.active - b.active);
    return counts[0]?.name || '';
  };

  /* Confirm Orders */
  const handleConfirmOrder = () => {
    if (extractedOrders.length === 0) return;
    let driverToUse = selectedDriver;
    if (!driverToUse) {
      if (settings.autoAssign) {
        driverToUse = pickAutoDriver();
        if (!driverToUse) {
          alert(lang === 'ar' ? 'لا يوجد طيارين متاحين للتعيين التلقائي.' : 'No drivers available for auto-assignment.');
          return;
        }
      } else {
        alert(lang === 'ar' ? 'يرجى اختيار طيار قبل تأكيد الطلب.' : 'Please select a driver before confirming the orders.');
        return;
      }
    }

    let currentNum = orderCounter;
    const now = new Date();
    const isoDateStr = now.toISOString().split('T')[0];

    const newCreatedOrders = extractedOrders.map(ord => {
      const orderNumber = `#${currentNum++}`;
      const normalizedCod = normalizeNumber(ord.cod);
      const normalizedDeliveryFee = normalizeNumber(ord.deliveryFee);
      const paymentMethod = ord.paymentMethod || PAYMENT_CASH;

      const newOrder = {
        id: Date.now() + Math.random(),
        orderNum: orderNumber,
        store: ord.store || t.unspecified,
        customer: ord.customer || t.unspecified,
        phone: ord.phone || '',
        address: ord.address || t.unspecified,
        cod: normalizedCod,
        deliveryFee: normalizedDeliveryFee,
        paymentMethod,
        revenuePercent: selectedRevenuePercent,
        item: ord.item || '',
        notes: ord.notes || '',
        driver: driverToUse,
        status: 'مؤكد',
        statusComment: '',
        expectedArrival: expectedArrivalInput || '',
        isoDate: isoDateStr,
        date: now.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      };

      const companyRevenue = normalizedDeliveryFee * (selectedRevenuePercent / 100);
      const driverRevenue = normalizedDeliveryFee - companyRevenue;
      const customerCollection =
        paymentMethod === PAYMENT_ONLINE || paymentMethod === PAYMENT_PREPAID
          ? normalizedDeliveryFee
          : normalizedCod + normalizedDeliveryFee;

      addAuditLog(
        orderNumber,
        'Created',
        lang === 'ar'
          ? `تم إنشاء الطلب للعميل ${newOrder.customer}. قيمة الطلب ${normalizedCod} ${curr}، التوصيل ${normalizedDeliveryFee} ${curr}، الدفع ${
              paymentMethod === PAYMENT_CASH ? 'كاش' : 'مدفوع أونلاين'
            }، نسبة الشركة ${selectedRevenuePercent}% = ${companyRevenue.toFixed(2)} ${curr}، نصيب الطيار = ${driverRevenue.toFixed(
              2
            )} ${curr}، إجمالي تحصيل الطيار = ${customerCollection.toFixed(2)} ${curr}.`
          : `Order created for ${newOrder.customer}. Order value: ${normalizedCod} ${curr}, delivery fee: ${normalizedDeliveryFee} ${curr}, payment: ${
              paymentMethod === PAYMENT_CASH ? 'Cash' : 'Paid Online'
            }, company share ${selectedRevenuePercent}% = ${companyRevenue.toFixed(2)} ${curr}, driver share = ${driverRevenue.toFixed(
              2
            )} ${curr}, driver collection = ${customerCollection.toFixed(2)} ${curr}.`
      );

      return newOrder;
    });

    setOrderCounter(currentNum);
    setOrders(prev => [...newCreatedOrders, ...prev]);

    // Bug fix: merchant records must NEVER receive customer address/phone data.
    // Merchant contact info can only be entered/edited manually via the Merchants tab.
    extractedOrders.forEach(ord => {
      if (ord.store && ord.store !== t.unspecified) {
        setMerchants(prev => {
          const match = prev.find(m => m.name?.toLowerCase() === ord.store?.toLowerCase());
          if (!match) {
            return [
              { id: Date.now() + Math.random(), name: ord.store, phone: '', address: '', notes: '', totalOrders: 1 },
              ...prev
            ];
          }
          return prev.map(m =>
            m.name?.toLowerCase() === ord.store?.toLowerCase() ? { ...m, totalOrders: (m.totalOrders || 0) + 1 } : m
          );
        });
      }

      if (ord.customer && ord.customer !== t.unspecified) {
        setCustomers(prev => {
          const match = prev.find(c => c.phone === ord.phone || c.name === ord.customer);
          if (!match) {
            return [{ id: Date.now() + Math.random(), name: ord.customer, phone: ord.phone, address: ord.address, notes: '' }, ...prev];
          }
          return prev.map(c => (c.name === ord.customer || c.phone === ord.phone ? { ...c, address: ord.address || c.address } : c));
        });
      }
    });

    setRawText('');
    setExtractedOrders([]);
    setSelectedDriver('');
    setSelectedRevenuePercent(settings.defaultCommission ?? 20);
    setExpectedArrivalInput('');
    setActiveTab('orders');
    toast(lang === 'ar' ? '✅ تم حفظ الطلبات بنجاح' : '✅ Orders saved successfully');
  };

  /* Order actions */
  const handleDeleteOrder = order => {
    if (window.confirm(`${t.confirmDeleteMsg} (${order.orderNum})`)) {
      setOrders(prev => prev.filter(o => o.id !== order.id));
      setDeletedOrders(prev => [{ ...order, deletedAt: new Date().toLocaleString() }, ...prev]);
      addAuditLog(order.orderNum, 'Deleted', `Order for ${order.customer} deleted.`);
    }
  };

  const handleStatusChange = (order, newStatus) => {
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, status: newStatus } : o)));
    addAuditLog(order.orderNum, 'Status Change', `Status changed to "${newStatus}"`);
  };

  const handleDriverReassign = (order, newDriver) => {
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, driver: newDriver } : o)));
    addAuditLog(order.orderNum, 'Driver Reassigned', `Driver changed to "${newDriver}"`);
  };

  const handleRevenuePercentChange = (order, newPercent) => {
    const numericPercent = normalizeNumber(newPercent);
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, revenuePercent: numericPercent } : o)));
    addAuditLog(order.orderNum, 'Revenue Percent Changed', `Company share updated to ${numericPercent}%`);
  };

  const handleAmountSave = order => {
    const oldAmount = order.cod;
    const newAmount = normalizeNumber(tempAmount);
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, cod: newAmount } : o)));
    addAuditLog(order.orderNum, 'Amount Edited', `Order value updated from ${oldAmount} to ${newAmount} ${curr}`);
    setEditingAmountId(null);
  };

  const handleDeliveryFeeSave = order => {
    const oldFee = getDeliveryFee(order);
    const newFee = normalizeNumber(tempDeliveryFee);
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, deliveryFee: newFee } : o)));
    addAuditLog(order.orderNum, 'Delivery Fee Edited', `Delivery fee updated from ${oldFee} to ${newFee} ${curr}`);
    setEditingDeliveryId(null);
  };

  const handleNoteSave = order => {
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, notes: tempNote } : o)));
    addAuditLog(order.orderNum, 'Notes Edited', `Notes updated to "${tempNote}"`);
    setEditingNoteId(null);
  };

  const handleCommentSave = order => {
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, statusComment: tempComment } : o)));
    addAuditLog(order.orderNum, 'Status Comment Edited', `Status comment updated to "${tempComment}"`);
    setEditingCommentId(null);
  };

  const handleArrivalSave = order => {
    setOrders(prev => prev.map(o => (o.id === order.id ? { ...o, expectedArrival: tempArrival } : o)));
    addAuditLog(order.orderNum, 'Expected Arrival Edited', `Expected arrival set to "${tempArrival || '-'}"`);
    setEditingArrivalId(null);
  };

  /* Full order edit modal */
  const handleSaveOrderEdit = () => {
    const original = orders.find(o => o.id === editingOrder.id);
    if (!original) return;
    const fieldsToCheck = [
      'store', 'customer', 'phone', 'address', 'item', 'notes',
      'cod', 'deliveryFee', 'paymentMethod', 'revenuePercent',
      'driver', 'expectedArrival', 'statusComment'
    ];
    const changes = [];
    fieldsToCheck.forEach(f => {
      const a = original[f] ?? '';
      const b = editingOrder[f] ?? '';
      if (String(a) !== String(b)) changes.push(`${f}: "${a}" → "${b}"`);
    });
    setOrders(prev => prev.map(o => (o.id === editingOrder.id ? { ...editingOrder } : o)));
    if (changes.length) addAuditLog(original.orderNum, 'Order Edited', changes.join(' | '));
    setEditingOrder(null);
    toast(lang === 'ar' ? '✅ تم حفظ التعديلات' : '✅ Changes saved');
  };

  const handleAddDriver = () => {
    if (!newDriverName.trim()) return;
    if (drivers.some(d => d.name === newDriverName.trim())) {
      alert(lang === 'ar' ? 'الطيار موجود بالفعل.' : 'Driver already exists.');
      return;
    }
    setDrivers(prev => [...prev, { id: Date.now(), name: newDriverName.trim(), phone: newDriverPhone.trim() }]);
    setNewDriverName('');
    setNewDriverPhone('');
  };

  const handleDeleteDriver = driverObj => {
    if (!window.confirm(t.confirmDeleteDriver)) return;
    setDrivers(prev => prev.filter(d => d.id !== driverObj.id));
    setDriverNotes(prev => {
      const copy = { ...prev };
      delete copy[driverObj.name];
      return copy;
    });
  };

  /* Manual entity duplicate detection */
  const findDuplicate = (list, name, phone) => {
    const lowerName = (name || '').trim().toLowerCase();
    return list.find(
      item =>
        (lowerName && item.name?.trim().toLowerCase() === lowerName) ||
        (phone && item.phone && item.phone === phone)
    );
  };

  const handleSaveCustomerExplicit = () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) {
      return alert(lang === 'ar' ? 'الاسم ورقم الهاتف مطلوبان.' : 'Name and phone required.');
    }
    if (editingCustomer) {
      setCustomers(prev => prev.map(c => (c.id === editingCustomer.id ? { ...c, ...newCustomer } : c)));
      setEditingCustomer(null);
      setNewCustomer({ name: '', phone: '', address: '', notes: '' });
      return;
    }
    const dup = findDuplicate(customers, newCustomer.name, newCustomer.phone);
    if (dup) {
      setManualDuplicateModal({ type: 'customer', formData: { ...newCustomer }, match: dup });
      return;
    }
    setCustomers(prev => [{ id: Date.now(), ...newCustomer }, ...prev]);
    setNewCustomer({ name: '', phone: '', address: '', notes: '' });
  };

  const handleSaveMerchant = () => {
    if (!merchantForm.name.trim()) return;
    if (merchantForm.id) {
      setMerchants(prev => prev.map(m => (m.id === merchantForm.id ? { ...merchantForm } : m)));
      setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
      return;
    }
    const dup = findDuplicate(merchants, merchantForm.name, merchantForm.phone);
    if (dup) {
      setManualDuplicateModal({ type: 'merchant', formData: { ...merchantForm }, match: dup });
      return;
    }
    setMerchants(prev => [{ ...merchantForm, id: Date.now(), totalOrders: 0 }, ...prev]);
    setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
  };

  const resolveManualDuplicate = action => {
    const { type, formData, match } = manualDuplicateModal;
    if (type === 'customer') {
      if (action === 'overwrite') {
        setCustomers(prev => prev.map(c => (c.id === match.id ? { ...c, ...formData } : c)));
      } else {
        setCustomers(prev => [{ id: Date.now(), ...formData }, ...prev]);
      }
      setNewCustomer({ name: '', phone: '', address: '', notes: '' });
    } else {
      if (action === 'overwrite') {
        setMerchants(prev => prev.map(m => (m.id === match.id ? { ...m, ...formData } : m)));
      } else {
        setMerchants(prev => [{ ...formData, id: Date.now(), totalOrders: 0 }, ...prev]);
      }
      setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
    }
    setManualDuplicateModal(null);
  };

  const handleDeleteCustomer = customer => {
    if (!window.confirm(t.confirmDeleteEntity)) return;
    setCustomers(prev => prev.filter(c => c.id !== customer.id));
  };

  const handleDeleteMerchant = merchant => {
    if (!window.confirm(t.confirmDeleteEntity)) return;
    setMerchants(prev => prev.filter(m => m.id !== merchant.id));
  };

  const updateEntityNote = (type, identifier, noteText) => {
    if (type === 'driver') {
      setDriverNotes(prev => ({ ...prev, [identifier]: noteText }));
    } else if (type === 'customer') {
      setCustomers(prev => prev.map(c => (c.id === identifier ? { ...c, notes: noteText } : c)));
    } else if (type === 'merchant') {
      setMerchants(prev => prev.map(m => (m.id === identifier ? { ...m, notes: noteText } : m)));
    }
    if (activeEntityModal && activeEntityModal.data) {
      setActiveEntityModal(prev => ({
        ...prev,
        data: typeof prev.data === 'object' ? { ...prev.data, notes: noteText } : prev.data
      }));
    }
  };

  /* Driver metrics */
  const computeDriverMetrics = driverName => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const monthStr = todayStr.substring(0, 7);

    const driverOrders = orders.filter(o => o.driver === driverName);
    const completed = driverOrders.filter(o => o.status === 'مكتمل');
    const daily = completed.filter(o => o.isoDate === todayStr);
    const weekly = completed.filter(o => o.isoDate && new Date(o.isoDate) >= weekStart);
    const monthly = completed.filter(o => (o.isoDate || '').startsWith(monthStr));
    const sumCash = list => list.reduce((s, o) => s + getOrderEffectiveCash(o), 0);
    const sumRevenue = list => list.reduce((s, o) => s + getDriverRevenue(o), 0);

    return {
      totalOrders: driverOrders.length,
      deliveredCount: completed.length,
      dailyCount: daily.length,
      weeklyCount: weekly.length,
      monthlyCount: monthly.length,
      dailyCash: sumCash(daily),
      weeklyCash: sumCash(weekly),
      monthlyCash: sumCash(monthly),
      dailyRevenue: sumRevenue(daily),
      weeklyRevenue: sumRevenue(weekly),
      monthlyRevenue: sumRevenue(monthly),
      companyRevenueTotal: completed.reduce((s, o) => s + getCompanyRevenue(o), 0)
    };
  };

  /* Dispatch message */
  const generateDispatchMessage = order => {
    const collection = getCustomerCollection(order);
    const paymentLabel =
      order.paymentMethod === PAYMENT_CASH
        ? (lang === 'ar' ? 'كاش عند الاستلام' : 'Cash on delivery')
        : order.paymentMethod === PAYMENT_ONLINE
        ? (lang === 'ar' ? 'مدفوع أونلاين' : 'Paid online')
        : (lang === 'ar' ? 'مدفوع مسبقًا' : 'Prepaid');

    const lines =
      lang === 'ar'
        ? [
            `📦 طلب جديد ${order.orderNum}`,
            `🏪 المتجر: ${order.store}`,
            `👤 العميل: ${order.customer}`,
            `📞 الهاتف: ${order.phone || '-'}`,
            `📍 العنوان: ${order.address}`,
            order.item ? `🛍️ الصنف: ${order.item}` : null,
            `💵 المطلوب تحصيله: ${collection.toLocaleString()} ${curr}`,
            `💳 الدفع: ${paymentLabel}`,
            order.expectedArrival ? `⏰ الوصول المتوقع: ${new Date(order.expectedArrival).toLocaleString('ar-EG')}` : null,
            order.notes ? `📝 ملاحظات: ${order.notes}` : null
          ]
        : [
            `📦 New Order ${order.orderNum}`,
            `🏪 Store: ${order.store}`,
            `👤 Customer: ${order.customer}`,
            `📞 Phone: ${order.phone || '-'}`,
            `📍 Address: ${order.address}`,
            order.item ? `🛍️ Item: ${order.item}` : null,
            `💵 Collect: ${collection.toLocaleString()} ${curr}`,
            `💳 Payment: ${paymentLabel}`,
            order.expectedArrival ? `⏰ Expected arrival: ${new Date(order.expectedArrival).toLocaleString('en-US')}` : null,
            order.notes ? `📝 Notes: ${order.notes}` : null
          ];

    return lines.filter(Boolean).join('\n');
  };

  const handleCopyDispatch = () => {
    if (!dispatchOrder) return;
    navigator.clipboard
      .writeText(generateDispatchMessage(dispatchOrder))
      .then(() => {
        setDispatchCopied(true);
        setTimeout(() => setDispatchCopied(false), 1600);
      })
      .catch(() => {});
  };

  /* Backup / export */
  const downloadJson = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportBackup = () => {
    downloadJson(
      { orders, deletedOrders, merchants, customers, drivers, driverNotes, historyLogs, settings, orderCounter, exportedAt: new Date().toISOString() },
      `rasseel_backup_${new Date().toISOString().split('T')[0]}.json`
    );
  };

  const handleImportBackup = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (
          !window.confirm(
            lang === 'ar'
              ? 'سيتم استبدال جميع البيانات الحالية بالنسخة المستوردة. هل تريد المتابعة؟'
              : 'This will replace all current data with the imported backup. Continue?'
          )
        )
          return;
        if (data.orders) setOrders(data.orders);
        if (data.deletedOrders) setDeletedOrders(data.deletedOrders);
        if (data.merchants) setMerchants(data.merchants);
        if (data.customers) setCustomers(data.customers);
        if (data.drivers) setDrivers(data.drivers);
        if (data.driverNotes) setDriverNotes(data.driverNotes);
        if (data.historyLogs) setHistoryLogs(data.historyLogs);
        if (data.settings) setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
        if (data.orderCounter) setOrderCounter(data.orderCounter);
        alert(lang === 'ar' ? 'تم استيراد النسخة الاحتياطية بنجاح.' : 'Backup imported successfully.');
      } catch (err) {
        alert(lang === 'ar' ? 'ملف غير صالح.' : 'Invalid backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  /* Calculated metrics */
  const completedOrders = orders.filter(o => o.status === 'مكتمل');
  const activeOrdersCount = orders.filter(o => !STATUS_ACTIVE_EXCLUDED.includes(o.status)).length;
  const completedOrdersCount = completedOrders.length;
  const totalCollected = completedOrders.reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);
  const totalRevenue = completedOrders.reduce((sum, o) => sum + getCompanyRevenue(o), 0);

  const filteredOrders = orders.filter(o => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      (o.orderNum || '').toLowerCase().includes(query) ||
      (o.customer || '').toLowerCase().includes(query) ||
      (o.store || '').toLowerCase().includes(query) ||
      (o.phone || '').includes(searchQuery);
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  /* Ledger calculations */
  const selectedYearMonth = ledgerDate.substring(0, 7);
  const ledgerWeekStart = (() => {
    const d = new Date(ledgerDate);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    return d;
  })();
  const ledgerWeekEnd = (() => {
    const d = new Date(ledgerWeekStart);
    d.setDate(d.getDate() + 6);
    d.setHours(23, 59, 59, 999);
    return d;
  })();

  const filteredLedgerOrders = orders.filter(o => (!ledgerDriver || o.driver === ledgerDriver) && o.isoDate === ledgerDate);
  const dailyCollected = filteredLedgerOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);
  const dailyCompanyRevenue = filteredLedgerOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getCompanyRevenue(o), 0);
  const dailyDriverRevenue = filteredLedgerOrders.filter(o => o.status === 'مكتمل').reduce((sum, o) => sum + getDriverRevenue(o), 0);

  const weeklyOrders = orders.filter(o => {
    if (ledgerDriver && o.driver !== ledgerDriver) return false;
    if (!o.isoDate) return false;
    const d = new Date(o.isoDate);
    return d >= ledgerWeekStart && d <= ledgerWeekEnd;
  });
  const weeklyCompletedOrders = weeklyOrders.filter(o => o.status === 'مكتمل');
  const weeklyCollected = weeklyCompletedOrders.reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);
  const weeklyCompanyRevenue = weeklyCompletedOrders.reduce((sum, o) => sum + getCompanyRevenue(o), 0);
  const weeklyDriverRevenue = weeklyCompletedOrders.reduce((sum, o) => sum + getDriverRevenue(o), 0);

  const monthlyOrders = orders.filter(o => (!ledgerDriver || o.driver === ledgerDriver) && (o.isoDate || '').startsWith(selectedYearMonth));
  const monthlyCompletedOrders = monthlyOrders.filter(o => o.status === 'مكتمل');
  const monthlyTotalCash = monthlyCompletedOrders.reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);
  const monthlyCompanyRevenue = monthlyCompletedOrders.reduce((sum, o) => sum + getCompanyRevenue(o), 0);
  const monthlyDriverRevenue = monthlyCompletedOrders.reduce((sum, o) => sum + getDriverRevenue(o), 0);

  const statusOptions = [
    ['مؤكد', t.statusConfirmed],
    ['قيد التحضير', t.statusPreparing],
    ['قيد تجهيز الطلب', t.statusProcessing],
    ['خرج للتوصيل', t.statusOutForDelivery],
    ['جاري التوصيل', t.statusInTransit],
    ['مكتمل', t.statusCompleted],
    ['متأخر', t.statusDelayed],
    ['تالف', t.statusDamaged],
    ['مرتجع', t.statusReturned],
    ['ملغي', t.statusCancelled]
  ];

  return (
    <div style={styles.appWrapper}>
      <style>{keyframesCss}</style>
      <div style={{ ...styles.container, direction: lang === 'ar' ? 'rtl' : 'ltr' }}>

        {/* TOAST */}
        {copiedToast && (
          <div
            style={{
              position: 'fixed',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#059669',
              color: '#FFF',
              padding: '10px 18px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '0.85rem',
              zIndex: 2000,
              boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            {copiedToast}
          </div>
        )}

        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.logoBox}><span style={styles.logoIcon}>⚡</span></div>
          <h1 style={styles.appTitle}><span>🚀</span> {displayAppTitle}</h1>
          <p style={styles.appSubtitle}>{t.appSubtitle}</p>
        </header>

        {/* KPIS */}
        <div style={styles.kpiRow}>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>⏱️ {t.kpiActiveOrders}</span>
            <span style={{ ...styles.kpiValue, color: '#C084FC' }}>{activeOrdersCount}</span>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>📦 {t.kpiCompleted}</span>
            <span style={{ ...styles.kpiValue, color: '#38BDF8' }}>{completedOrdersCount}</span>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>💰 {t.kpiTotalCod}</span>
            <span style={{ ...styles.kpiValue, color: '#34D399' }}>{totalCollected.toLocaleString()} {curr}</span>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>📈 {t.kpiRevenue}</span>
            <span style={{ ...styles.kpiValue, color: '#FACC15' }}>{totalRevenue.toFixed(0)} {curr}</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <div style={styles.navList}>
          <button style={styles.primaryBtn} onClick={() => setActiveTab('new_order')}>
            <span>➕</span> {t.navNewOrder}
          </button>
          <button style={activeTab === 'orders' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('orders')}>
            <div style={styles.navLeftLabel}><span style={styles.navIcon}>📦</span><span>{t.navOrders}</span></div>
            <span style={styles.countBadge}>{orders.length}</span>
          </button>
          <button style={activeTab === 'driver_ledger' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('driver_ledger')}>
            <div style={styles.navLeftLabel}><span style={styles.navIcon}>📋</span><span>{t.navDriverLedger}</span></div>
          </button>
          <button style={activeTab === 'drivers' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('drivers')}>
            <div style={styles.navLeftLabel}><span style={styles.navIcon}>🛵</span><span>{t.navDrivers}</span></div>
            <span style={styles.countBadge}>{drivers.length}</span>
          </button>
          <button style={activeTab === 'merchants' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('merchants')}>
            <div style={styles.navLeftLabel}><span style={styles.navIcon}>🏪</span><span>{t.navMerchants}</span></div>
            <span style={styles.countBadge}>{merchants.length}</span>
          </button>
          <button style={activeTab === 'customers' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('customers')}>
            <div style={styles.navLeftLabel}><span style={styles.navIcon}>👥</span><span>{t.navCustomers}</span></div>
            <span style={styles.countBadge}>{customers.length}</span>
          </button>
          <button style={activeTab === 'history' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('history')}>
            <div style={styles.navLeftLabel}><span style={styles.navIcon}>🕒</span><span>{t.navHistory}</span></div>
          </button>
          <button style={activeTab === 'settings' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('settings')}>
            <div style={styles.navLeftLabel}><span style={styles.navIcon}>⚙️</span><span>{t.navSettings}</span></div>
          </button>
        </div>

        {/* BOTTOM CONTROLS */}
        <div style={styles.bottomSection}>
          <button style={styles.langPill} onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            <span>🌐</span> {lang === 'ar' ? 'English' : 'العربية'}
          </button>
          <div style={{
            ...styles.aiStatusPill,
            background: apiKey ? 'rgba(6, 78, 59, 0.6)' : 'rgba(127, 29, 29, 0.6)',
            border: apiKey ? '1px solid #10B981' : '1px solid #EF4444',
            color: apiKey ? '#A7F3D0' : '#FCA5A5'
          }}>
            {apiKey ? t.groqConnected : t.groqMissing}
          </div>
        </div>

        {/* MAIN VIEWS */}
        <main style={styles.main}>
          {/* NEW ORDER */}
          {activeTab === 'new_order' && (
            <div style={styles.card}>
              <div style={styles.rowBetween}>
                <h2 style={styles.cardTitle}>{t.aiHeader}</h2>
                <button onClick={handlePasteClipboard} style={styles.btnGradientCompact}>{t.btnPaste}</button>
              </div>
              <textarea
                rows={7}
                value={rawText}
                onChange={e => setRawText(e.target.value)}
                placeholder={t.placeholderOrder}
                style={styles.textarea}
              />
              <button onClick={extractOrderInfo} disabled={loading} style={styles.btnPrimaryGradient}>
                {loading ? t.btnExtracting : t.btnExtract}
              </button>

              {/* IMPORT METHODS */}
              <div style={{ marginTop: '16px' }}>
                <div style={styles.miniLabel}>{t.importExportTitle}</div>
                <div style={styles.fileImportRow}>
                  <button style={styles.fileImportBtn} onClick={handlePasteClipboard}>{t.importPlainText}</button>
                  <button style={styles.fileImportBtn} onClick={() => excelInputRef.current?.click()}>{t.importExcel}</button>
                  <button style={styles.fileImportBtn} onClick={() => pdfInputRef.current?.click()}>{t.importPdf}</button>
                </div>
                <input ref={excelInputRef} type="file" accept=".xlsx,.xls,.csv" style={{ display: 'none' }} onChange={handleExcelFile} />
                <input ref={pdfInputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handlePdfFile} />
              </div>

              {/* TYPO MODAL */}
              {showTypoModal && (
                <div style={styles.modalOverlay}>
                  <div style={styles.modalCard}>
                    <h3 style={{ margin: '0 0 10px', color: '#FACC15' }}>{t.typoAlertTitle}</h3>
                    <ul style={{ paddingLeft: '20px', color: '#FCA5A5' }}>
                      {typoFlags.map((flag, idx) => (<li key={idx}><strong>{flag}</strong></li>))}
                    </ul>
                    <button onClick={() => setShowTypoModal(false)} style={styles.btnSuccessGradient}>{t.confirm}</button>
                  </div>
                </div>
              )}

              {/* DUPLICATE MATCH PROMPT MODAL */}
              {matchingPromptModal && (
                <div style={styles.modalOverlay}>
                  <div style={styles.modalCard}>
                    <h3 style={{ margin: '0 0 10px', color: '#38BDF8' }}>{t.matchTitle}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>{t.matchPrompt}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
                      {matchingPromptModal.matches.map((match, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
                          <strong style={{ color: '#FACC15' }}>{match.name}</strong> ({match.phone || 'No phone'})
                          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                            <button onClick={() => handleResolveMatching(match, 'autofill')} style={styles.btnGradientCompact}>
                              {t.autofillBtn}
                            </button>
                            <button onClick={() => handleResolveMatching(match, 'update')} style={{ ...styles.btnGradientCompact, background: 'linear-gradient(135deg,#059669,#10B981)' }}>
                              {t.updateBtn}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setMatchingPromptModal(null)} style={{ ...styles.btnSuccessGradient, background: '#475569' }}>
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
                    const orderValue = normalizeNumber(ord.cod);
                    const fee = normalizeNumber(ord.deliveryFee);
                    const company = fee * (selectedRevenuePercent / 100);
                    const driverShare = fee - company;
                    const collection = ord.paymentMethod === PAYMENT_ONLINE || ord.paymentMethod === PAYMENT_PREPAID ? fee : orderValue + fee;

                    return (
                      <div key={idx} style={styles.extractedSubCard}>
                        <div style={{ ...styles.orderHero, background: 'linear-gradient(135deg,rgba(168,85,247,0.2),rgba(236,72,153,0.2))' }}>
                          <div>
                            <div style={styles.miniLabel}>{t.customer}</div>
                            <div style={styles.heroCustomer}>👤 {ord.customer || t.unspecified}</div>
                          </div>
                          <div style={styles.heroMoney}>{collection.toLocaleString()} {curr}</div>
                        </div>
                        {isIncompleteAddress(ord.address) && <div style={styles.addressWarningBox}>{t.addressWarning}</div>}
                        <div style={styles.grid2}>
                          <div><strong>{t.store}:</strong> {ord.store || t.unspecified}</div>
                          <div><strong>{t.phone}:</strong> {ord.phone || t.unspecified}</div>
                          <div style={{ gridColumn: '1 / -1' }}><strong>{t.address}:</strong> {ord.address || t.unspecified}</div>
                          <div style={{ gridColumn: '1 / -1' }}><strong>{t.item}:</strong> {ord.item || t.unspecified}</div>
                        </div>

                        <div style={styles.financePanel}>
                          <div style={styles.financeTitle}>💰 {t.financialBreakdown}</div>
                          <div style={styles.financeGrid}>
                            <div style={styles.financeBox}>
                              <span>{t.cod}</span>
                              <input type="number" value={ord.cod} onChange={e => updateExtractedOrder(idx, 'cod', e.target.value)} style={styles.financeInput} />
                            </div>
                            <div style={styles.financeBox}>
                              <span>{t.deliveryFee}</span>
                              <input type="number" value={ord.deliveryFee} onChange={e => updateExtractedOrder(idx, 'deliveryFee', e.target.value)} style={styles.financeInput} />
                            </div>
                            <div style={styles.financeBox}>
                              <span>{t.paymentMethod}</span>
                              <select value={ord.paymentMethod || PAYMENT_CASH} onChange={e => updateExtractedOrder(idx, 'paymentMethod', e.target.value)} style={styles.financeInput}>
                                <option value="cash">{t.paymentCash}</option>
                                <option value="online">{t.paymentOnline}</option>
                                <option value="prepaid">{t.paymentPrepaid}</option>
                              </select>
                            </div>
                          </div>
                          <div style={styles.calculationStrip}>
                            <div><span>{t.customerCollection}</span><strong>{collection.toLocaleString()} {curr}</strong></div>
                            <div><span>{t.merchantAmount}</span><strong>{orderValue.toLocaleString()} {curr}</strong></div>
                            <div><span>{t.companyRevenue}</span><strong style={{ color: '#34D399' }}>{company.toFixed(2)} {curr}</strong></div>
                            <div><span>{t.driverRevenue}</span><strong style={{ color: '#60A5FA' }}>{driverShare.toFixed(2)} {curr}</strong></div>
                          </div>
                        </div>
                        <button onClick={() => removeExtractedOrder(idx)} style={{ ...styles.btnDeleteCompact, marginTop: '10px' }}>{t.deleteBtn}</button>
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
                    <div style={{ marginTop: '12px' }}>
                      <label style={styles.label}>{t.expectedArrival}</label>
                      <input
                        type="datetime-local"
                        value={expectedArrivalInput}
                        onChange={e => setExpectedArrivalInput(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <button onClick={handleConfirmOrder} style={styles.btnSuccessGradient}>{t.btnConfirm}</button>
                </div>
              )}
            </div>
          )}

          {/* MANAGING ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ ...styles.input, marginBottom: '15px' }}>
                <option value="">{t.statusFilterAll}</option>
                {statusOptions.map(([val, label]) => (<option key={val} value={val}>{label}</option>))}
              </select>

              {filteredOrders.length === 0 ? (
                <p style={styles.empty}>No orders found.</p>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id} style={styles.card}>
                    <div style={styles.rowBetween}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={styles.orderNumTag}>{order.orderNum}</span>
                        <span style={styles.tagStore}>{order.store}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <select value={order.status} onChange={e => handleStatusChange(order, e.target.value)} style={getStatusStyle(order.status)}>
                          {statusOptions.map(([val, label]) => (<option key={val} value={val}>{label}</option>))}
                        </select>
                        <button onClick={() => setEditingOrder({ ...order })} style={styles.btnEditCompact}>{t.editBtn}</button>
                        <button onClick={() => setDispatchOrder(order)} style={styles.btnGradientCompact}>{t.generateDispatch}</button>
                        <button onClick={() => handleDeleteOrder(order)} style={styles.btnDeleteCompact}>🗑️</button>
                      </div>
                    </div>
                    <p style={styles.p}><strong>{t.customer}:</strong> {order.customer} ({order.phone})</p>
                    <p style={styles.p}><strong>{t.address}:</strong> {order.address}</p>
                    <p style={styles.p}><strong>{t.selectDriver}</strong>{' '}
                      <select value={order.driver} onChange={e => handleDriverReassign(order, e.target.value)} style={{ ...styles.inlineInput, width: 'auto' }}>
                        {drivers.map(d => (<option key={d.id} value={d.name}>{d.name}</option>))}
                      </select>
                    </p>

                    {/* Expected arrival */}
                    <div style={styles.amountRow}>
                      <span style={styles.p}><strong>{t.expectedArrival}:</strong></span>
                      {editingArrivalId === order.id ? (
                        <span>
                          <input type="datetime-local" value={tempArrival} onChange={e => setTempArrival(e.target.value)} style={styles.inlineInput} />
                          <button onClick={() => handleArrivalSave(order)} style={styles.btnSaveCompact}>{t.saveBtn}</button>
                        </span>
                      ) : (
                        <span>
                          {order.expectedArrival ? new Date(order.expectedArrival).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US') : t.unspecified}
                          <button onClick={() => { setEditingArrivalId(order.id); setTempArrival(order.expectedArrival || ''); }} style={styles.btnEditTiny}>✏️</button>
                        </span>
                      )}
                    </div>

                    {/* Damaged/Returned comment */}
                    {(order.status === 'تالف' || order.status === 'مرتجع') && (
                      <div style={{ margin: '8px 0' }}>
                        <label style={styles.label}>{t.statusCommentLabel}</label>
                        {editingCommentId === order.id ? (
                          <div>
                            <textarea rows={2} value={tempComment} onChange={e => setTempComment(e.target.value)} placeholder={t.statusCommentPlaceholder} style={styles.textarea} />
                            <button onClick={() => handleCommentSave(order)} style={{ ...styles.btnSaveCompact, marginTop: '6px' }}>{t.saveBtn}</button>
                          </div>
                        ) : (
                          <p style={styles.p}>
                            {order.statusComment || t.unspecified}
                            <button onClick={() => { setEditingCommentId(order.id); setTempComment(order.statusComment || ''); }} style={styles.btnEditTiny}>✏️</button>
                          </p>
                        )}
                      </div>
                    )}

                    {/* Notes */}
                    <div style={{ margin: '8px 0' }}>
                      <label style={styles.label}>{t.notes}</label>
                      {editingNoteId === order.id ? (
                        <div>
                          <textarea rows={2} value={tempNote} onChange={e => setTempNote(e.target.value)} style={styles.textarea} />
                          <button onClick={() => handleNoteSave(order)} style={{ ...styles.btnSaveCompact, marginTop: '6px' }}>{t.saveBtn}</button>
                        </div>
                      ) : (
                        <p style={styles.p}>
                          {order.notes || t.unspecified}
                          <button onClick={() => { setEditingNoteId(order.id); setTempNote(order.notes || ''); }} style={styles.btnEditTiny}>✏️</button>
                        </p>
                      )}
                    </div>

                    <div style={styles.calculationStrip}>
                      <div>
                        <span>{t.cod}</span>
                        {editingAmountId === order.id ? (
                          <span>
                            <input value={tempAmount} onChange={e => setTempAmount(e.target.value)} style={styles.inlineInput} />
                            <button onClick={() => handleAmountSave(order)} style={styles.btnSaveCompact}>{t.saveBtn}</button>
                          </span>
                        ) : (
                          <strong>{getOrderValue(order)} {curr}<button onClick={() => { setEditingAmountId(order.id); setTempAmount(order.cod); }} style={styles.btnEditTiny}>✏️</button></strong>
                        )}
                      </div>
                      <div>
                        <span>{t.deliveryFee}</span>
                        {editingDeliveryId === order.id ? (
                          <span>
                            <input value={tempDeliveryFee} onChange={e => setTempDeliveryFee(e.target.value)} style={styles.inlineInput} />
                            <button onClick={() => handleDeliveryFeeSave(order)} style={styles.btnSaveCompact}>{t.saveBtn}</button>
                          </span>
                        ) : (
                          <strong>{getDeliveryFee(order)} {curr}<button onClick={() => { setEditingDeliveryId(order.id); setTempDeliveryFee(order.deliveryFee); }} style={styles.btnEditTiny}>✏️</button></strong>
                        )}
                      </div>
                      <div><span>{t.companyRevenue}</span><strong style={{ color: '#34D399' }}>{getCompanyRevenue(order).toFixed(2)} {curr}</strong></div>
                      <div><span>{t.driverRevenue}</span><strong style={{ color: '#60A5FA' }}>{getDriverRevenue(order).toFixed(2)} {curr}</strong></div>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <label style={styles.label}>{t.revenuePercent}</label>
                      <select value={order.revenuePercent} onChange={e => handleRevenuePercentChange(order, e.target.value)} style={styles.revenueSelect}>
                        {REVENUE_OPTIONS.map(p => (<option key={p} value={p}>{p}%</option>))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* LEDGER */}
          {activeTab === 'driver_ledger' && (
            <div style={styles.card}>
              <h2 style={{ color: '#67E8F9', marginTop: 0 }}>{t.driverLedgerTitle}</h2>
              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>{t.filterDriver}</label>
                  <select value={ledgerDriver} onChange={e => setLedgerDriver(e.target.value)} style={styles.input}>
                    <option value="">-- {t.allDrivers} --</option>
                    {drivers.map(d => (<option key={d.id} value={d.name}>{d.name}</option>))}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>{t.filterDate}</label>
                  <input type="date" value={ledgerDate} onChange={e => setLedgerDate(e.target.value)} style={styles.input} />
                </div>
              </div>

              <h3 style={{ color: '#FACC15', marginBottom: '6px' }}>{t.dailyReport}</h3>
              <div style={styles.monthlySummary}>
                <div><span>{t.cashToHandIn}</span><br /><strong>{dailyCollected.toLocaleString()} {curr}</strong></div>
                <div><span>{t.companyRevenueLedger}</span><br /><strong style={{ color: '#34D399' }}>{dailyCompanyRevenue.toFixed(2)} {curr}</strong></div>
                <div><span>{t.driverRevenueLedger}</span><br /><strong style={{ color: '#60A5FA' }}>{dailyDriverRevenue.toFixed(2)} {curr}</strong></div>
              </div>

              <h3 style={{ color: '#FACC15', marginBottom: '6px', marginTop: '18px' }}>{t.weeklyReport}</h3>
              <div style={styles.monthlySummary}>
                <div><span>{t.cashToHandIn}</span><br /><strong>{weeklyCollected.toLocaleString()} {curr}</strong></div>
                <div><span>{t.companyRevenueLedger}</span><br /><strong style={{ color: '#34D399' }}>{weeklyCompanyRevenue.toFixed(2)} {curr}</strong></div>
                <div><span>{t.driverRevenueLedger}</span><br /><strong style={{ color: '#60A5FA' }}>{weeklyDriverRevenue.toFixed(2)} {curr}</strong></div>
              </div>

              <h3 style={{ color: '#FACC15', marginBottom: '6px', marginTop: '18px' }}>{t.monthlyReport}</h3>
              <div style={styles.monthlySummary}>
                <div><span>{t.monthsOrdersCount}</span><br /><strong>{monthlyOrders.length}</strong></div>
                <div><span>{t.monthsTotalCash}</span><br /><strong>{monthlyTotalCash.toLocaleString()} {curr}</strong></div>
                <div><span>{t.companyRevenueLedger}</span><br /><strong style={{ color: '#34D399' }}>{monthlyCompanyRevenue.toFixed(2)} {curr}</strong></div>
                <div><span>{t.driverRevenueLedger}</span><br /><strong style={{ color: '#60A5FA' }}>{monthlyDriverRevenue.toFixed(2)} {curr}</strong></div>
              </div>

              <h3 style={{ color: '#38BDF8', marginTop: '18px' }}>{t.ordersHandled}</h3>
              {filteredLedgerOrders.length === 0 ? (
                <p style={styles.empty}>{t.noOrdersForDate}</p>
              ) : (
                filteredLedgerOrders.map(o => (
                  <div key={o.id} style={styles.ledgerOrderCard} onClick={() => setSelectedOrderForDetails(o)}>
                    <div style={styles.rowBetween}>
                      <span style={styles.orderNumTag}>{o.orderNum}</span>
                      <span style={getStatusStyle(o.status)}>{o.status}</span>
                    </div>
                    <p style={styles.p}>{o.customer} — {o.driver}</p>
                  </div>
                ))
              )}
              <button onClick={() => downloadJson(filteredLedgerOrders, `ledger_${ledgerDate}.json`)} style={{ ...styles.btnGradientCompact, marginTop: '12px' }}>{t.exportData}</button>
            </div>
          )}

          {/* DRIVERS TAB WITH DRILL-DOWN */}
          {activeTab === 'drivers' && (
            <div style={styles.card}>
              <div style={styles.rowBetween}>
                <h2 style={styles.cardTitle}>{t.addDriver}</h2>
                <button onClick={() => downloadJson(drivers, 'drivers.json')} style={styles.btnGradientCompact}>{t.exportData}</button>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input type="text" placeholder={t.driverName} value={newDriverName} onChange={e => setNewDriverName(e.target.value)} style={{ ...styles.input, flex: 1 }} />
                <input type="text" placeholder={t.driverPhone} value={newDriverPhone} onChange={e => setNewDriverPhone(e.target.value)} style={{ ...styles.input, flex: 1 }} />
                <button onClick={handleAddDriver} style={styles.btnGradientCompact}>{t.btnAdd}</button>
              </div>
              <div style={styles.grid2}>
                {drivers.map(d => {
                  const driverOrders = orders.filter(o => o.driver === d.name);
                  return (
                    <div key={d.id} style={styles.clickableCard}>
                      <div onClick={() => setActiveEntityModal({ type: 'driver', data: d.name })}>
                        <h3 style={{ margin: '0 0 8px', color: '#38BDF8' }}>🛵 {d.name}</h3>
                        <p style={styles.p}>📞 {d.phone || t.unspecified}</p>
                        <p style={styles.p}>{t.totalTrips} <strong>{driverOrders.length}</strong></p>
                        <button style={{ ...styles.btnGradientCompact, marginTop: '8px' }}>{t.viewDetails}</button>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); handleDeleteDriver(d); }}
                        style={{ ...styles.btnDeleteCompact, marginTop: '8px' }}
                      >
                        {t.deleteBtn}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MERCHANTS TAB WITH DRILL-DOWN */}
          {activeTab === 'merchants' && (
            <div style={styles.card}>
              <div style={styles.rowBetween}>
                <h2 style={styles.cardTitle}>{t.saveMerchant}</h2>
                <button onClick={() => downloadJson(merchants, 'merchants.json')} style={styles.btnGradientCompact}>{t.exportData}</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder={t.store} value={merchantForm.name} onChange={e => setMerchantForm({ ...merchantForm, name: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.phone} value={merchantForm.phone} onChange={e => setMerchantForm({ ...merchantForm, phone: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.address} value={merchantForm.address} onChange={e => setMerchantForm({ ...merchantForm, address: e.target.value })} style={styles.input} />
                <textarea rows={2} placeholder={t.notes} value={merchantForm.notes} onChange={e => setMerchantForm({ ...merchantForm, notes: e.target.value })} style={styles.textarea} />
                <button onClick={handleSaveMerchant} style={styles.btnGradientCompact}>{t.saveBtn}</button>
              </div>
              <div style={styles.grid2}>
                {merchants.map(m => {
                  const merchantOrders = orders.filter(o => o.store?.toLowerCase() === m.name?.toLowerCase());
                  return (
                    <div key={m.id} style={styles.clickableCard}>
                      <div onClick={() => setActiveEntityModal({ type: 'merchant', data: m })}>
                        <h3 style={{ margin: '0 0 8px', color: '#FACC15' }}>🏪 {m.name}</h3>
                        <p style={styles.p}>📞 {m.phone || t.unspecified}</p>
                        <p style={styles.p}>📍 {m.address || t.unspecified}</p>
                        <p style={styles.p}>📦 Orders: {merchantOrders.length}</p>
                        <button style={{ ...styles.btnGradientCompact, marginTop: '8px' }}>{t.viewDetails}</button>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <button onClick={e => { e.stopPropagation(); setMerchantForm({ ...m }); }} style={styles.btnEditCompact}>{t.editBtn}</button>
                        <button onClick={e => { e.stopPropagation(); handleDeleteMerchant(m); }} style={styles.btnDeleteCompact}>{t.deleteBtn}</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CUSTOMERS TAB WITH DRILL-DOWN */}
          {activeTab === 'customers' && (
            <div style={styles.card}>
              <div style={styles.rowBetween}>
                <h2 style={styles.cardTitle}>{editingCustomer ? t.editCustomer : t.saveCustomer}</h2>
                <button onClick={() => downloadJson(customers, 'customers.json')} style={styles.btnGradientCompact}>{t.exportData}</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder={t.customer} value={newCustomer.name} onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.phone} value={newCustomer.phone} onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })} style={styles.input} />
                <input type="text" placeholder={t.address} value={newCustomer.address} onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })} style={styles.input} />
                <textarea rows={2} placeholder={t.notes} value={newCustomer.notes} onChange={e => setNewCustomer({ ...newCustomer, notes: e.target.value })} style={styles.textarea} />
                <button onClick={handleSaveCustomerExplicit} style={styles.btnGradientCompact}>{t.saveBtn}</button>
              </div>
              <div style={styles.grid2}>
                {customers.map(c => {
                  const customerOrders = orders.filter(o => o.customer?.toLowerCase() === c.name?.toLowerCase() || o.phone === c.phone);
                  return (
                    <div key={c.id} style={styles.clickableCard}>
                      <div onClick={() => setActiveEntityModal({ type: 'customer', data: c })}>
                        <h3 style={{ margin: '0 0 8px', color: '#38BDF8' }}>👤 {c.name}</h3>
                        <p style={styles.p}>📞 {c.phone}</p>
                        <p style={styles.p}>📍 {c.address || t.unspecified}</p>
                        <p style={styles.p}>📦 Orders: {customerOrders.length}</p>
                        <button style={{ ...styles.btnGradientCompact, marginTop: '8px' }}>{t.viewDetails}</button>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <button onClick={e => { e.stopPropagation(); setEditingCustomer(c); setNewCustomer({ name: c.name, phone: c.phone, address: c.address || '', notes: c.notes || '' }); }} style={styles.btnEditCompact}>{t.editBtn}</button>
                        <button onClick={e => { e.stopPropagation(); handleDeleteCustomer(c); }} style={styles.btnDeleteCompact}>{t.deleteBtn}</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AUDIT LOG & DELETED ORDERS */}
          {activeTab === 'history' && (
            <div style={styles.card}>
              <div style={styles.rowBetween}>
                <h2 style={{ ...styles.cardTitle, margin: 0 }}>{t.historyTitle}</h2>
                <button onClick={() => downloadJson(historyLogs, 'history.json')} style={styles.btnGradientCompact}>{t.exportData}</button>
              </div>
              {historyLogs.length === 0 && <p style={styles.empty}>{t.noHistory}</p>}
              {historyLogs.map(log => {
                const isDeleted = log.action === 'Deleted';
                return (
                  <div
                    key={log.id}
                    onClick={() => {
                      const foundOrder = [...orders, ...deletedOrders].find(o => o.orderNum === log.orderNum);
                      if (foundOrder) setSelectedOrderForDetails(foundOrder);
                    }}
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      background: isDeleted ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                      borderRadius: '8px',
                      marginBottom: '6px'
                    }}
                  >
                    <span style={styles.orderNumTag}>{log.orderNum}</span>{' '}
                    <strong style={{ color: isDeleted ? '#FCA5A5' : '#38BDF8' }}>[{log.action}]</strong> — {log.details}
                    {isDeleted && <span style={{ marginLeft: '8px', color: '#EF4444', fontWeight: 'bold' }}>({t.deletedBadge})</span>}
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>🕒 {log.time}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{t.settingsTitle}</h2>

              <label style={styles.label}>{t.settingsAppName}</label>
              <input
                type="text"
                value={settings.appName}
                placeholder={t.appTitle}
                onChange={e => setSettings(prev => ({ ...prev, appName: e.target.value }))}
                style={{ ...styles.input, marginBottom: '14px' }}
              />

              <label style={styles.label}>{t.settingsCommission}</label>
              <select
                value={settings.defaultCommission}
                onChange={e => setSettings(prev => ({ ...prev, defaultCommission: Number(e.target.value) }))}
                style={{ ...styles.revenueSelect, marginBottom: '14px' }}
              >
                {REVENUE_OPTIONS.map(p => (<option key={p} value={p}>{p}%</option>))}
              </select>

              <label style={styles.label}>{t.settingsCurrency}</label>
              <select
                value={settings.currency}
                onChange={e => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                style={{ ...styles.input, marginBottom: '14px' }}
              >
                {CURRENCY_OPTIONS.map(c => (<option key={c} value={c}>{c}</option>))}
              </select>

              <div style={styles.toggleRow}>
                <div>
                  <div style={{ fontWeight: '700' }}>{t.settingsAutoAssign}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>{t.settingsAutoAssignHint}</div>
                </div>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, autoAssign: !prev.autoAssign }))}
                  style={{ ...styles.toggleTrack, background: settings.autoAssign ? '#10B981' : '#475569' }}
                >
                  <span style={{ ...styles.toggleThumb, left: settings.autoAssign ? '23px' : '3px' }} />
                </button>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '18px 0', paddingTop: '18px' }}>
                <div style={styles.financeTitle}>{t.settingsBackup}</div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button onClick={handleExportBackup} style={styles.btnGradientCompact}>{t.settingsExport}</button>
                  <button onClick={() => backupInputRef.current?.click()} style={{ ...styles.btnGradientCompact, background: 'linear-gradient(135deg,#059669,#10B981)' }}>{t.settingsImport}</button>
                  <input ref={backupInputRef} type="file" accept="application/json" style={{ display: 'none' }} onChange={handleImportBackup} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '18px 0', paddingTop: '18px' }}>
                <label style={styles.label}>{t.settingsApiKey}</label>
                <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="Groq API Key..." style={styles.input} />
              </div>
            </div>
          )}
        </main>

        {/* ENTITY DRILL-DOWN MODAL */}
        {activeEntityModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <div style={styles.rowBetween}>
                <h2 style={{ margin: 0, color: '#C084FC' }}>
                  {activeEntityModal.type === 'driver' && `🛵 ${activeEntityModal.data}`}
                  {activeEntityModal.type === 'merchant' && `🏪 ${activeEntityModal.data.name}`}
                  {activeEntityModal.type === 'customer' && `👤 ${activeEntityModal.data.name}`}
                </h2>
                <button onClick={() => setActiveEntityModal(null)} style={styles.btnDeleteCompact}>✕</button>
              </div>

              {/* DRIVER METRICS */}
              {activeEntityModal.type === 'driver' && (() => {
                const metrics = computeDriverMetrics(activeEntityModal.data);
                return (
                  <div style={{ margin: '10px 0 18px' }}>
                    <h3 style={{ color: '#FACC15', marginBottom: '10px' }}>{t.driverProfileMetrics}</h3>
                    <div style={styles.grid3}>
                      {[
                        [t.daily, metrics.dailyCount, metrics.dailyCash, metrics.dailyRevenue],
                        [t.weekly, metrics.weeklyCount, metrics.weeklyCash, metrics.weeklyRevenue],
                        [t.monthly, metrics.monthlyCount, metrics.monthlyCash, metrics.monthlyRevenue]
                      ].map(([label, count, cash, rev]) => (
                        <div key={label} style={styles.orderFinancialCard}>
                          <div style={styles.miniLabel}>{label}</div>
                          <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>{t.ordersCount}: <strong>{count}</strong></div>
                          <div style={{ fontSize: '0.8rem' }}>{t.cashCollected}: <strong>{cash.toFixed(0)} {curr}</strong></div>
                          <div style={{ fontSize: '0.8rem', color: '#60A5FA' }}>{t.revenue}: <strong>{rev.toFixed(0)} {curr}</strong></div>
                        </div>
                      ))}
                    </div>
                    <p style={{ ...styles.p, marginTop: '10px' }}>{t.totalTrips} <strong>{metrics.totalOrders}</strong> · {t.statusCompleted}: <strong>{metrics.deliveredCount}</strong></p>
                  </div>
                );
              })()}

              {/* NOTES SECTION */}
              <div style={{ margin: '15px 0' }}>
                <label style={styles.label}>{t.entityNotes}</label>
                <textarea
                  rows={3}
                  placeholder={t.addNotePlaceholder}
                  value={
                    activeEntityModal.type === 'driver'
                      ? driverNotes[activeEntityModal.data] || ''
                      : activeEntityModal.data.notes || ''
                  }
                  onChange={e =>
                    updateEntityNote(
                      activeEntityModal.type,
                      activeEntityModal.type === 'driver' ? activeEntityModal.data : activeEntityModal.data.id,
                      e.target.value
                    )
                  }
                  style={styles.textarea}
                />
              </div>

              {/* ASSOCIATED ORDERS */}
              <h3 style={{ color: '#FACC15', marginBottom: '10px' }}>{t.ordersHandled}</h3>
              {(() => {
                const assocOrders = orders.filter(o => {
                  if (activeEntityModal.type === 'driver') return o.driver === activeEntityModal.data;
                  if (activeEntityModal.type === 'merchant') return o.store?.toLowerCase() === activeEntityModal.data.name?.toLowerCase();
                  if (activeEntityModal.type === 'customer') return o.customer?.toLowerCase() === activeEntityModal.data.name?.toLowerCase() || o.phone === activeEntityModal.data.phone;
                  return false;
                });

                if (assocOrders.length === 0) return <p style={styles.empty}>{t.noOrdersFound}</p>;

                return assocOrders.map(o => (
                  <div
                    key={o.id}
                    onClick={() => setSelectedOrderForDetails(o)}
                    style={{ ...styles.extractedSubCard, cursor: 'pointer', marginBottom: '8px' }}
                  >
                    <div style={styles.rowBetween}>
                      <span style={styles.orderNumTag}>{o.orderNum}</span>
                      <span style={getStatusStyle(o.status)}>{o.status}</span>
                    </div>
                    <div><strong>{t.cod}:</strong> {o.cod} {curr} | <strong>{t.deliveryFee}:</strong> {o.deliveryFee} {curr}</div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* MANUAL DUPLICATE MODAL */}
        {manualDuplicateModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <h3 style={{ margin: '0 0 10px', color: '#FACC15' }}>{t.duplicateFoundTitle}</h3>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>{t.duplicateFoundMsg}</p>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', margin: '12px 0' }}>
                <strong style={{ color: '#38BDF8' }}>{manualDuplicateModal.match.name}</strong> ({manualDuplicateModal.match.phone || 'No phone'})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => resolveManualDuplicate('overwrite')} style={{ ...styles.btnGradientCompact, background: 'linear-gradient(135deg,#059669,#10B981)' }}>{t.duplicateOverwrite}</button>
                <button onClick={() => resolveManualDuplicate('keep')} style={styles.btnGradientCompact}>{t.duplicateKeepBoth}</button>
                <button onClick={() => setManualDuplicateModal(null)} style={{ ...styles.btnSuccessGradient, background: '#475569' }}>{t.cancel}</button>
              </div>
            </div>
          </div>
        )}

        {/* FULL ORDER EDIT MODAL */}
        {editingOrder && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <div style={styles.rowBetween}>
                <h3 style={{ margin: 0, color: '#C084FC' }}>{t.editOrderTitle} ({editingOrder.orderNum})</h3>
                <button onClick={() => setEditingOrder(null)} style={styles.btnDeleteCompact}>✕</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <div>
                  <label style={styles.label}>{t.store}</label>
                  <input style={styles.input} value={editingOrder.store} onChange={e => setEditingOrder({ ...editingOrder, store: e.target.value })} />
                </div>
                <div>
                  <label style={styles.label}>{t.customer}</label>
                  <input style={styles.input} value={editingOrder.customer} onChange={e => setEditingOrder({ ...editingOrder, customer: e.target.value })} />
                </div>
                <div>
                  <label style={styles.label}>{t.phone}</label>
                  <input style={styles.input} value={editingOrder.phone} onChange={e => setEditingOrder({ ...editingOrder, phone: e.target.value })} />
                </div>
                <div>
                  <label style={styles.label}>{t.address}</label>
                  <input style={styles.input} value={editingOrder.address} onChange={e => setEditingOrder({ ...editingOrder, address: e.target.value })} />
                </div>
                <div>
                  <label style={styles.label}>{t.item}</label>
                  <input style={styles.input} value={editingOrder.item} onChange={e => setEditingOrder({ ...editingOrder, item: e.target.value })} />
                </div>
                <div style={styles.grid2}>
                  <div>
                    <label style={styles.label}>{t.cod}</label>
                    <input type="number" style={styles.input} value={editingOrder.cod} onChange={e => setEditingOrder({ ...editingOrder, cod: normalizeNumber(e.target.value) })} />
                  </div>
                  <div>
                    <label style={styles.label}>{t.deliveryFee}</label>
                    <input type="number" style={styles.input} value={editingOrder.deliveryFee} onChange={e => setEditingOrder({ ...editingOrder, deliveryFee: normalizeNumber(e.target.value) })} />
                  </div>
                </div>
                <div>
                  <label style={styles.label}>{t.paymentMethod}</label>
                  <select style={styles.input} value={editingOrder.paymentMethod} onChange={e => setEditingOrder({ ...editingOrder, paymentMethod: e.target.value })}>
                    <option value="cash">{t.paymentCash}</option>
                    <option value="online">{t.paymentOnline}</option>
                    <option value="prepaid">{t.paymentPrepaid}</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>{t.revenuePercent}</label>
                  <select style={styles.revenueSelect} value={editingOrder.revenuePercent} onChange={e => setEditingOrder({ ...editingOrder, revenuePercent: Number(e.target.value) })}>
                    {REVENUE_OPTIONS.map(p => (<option key={p} value={p}>{p}%</option>))}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>{t.selectDriver}</label>
                  <select style={styles.input} value={editingOrder.driver} onChange={e => setEditingOrder({ ...editingOrder, driver: e.target.value })}>
                    {drivers.map(d => (<option key={d.id} value={d.name}>{d.name}</option>))}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>{t.expectedArrival}</label>
                  <input type="datetime-local" style={styles.input} value={editingOrder.expectedArrival || ''} onChange={e => setEditingOrder({ ...editingOrder, expectedArrival: e.target.value })} />
                </div>
                {(editingOrder.status === 'تالف' || editingOrder.status === 'مرتجع') && (
                  <div>
                    <label style={styles.label}>{t.statusCommentLabel}</label>
                    <textarea rows={2} style={styles.textarea} value={editingOrder.statusComment || ''} onChange={e => setEditingOrder({ ...editingOrder, statusComment: e.target.value })} />
                  </div>
                )}
                <div>
                  <label style={styles.label}>{t.notes}</label>
                  <textarea rows={2} style={styles.textarea} value={editingOrder.notes} onChange={e => setEditingOrder({ ...editingOrder, notes: e.target.value })} />
                </div>
                <button onClick={handleSaveOrderEdit} style={styles.btnSuccessGradient}>{t.saveChanges}</button>
              </div>
            </div>
          </div>
        )}

        {/* DISPATCH MESSAGE MODAL */}
        {dispatchOrder && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <div style={styles.rowBetween}>
                <h3 style={{ margin: 0, color: '#38BDF8' }}>{t.dispatchTitle}</h3>
                <button onClick={() => setDispatchOrder(null)} style={styles.btnDeleteCompact}>✕</button>
              </div>
              <pre style={styles.dispatchPre}>{generateDispatchMessage(dispatchOrder)}</pre>
              <button onClick={handleCopyDispatch} style={styles.btnSuccessGradient}>
                {dispatchCopied ? t.dispatchCopied : t.dispatchCopy}
              </button>
            </div>
          </div>
        )}

        {/* ORDER DETAILS & AUDIT MODAL */}
        {selectedOrderForDetails && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <div style={styles.rowBetween}>
                <h3 style={{ margin: 0, color: '#38BDF8' }}>{t.orderDetailsModal} ({selectedOrderForDetails.orderNum})</h3>
                <button onClick={() => setSelectedOrderForDetails(null)} style={styles.btnDeleteCompact}>✕</button>
              </div>

              <div style={{ margin: '15px 0' }}>
                <p style={styles.p}><strong>{t.customer}:</strong> {selectedOrderForDetails.customer} ({selectedOrderForDetails.phone})</p>
                <p style={styles.p}><strong>{t.store}:</strong> {selectedOrderForDetails.store}</p>
                <p style={styles.p}><strong>{t.address}:</strong> {selectedOrderForDetails.address}</p>
                <p style={styles.p}><strong>{t.cod}:</strong> {selectedOrderForDetails.cod} {curr}</p>
                <p style={styles.p}><strong>{t.deliveryFee}:</strong> {selectedOrderForDetails.deliveryFee} {curr}</p>
                <p style={styles.p}><strong>{t.expectedArrival}:</strong> {selectedOrderForDetails.expectedArrival ? new Date(selectedOrderForDetails.expectedArrival).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US') : t.unspecified}</p>
                {(selectedOrderForDetails.status === 'تالف' || selectedOrderForDetails.status === 'مرتجع') && (
                  <p style={styles.p}><strong>{t.statusCommentLabel}</strong> {selectedOrderForDetails.statusComment || t.unspecified}</p>
                )}
              </div>

              <h4 style={{ color: '#FACC15', marginBottom: '8px' }}>Audit Trail</h4>
              {historyLogs
                .filter(log => log.orderNum === selectedOrderForDetails.orderNum)
                .map(log => (
                  <div key={log.id} style={{ fontSize: '0.82rem', padding: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <strong>[{log.action}]</strong> {log.details}
                    <div style={{ color: '#64748B', fontSize: '0.72rem' }}>{log.time}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
    }
