import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  Store, 
  Users, 
  Plus, 
  Search, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Globe, 
  Settings, 
  History, 
  FileText, 
  Trash2, 
  Edit3, 
  Check, 
  AlertTriangle, 
  Zap, 
  DollarSign, 
  Phone, 
  MapPin, 
  ShoppingBag,
  ArrowUpRight,
  ClipboardList
} from 'lucide-react';

const translations = {
  ar: {
    appTitle: '🚀 إكسبريس دليفري PRO',
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
    btnPaste: 'لصق من الحافظة',
    btnExtract: 'استخراج البيانات بالذكاء الاصطناعي',
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
    btnConfirm: 'تأكيد وحفظ الطلبات',

    searchPlaceholder: '🔍 بحث برقم الطلب، اسم العميل، المتجر، أو الهاتف...',
    unspecified: 'غير محدد',
    currency: 'ج.م',

    statusConfirmed: 'مؤكد',
    statusProcessing: 'قيد تجهيز الطلب',
    statusOutForDelivery: 'خرج للتوصيل',
    statusInTransit: 'جاري التوصيل',
    statusCompleted: 'مكتمل (تم التسليم)',
    statusDelayed: 'متأخر',
    statusCancelled: 'ملغي',

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
    editAmount: 'تعديل المبلغ',
    saveAmount: 'تم الحفظ',

    confirmDbUpdateTitle: '⚠️ تأكيد تحديث بيانات قاعدة البيانات',
    confirmDbUpdateMsg:
      'تم العثور على تفاصيل جديدة تملأ بيانات مفقودة لعميل/متجر. هل تريد تحديث السجلات المخزنة؟',

    confirmDeleteMsg: 'هل أنت متأكد من رغبتك في حذف هذا الطلب نهائيًا؟',

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

    financialBreakdown: 'التفاصيل المالية',
    cashCollection: 'المبلغ المحصل من العميل',
    merchantDue: 'مستحق المتجر',
    deliveryPool: 'رسوم التوصيل',
    myShare: 'نصيبي',
    driverShare: 'نصيب الطيار',

    onlineNoCollection:
      'تم الدفع أونلاين — الطيار لا يحصّل قيمة الطلب من العميل.',

    cashCollectionExplanation:
      'كاش — الطيار يحصّل قيمة الطلب + رسوم التوصيل.',

    cancelledFinancial:
      'هذا الطلب ملغي — جميع المبالغ الفعلية للتسليم والإيراد = 0.',

    revenueExplanation:
      'النسبة تطبق على رسوم التوصيل فقط، وليس على قيمة الطلب.',

    orderValueNotRevenue:
      'قيمة الطلب ليست إيرادًا لك؛ هي مستحقات المتجر.',

    companyHandIn: 'المطلوب توريده للشركة',
    merchantHandIn: 'المطلوب توريده للمتجر',

    editDeliveryFee: 'تعديل رسوم التوصيل',
    deliveryFeeSaved: 'تم حفظ رسوم التوصيل',

    cancel: 'إلغاء',
    confirm: 'تأكيد'
  },

  en: {
    appTitle: '🚀 Express Delivery PRO',
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
    btnPaste: 'Paste Clipboard',
    btnExtract: 'Extract Data with AI',
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
    btnConfirm: 'Confirm & Save Orders',

    searchPlaceholder: '🔍 Search Order #, Customer, Store, Phone...',
    unspecified: 'N/A',
    currency: 'EGP',

    statusConfirmed: 'Confirmed',
    statusProcessing: 'Processing',
    statusOutForDelivery: 'Out for Delivery',
    statusInTransit: 'In Transit',
    statusCompleted: 'Completed',
    statusDelayed: 'Delayed',
    statusCancelled: 'Cancelled',

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
    editAmount: 'Edit Amount',
    saveAmount: 'Save',

    confirmDbUpdateTitle: '⚠️ Confirm Database Update',
    confirmDbUpdateMsg:
      'New details found that fill in missing customer/store entries. Update database records?',

    confirmDeleteMsg:
      'Are you sure you want to permanently delete this order?',

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

    financialBreakdown: 'Financial Breakdown',
    cashCollection: 'Customer Collection',
    merchantDue: 'Merchant Due',
    deliveryPool: 'Delivery Fee',
    myShare: 'My Share',
    driverShare: 'Driver Share',

    onlineNoCollection:
      'Paid online — driver does not collect the order value from the customer.',

    cashCollectionExplanation:
      'Cash — driver collects the order value + delivery fee.',

    cancelledFinancial:
      'This order is cancelled — all effective collection and revenue = 0.',

    revenueExplanation:
      'The percentage applies only to the delivery fee, not the order value.',

    orderValueNotRevenue:
      'Order value is not your revenue; it belongs to the merchant.',

    companyHandIn: 'Company Revenue Due',
    merchantHandIn: 'Merchant Amount Due',

    editDeliveryFee: 'Edit Delivery Fee',
    deliveryFeeSaved: 'Delivery fee saved',

    cancel: 'Cancel',
    confirm: 'Confirm'
  }
};

