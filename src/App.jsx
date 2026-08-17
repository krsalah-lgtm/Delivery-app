import React, { useEffect, useMemo, useState } from 'react';

/* =========================================================
   EXPRESS DELIVERY PRO
   Complete standalone React dashboard
   ========================================================= */

const STORAGE = {
  lang: 'express_lang',
  apiKey: 'express_groq_key',
  settings: 'express_settings_v8',
  orders: 'express_orders_v8',
  deletedOrders: 'express_deleted_orders_v8',
  merchants: 'express_merchants_v8',
  customers: 'express_customers_v8',
  drivers: 'express_drivers_v8',
  history: 'express_history_v8',
  counter: 'express_counter_v8'
};

const PAYMENT = {
  CASH: 'cash',
  ONLINE: 'online',
  PREPAID: 'prepaid'
};

const STATUS = {
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  IN_TRANSIT: 'in_transit',
  COMPLETED: 'completed',
  DELAYED: 'delayed',
  CANCELLED: 'cancelled'
};

const REVENUE_OPTIONS = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 90, 100
];

const DEFAULT_SETTINGS = {
  currency: 'EGP',
  defaultCommission: 20,
  defaultDeliveryMinutes: 60,
  autoDriverAssignment: false,
  autoDelayStatus: true,
  soundAlerts: true,
  compactMode: false
};

/* =========================================================
   HELPERS
   ========================================================= */