const REVENUE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 90, 100];

const PAYMENT_CASH = 'cash';
const PAYMENT_ONLINE = 'online';
const PAYMENT_PREPAID = 'prepaid';

const normalizeNumber = value => {
  const n = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

export default function App() {
  const [lang, setLang] = useState(
    () => localStorage.getItem('app_lang') || 'ar'
  );

  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem('groq_api_key') || ''
  );

  const [activeTab, setActiveTab] = useState('new_order');
  const [searchQuery, setSearchQuery] = useState('');

  const [orderCounter, setOrderCounter] = useState(
    () => parseInt(localStorage.getItem('order_counter_num') || '1001')
  );

  const [orders, setOrders] = useState(
    () => JSON.parse(localStorage.getItem('delivery_orders_v5') || '[]')
  );

  const [merchants, setMerchants] = useState(
    () => JSON.parse(localStorage.getItem('delivery_merchants_v5') || '[]')
  );

  const [customers, setCustomers] = useState(
    () => JSON.parse(localStorage.getItem('delivery_customers_v5') || '[]')
  );

  const [drivers, setDrivers] = useState(
    () =>
      JSON.parse(
        localStorage.getItem('delivery_drivers_v5') ||
          '["أحمد", "محمود", "مصطفى"]'
      )
  );

  const [historyLogs, setHistoryLogs] = useState(
    () => JSON.parse(localStorage.getItem('delivery_history_v5') || '[]')
  );

  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedOrders, setExtractedOrders] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedRevenuePercent, setSelectedRevenuePercent] = useState(20);

  const [newDriverName, setNewDriverName] = useState('');

  const [ledgerDriver, setLedgerDriver] = useState('');
  const [ledgerDate, setLedgerDate] = useState(
    () => new Date().toISOString().split('T')[0]
  );

  const [typoFlags, setTypoFlags] = useState([]);
  const [showTypoModal, setShowTypoModal] = useState(false);

  const [editingAmountId, setEditingAmountId] = useState(null);
  const [tempAmount, setTempAmount] = useState('');

  const [editingDeliveryId, setEditingDeliveryId] = useState(null);
  const [tempDeliveryFee, setTempDeliveryFee] = useState('');

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  const [merchantForm, setMerchantForm] = useState({
    id: null,
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [editingCustomer, setEditingCustomer] = useState(null);

  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('groq_api_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('order_counter_num', orderCounter.toString());
  }, [orderCounter]);

  useEffect(() => {
    localStorage.setItem('delivery_orders_v5', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(
      'delivery_merchants_v5',
      JSON.stringify(merchants)
    );
  }, [merchants]);

  useEffect(() => {
    localStorage.setItem(
      'delivery_customers_v5',
      JSON.stringify(customers)
    );
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('delivery_drivers_v5', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem(
      'delivery_history_v5',
      JSON.stringify(historyLogs)
    );
  }, [historyLogs]);

  /*
    ============================================================
    FINANCIAL ENGINE
    ============================================================
  */

  const isCancelled = order => order?.status === 'ملغي';
  const getOrderValue = order => normalizeNumber(order?.cod);
  const getDeliveryFee = order => normalizeNumber(order?.deliveryFee);
  const getRevenuePercent = order => normalizeNumber(order?.revenuePercent);

  const getCompanyRevenue = order => {
    if (isCancelled(order)) return 0;
    const deliveryFee = getDeliveryFee(order);
    const percentage = getRevenuePercent(order);
    return deliveryFee * (percentage / 100);
  };

  const getDriverRevenue = order => {
    if (isCancelled(order)) return 0;
    const deliveryFee = getDeliveryFee(order);
    const percentage = getRevenuePercent(order);
    return deliveryFee * (1 - percentage / 100);
  };

  const getCustomerCollection = order => {
    if (isCancelled(order)) return 0;
    const orderValue = getOrderValue(order);
    const deliveryFee = getDeliveryFee(order);

    if (
      order?.paymentMethod === PAYMENT_ONLINE ||
      order?.paymentMethod === PAYMENT_PREPAID
    ) {
      return deliveryFee;
    }

    return orderValue + deliveryFee;
  };

  const getMerchantDue = order => {
    if (isCancelled(order)) return 0;
    if (
      order?.paymentMethod === PAYMENT_ONLINE ||
      order?.paymentMethod === PAYMENT_PREPAID
    ) {
      return 0;
    }
    return getOrderValue(order);
  };

  const getOrderEffectiveCash = order => {
    if (isCancelled(order)) return 0;
    return getCustomerCollection(order);
  };

  const addAuditLog = (orderNum, action, details) => {
    const log = {
      id: Date.now() + Math.random(),
      orderNum,
      action,
      details,
      time: new Date().toLocaleString(
        lang === 'ar' ? 'ar-EG' : 'en-US'
      )
    };
    setHistoryLogs(prev => [log, ...prev]);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch {
      alert(
        lang === 'ar'
          ? 'تم رفض صلاحية الحافظة.'
          : 'Clipboard permission denied.'
      );
    }
  };

  const isIncompleteAddress = addressStr => {
    if (
      !addressStr ||
      addressStr === t.unspecified ||
      addressStr.length < 10
    ) {
      return true;
    }
    const lower = addressStr.toLowerCase();
    const keywords = [
      'شارع',
      'ش',
      'دور',
      'شقة',
      'عمارة',
      'مبنى',
      'street',
      'st',
      'floor',
      'apt',
      'flat'
    ];
    return !keywords.some(k => lower.includes(k));
  };

  /*
    ============================================================
    AI EXTRACTION
    ============================================================
  */

  const extractOrderInfo = async () => {
    if (!apiKey.trim()) {
      alert(
        lang === 'ar'
          ? 'يرجى إدخال مفتاح Groq API في الإعدادات.'
          : 'Please add your Groq API key in Settings.'
      );
      setActiveTab('settings');
      return;
    }

    if (!rawText.trim()) {
      alert(
        lang === 'ar'
          ? 'يرجى إدخال نص الطلب أولاً.'
          : 'Please enter order text.'
      );
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
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
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
        }
      );

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
          order.paymentMethod === PAYMENT_ONLINE ||
          order.paymentMethod === PAYMENT_PREPAID
            ? order.paymentMethod
            : PAYMENT_CASH
      }));

      setExtractedOrders(normalizedOrders);
    } catch (err) {
      alert(
        lang === 'ar'
          ? `حدث خطأ أثناء تحليل الطلب: ${err.message}`
          : `Error parsing order: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const updateExtractedOrder = (index, field, value) => {
    setExtractedOrders(prev =>
      prev.map((order, i) =>
        i === index
          ? {
              ...order,
              [field]:
                field === 'cod' || field === 'deliveryFee'
                  ? normalizeNumber(value)
                  : value
            }
          : order
      )
    );
  };

  /*
    ============================================================
    CONFIRM ORDERS
    ============================================================
  */

  const handleConfirmOrder = () => {
    if (extractedOrders.length === 0) return;

    if (!selectedDriver) {
      alert(
        lang === 'ar'
          ? 'يرجى اختيار طيار قبل تأكيد الطلب.'
          : 'Please select a driver before confirming the orders.'
      );
      return;
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
        driver: selectedDriver,
        status: 'مؤكد',
        isoDate: isoDateStr,
        date: now.toLocaleTimeString(
          lang === 'ar' ? 'ar-EG' : 'en-US',
          { hour: '2-digit', minute: '2-digit' }
        )
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
          ? `تم إنشاء الطلب للعميل ${newOrder.customer}. قيمة الطلب ${normalizedCod} ج.م، التوصيل ${normalizedDeliveryFee} ج.م، الدفع ${
              paymentMethod === PAYMENT_CASH ? 'كاش' : 'مدفوع أونلاين'
            }، نسبة الشركة ${selectedRevenuePercent}% = ${companyRevenue.toFixed(
              2
            )} ج.م، نصيب الطيار = ${driverRevenue.toFixed(
              2
            )} ج.م، إجمالي تحصيل الطيار = ${customerCollection.toFixed(2)} ج.م.`
          : `Order created for ${newOrder.customer}. Order value: ${normalizedCod} EGP, delivery fee: ${normalizedDeliveryFee} EGP, payment: ${
              paymentMethod === PAYMENT_CASH ? 'Cash' : 'Paid Online'
            }, company share ${selectedRevenuePercent}% = ${companyRevenue.toFixed(
              2
            )} EGP, driver share = ${driverRevenue.toFixed(
              2
            )} EGP, driver collection = ${customerCollection.toFixed(2)} EGP.`
      );

      return newOrder;
    });

    setOrderCounter(currentNum);
    setOrders(prev => [...newCreatedOrders, ...prev]);

    extractedOrders.forEach(ord => {
      if (ord.store && ord.store !== t.unspecified) {
        setMerchants(prev => {
          const match = prev.find(m => m.name?.toLowerCase() === ord.store?.toLowerCase());
          if (!match) {
            return [
              {
                id: Date.now() + Math.random(),
                name: ord.store,
                phone: '',
                address: '',
                notes: '',
                totalOrders: 1
              },
              ...prev
            ];
          }
          return prev.map(m =>
            m.name?.toLowerCase() === ord.store?.toLowerCase()
              ? { ...m, totalOrders: (m.totalOrders || 0) + 1 }
              : m
          );
        });
      }

      if (ord.customer && ord.customer !== t.unspecified) {
        setCustomers(prev => {
          const match = prev.find(c => c.phone === ord.phone || c.name === ord.customer);
          if (!match) {
            return [
              {
                id: Date.now() + Math.random(),
                name: ord.customer,
                phone: ord.phone,
                address: ord.address
              },
              ...prev
            ];
          }
          return prev.map(c =>
            c.name === ord.customer || c.phone === ord.phone
              ? { ...c, address: ord.address || c.address }
              : c
          );
        });
      }
    });

    setRawText('');
    setExtractedOrders([]);
    setSelectedDriver('');
    setSelectedRevenuePercent(20);
    setActiveTab('orders');
  };

  /*
    ============================================================
    ORDER ACTIONS
    ============================================================
  */

  const handleDeleteOrder = order => {
    if (window.confirm(`${t.confirmDeleteMsg} (${order.orderNum})`)) {
      setOrders(prev => prev.filter(o => o.id !== order.id));
      addAuditLog(order.orderNum, 'Deleted', `Order for ${order.customer} deleted.`);
    }
  };

  const handleStatusChange = (order, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === order.id ? { ...o, status: newStatus } : o))
    );
    addAuditLog(order.orderNum, 'Status Change', `Status changed to "${newStatus}"`);
  };

  const handleDriverReassign = (order, newDriver) => {
    setOrders(prev =>
      prev.map(o => (o.id === order.id ? { ...o, driver: newDriver } : o))
    );
    addAuditLog(order.orderNum, 'Driver Reassigned', `Driver changed to "${newDriver}"`);
  };

  const handleRevenuePercentChange = (order, newPercent) => {
    const numericPercent = normalizeNumber(newPercent);
    setOrders(prev =>
      prev.map(o => (o.id === order.id ? { ...o, revenuePercent: numericPercent } : o))
    );
    addAuditLog(
      order.orderNum,
      'Revenue Percent Changed',
      `Company share updated to ${numericPercent}%`
    );
  };

  const handleAmountSave = order => {
    const oldAmount = order.cod;
    const newAmount = normalizeNumber(tempAmount);
    setOrders(prev =>
      prev.map(o => (o.id === order.id ? { ...o, cod: newAmount } : o))
    );
    addAuditLog(
      order.orderNum,
      'Amount Edited',
      `Order value updated from ${oldAmount} to ${newAmount} ${t.currency}`
    );
    setEditingAmountId(null);
  };

  const handleDeliveryFeeSave = order => {
    const oldFee = getDeliveryFee(order);
    const newFee = normalizeNumber(tempDeliveryFee);
    setOrders(prev =>
      prev.map(o => (o.id === order.id ? { ...o, deliveryFee: newFee } : o))
    );
    addAuditLog(
      order.orderNum,
      'Delivery Fee Edited',
      `Delivery fee updated from ${oldFee} to ${newFee} ${t.currency}`
    );
    setEditingDeliveryId(null);
  };

  const handleNoteSave = order => {
    setOrders(prev =>
      prev.map(o => (o.id === order.id ? { ...o, notes: tempNote } : o))
    );
    addAuditLog(order.orderNum, 'Notes Edited', `Notes updated to "${tempNote}"`);
    setEditingNoteId(null);
  };

  /*
    ============================================================
    MANAGEMENT ACTIONS
    ============================================================
  */

  const handleAddDriver = () => {
    if (!newDriverName.trim()) return;
    if (drivers.includes(newDriverName.trim())) {
      alert(lang === 'ar' ? 'الطيار موجود بالفعل.' : 'Driver already exists.');
      return;
    }
    setDrivers(prev => [...prev, newDriverName.trim()]);
    setNewDriverName('');
  };

  const handleSaveCustomerExplicit = () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) {
      return alert(
        lang === 'ar' ? 'الاسم ورقم الهاتف مطلوبان.' : 'Name and phone required.'
      );
    }

    const match = customers.find(c => c.id === editingCustomer?.id);
    const fillsMissing = match && !match.address && newCustomer.address;

    if (fillsMissing) {
      const confirmOk = window.confirm(
        `${t.confirmDbUpdateTitle}\n\n${t.confirmDbUpdateMsg}`
      );
      if (!confirmOk) return;
    }

    if (editingCustomer) {
      setCustomers(prev =>
        prev.map(c =>
          c.id === editingCustomer.id ? { ...c, ...newCustomer } : c
        )
      );
      setEditingCustomer(null);
    } else {
      setCustomers(prev => [{ id: Date.now(), ...newCustomer }, ...prev]);
    }

    setNewCustomer({ name: '', phone: '', address: '' });
  };

  const handleSaveMerchant = () => {
    if (!merchantForm.name.trim()) return;
    if (merchantForm.id) {
      setMerchants(prev =>
        prev.map(m => (m.id === merchantForm.id ? { ...merchantForm } : m))
      );
    } else {
      setMerchants(prev => [
        { ...merchantForm, id: Date.now(), totalOrders: 0 },
        ...prev
      ]);
    }
    setMerchantForm({ id: null, name: '', phone: '', address: '', notes: '' });
  };

  /*
    ============================================================
    CALCULATIONS
    ============================================================
  */

  const completedOrders = orders.filter(o => o.status === 'مكتمل');
  const totalCollected = completedOrders.reduce(
    (sum, o) => sum + getOrderEffectiveCash(o),
    0
  );
  const totalDeliveryRevenue = completedOrders.reduce(
    (sum, o) => sum + getCompanyRevenue(o),
    0
  );
  const activeOrdersCount = orders.filter(
    o => !['مكتمل', 'ملغي'].includes(o.status)
  ).length;
  const completedOrdersCount = completedOrders.length;

  const filteredOrders = orders.filter(o => {
    const query = searchQuery.toLowerCase();
    return (
      (o.orderNum || '').toLowerCase().includes(query) ||
      (o.customer || '').toLowerCase().includes(query) ||
      (o.store || '').toLowerCase().includes(query) ||
      (o.phone || '').includes(searchQuery)
    );
  });

  /*
    ============================================================
    LEDGER
    ============================================================
  */

  const selectedYearMonth = ledgerDate.substring(0, 7);

  const filteredLedgerOrders = orders.filter(o => {
    const matchDriver = !ledgerDriver || o.driver === ledgerDriver;
    const matchDate = o.isoDate === ledgerDate;
    return matchDriver && matchDate;
  });

  const dailyCollected = filteredLedgerOrders
    .filter(o => o.status === 'مكتمل')
    .reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);

  const dailyCompanyRevenue = filteredLedgerOrders
    .filter(o => o.status === 'مكتمل')
    .reduce((sum, o) => sum + getCompanyRevenue(o), 0);

  const dailyDriverRevenue = filteredLedgerOrders
    .filter(o => o.status === 'مكتمل')
    .reduce((sum, o) => sum + getDriverRevenue(o), 0);

  const monthlyOrders = orders.filter(o => {
    const matchDriver = !ledgerDriver || o.driver === ledgerDriver;
    const matchMonth = (o.isoDate || '').startsWith(selectedYearMonth);
    return matchDriver && matchMonth;
  });

  const monthlyTotalCash = monthlyOrders
    .filter(o => o.status === 'مكتمل')
    .reduce((sum, o) => sum + getOrderEffectiveCash(o), 0);

  const monthlyCompanyRevenue = monthlyOrders
    .filter(o => o.status === 'مكتمل')
    .reduce((sum, o) => sum + getCompanyRevenue(o), 0);

  const monthlyDriverRevenue = monthlyOrders
    .filter(o => o.status === 'مكتمل')
    .reduce((sum, o) => sum + getDriverRevenue(o), 0);

  const getStatusBadgeStyle = status => {
    switch (status) {
      case 'مكتمل':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'ملغي':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'متأخر':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'خرج للتوصيل':
      case 'جاري التوصيل':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
    }
  };

  /*
    ============================================================
    UI RENDERING
    ============================================================
  */

  return (
    <div className={`min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-fuchsia-500 selection:text-white relative overflow-hidden ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden backdrop-blur-3xl">
        
        {/* Sidebar Navigation */}
        <aside className="w-72 bg-slate-950/50 border-r border-slate-800/50 p-6 flex flex-col justify-between backdrop-blur-2xl">
          <div>
            {/* App Brand */}
            <div className="flex items-center gap-3.5 px-2 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 shadow-lg shadow-fuchsia-500/25 ring-1 ring-white/20">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  {t.appTitle}
                </h1>
                <p className="text-[10px] tracking-widest text-fuchsia-400 font-bold">{t.appSubtitle}</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              {[
                { id: 'new_order', label: t.navNewOrder, icon: Plus },
                { id: 'orders', label: t.navOrders, icon: Package, badge: orders.length },
                { id: 'driver_ledger', label: t.navDriverLedger, icon: ClipboardList },
                { id: 'drivers', label: t.navDrivers, icon: Truck, badge: drivers.length },
                { id: 'merchants', label: t.navMerchants, icon: Store, badge: merchants.length },
                { id: 'customers', label: t.navCustomers, icon: Users, badge: customers.length },
                { id: 'history', label: t.navHistory, icon: History },
                { id: 'settings', label: t.navSettings, icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium transition-all duration-300 relative group ${
                      isActive 
                        ? "text-white bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-transparent border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/10" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-fuchsia-400" : "text-slate-400"}`} />
                      <span className="text-xs font-semibold">{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Controls & Connection Status */}
          <div className="space-y-3">
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all hover:border-slate-700"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
              apiKey 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}>
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${apiKey ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
                {apiKey ? t.groqConnected : t.groqMissing}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          
          {/* Top KPI Header */}
          <header className="p-8 border-b border-slate-800/50 bg-slate-950/30 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-900/30 via-slate-900/50 to-slate-950/80 border border-violet-500/20 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{t.kpiTotalCod}</span>
                  <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400"><DollarSign className="w-4 h-4" /></div>
                </div>
                <div className="mt-3 text-xl font-black text-slate-100">{totalCollected.toLocaleString()} <span className="text-xs text-slate-400">{t.currency}</span></div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/30 via-slate-900/50 to-slate-950/80 border border-emerald-500/20 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{t.kpiRevenue}</span>
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"><TrendingUp className="w-4 h-4" /></div>
                </div>
                <div className="mt-3 text-xl font-black text-emerald-400">{totalDeliveryRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-xs text-slate-400">{t.currency}</span></div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-fuchsia-900/30 via-slate-900/50 to-slate-950/80 border border-fuchsia-500/20 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{t.kpiActiveOrders}</span>
                  <div className="p-2 rounded-lg bg-fuchsia-500/20 text-fuchsia-400"><Clock className="w-4 h-4" /></div>
                </div>
                <div className="mt-3 text-xl font-black text-fuchsia-300">{activeOrdersCount}</div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-900/30 via-slate-900/50 to-slate-950/80 border border-cyan-500/20 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">{t.kpiCompleted}</span>
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400"><Package className="w-4 h-4" /></div>
                </div>
                <div className="mt-3 text-xl font-black text-cyan-300">{completedOrdersCount}</div>
              </div>

            </div>
          </header>

          {/* Workspace Body */}
          <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">

            {/* TAB: NEW ORDER */}
            {activeTab === 'new_order' && (
              <div className="space-y-6">
                
                {/* AI Ingestion Hero */}
                <div className="rounded-3xl p-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 shadow-2xl">
                  <div className="bg-slate-950/90 backdrop-blur-2xl rounded-[23px] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-400">
                          <Sparkles className="w-5 h-5 animate-spin-slow" />
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-slate-100">{t.aiHeader}</h2>
                          <p className="text-xs text-slate-400">Extract unstructured logistics text with Llama AI</p>
                        </div>
                      </div>
                      <button 
                        onClick={handlePasteClipboard}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                      >
                        {t.btnPaste}
                      </button>
                    </div>

                    <textarea 
                      rows={6}
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      placeholder={t.placeholderOrder}
                      className="w-full bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-fuchsia-500/50 transition-all resize-none shadow-inner"
                    />

                    <button 
                      onClick={extractOrderInfo}
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-fuchsia-600/25 transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t.btnExtracting}</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 fill-white" />
                          <span>{t.btnExtract}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Extracted Orders Preview */}
                {extractedOrders.length > 0 && (
                  <div className="space-y-6 pt-4 border-t border-slate-800">
                    <h3 className="text-sm font-bold text-fuchsia-400">{t.reviewTitle}</h3>
                    
                    {extractedOrders.map((ord, idx) => {
                      const orderValue = normalizeNumber(ord.cod);
                      const fee = normalizeNumber(ord.deliveryFee);
                      const company = fee * (selectedRevenuePercent / 100);
                      const driver = fee - company;
                      const collection = ord.paymentMethod === PAYMENT_ONLINE || ord.paymentMethod === PAYMENT_PREPAID ? fee : orderValue + fee;

                      return (
                        <div key={idx} className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 backdrop-blur-xl space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20 border border-violet-500/20">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t.customer}</span>
                              <p className="text-sm font-bold text-slate-100">👤 {ord.customer || t.unspecified}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t.customerCollection}</span>
                              <p className="text-base font-black text-fuchsia-400">{collection.toLocaleString()} {t.currency}</p>
                            </div>
                          </div>

                          {isIncompleteAddress(ord.address) && (
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              <span>{t.addressWarning}</span>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                              <span className="text-slate-400">{t.store}: </span>
                              <span className="font-semibold text-slate-200">{ord.store || t.unspecified}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                              <span className="text-slate-400">{t.phone}: </span>
                              <span className="font-semibold text-slate-200">{ord.phone || t.unspecified}</span>
                            </div>
                            <div className="md:col-span-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                              <span className="text-slate-400">{t.address}: </span>
                              <span className="font-semibold text-slate-200">{ord.address || t.unspecified}</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4" />
                              <span>{t.financialBreakdown}</span>
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="text-[11px] text-slate-400 mb-1 block">{t.cod}</label>
                                <input 
                                  type="number"
                                  value={ord.cod}
                                  onChange={(e) => updateExtractedOrder(idx, 'cod', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
                                />
                              </div>
                              <div>
                                <label className="text-[11px] text-slate-400 mb-1 block">{t.deliveryFee}</label>
                                <input 
                                  type="number"
                                  value={ord.deliveryFee}
                                  onChange={(e) => updateExtractedOrder(idx, 'deliveryFee', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
                                />
                              </div>
                              <div>
                                <label className="text-[11px] text-slate-400 mb-1 block">{t.paymentMethod}</label>
                                <select 
                                  value={ord.paymentMethod || PAYMENT_CASH}
                                  onChange={(e) => updateExtractedOrder(idx, 'paymentMethod', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
                                >
                                  <option value="cash">{t.paymentCash}</option>
                                  <option value="online">{t.paymentOnline}</option>
                                  <option value="prepaid">{t.paymentPrepaid}</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                              <div>
                                <span className="text-slate-400 block text-[10px]">{t.customerCollection}</span>
                                <span className="font-bold text-slate-100">{collection.toLocaleString()} {t.currency}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">{t.merchantAmount}</span>
                                <span className="font-bold text-slate-100">{orderValue.toLocaleString()} {t.currency}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">{t.companyRevenue}</span>
                                <span className="font-bold text-emerald-400">{company.toFixed(2)} {t.currency}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">{t.driverRevenue}</span>
                                <span className="font-bold text-cyan-400">{driver.toFixed(2)} {t.currency}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="p-6 rounded-2xl bg-slate-950/60 border border-fuchsia-500/30 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-200 mb-1 block">{t.selectDriver}</label>
                          <select 
                            value={selectedDriver}
                            onChange={(e) => setSelectedDriver(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-fuchsia-500"
                          >
                            <option value="">{t.chooseDriver}</option>
                            {drivers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-200 mb-1 block">{t.chooseRevenue}</label>
                          <select 
                            value={selectedRevenuePercent}
                            onChange={(e) => setSelectedRevenuePercent(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-emerald-500/40 text-emerald-400 rounded-xl p-3 text-xs font-bold focus:outline-none"
                          >
                            {REVENUE_OPTIONS.map(p => <option key={p} value={p}>{p}%</option>)}
                          </select>
                        </div>
                      </div>

                      <button 
                        onClick={handleConfirmOrder}
                        className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>{t.btnConfirm}</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* TAB: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-fuchsia-500/50"
                  />
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="text-center py-16 text-slate-500 text-xs">No orders found.</div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => {
                      const companyRevenue = getCompanyRevenue(order);
                      const driverRevenue = getDriverRevenue(order);
                      const collection = getCustomerCollection(order);
                      const merchantDue = getMerchantDue(order);

                      return (
                        <div key={order.id} className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 backdrop-blur-xl space-y-4">
                          
                          <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-lg bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 font-bold text-xs">
                                {order.orderNum}
                              </span>
                              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                                {order.store}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <select 
                                value={order.status}
                                onChange={(e) => handleStatusChange(order, e.target.value)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${getStatusBadgeStyle(order.status)} bg-slate-950 focus:outline-none`}
                              >
                                <option value="مؤكد">{t.statusConfirmed}</option>
                                <option value="قيد تجهيز الطلب">{t.statusProcessing}</option>
                                <option value="خرج للتوصيل">{t.statusOutForDelivery}</option>
                                <option value="جاري التوصيل">{t.statusInTransit}</option>
                                <option value="مكتمل">{t.statusCompleted}</option>
                                <option value="متأخر">{t.statusDelayed}</option>
                                <option value="ملغي">{t.statusCancelled}</option>
                              </select>

                              <button 
                                onClick={() => handleDeleteOrder(order)}
                                className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1 text-xs">
                            <p className="font-bold text-slate-200">👤 {order.customer} <span className="text-slate-400 font-normal">({order.phone})</span></p>
                            <p className="text-slate-400">📍 {order.address}</p>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                              <div>
                                <span className="text-slate-400 block text-[10px]">{t.customerCollection}</span>
                                <span className="font-extrabold text-slate-100">{collection.toLocaleString()} {t.currency}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">{t.merchantDue}</span>
                                <span className="font-extrabold text-slate-100">{merchantDue.toLocaleString()} {t.currency}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">{t.companyRevenue}</span>
                                <span className="font-extrabold text-emerald-400">{companyRevenue.toFixed(2)} {t.currency}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-[10px]">{t.driverRevenue}</span>
                                <span className="font-extrabold text-cyan-400">{driverRevenue.toFixed(2)} {t.currency}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                            <span>🕒 {order.date} ({order.isoDate})</span>
                            <div className="flex items-center gap-2">
                              <span>🛵 {t.selectDriver}</span>
                              <select 
                                value={order.driver}
                                onChange={(e) => handleDriverReassign(order, e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-200"
                              >
                                {drivers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                              </select>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB: DRIVER LEDGER */}
            {activeTab === 'driver_ledger' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 backdrop-blur-xl space-y-4">
                  <h2 className="text-sm font-bold text-slate-100">{t.driverLedgerTitle}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">{t.filterDriver}</label>
                      <select 
                        value={ledgerDriver}
                        onChange={(e) => setLedgerDriver(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100"
                      >
                        <option value="">-- {t.allDrivers} --</option>
                        {drivers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">{t.filterDate}</label>
                      <input 
                        type="date"
                        value={ledgerDate}
                        onChange={(e) => setLedgerDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block">{t.cashToHandIn}</span>
                    <span className="text-xl font-black text-slate-100 mt-1 block">{dailyCollected.toLocaleString()} {t.currency}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block">{t.companyRevenueLedger}</span>
                    <span className="text-xl font-black text-emerald-400 mt-1 block">{dailyCompanyRevenue.toFixed(2)} {t.currency}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block">{t.driverRevenueLedger}</span>
                    <span className="text-xl font-black text-cyan-400 mt-1 block">{dailyDriverRevenue.toFixed(2)} {t.currency}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DRIVERS */}
            {activeTab === 'drivers' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-4">
                  <h2 className="text-sm font-bold text-slate-100">{t.addDriver}</h2>
                  <div className="flex gap-3">
                    <input 
                      type="text"
                      placeholder={t.driverName}
                      value={newDriverName}
                      onChange={(e) => setNewDriverName(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100"
                    />
                    <button onClick={handleAddDriver} className="px-5 bg-fuchsia-600 text-white rounded-xl text-xs font-bold">
                      {t.btnAdd}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drivers.map((d, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-100 text-sm">{d}</p>
                          <p className="text-xs text-slate-400">Fleet Driver</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: MERCHANTS */}
            {activeTab === 'merchants' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                  <h2 className="text-sm font-bold text-slate-100">{t.saveMerchant}</h2>
                  <input 
                    type="text" 
                    placeholder={t.store} 
                    value={merchantForm.name} 
                    onChange={(e) => setMerchantForm({ ...merchantForm, name: e.target.value })} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100"
                  />
                  <button onClick={handleSaveMerchant} className="w-full py-3 bg-fuchsia-600 text-white rounded-xl text-xs font-bold">
                    {t.saveBtn}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {merchants.map((m) => (
                    <div key={m.id} className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
                      <p className="font-bold text-slate-100 text-sm">🏪 {m.name}</p>
                      <p className="text-xs text-slate-400">Total Orders: {m.totalOrders || 0}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                  <h2 className="text-sm font-bold text-slate-100">{t.saveCustomer}</h2>
                  <input 
                    type="text" 
                    placeholder={t.customer} 
                    value={newCustomer.name} 
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100"
                  />
                  <input 
                    type="text" 
                    placeholder={t.phone} 
                    value={newCustomer.phone} 
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100"
                  />
                  <button onClick={handleSaveCustomerExplicit} className="w-full py-3 bg-fuchsia-600 text-white rounded-xl text-xs font-bold">
                    {t.saveBtn}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: AUDIT LOG HISTORY */}
            {activeTab === 'history' && (
              <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-4">
                <h2 className="text-sm font-bold text-slate-100">{t.historyTitle}</h2>
                {historyLogs.length === 0 ? (
                  <p className="text-xs text-slate-500 py-8 text-center">{t.noHistory}</p>
                ) : (
                  <div className="space-y-3 divide-y divide-slate-800/40">
                    {historyLogs.map((log) => (
                      <div key={log.id} className="pt-3 text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-fuchsia-400">{log.orderNum}</span>
                          <span className="text-slate-400">[{log.action}]</span>
                        </div>
                        <p className="text-slate-300">{log.details}</p>
                        <span className="text-[10px] text-slate-500 block">🕒 {log.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-4 max-w-xl">
                <h2 className="text-sm font-bold text-slate-100">{t.settingsTitle}</h2>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Groq API Key</label>
                  <input 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                    placeholder="gsk_..." 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>
            )}

          </div>
        </main>

      </div>
    </div>
  );
}