const safeJSON = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeNumber = value => {
  const n = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const uid = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const nowISO = () => new Date().toISOString();

const formatDateTime = (date, lang = 'en') => {
  if (!date) return '—';

  try {
    return new Date(date).toLocaleString(
      lang === 'ar' ? 'ar-EG' : 'en-US',
      {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    );
  } catch {
    return '—';
  }
};

const money = (value, currency = 'EGP') =>
  `${normalizeNumber(value).toLocaleString(undefined, {
    maximumFractionDigits: 2
  })} ${currency}`;

const isPaid = order =>
  order?.paymentMethod === PAYMENT.ONLINE ||
  order?.paymentMethod === PAYMENT.PREPAID;

const paymentLabel = (order, lang) => {
  if (isPaid(order)) {
    return lang === 'ar' ? 'مدفوع بالفعل' : 'PAID';
  }

  return lang === 'ar' ? 'غير مدفوع' : 'UNPAID';
};

const getCollection = order => {
  if (!order || order.status === STATUS.CANCELLED) return 0;

  if (isPaid(order)) {
    return normalizeNumber(order.deliveryFee);
  }

  return (
    normalizeNumber(order.cod) +
    normalizeNumber(order.deliveryFee)
  );
};

/*
  IMPORTANT:
  Every order stores its own revenue information.

  revenueType:
    "percent" = company gets X% of delivery fee
    "amount"  = company gets X EGP

  The driver's amount is ALWAYS:
    delivery fee - company revenue
*/

const getCompanyRevenue = order => {
  if (!order || order.status === STATUS.CANCELLED) return 0;

  const fee = normalizeNumber(order.deliveryFee);

  if (order.revenueType === 'amount') {
    return Math.min(
      Math.max(0, normalizeNumber(order.revenueValue)),
      fee
    );
  }

  return (
    fee *
    (normalizeNumber(order.revenuePercent) / 100)
  );
};

const getDriverRevenue = order => {
  if (!order || order.status === STATUS.CANCELLED) return 0;

  const fee = normalizeNumber(order.deliveryFee);

  return Math.max(
    0,
    fee - getCompanyRevenue(order)
  );
};

const getCompanyPercent = order => {
  const fee = normalizeNumber(order?.deliveryFee);

  if (!fee) return 0;

  return (
    (getCompanyRevenue(order) / fee) *
    100
  );
};

const startOfDay = date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const isSameDay = (a, b) =>
  startOfDay(a).getTime() === startOfDay(b).getTime();

const isWithinDays = (date, days) => {
  const now = new Date();
  const d = new Date(date);

  return (
    now >= d &&
    now - d <= days * 24 * 60 * 60 * 1000
  );
};

const normalizeStatus = status => {
  const map = {
    مؤكد: STATUS.CONFIRMED,
    'قيد تجهيز الطلب': STATUS.PROCESSING,
    'قيد التجهيز': STATUS.PROCESSING,
    'خرج للتوصيل': STATUS.OUT_FOR_DELIVERY,
    'جاري التوصيل': STATUS.IN_TRANSIT,
    مكتمل: STATUS.COMPLETED,
    متأخر: STATUS.DELAYED,
    ملغي: STATUS.CANCELLED
  };

  return (
    map[status] ||
    status ||
    STATUS.CONFIRMED
  );
};

const normalizeOrder = order => {
  const fee = normalizeNumber(order?.deliveryFee);

  let revenueType =
    order?.revenueType === 'amount'
      ? 'amount'
      : 'percent';

  let revenuePercent = normalizeNumber(
    order?.revenuePercent
  );

  let revenueValue = normalizeNumber(
    order?.revenueValue
  );

  /*
    Compatibility with older versions of the app.
  */
  if (
    order &&
    order.revenueType === undefined &&
    order.revenuePercent !== undefined
  ) {
    revenueType = 'percent';
    revenuePercent = normalizeNumber(
      order.revenuePercent
    );
  }

  if (revenueType === 'amount') {
    revenueValue = Math.min(
      Math.max(0, revenueValue),
      fee
    );

    revenuePercent = fee
      ? (revenueValue / fee) * 100
      : 0;
  } else {
    revenuePercent = Math.min(
      100,
      Math.max(0, revenuePercent)
    );

    revenueValue =
      fee * (revenuePercent / 100);
  }

  return {
    ...order,

    status: normalizeStatus(order?.status),

    cod: normalizeNumber(order?.cod),
    deliveryFee: fee,

    revenueType,
    revenuePercent,
    revenueValue,

    driverId: order?.driverId || '',
    driverName: order?.driverName || '',

    paymentMethod:
      order?.paymentMethod || PAYMENT.CASH
  };
};

/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {
  en: {
    appTitle: 'Express Delivery PRO',
    subtitle: 'Enterprise Delivery & Logistics Control Center',

    dashboard: 'Dashboard',
    newOrder: 'New Order',
    orders: 'Orders',
    drivers: 'Drivers',
    merchants: 'Merchants',
    customers: 'Customers',
    ledger: 'Driver Ledger',
    history: 'Audit History',
    settings: 'Settings',
    importExport: 'WhatsApp / Import Center',

    active: 'Active',
    completed: 'Completed',
    delayed: 'Delayed',
    collected: 'Collected',
    companyRevenue: 'Company Revenue',
    driverRevenue: 'Driver Revenue',
    totalOrders: 'Total Orders',

    importTitle: 'WhatsApp / Plain Text Center',
    importSubtitle:
      'Paste raw WhatsApp messages or generate a driver dispatch message.',
    pasteText: 'Paste WhatsApp / Plain Text',
    parse: 'Parse Orders with AI',
    dispatch: 'Driver Dispatch',
    generate: 'Generate WhatsApp Message',
    copy: 'Copy',
    copied: 'Copied!',
    clear: 'Clear',

    customer: 'Customer',
    store: 'Merchant',
    phone: 'Phone',
    address: 'Address',
    notes: 'Notes',
    item: 'Items',
    orderValue: 'Order Value',
    deliveryFee: 'Delivery Fee',
    payment: 'Payment',
    driver: 'Driver',
    commission: 'Company Share',
    expectedDelivery: 'Expected Delivery',
    createdAt: 'Created',
    status: 'Status',

    cash: 'Cash on Delivery',
    online: 'Paid Online',
    prepaid: 'Prepaid',

    paid: 'PAID',
    unpaid: 'UNPAID',
    paidStatus: 'Payment Status',

    selectDriver: 'Select Driver',
    revenueShare: 'Company Revenue',
    revenueType: 'Revenue Type',
    percentage: 'Percentage',
    fixedAmount: 'Fixed Amount',
    driverShare: 'Driver Share',
    companyShare: 'Company Share',

    confirmOrder: 'Confirm & Save Orders',
    noOrders: 'No orders found.',

    addDriver: 'Add Driver',
    driverName: 'Driver name',
    driverPhone: 'Driver phone',

    profile: 'Profile',
    activeOrders: 'Active Orders',
    daily: 'Today',
    weekly: 'This Week',
    monthly: 'This Month',
    collections: 'Collections',
    viewProfile: 'View Profile',

    addMerchant: 'Add Merchant',
    addCustomer: 'Add Customer',
    save: 'Save',
    edit: 'Edit',

    settingsTitle: 'Enterprise Settings',
    defaultCommission: 'Default Company Revenue %',
    currency: 'System Currency',
    defaultSLA: 'Default Delivery SLA',
    autoAssign: 'Auto-assign Driver',
    autoDelay: 'Automatically Mark Late Orders',
    backup: 'Backup',
    exportJSON: 'Export JSON Backup',
    importJSON: 'Import JSON Backup',

    search: 'Search orders...',
    orderDetails: 'Order Details',
    audit: 'Audit Timeline',

    delayedBy: 'Delayed by',
    dueIn: 'Due in',

    close: 'Close',
    cancel: 'Cancel',
    update: 'Update',

    addressIncomplete: 'Address needs verification',

    noDriver: 'Unassigned',

    createdSuccessfully: 'Order created successfully.',
    backupImported: 'Backup imported successfully.',
    invalidBackup: 'Invalid backup file.',

    dashboardTitle: 'Operations Overview',
    dispatchCenter: 'Dispatch Center',
    urgentOrders: 'Needs Attention',
    todayRevenue: "Today's Revenue",
    todayCollections: "Today's Collections",

    paymentCollected: 'Customer Collection',
    financialBreakdown: 'Financial Breakdown',
    companyGets: 'Company gets',
    driverGets: 'Driver gets',

    delete: 'Delete',
    completedStatus: 'Completed',
    markCompleted: 'Mark Completed',

    noDrivers: 'No drivers available.',
    noMerchants: 'No merchants available.',
    noCustomers: 'No customers available.',

    apiKey: 'Groq API Key',
    language: 'Language',
    english: 'English',
    arabic: 'العربية',

    revenueWarning:
      'The driver receives the remainder of the delivery fee.',

    orderNumber: 'Order Number',
    created: 'Created',

    clearAll: 'Clear',
    restore: 'Restore'
  },

  ar: {
    appTitle: 'إكسبريس دليفري PRO',
    subtitle: 'مركز التحكم المؤسسي للتوصيل واللوجستيات',

    dashboard: 'لوحة التحكم',
    newOrder: 'طلب جديد',
    orders: 'الطلبات',
    drivers: 'الطيارين',
    merchants: 'التجار',
    customers: 'العملاء',
    ledger: 'كشف حساب الطيارين',
    history: 'سجل التعديلات',
    settings: 'الإعدادات',
    importExport: 'مركز واتساب والاستيراد',

    active: 'نشطة',
    completed: 'مكتملة',
    delayed: 'متأخرة',
    collected: 'التحصيل',
    companyRevenue: 'إيراد الشركة',
    driverRevenue: 'نصيب الطيار',
    totalOrders: 'إجمالي الطلبات',

    importTitle: 'مركز واتساب / استيراد النص',
    importSubtitle:
      'الصق رسائل واتساب الخام أو أنشئ رسالة جاهزة لإرسالها للطيار.',
    pasteText: 'رسائل واتساب / نص خام',
    parse: 'استخراج الطلبات بالذكاء الاصطناعي',
    dispatch: 'إرسال للطيار',
    generate: 'إنشاء رسالة واتساب',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    clear: 'مسح',

    customer: 'العميل',
    store: 'التاجر',
    phone: 'الهاتف',
    address: 'العنوان',
    notes: 'الملاحظات',
    item: 'الأصناف',
    orderValue: 'قيمة الطلب',
    deliveryFee: 'رسوم التوصيل',
    payment: 'الدفع',
    driver: 'الطيار',
    commission: 'نسبة الشركة',
    expectedDelivery: 'موعد التسليم المتوقع',
    createdAt: 'وقت الإنشاء',
    status: 'الحالة',

    cash: 'كاش عند الاستلام',
    online: 'مدفوع أونلاين',
    prepaid: 'مدفوع مسبقًا',

    paid: 'مدفوع',
    unpaid: 'غير مدفوع',
    paidStatus: 'حالة الدفع',

    selectDriver: 'اختيار الطيار',
    revenueShare: 'إيراد الشركة',
    revenueType: 'نوع الإيراد',
    percentage: 'نسبة مئوية',
    fixedAmount: 'مبلغ ثابت',
    driverShare: 'نصيب الطيار',
    companyShare: 'نصيب الشركة',

    confirmOrder: 'تأكيد وحفظ الطلبات',
    noOrders: 'لا توجد طلبات.',

    addDriver: 'إضافة طيار',
    driverName: 'اسم الطيار',
    driverPhone: 'رقم هاتف الطيار',

    profile: 'الملف الشخصي',
    activeOrders: 'الطلبات النشطة',
    daily: 'اليوم',
    weekly: 'هذا الأسبوع',
    monthly: 'هذا الشهر',
    collections: 'التحصيل',
    viewProfile: 'عرض الملف',

    addMerchant: 'إضافة تاجر',
    addCustomer: 'إضافة عميل',
    save: 'حفظ',
    edit: 'تعديل',

    settingsTitle: 'إعدادات المؤسسة',
    defaultCommission: 'نسبة إيراد الشركة الافتراضية',
    currency: 'عملة النظام',
    defaultSLA: 'المدة الافتراضية للتوصيل',
    autoAssign: 'تعيين الطيار تلقائيًا',
    autoDelay: 'تحويل الطلبات المتأخرة تلقائيًا',
    backup: 'النسخ الاحتياطي',
    exportJSON: 'تصدير نسخة JSON',
    importJSON: 'استيراد نسخة JSON',

    search: 'البحث في الطلبات...',
    orderDetails: 'تفاصيل الطلب',
    audit: 'السجل الزمني',

    delayedBy: 'متأخر منذ',
    dueIn: 'متبقي',

    close: 'إغلاق',
    cancel: 'إلغاء',
    update: 'تحديث',

    addressIncomplete: 'العنوان يحتاج إلى مراجعة',

    noDriver: 'غير معين',

    createdSuccessfully: 'تم إنشاء الطلب بنجاح.',
    backupImported: 'تم استيراد النسخة الاحتياطية بنجاح.',
    invalidBackup: 'ملف النسخة الاحتياطية غير صالح.',

    dashboardTitle: 'نظرة عامة على العمليات',
    dispatchCenter: 'مركز التوزيع',
    urgentOrders: 'تحتاج إلى تدخل',
    todayRevenue: 'إيراد اليوم',
    todayCollections: 'تحصيل اليوم',

    paymentCollected: 'تحصيل العميل',
    financialBreakdown: 'التقسيم المالي',
    companyGets: 'نصيب الشركة',
    driverGets: 'نصيب الطيار',

    delete: 'حذف',
    completedStatus: 'مكتمل',
    markCompleted: 'تحديد كمكتمل',

    noDrivers: 'لا يوجد طيارون.',
    noMerchants: 'لا يوجد تجار.',
    noCustomers: 'لا يوجد عملاء.',

    apiKey: 'مفتاح Groq API',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',

    revenueWarning:
      'الطيار يحصل دائمًا على باقي رسوم التوصيل بعد خصم نصيب الشركة.',

    orderNumber: 'رقم الطلب',
    created: 'تم الإنشاء',

    clearAll: 'مسح',
    restore: 'استعادة'
  }
};

/* =========================================================
   STYLES
   ========================================================= */

const styles = {
  app: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top left, #25114A 0%, #0A0614 38%, #05030A 100%)',
    color: '#F8FAFC',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif',
    padding: 18,
    boxSizing: 'border-box'
  },

  shell: {
    maxWidth: 1450,
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
    flexWrap: 'wrap'
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 14
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    background:
      'linear-gradient(135deg,#7C3AED,#EC4899)',
    boxShadow:
      '0 12px 35px rgba(124,58,237,.35)'
  },

  title: {
    margin: 0,
    fontSize: 25,
    fontWeight: 900,
    letterSpacing: '-.6px'
  },

  subtitle: {
    margin: '4px 0 0',
    color: '#94A3B8',
    fontSize: 13
  },

  headerActions: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap'
  },

  button: {
    border: 0,
    borderRadius: 12,
    padding: '11px 15px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 800,
    background: '#1E293B'
  },

  primary: {
    background:
      'linear-gradient(135deg,#7C3AED,#A855F7)'
  },

  success: {
    background:
      'linear-gradient(135deg,#059669,#10B981)'
  },

  danger: {
    background:
      'linear-gradient(135deg,#DC2626,#EF4444)'
  },

  warning: {
    background:
      'linear-gradient(135deg,#B45309,#F59E0B)'
  },

  layout: {
    display: 'grid',
    gridTemplateColumns: '250px minmax(0,1fr)',
    gap: 18
  },

  sidebar: {
    background: 'rgba(15,10,28,.8)',
    border:
      '1px solid rgba(168,85,247,.18)',
    borderRadius: 22,
    padding: 12,
    height: 'fit-content',
    position: 'sticky',
    top: 18
  },

  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7
  },

  navButton: {
    width: '100%',
    textAlign: 'left',
    border: '1px solid transparent',
    background: 'transparent',
    color: '#CBD5E1',
    padding: '12px 13px',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 700
  },

  navActive: {
    background: 'rgba(124,58,237,.23)',
    border:
      '1px solid rgba(168,85,247,.45)',
    color: '#fff'
  },

  content: {
    minWidth: 0
  },

  grid4: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(4,minmax(0,1fr))',
    gap: 12,
    marginBottom: 16
  },

  metric: {
    background: 'rgba(15,10,28,.75)',
    border:
      '1px solid rgba(168,85,247,.16)',
    borderRadius: 18,
    padding: 17
  },

  metricLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: 700
  },

  metricValue: {
    display: 'block',
    fontSize: 25,
    fontWeight: 900,
    marginTop: 6
  },

  card: {
    background: 'rgba(15,10,28,.78)',
    border:
      '1px solid rgba(168,85,247,.17)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow:
      '0 15px 45px rgba(0,0,0,.15)'
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap'
  },

  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 900
  },

  muted: {
    color: '#94A3B8',
    fontSize: 13
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '11px 13px',
    borderRadius: 11,
    border:
      '1px solid rgba(168,85,247,.25)',
    background: '#0B0718',
    color: '#fff',
    outline: 'none'
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: 14,
    minHeight: 180,
    resize: 'vertical',
    borderRadius: 14,
    border:
      '1px solid rgba(168,85,247,.25)',
    background: '#0B0718',
    color: '#fff',
    outline: 'none',
    lineHeight: 1.55
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(2,minmax(0,1fr))',
    gap: 12
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },

  label: {
    fontSize: 12,
    color: '#CBD5E1',
    fontWeight: 700
  },

  orderGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(3,minmax(0,1fr))',
    gap: 12
  },

  orderCard: {
    background: 'rgba(10,6,20,.85)',
    border:
      '1px solid rgba(255,255,255,.07)',
    borderRadius: 17,
    padding: 16,
    marginBottom: 12
  },

  status: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 9px',
    borderRadius: 9,
    fontSize: 11,
    fontWeight: 900
  },

  search: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#0B0718',
    color: '#fff',
    border:
      '1px solid rgba(168,85,247,.25)',
    borderRadius: 13,
    padding: 13,
    marginBottom: 14,
    outline: 'none'
  },

  profileGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(4,minmax(0,1fr))',
    gap: 10,
    margin: '15px 0'
  },

  miniMetric: {
    padding: 12,
    borderRadius: 13,
    background:
      'rgba(255,255,255,.045)',
    border:
      '1px solid rgba(255,255,255,.06)'
  },

  modalOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: 'rgba(0,0,0,.78)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },

  modal: {
    width: 'min(900px,100%)',
    maxHeight: '92vh',
    overflowY: 'auto',
    background: '#120A24',
    border:
      '1px solid rgba(168,85,247,.4)',
    borderRadius: 22,
    padding: 22,
    boxShadow:
      '0 30px 90px rgba(0,0,0,.5)'
  },

  dispatchBox: {
    whiteSpace: 'pre-wrap',
    background: '#07040D',
    border:
      '1px solid rgba(255,255,255,.08)',
    borderRadius: 14,
    padding: 16,
    lineHeight: 1.65,
    fontSize: 14
  },

  alert: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 13,
    fontWeight: 700
  },

  paymentPaid: {
    display: 'inline-flex',
    padding: '7px 11px',
    borderRadius: 9,
    background: 'rgba(16,185,129,.12)',
    color: '#34D399',
    border:
      '1px solid rgba(16,185,129,.35)',
    fontWeight: 900,
    fontSize: 12
  },

  paymentUnpaid: {
    display: 'inline-flex',
    padding: '7px 11px',
    borderRadius: 9,
    background: 'rgba(245,158,11,.12)',
    color: '#FBBF24',
    border:
      '1px solid rgba(245,158,11,.35)',
    fontWeight: 900,
    fontSize: 12
  },

  financialBox: {
    marginTop: 14,
    padding: 15,
    borderRadius: 15,
    background:
      'linear-gradient(135deg,rgba(124,58,237,.12),rgba(236,72,153,.06))',
    border:
      '1px solid rgba(168,85,247,.2)'
  },

  splitGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(3,minmax(0,1fr))',
    gap: 10,
    marginTop: 10
  },

  tableRow: {
    display: 'grid',
    gridTemplateColumns:
      '110px 1fr 130px 120px',
    gap: 10,
    alignItems: 'center',
    padding: 12,
    borderBottom:
      '1px solid rgba(255,255,255,.06)'
  }
};

/* =========================================================
   STATUS
   ========================================================= */

const statusColor = status => {
  switch (status) {
    case STATUS.COMPLETED:
      return '#10B981';

    case STATUS.DELAYED:
      return '#F59E0B';

    case STATUS.CANCELLED:
      return '#EF4444';

    case STATUS.IN_TRANSIT:
    case STATUS.OUT_FOR_DELIVERY:
      return '#3B82F6';

    case STATUS.PROCESSING:
      return '#8B5CF6';

    case STATUS.CONFIRMED:
      return '#A78BFA';

    default:
      return '#64748B';
  }
};

const statusLabel = (status, lang) => {
  const map = {
    [STATUS.CONFIRMED]:
      lang === 'ar' ? 'مؤكد' : 'Confirmed',

    [STATUS.PROCESSING]:
      lang === 'ar' ? 'قيد التجهيز' : 'Processing',

    [STATUS.OUT_FOR_DELIVERY]:
      lang === 'ar'
        ? 'خرج للتوصيل'
        : 'Out for Delivery',

    [STATUS.IN_TRANSIT]:
      lang === 'ar'
        ? 'جاري التوصيل'
        : 'In Transit',

    [STATUS.COMPLETED]:
      lang === 'ar'
        ? 'مكتمل'
        : 'Completed',

    [STATUS.DELAYED]:
      lang === 'ar'
        ? 'متأخر'
        : 'Delayed',

    [STATUS.CANCELLED]:
      lang === 'ar'
        ? 'ملغي'
        : 'Cancelled'
  };

  return map[status] || status;
};

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [lang, setLang] = useState(
    () =>
      localStorage.getItem(STORAGE.lang) ||
      'ar'
  );

  const t = translations[lang];

  const [apiKey, setApiKey] = useState(
    () =>
      localStorage.getItem(
        STORAGE.apiKey
      ) || ''
  );

  const [settings, setSettings] = useState(
    () => ({
      ...DEFAULT_SETTINGS,
      ...safeJSON(
        STORAGE.settings,
        {}
      )
    })
  );

  const [orders, setOrders] = useState(
    () =>
      safeJSON(STORAGE.orders, [])
        .map(normalizeOrder)
  );

  const [deletedOrders, setDeletedOrders] =
    useState(() =>
      safeJSON(
        STORAGE.deletedOrders,
        []
      )
    );

  const [merchants, setMerchants] =
    useState(() =>
      safeJSON(
        STORAGE.merchants,
        []
      )
    );

  const [customers, setCustomers] =
    useState(() =>
      safeJSON(
        STORAGE.customers,
        []
      )
    );

  const [drivers, setDrivers] =
    useState(() =>
      safeJSON(
        STORAGE.drivers,
        [
          {
            id: 'driver-1',
            name: 'أحمد',
            phone: '',
            notes: ''
          },
          {
            id: 'driver-2',
            name: 'محمود',
            phone: '',
            notes: ''
          },
          {
            id: 'driver-3',
            name: 'مصطفى',
            phone: '',
            notes: ''
          }
        ]
      )
    );

  const [history, setHistory] =
    useState(() =>
      safeJSON(
        STORAGE.history,
        []
      )
    );

  const [counter, setCounter] =
    useState(() =>
      parseInt(
        localStorage.getItem(
          STORAGE.counter
        ) || '1001',
        10
      )
    );

  const [activeTab, setActiveTab] =
    useState('dashboard');

  const [searchQuery, setSearchQuery] =
    useState('');

  const [rawText, setRawText] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [extractedOrders, setExtractedOrders] =
    useState([]);

  /*
    IMPORTANT:
    These are only defaults for newly extracted orders.
    Each extracted order gets its OWN values.
  */
  const [defaultRevenueType, setDefaultRevenueType] =
    useState('percent');

  const [
    defaultRevenueValue,
    setDefaultRevenueValue
  ] = useState(
    settings.defaultCommission
  );

  const [
    expectedMinutes,
    setExpectedMinutes
  ] = useState(
    settings.defaultDeliveryMinutes
  );

  const [showImportModal, setShowImportModal] =
    useState(false);

  const [importMode, setImportMode] =
    useState('import');

  const [dispatchDriver, setDispatchDriver] =
    useState('');

  const [dispatchOrder, setDispatchOrder] =
    useState(null);

  const [dispatchText, setDispatchText] =
    useState('');

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [selectedEntity, setSelectedEntity] =
    useState(null);

  const [merchantForm, setMerchantForm] =
    useState({
      id: null,
      name: '',
      phone: '',
      address: '',
      notes: ''
    });

  const [customerForm, setCustomerForm] =
    useState({
      id: null,
      name: '',
      phone: '',
      address: '',
      notes: ''
    });

  const [driverForm, setDriverForm] =
    useState({
      id: null,
      name: '',
      phone: '',
      notes: ''
    });

  const [backupInput, setBackupInput] =
    useState(null);

  /* =========================================================
     PERSISTENCE
     ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      STORAGE.lang,
      lang
    );
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.apiKey,
      apiKey
    );
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.settings,
      JSON.stringify(settings)
    );
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.orders,
      JSON.stringify(orders)
    );
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.deletedOrders,
      JSON.stringify(deletedOrders)
    );
  }, [deletedOrders]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.merchants,
      JSON.stringify(merchants)
    );
  }, [merchants]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.customers,
      JSON.stringify(customers)
    );
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.drivers,
      JSON.stringify(drivers)
    );
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.history,
      JSON.stringify(history)
    );
  }, [history]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.counter,
      String(counter)
    );
  }, [counter]);

  /* =========================================================
     AUDIT
     ========================================================= */

  const addAudit = (
    orderNum,
    action,
    details
  ) => {
    setHistory(prev => [
      {
        id: uid(),
        orderNum,
        action,
        details,
        createdAt: nowISO()
      },
      ...prev
    ]);
  };

  /* =========================================================
     AUTO DELAY
     ========================================================= */

  useEffect(() => {
    if (!settings.autoDelayStatus)
      return;

    const checkDelayedOrders = () => {
      const now = Date.now();

      setOrders(prev => {
        let changed = false;

        const next = prev.map(order => {
          const active =
            ![
              STATUS.COMPLETED,
              STATUS.CANCELLED,
              STATUS.DELAYED
            ].includes(order.status);

          if (
            active &&
            order.expectedDeliveryAt &&
            new Date(
              order.expectedDeliveryAt
            ).getTime() < now
          ) {
            changed = true;

            addAudit(
              order.orderNum,
              'AUTO_DELAY',
              'Order automatically marked as delayed'
            );

            return {
              ...order,
              status: STATUS.DELAYED,
              delayedAt:
                order.delayedAt ||
                nowISO()
            };
          }

          return order;
        });

        return changed ? next : prev;
      });
    };

    checkDelayedOrders();

    const interval =
      setInterval(
        checkDelayedOrders,
        30000
      );

    return () =>
      clearInterval(interval);
  }, [settings.autoDelayStatus]);

  /* =========================================================
     DRIVER ASSIGNMENT
     ========================================================= */

  const autoAssignDriver = () => {
    if (
      !settings.autoDriverAssignment ||
      drivers.length === 0
    ) {
      return '';
    }

    const counts = drivers.map(
      driver => ({
        driver,
        active: orders.filter(
          o =>
            o.driverId === driver.id &&
            ![
              STATUS.COMPLETED,
              STATUS.CANCELLED
            ].includes(o.status)
        ).length
      })
    );

    counts.sort(
      (a, b) =>
        a.active - b.active
    );

    return (
      counts[0]?.driver.id || ''
    );
  };

  /* =========================================================
     ADDRESS VALIDATION
     ========================================================= */

  const incompleteAddress =
    address => {
      if (
        !address ||
        address.trim().length < 10
      ) {
        return true;
      }

      const words = [
        'شارع',
        'ش ',
        'دور',
        'شقة',
        'عمارة',
        'مبنى',
        'street',
        'st ',
        'floor',
        'apt',
        'flat',
        'building'
      ];

      const lower =
        address.toLowerCase();

      return !words.some(
        word =>
          lower.includes(word)
      );
    };

  /* =========================================================
     AI EXTRACTION
     ========================================================= */

  const extractOrders = async () => {
    if (!apiKey.trim()) {
      alert(
        lang === 'ar'
          ? 'أضف Groq API Key من الإعدادات أولاً.'
          : 'Add your Groq API Key in Settings first.'
      );

      setActiveTab('settings');

      return;
    }

    if (!rawText.trim()) {
      alert(
        lang === 'ar'
          ? 'الصق رسالة الطلب أولاً.'
          : 'Paste the order message first.'
      );

      return;
    }

    setLoading(true);

    const systemPrompt = `
You are an enterprise Egyptian delivery-order extraction engine.

Parse messy WhatsApp messages into structured delivery orders.

IMPORTANT:
- Multiple customers/orders must become separate orders.
- Preserve merchant and branch names.
- Extract customer name.
- Extract phone.
- Extract complete physical address.
- Extract all items and quantities.
- Extract order value excluding delivery fee.
- Extract delivery fee.
- Detect cash / online / prepaid.
- Extract delivery instructions and notes.
- Preserve ambiguity instead of inventing facts.
- If information is unknown, use an empty string.
- Detect likely typos or ambiguous statements.
- Never invent prices.
- Never invent addresses.
- Never invent phone numbers.

Return ONLY JSON:

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
      const response =
        await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
              Authorization:
                `Bearer ${apiKey.trim()}`
            },
            body: JSON.stringify({
              model:
                'llama-3.3-70b-versatile',

              temperature: 0.1,

              response_format: {
                type: 'json_object'
              },

              messages: [
                {
                  role: 'system',
                  content:
                    systemPrompt
                },
                {
                  role: 'user',
                  content: rawText
                }
              ]
            })
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            'AI extraction failed'
        );
      }

      const parsed =
        JSON.parse(
          data.choices?.[0]?.message
            ?.content || '{}'
        );

      const normalized =
        (parsed.orders || []).map(
          order => ({
            store:
              order.store || '',

            customer:
              order.customer || '',

            phone:
              order.phone || '',

            address:
              order.address || '',

            cod:
              normalizeNumber(
                order.cod
              ),

            deliveryFee:
              normalizeNumber(
                order.deliveryFee
              ),

            paymentMethod:
              order.paymentMethod ===
                PAYMENT.ONLINE ||
              order.paymentMethod ===
                PAYMENT.PREPAID
                ? order.paymentMethod
                : PAYMENT.CASH,

            item:
              order.item || '',

            notes:
              order.notes || '',

            /*
              Each order starts with the defaults.
              The user can then change driver and
              revenue split individually.
            */
            driverId:
              autoAssignDriver(),

            revenueType:
              defaultRevenueType,

            revenuePercent:
              defaultRevenueType ===
              'percent'
                ? normalizeNumber(
                    defaultRevenueValue
                  )
                : 0,

            revenueValue:
              defaultRevenueType ===
              'amount'
                ? normalizeNumber(
                    defaultRevenueValue
                  )
                : 0
          })
        );

      setExtractedOrders(
        normalized
      );

      if (
        parsed.ambiguous_flags?.length
      ) {
        alert(
          `${
            lang === 'ar'
              ? 'ملاحظات AI:'
              : 'AI warnings:'
          }\n\n${parsed.ambiguous_flags.join(
            '\n'
          )}`
        );
      }
    } catch (error) {
      alert(
        lang === 'ar'
          ? `حدث خطأ: ${error.message}`
          : `Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     EXTRACTED ORDER UPDATE
     ========================================================= */

  const updateExtractedOrder =
    (index, changes) => {
      setExtractedOrders(prev =>
        prev.map((order, i) =>
          i === index
            ? {
                ...order,
                ...changes
              }
            : order
        )
      );
    };

  const setExtractedDriver = (
    index,
    driverId
  ) => {
    updateExtractedOrder(
      index,
      {
        driverId
      }
    );
  };

  const setExtractedRevenueType = (
    index,
    type
  ) => {
    const order =
      extractedOrders[index];

    const fee =
      normalizeNumber(
        order?.deliveryFee
      );

    if (type === 'percent') {
      const currentPercent =
        order?.revenueType ===
        'amount'
          ? fee
            ? (
                normalizeNumber(
                  order.revenueValue
                ) /
                fee
              ) *
                100
            : 0
          : normalizeNumber(
              order.revenuePercent
            );

      updateExtractedOrder(
        index,
        {
          revenueType:
            'percent',
          revenuePercent:
            Math.min(
              100,
              Math.max(
                0,
                currentPercent
              )
            ),
          revenueValue:
            fee *
            (currentPercent / 100)
        }
      );
    } else {
      const currentAmount =
        order?.revenueType ===
        'amount'
          ? normalizeNumber(
              order.revenueValue
            )
          : fee *
            (normalizeNumber(
              order.revenuePercent
            ) / 100);

      updateExtractedOrder(
        index,
        {
          revenueType:
            'amount',
          revenueValue:
            Math.min(
              fee,
              Math.max(
                0,
                currentAmount
              )
            ),
          revenuePercent:
            fee
              ? (
                  Math.min(
                    fee,
                    Math.max(
                      0,
                      currentAmount
                    )
                  ) /
                  fee
                ) *
                100
              : 0
        }
      );
    }
  };

  const setExtractedRevenue =
    (index, value) => {
      const order =
        extractedOrders[index];

      const fee =
        normalizeNumber(
          order?.deliveryFee
        );

      if (
        order?.revenueType ===
        'amount'
      ) {
        const amount =
          Math.min(
            fee,
            Math.max(
              0,
              normalizeNumber(
                value
              )
            )
          );

        updateExtractedOrder(
          index,
          {
            revenueValue:
              amount,

            revenuePercent:
              fee
                ? (amount / fee) *
                  100
                : 0
          }
        );
      } else {
        const percent =
          Math.min(
            100,
            Math.max(
              0,
              normalizeNumber(
                value
              )
            )
          );

        updateExtractedOrder(
          index,
          {
            revenuePercent:
              percent,

            revenueValue:
              fee *
              (percent / 100)
          }
        );
      }
    };

  /* =========================================================
     CONFIRM ORDERS
     ========================================================= */

  const confirmExtractedOrders =
    () => {
      if (
        !extractedOrders.length
      ) {
        return;
      }

      let number = counter;

      const created =
        extractedOrders.map(
          order => {
            const createdAt =
              nowISO();

            const expectedAt =
              new Date(
                Date.now() +
                  Number(
                    expectedMinutes
                  ) *
                    60 *
                    1000
              ).toISOString();

            const driverId =
              order.driverId ||
              '';

            const driver =
              drivers.find(
                d =>
                  d.id ===
                  driverId
              );

            const fee =
              normalizeNumber(
                order.deliveryFee
              );

            let revenueType =
              order.revenueType ===
              'amount'
                ? 'amount'
                : 'percent';

            let revenuePercent =
              normalizeNumber(
                order.revenuePercent
              );

            let revenueValue =
              normalizeNumber(
                order.revenueValue
              );

            if (
              revenueType ===
              'amount'
            ) {
              revenueValue =
                Math.min(
                  fee,
                  Math.max(
                    0,
                    revenueValue
                  )
                );

              revenuePercent =
                fee
                  ? (
                      revenueValue /
                      fee
                    ) *
                    100
                  : 0;
            } else {
              revenuePercent =
                Math.min(
                  100,
                  Math.max(
                    0,
                    revenuePercent
                  )
                );

              revenueValue =
                fee *
                (revenuePercent /
                  100);
            }

            const newOrder =
              normalizeOrder({
                id: uid(),

                orderNum:
                  `#${number++}`,

                store:
                  order.store ||
                  'N/A',

                customer:
                  order.customer ||
                  'N/A',

                phone:
                  order.phone ||
                  '',

                address:
                  order.address ||
                  '',

                notes:
                  order.notes ||
                  '',

                item:
                  order.item ||
                  '',

                cod:
                  normalizeNumber(
                    order.cod
                  ),

                deliveryFee:
                  fee,

                paymentMethod:
                  order.paymentMethod ||
                  PAYMENT.CASH,

                /*
                  SAVED PER ORDER
                */
                revenueType,

                revenuePercent,

                revenueValue,

                driverId:
                  driverId || '',

                driverName:
                  driver?.name || '',

                status:
                  STATUS.CONFIRMED,

                createdAt,

                expectedDeliveryAt:
                  expectedAt,

                actualDeliveryAt:
                  null,

                delayedAt:
                  null,

                source:
                  'whatsapp_ai',

                lastUpdatedAt:
                  createdAt
              });

            addAudit(
              newOrder.orderNum,
              'ORDER_CREATED',
              `${newOrder.customer} • ${newOrder.store}`
            );

            addAudit(
              newOrder.orderNum,
              'PAYMENT_STATUS',
              isPaid(newOrder)
                ? 'PAID'
                : 'UNPAID'
            );

            addAudit(
              newOrder.orderNum,
              'DRIVER_REVENUE_SPLIT',
              `Company: ${money(
                getCompanyRevenue(
                  newOrder
                ),
                settings.currency
              )} (${getCompanyPercent(
                newOrder
              ).toFixed(2)}%) • Driver: ${money(
                getDriverRevenue(
                  newOrder
                ),
                settings.currency
              )}`
            );

            return newOrder;
          }
        );

      setCounter(number);

      setOrders(prev => [
        ...created,
        ...prev
      ]);

      /*
        Automatically create/update merchants.
      */
      created.forEach(order => {
        if (
          order.store &&
          order.store !== 'N/A'
        ) {
          setMerchants(prev => {
            const existing =
              prev.find(
                m =>
                  m.name
                    ?.toLowerCase() ===
                  order.store
                    ?.toLowerCase()
              );

            if (existing) {
              return prev.map(
                m =>
                  m.id ===
                  existing.id
                    ? {
                        ...m,

                        phone:
                          order.phone ||
                          m.phone,

                        address:
                          order.address ||
                          m.address,

                        totalOrders:
                          (m.totalOrders ||
                            0) + 1
                      }
                    : m
              );
            }

            return [
              {
                id: uid(),
                name:
                  order.store,
                phone: '',
                address: '',
                notes: '',
                totalOrders: 1
              },
              ...prev
            ];
          });
        }

        if (
          order.customer &&
          order.customer !== 'N/A'
        ) {
          setCustomers(prev => {
            const existing =
              prev.find(
                c =>
                  (order.phone &&
                    c.phone ===
                      order.phone) ||
                  c.name
                    ?.toLowerCase() ===
                    order.customer
                      ?.toLowerCase()
              );

            if (existing) {
              return prev.map(
                c =>
                  c.id ===
                  existing.id
                    ? {
                        ...c,
                        phone:
                          order.phone ||
                          c.phone,
                        address:
                          order.address ||
                          c.address
                      }
                    : c
              );
            }

            return [
              {
                id: uid(),
                name:
                  order.customer,
                phone:
                  order.phone,
                address:
                  order.address,
                notes: ''
              },
              ...prev
            ];
          });
        }
      });

      setExtractedOrders([]);

      setRawText('');

      setDefaultRevenueValue(
        settings.defaultCommission
      );

      setActiveTab(
        'orders'
      );

      alert(
        t.createdSuccessfully
      );
    };

  /* =========================================================
     ORDER ACTIONS
     ========================================================= */

  const updateOrder = (
    id,
    changes,
    auditAction =
      'ORDER_UPDATED'
  ) => {
    const current =
      orders.find(
        o => o.id === id
      );

    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? normalizeOrder({
              ...order,
              ...changes,
              lastUpdatedAt:
                nowISO()
            })
          : order
      )
    );

    if (current) {
      addAudit(
        current.orderNum,
        auditAction,
        JSON.stringify(changes)
      );
    }

    /*
      Keep selected order modal synchronized.
    */
    setSelectedOrder(prev =>
      prev?.id === id
        ? normalizeOrder({
            ...prev,
            ...changes
          })
        : prev
    );
  };

  const changeStatus = (
    order,
    status
  ) => {
    updateOrder(
      order.id,
      {
        status,

        actualDeliveryAt:
          status ===
          STATUS.COMPLETED
            ? nowISO()
            : order.actualDeliveryAt
      },
      'STATUS_CHANGED'
    );
  };

  const reassignDriver = (
    order,
    driverId
  ) => {
    const driver =
      drivers.find(
        d => d.id === driverId
      );

    updateOrder(
      order.id,
      {
        driverId,
        driverName:
          driver?.name || ''
      },
      'DRIVER_REASSIGNED'
    );
  };

  const updateOrderRevenue = (
    order,
    type,
    value
  ) => {
    const fee =
      normalizeNumber(
        order.deliveryFee
      );

    if (type === 'percent') {
      const percent =
        Math.min(
          100,
          Math.max(
            0,
            normalizeNumber(value)
          )
        );

      updateOrder(
        order.id,
        {
          revenueType:
            'percent',

          revenuePercent:
            percent,

          revenueValue:
            fee *
            (percent / 100)
        },
        'REVENUE_SPLIT_CHANGED'
      );
    } else {
      const amount =
        Math.min(
          fee,
          Math.max(
            0,
            normalizeNumber(value)
          )
        );

      updateOrder(
        order.id,
        {
          revenueType:
            'amount',

          revenueValue:
            amount,

          revenuePercent:
            fee
              ? (amount / fee) *
                100
              : 0
        },
        'REVENUE_SPLIT_CHANGED'
      );
    }
  };

  const deleteOrder = order => {
    if (
      !window.confirm(
        lang === 'ar'
          ? `هل تريد حذف الطلب ${order.orderNum}؟`
          : `Delete ${order.orderNum}?`
      )
    ) {
      return;
    }

    setOrders(prev =>
      prev.filter(
        o => o.id !== order.id
      )
    );

    setDeletedOrders(prev => [
      {
        ...order,
        deletedAt:
          nowISO()
      },
      ...prev
    ]);

    addAudit(
      order.orderNum,
      'ORDER_DELETED',
      order.customer
    );

    setSelectedOrder(null);
  };

  /* =========================================================
     DISPATCH
     ========================================================= */

  const generateDispatchMessage =
    order => {
      const driver =
        drivers.find(
          d =>
            d.id ===
            dispatchDriver
        );

      const paid =
        isPaid(order);

      const company =
        getCompanyRevenue(
          order
        );

      const driverRevenue =
        getDriverRevenue(
          order
        );

      const percent =
        getCompanyPercent(
          order
        );

      const paymentText =
        paid
          ? lang === 'ar'
            ? '✅ مدفوع بالفعل'
            : '✅ PAID'
          : lang === 'ar'
          ? '💵 غير مدفوع — يجب التحصيل من العميل'
          : '💵 UNPAID — collect from customer';

      const message =
        lang === 'ar'
          ? `🚚 *طلب توصيل ${order.orderNum}*

🏪 المتجر: ${order.store}
👤 العميل: ${order.customer}
📞 الهاتف: ${order.phone || 'غير متوفر'}

📍 *العنوان:*
${order.address || 'غير محدد'}

📦 *الطلب:*
${order.item || 'راجع تفاصيل الطلب'}

💰 قيمة الطلب: ${money(
              order.cod,
              settings.currency
            )}

🛵 رسوم التوصيل: ${money(
              order.deliveryFee,
              settings.currency
            )}

💳 *حالة الدفع:*
${paymentText}

💵 *المطلوب تحصيله من العميل:*
${money(
              getCollection(order),
              settings.currency
            )}

━━━━━━━━━━━━━━
💰 *التقسيم المالي:*

🏢 نصيب الشركة:
${money(
              company,
              settings.currency
            )} (${percent.toFixed(2)}%)

🛵 نصيب الطيار:
${money(
              driverRevenue,
              settings.currency
            )} (${Math.max(
              0,
              100 - percent
            ).toFixed(2)}%)

⏰ التسليم المتوقع:
${formatDateTime(
              order.expectedDeliveryAt,
              lang
            )}

📝 ملاحظات:
${order.notes || 'لا توجد'}

👨‍✈️ الطيار:
${driver?.name ||
              order.driverName ||
              'غير معين'}

يرجى تحديث حالة الطلب بعد الاستلام والتسليم.`
          : `🚚 *Delivery Order ${order.orderNum}*

🏪 Merchant: ${order.store}
👤 Customer: ${order.customer}
📞 Phone: ${order.phone || 'N/A'}

📍 *Address:*
${order.address || 'N/A'}

📦 *Items:*
${order.item || 'See order details'}

💰 Order value: ${money(
              order.cod,
              settings.currency
            )}

🛵 Delivery fee: ${money(
              order.deliveryFee,
              settings.currency
            )}

💳 *Payment Status:*
${paymentText}

💵 *Customer Collection:*
${money(
              getCollection(order),
              settings.currency
            )}

━━━━━━━━━━━━━━
💰 *Financial Split:*

🏢 Company:
${money(
              company,
              settings.currency
            )} (${percent.toFixed(2)}%)

🛵 Driver:
${money(
              driverRevenue,
              settings.currency
            )} (${Math.max(
              0,
              100 - percent
            ).toFixed(2)}%)

⏰ Expected delivery:
${formatDateTime(
              order.expectedDeliveryAt,
              lang
            )}

📝 Notes:
${order.notes || 'None'}

👨‍✈️ Driver:
${driver?.name ||
              order.driverName ||
              'Unassigned'}

Please update the order status after pickup and delivery.`;

      setDispatchText(
        message
      );
    };

  const openDispatch = order => {
    setDispatchOrder(
      order
    );

    setDispatchDriver(
      order.driverId || ''
    );

    setDispatchText('');

    setShowImportModal(
      true
    );

    setImportMode(
      'dispatch'
    );
  };

  const copyDispatch =
    async () => {
      try {
        await navigator.clipboard.writeText(
          dispatchText
        );

        alert(t.copied);
      } catch {
        alert('Copy failed');
      }
    };

  /* =========================================================
     DRIVER METRICS
     ========================================================= */

  const driverMetrics =
    driverId => {
      const driverOrders =
        orders.filter(
          order =>
            order.driverId ===
            driverId
        );

      const completed =
        driverOrders.filter(
          order =>
            order.status ===
            STATUS.COMPLETED
        );

      const daily =
        completed.filter(o =>
          isSameDay(
            o.createdAt,
            new Date()
          )
        );

      const weekly =
        completed.filter(o =>
          isWithinDays(
            o.createdAt,
            7
          )
        );

      const monthly =
        completed.filter(o =>
          isWithinDays(
            o.createdAt,
            30
          )
        );

      const metrics =
        list => ({
          orders:
            list.length,

          collected:
            list.reduce(
              (sum, order) =>
                sum +
                getCollection(
                  order
                ),
              0
            ),

          companyRevenue:
            list.reduce(
              (sum, order) =>
                sum +
                getCompanyRevenue(
                  order
                ),
              0
            ),

          driverRevenue:
            list.reduce(
              (sum, order) =>
                sum +
                getDriverRevenue(
                  order
                ),
              0
            )
        });

      return {
        active:
          driverOrders.filter(
            o =>
              ![
                STATUS.COMPLETED,
                STATUS.CANCELLED
              ].includes(
                o.status
              )
          ).length,

        daily:
          metrics(daily),

        weekly:
          metrics(weekly),

        monthly:
          metrics(monthly),

        allOrders:
          driverOrders
      };
    };

  /* =========================================================
     DASHBOARD METRICS
     ========================================================= */

  const activeOrders =
    orders.filter(
      o =>
        ![
          STATUS.COMPLETED,
          STATUS.CANCELLED
        ].includes(o.status)
    );

  const delayedOrders =
    orders.filter(
      o =>
        o.status ===
        STATUS.DELAYED
    );

  const completedOrders =
    orders.filter(
      o =>
        o.status ===
        STATUS.COMPLETED
    );

  const todayCompleted =
    completedOrders.filter(
      o =>
        isSameDay(
          o.createdAt,
          new Date()
        )
    );

  const todayCollections =
    todayCompleted.reduce(
      (sum, order) =>
        sum +
        getCollection(order),
      0
    );

  const todayRevenue =
    todayCompleted.reduce(
      (sum, order) =>
        sum +
        getCompanyRevenue(
          order
        ),
      0
    );

  /* =========================================================
     FILTER
     ========================================================= */

  const filteredOrders =
    useMemo(() => {
      const q =
        searchQuery
          .trim()
          .toLowerCase();

      if (!q) return orders;

      return orders.filter(
        order =>
          [
            order.orderNum,
            order.customer,
            order.store,
            order.phone,
            order.address,
            order.driverName,
            order.status
          ]
            .filter(Boolean)
            .some(value =>
              String(value)
                .toLowerCase()
                .includes(q)
            )
      );
    }, [
      orders,
      searchQuery
    ]);

  /* =========================================================
     MERCHANT SAVE
     ========================================================= */

  const saveMerchant =
    () => {
      if (
        !merchantForm.name.trim()
      ) {
        return;
      }

      if (merchantForm.id) {
        setMerchants(prev =>
          prev.map(m =>
            m.id ===
            merchantForm.id
              ? {
                  ...m,
                  ...merchantForm
                }
              : m
          )
        );
      } else {
        setMerchants(prev => [
          {
            ...merchantForm,
            id: uid(),
            totalOrders: 0
          },
          ...prev
        ]);
      }

      setMerchantForm({
        id: null,
        name: '',
        phone: '',
        address: '',
        notes: ''
      });
    };

  /* =========================================================
     CUSTOMER SAVE
     ========================================================= */

  const saveCustomer =
    () => {
      if (
        !customerForm.name.trim()
      ) {
        return;
      }

      if (customerForm.id) {
        setCustomers(prev =>
          prev.map(c =>
            c.id ===
            customerForm.id
              ? {
                  ...c,
                  ...customerForm
                }
              : c
          )
        );
      } else {
        setCustomers(prev => [
          {
            ...customerForm,
            id: uid()
          },
          ...prev
        ]);
      }

      setCustomerForm({
        id: null,
        name: '',
        phone: '',
        address: '',
        notes: ''
      });
    };

  /* =========================================================
     DRIVER SAVE
     ========================================================= */

  const saveDriver =
    () => {
      if (
        !driverForm.name.trim()
      ) {
        return;
      }

      if (driverForm.id) {
        setDrivers(prev =>
          prev.map(d =>
            d.id ===
            driverForm.id
              ? {
                  ...d,
                  ...driverForm
                }
              : d
          )
        );
      } else {
        setDrivers(prev => [
          {
            ...driverForm,
            id: uid()
          },
          ...prev
        ]);
      }

      setDriverForm({
        id: null,
        name: '',
        phone: '',
        notes: ''
      });
    };

  /* =========================================================
     BACKUP
     ========================================================= */

  const exportBackup =
    () => {
      const backup = {
        app:
          'Express Delivery PRO',

        version: 8,

        exportedAt:
          nowISO(),

        settings,
        orders,
        deletedOrders,
        merchants,
        customers,
        drivers,
        history,
        counter
      };

      const blob =
        new Blob(
          [
            JSON.stringify(
              backup,
              null,
              2
            )
          ],
          {
            type:
              'application/json'
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const anchor =
        document.createElement(
          'a'
        );

      anchor.href = url;

      anchor.download =
        `express-delivery-backup-${new Date()
          .toISOString()
          .slice(
            0,
            10
          )}.json`;

      anchor.click();

      URL.revokeObjectURL(
        url
      );
    };

  const importBackup =
    async file => {
      if (!file) return;

      try {
        const text =
          await file.text();

        const backup =
          JSON.parse(text);

        if (
          !backup ||
          !Array.isArray(
            backup.orders
          ) ||
          !Array.isArray(
            backup.drivers
          )
        ) {
          throw new Error(
            'Invalid backup'
          );
        }

        setSettings({
          ...DEFAULT_SETTINGS,
          ...(backup.settings ||
            {})
        });

        setOrders(
          backup.orders.map(
            normalizeOrder
          )
        );

        setDeletedOrders(
          backup.deletedOrders ||
            []
        );

        setMerchants(
          backup.merchants ||
            []
        );

        setCustomers(
          backup.customers ||
            []
        );

        setDrivers(
          backup.drivers ||
            []
        );

        setHistory(
          backup.history ||
            []
        );

        setCounter(
          backup.counter ||
            1001
        );

        alert(
          t.backupImported
        );
      } catch {
        alert(
          t.invalidBackup
        );
      }
    };

  /* =========================================================
     NAVIGATION
     ========================================================= */

  const navItems = [
    [
      'dashboard',
      '📊',
      t.dashboard
    ],
    [
      'new_order',
      '➕',
      t.newOrder
    ],
    [
      'orders',
      '📦',
      t.orders
    ],
    [
      'drivers',
      '🛵',
      t.drivers
    ],
    [
      'merchants',
      '🏪',
      t.merchants
    ],
    [
      'customers',
      '👥',
      t.customers
    ],
    [
      'ledger',
      '💰',
      t.ledger
    ],
    [
      'import',
      '💬',
      t.importExport
    ],
    [
      'history',
      '🕒',
      t.history
    ],
    [
      'settings',
      '⚙️',
      t.settings
    ]
  ];

  /* =========================================================
     UI COMPONENTS
     ========================================================= */

  const Field = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text'
  }) => (
    <div style={styles.field}>
      <label
        style={styles.label}
      >
        {label}
      </label>

      <input
        type={type}
        value={value ?? ''}
        placeholder={
          placeholder
        }
        onChange={e =>
          onChange(
            e.target.value
          )
        }
        style={styles.input}
      />
    </div>
  );

  const TextField = ({
    label,
    value,
    onChange,
    placeholder
  }) => (
    <div style={styles.field}>
      <label
        style={styles.label}
      >
        {label}
      </label>

      <textarea
        value={value ?? ''}
        placeholder={
          placeholder
        }
        onChange={e =>
          onChange(
            e.target.value
          )
        }
        style={{
          ...styles.input,
          minHeight: 90,
          resize: 'vertical'
        }}
      />
    </div>
  );

  const StatusBadge = ({
    status
  }) => (
    <span
      style={{
        ...styles.status,
        background:
          `${statusColor(
            status
          )}22`,
        color:
          statusColor(
            status
          ),
        border:
          `1px solid ${statusColor(
            status
          )}55`
      }}
    >
      {statusLabel(
        status,
        lang
      )}
    </span>
  );

  const PaymentBadge = ({
    order
  }) => (
    <span
      style={
        isPaid(order)
          ? styles.paymentPaid
          : styles.paymentUnpaid
      }
    >
      {isPaid(order)
        ? '✓ '
        : '⚠ '}
      {paymentLabel(
        order,
        lang
      )}
    </span>
  );

  /* =========================================================
     FINANCIAL BREAKDOWN COMPONENT
     ========================================================= */

  const FinancialBreakdown =
    ({
      order,
      editable = false,
      index = null,
      extracted = false
    }) => {
      const fee =
        normalizeNumber(
          order?.deliveryFee
        );

      const company =
        extracted
          ? order.revenueType ===
            'amount'
            ? Math.min(
                fee,
                normalizeNumber(
                  order.revenueValue
                )
              )
            : fee *
              (normalizeNumber(
                order.revenuePercent
              ) / 100)
          : getCompanyRevenue(
              order
            );

      const driver =
        Math.max(
          0,
          fee - company
        );

      const percent =
        fee
          ? (company / fee) *
            100
          : 0;

      const changeType =
        type => {
          if (!extracted) {
            updateOrderRevenue(
              order,
              type,
              company
            );

            return;
          }

          setExtractedRevenueType(
            index,
            type
          );
        };

      const changeValue =
        value => {
          if (!extracted) {
            updateOrderRevenue(
              order,
              order.revenueType ||
                'percent',
              value
            );

            return;
          }

          setExtractedRevenue(
            index,
            value
          );
        };

      return (
        <div
          style={
            styles.financialBox
          }
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 14
            }}
          >
            💰 {t.financialBreakdown}
          </div>

          {editable && (
            <div
              style={{
                ...styles.formGrid,
                marginTop: 12
              }}
            >
              <div
                style={styles.field}
              >
                <label
                  style={
                    styles.label
                  }
                >
                  {t.revenueType}
                </label>

                <select
                  value={
                    order.revenueType ||
                    'percent'
                  }
                  onChange={e =>
                    changeType(
                      e.target
                        .value
                    )
                  }
                  style={
                    styles.input
                  }
                >
                  <option value="percent">
                    {t.percentage}
                  </option>

                  <option value="amount">
                    {t.fixedAmount}
                  </option>
                </select>
              </div>

              <div
                style={styles.field}
              >
                <label
                  style={
                    styles.label
                  }
                >
                  {order.revenueType ===
                  'amount'
                    ? `${t.companyShare} (${settings.currency})`
                    : `${t.companyShare} (%)`}
                </label>

                <input
                  type="number"
                  min="0"
                  max={
                    order.revenueType ===
                    'amount'
                      ? fee
                      : 100
                  }
                  step="0.01"
                  value={
                    order.revenueType ===
                    'amount'
                      ? normalizeNumber(
                          order.revenueValue
                        )
                      : normalizeNumber(
                          order.revenuePercent
                        )
                  }
                  onChange={e =>
                    changeValue(
                      e.target.value
                    )
                  }
                  style={
                    styles.input
                  }
                />
              </div>
            </div>
          )}

          <div
            style={
              styles.splitGrid
            }
          >
            <
