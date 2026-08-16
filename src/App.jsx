import React, { useEffect, useMemo, useState } from 'react';

const translations = {
  ar: {
    appTitle: '🚀 إكسبريس دليفري PRO',
    appSubtitle: 'النظام الذكي لإدارة الطلبات واللوجستيات',
    groqConnected: '🟢 AI متصل',
    groqMissing: '🔴 المفتاح مفقود',

    navNewOrder: '➕ طلب جديد',
    navOrders: '📋 إدارة الطلبات',
    navDrivers: '🛵 الطيارين',
    navDriverLedger: '📊 كشف حساب الطيارين',
    navMerchants: '🏪 التجار',
    navCustomers: '👥 العملاء',
    navHistory: '📜 السجل والتعديلات',
    navSettings: '⚙️ الإعدادات',

    kpiTotalCod: 'إجمالي النقدية المحصلة',
    kpiActiveOrders: 'طلبات نشطة',
    kpiCompleted: 'تم التوصيل',
    kpiRevenue: 'إيراد التوصيل',
    kpiDriverShares: 'مستحقات الطيارين',

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
    totalDue: 'إجمالي المطلوب من العميل',
    address: 'العنوان',
    item: 'الصنف',
    notes: 'ملاحظات الطلب',

    paymentMethod: 'طريقة الدفع',
    paymentCash: 'كاش',
    paymentOnline: 'دفع أونلاين',
    paymentPrepaid: 'مدفوع مسبقًا',
    paymentSettled: 'تم تسوية قيمة الطلب',
    paymentDue: 'المتبقي للتحصيل',

    addressWarning: '📍 تنبيه عنوان غير مكتمل: يرجى مراجعة وتأكيد العنوان!',

    selectDriver: 'اختيار طيار التوصيل:',
    chooseDriver: '-- اختر طيار --',
    revenueShare: 'نسبة إيراد الشركة من التوصيل:',
    companyRevenue: 'إيراد الشركة',
    driverShare: 'نصيب الطيار',
    driverCollection: 'إجمالي ما يحصله الطيار',
    companyHandIn: 'المبلغ الذي يورده الطيار',
    btnConfirm: '✅ تأكيد وحفظ الطلبات',

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

    driverCash: 'المبلغ المطلوب توريده:',
    totalTrips: 'إجمالي الرحلات:',
    driverRevenue: 'إجمالي نصيب الطيار:',
    companyRevenueTotal: 'إجمالي إيراد الشركة:',
    driverLedgerTitle: '📊 كشف حساب الطيارين — التحصيل والإيرادات',

    cashToHandIn: '💵 إجمالي المبلغ المطلوب توريده',
    todaysOrdersCount: '📦 طلبات اليوم',
    monthsOrdersCount: '📅 طلبات الشهر الحالي',
    monthsTotalCash: '💰 إجمالي توريد الشهر',
    monthlyRevenue: '📈 إيراد الشركة الشهري',
    monthlyDriverShare: '🛵 نصيب الطيارين الشهري',

    filterDriver: 'تصفية بالطيار:',
    filterDate: 'التاريخ:',
    allDrivers: 'كل الطيارين',

    ordersHandled: 'تفاصيل الطلبات والتحصيل:',
    noOrdersForDate: 'لا توجد طلبات مسجلة لهذه الفلاتر.',

    orderValue: 'قيمة الطلب',
    amountAlreadyPaid: 'مدفوع بالفعل',
    remainingOrderValue: 'المتبقي من قيمة الطلب',
    customerTotal: 'إجمالي العميل',
    deliveryRevenue: 'إيراد التوصيل',
    companyShare: 'نصيب الشركة',
    driverShareLabel: 'نصيب الطيار',
    handIn: 'التوريد',
    collection: 'التحصيل',
    settled: 'مسدد',
    unpaid: 'غير مسدد',

    saveMerchant: 'إضافة أو تعديل تاجر',
    saveCustomer: 'إضافة عميل يدويًا',
    editCustomer: 'تعديل بيانات العميل',
    saveBtn: 'حفظ',
    deleteBtn: 'حذف',
    editBtn: 'تعديل',
    editNoteBtn: 'تعديل الملاحظات',

    settingsTitle: 'إعدادات النظام',
    editAmount: 'تعديل قيمة الطلب',
    saveAmount: 'تم الحفظ',

    confirmDbUpdateTitle: '⚠️ تأكيد تحديث بيانات قاعدة البيانات',
    confirmDbUpdateMsg:
      'تم العثور على تفاصيل جديدة تملأ بيانات مفقودة لعميل/متجر. هل تريد تحديث السجلات المخزنة؟',

    confirmDeleteMsg: 'هل أنت متأكد من رغبتك في حذف هذا الطلب نهائياً؟',

    typoAlertTitle: '🔍 تم رصد كلمات قد تحتوي على خطأ إملائي غير معروف:',
    historyTitle: '📜 سجل عمليات وتعديلات الطلبات',
    noHistory: 'لا توجد سجلات تعديل حتى الآن.',

    created: 'تم إنشاء الطلب',
    statusChange: 'تغيير الحالة',
    driverReassigned: 'تغيير الطيار',
    amountEdited: 'تعديل قيمة الطلب',
    notesEdited: 'تعديل الملاحظات',
    paymentEdited: 'تعديل طريقة الدفع',
    deliveryFeeEdited: 'تعديل رسوم التوصيل',
    revenueEdited: 'تعديل نسبة الإيراد',
    deleted: 'تم حذف الطلب',

    orderBreakdown: '💰 التفاصيل المالية',
    cashToCollect: 'المبلغ المطلوب تحصيله',
    cashToHand: 'المبلغ المطلوب توريده',
    driverKeeps: 'الطيار يحتفظ بـ',
    youEarn: 'أنت تكسب',

    noOrders: 'لا توجد طلبات.',
    percent: '%'
  },

  en: {
    appTitle: '🚀 Express Delivery PRO',
    appSubtitle: 'AI Logistics & Multi-Order Management Platform',
    groqConnected: '🟢 AI Active',
    groqMissing: '🔴 Key Missing',

    navNewOrder: '➕ New Order',
    navOrders: '📋 Manage Orders',
    navDrivers: '🛵 Drivers',
    navDriverLedger: '📊 Driver Ledger',
    navMerchants: '🏪 Stores',
    navCustomers: '👥 Customers',
    navHistory: '📜 Audit History',
    navSettings: '⚙️ Settings',

    kpiTotalCod: 'Total Customer Collections',
    kpiActiveOrders: 'Active Orders',
    kpiCompleted: 'Completed Orders',
    kpiRevenue: 'Delivery Revenue',
    kpiDriverShares: 'Driver Shares',

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
    totalDue: 'Total Customer Due',
    address: 'Address',
    item: 'Item Details',
    notes: 'Order Notes',

    paymentMethod: 'Payment Method',
    paymentCash: 'Cash',
    paymentOnline: 'Online',
    paymentPrepaid: 'Prepaid',
    paymentSettled: 'Order Already Settled',
    paymentDue: 'Remaining to Collect',

    addressWarning: '📍 Incomplete Address Alert: Double check details!',

    selectDriver: 'Assign Driver:',
    chooseDriver: '-- Select Driver --',
    revenueShare: 'Company Delivery Revenue Share:',
    companyRevenue: 'Company Revenue',
    driverShare: 'Driver Share',
    driverCollection: 'Driver Customer Collection',
    companyHandIn: 'Driver Hand-In',
    btnConfirm: '✅ Confirm & Save Orders',

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

    driverCash: 'Cash to Hand In:',
    totalTrips: 'Total Trips:',
    driverRevenue: 'Total Driver Share:',
    companyRevenueTotal: 'Total Company Revenue:',
    driverLedgerTitle: '📊 Driver Ledger — Collections & Revenue',

    cashToHandIn: '💵 Total Cash to Hand In',
    todaysOrdersCount: "📦 Today's Orders",
    monthsOrdersCount: "📅 This Month's Orders",
    monthsTotalCash: "💰 Monthly Hand-In",
    monthlyRevenue: '📈 Monthly Company Revenue',
    monthlyDriverShare: '🛵 Monthly Driver Share',

    filterDriver: 'Filter Driver:',
    filterDate: 'Date:',
    allDrivers: 'All Drivers',

    ordersHandled: 'Order & Collection Breakdown:',
    noOrdersForDate: 'No orders match selected filters.',

    orderValue: 'Order Value',
    amountAlreadyPaid: 'Already Paid',
    remainingOrderValue: 'Remaining Order Value',
    customerTotal: 'Customer Total',
    deliveryRevenue: 'Delivery Revenue',
    companyShare: 'Company Share',
    driverShareLabel: 'Driver Share',
    handIn: 'Hand-In',
    collection: 'Collection',
    settled: 'Settled',
    unpaid: 'Unpaid',

    saveMerchant: 'Save Store Details',
    saveCustomer: 'Add Customer',
    editCustomer: 'Edit Customer',
    saveBtn: 'Save',
    deleteBtn: 'Delete',
    editBtn: 'Edit',
    editNoteBtn: 'Edit Note',

    settingsTitle: 'System Settings',
    editAmount: 'Edit Order Value',
    saveAmount: 'Save',

    confirmDbUpdateTitle: '⚠️ Confirm Database Update',
    confirmDbUpdateMsg:
      'New details found that fill in missing customer/store entries. Update database records?',

    confirmDeleteMsg: 'Are you sure you want to permanently delete this order?',

    typoAlertTitle: '🔍 Unrecognized words detected:',
    historyTitle: '📜 Audit Log & Order Edits History',
    noHistory: 'No edit history recorded yet.',

    created: 'Order Created',
    statusChange: 'Status Change',
    driverReassigned: 'Driver Reassigned',
    amountEdited: 'Order Value Edited',
    notesEdited: 'Notes Edited',
    paymentEdited: 'Payment Method Edited',
    deliveryFeeEdited: 'Delivery Fee Edited',
    revenueEdited: 'Revenue Share Edited',
    deleted: 'Order Deleted',

    orderBreakdown: '💰 Financial Breakdown',
    cashToCollect: 'Customer Collection',
    cashToHand: 'Company Hand-In',
    driverKeeps: 'Driver Keeps',
    youEarn: 'You Earn',

    noOrders: 'No orders.',
    percent: '%'
  }
};

const REVENUE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 90, 100];

const PAYMENT_METHODS = {
  CASH: 'cash',
  ONLINE: 'online',
  PREPAID: 'prepaid'
};

const STATUS = {
  CONFIRMED: 'مؤكد',
  PROCESSING: 'قيد تجهيز الطلب',
  OUT_FOR_DELIVERY: 'خرج للتوصيل',
  IN_TRANSIT: 'جاري التوصيل',
  COMPLETED: 'مكتمل',
  DELAYED: 'متأخر',
  CANCELLED: 'ملغي'
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
    () => parseInt(localStorage.getItem('order_counter_num') || '1001', 10)
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

  /*
   * Driver assignment now has its own revenue percentage.
   *
   * Example:
   * Order value = 1000
   * Delivery fee = 60
   * Company share = 20%
   *
   * Company revenue = 12
   * Driver share = 48
   */
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedRevenueShare, setSelectedRevenueShare] = useState(20);

  const [newDriverName, setNewDriverName] = useState('');

  const [ledgerDriver, setLedgerDriver] = useState('');
  const [ledgerDate, setLedgerDate] = useState(
    () => new Date().toISOString().split('T')[0]
  );

  const [typoFlags, setTypoFlags] = useState([]);
  const [showTypoModal, setShowTypoModal] = useState(false);

  const [editingAmountId, setEditingAmountId] = useState(null);
  const [tempAmount, setTempAmount] = useState('');

  const [editingFeeId, setEditingFeeId] = useState(null);
  const [tempFee, setTempFee] = useState('');

  const [editingRevenueId, setEditingRevenueId] = useState(null);
  const [tempRevenue, setTempRevenue] = useState('');

  const [editingPaymentId, setEditingPaymentId] = useState(null);

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
    localStorage.setItem('delivery_merchants_v5', JSON.stringify(merchants));
  }, [merchants]);

  useEffect(() => {
    localStorage.setItem('delivery_customers_v5', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('delivery_drivers_v5', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('delivery_history_v5', JSON.stringify(historyLogs));
  }, [historyLogs]);

  /*
   * ---------------------------------------------------------
   * FINANCIAL ENGINE
   * ---------------------------------------------------------
   *
   * The important rule:
   *
   * order.cod = actual VALUE OF GOODS/ORDER
   * order.deliveryFee = DELIVERY FEE
   *
   * Neither of those is automatically "company revenue".
   *
   * Company revenue comes from:
   *
   * deliveryFee * revenueShare / 100
   *
   * Driver share comes from:
   *
   * deliveryFee - companyRevenue
   *
   * If the order was already paid online/prepaid:
   *
   * remainingOrderValue = 0
   *
   * Otherwise:
   *
   * remainingOrderValue = order.cod
   *
   * Customer collection:
   *
   * remainingOrderValue + deliveryFee
   *
   * Company hand-in:
   *
   * remainingOrderValue + companyRevenue
   *
   * Driver keeps:
   *
   * driverShare
   */

  const getOrderValue = order => {
    return Math.max(0, parseFloat(order.cod) || 0);
  };

  const getDeliveryFee = order => {
    return Math.max(0, parseFloat(order.deliveryFee) || 0);
  };

  const getRevenueShare = order => {
    const value = parseFloat(order.revenueShare);

    if (Number.isFinite(value)) {
      return Math.min(100, Math.max(0, value));
    }

    return 20;
  };

  const isPaymentSettled = order => {
    return (
      order.paymentMethod === PAYMENT_METHODS.ONLINE ||
      order.paymentMethod === PAYMENT_METHODS.PREPAID ||
      order.paymentSettled === true
    );
  };

  const getRemainingOrderValue = order => {
    if (order.status === STATUS.CANCELLED) return 0;

    if (isPaymentSettled(order)) return 0;

    return getOrderValue(order);
  };

  const getCompanyRevenue = order => {
    if (order.status === STATUS.CANCELLED) return 0;

    const fee = getDeliveryFee(order);
    const percentage = getRevenueShare(order);

    return fee * (percentage / 100);
  };

  const getDriverShare = order => {
    if (order.status === STATUS.CANCELLED) return 0;

    const fee = getDeliveryFee(order);

    return Math.max(0, fee - getCompanyRevenue(order));
  };

  /*
   * This is the amount the driver actually collects from the customer.
   *
   * Cash:
   * 1000 order + 60 delivery = 1060
   *
   * Online:
   * 0 remaining order + 60 delivery = 60
   */
  const getDriverCustomerCollection = order => {
    if (order.status === STATUS.CANCELLED) return 0;

    return getRemainingOrderValue(order) + getDeliveryFee(order);
  };

  /*
   * This is what the driver gives back to the company.
   *
   * Cash order:
   * 1000 order + 12 company revenue = 1012
   *
   * Online:
   * 0 order + 12 company revenue = 12
   */
  const getOrderEffectiveCash = order => {
    if (order.status === STATUS.CANCELLED) return 0;

    return getRemainingOrderValue(order) + getCompanyRevenue(order);
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

  const formatMoney = amount => {
    return `${Number(amount || 0).toLocaleString()} ${t.currency}`;
  };

  const paymentLabel = method => {
    if (method === PAYMENT_METHODS.ONLINE) return t.paymentOnline;
    if (method === PAYMENT_METHODS.PREPAID) return t.paymentPrepaid;
    return t.paymentCash;
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch (err) {
      alert(
        lang === 'ar'
          ? 'تعذر الوصول إلى الحافظة.'
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
      'ش ',
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
You are an expert Egyptian delivery-order parser.

Your job is to extract structured logistics information from messy Egyptian Arabic,
Egyptian Arabic slang, English, mixed Arabic/English, typos, conversational messages,
multiple orders, corrections, cancellations, and price changes.

STRICT RULES:

1. Return ONLY valid JSON.
2. Never add markdown.
3. Never add explanations outside the JSON.
4. Extract multiple customers/orders separately when applicable.
5. Pay extremely close attention to corrections later in the conversation.
6. If an item is cancelled later, remove it from the final item list and final order value.
7. If a previous price is replaced by a later price, use ONLY the final agreed value.
8. "cod" means the VALUE OF THE GOODS/ORDER, NOT the delivery fee.
9. "delivery_fee" means the delivery charge paid for delivery.
10. Detect whether the order was paid online/prepaid/already settled.
11. If the goods/order value has already been paid online, set:
    payment_method = "online"
    payment_settled = true
12. If it is explicitly prepaid, set:
    payment_method = "prepaid"
    payment_settled = true
13. Otherwise use:
    payment_method = "cash"
    payment_settled = false
14. Delivery fee must be extracted separately whenever possible.
15. Do NOT add delivery fee to "cod".
16. If the customer says "1000 شامل التوصيل 60", infer the order value and fee carefully
    from the context. If unclear, preserve the safest interpretation.
17. Store must include branch where mentioned.
18. Notes must include:
    - call before arrival
    - delivery timing
    - special instructions
    - delivery fee wording
    - payment clarification
19. Standard Egyptian words such as:
    "مقاضي", "كيسين", "شقة", "عمارة", "ساقعة", "شغال"
    are NOT typos.
20. ambiguous_flags should contain ONLY genuinely ambiguous/unintelligible words.

JSON:

{
  "ambiguous_flags": [],
  "orders": [
    {
      "store": "",
      "customer": "",
      "phone": "",
      "address": "",
      "cod": 0,
      "delivery_fee": 0,
      "payment_method": "cash",
      "payment_settled": false,
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
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: rawText
              }
            ],
            response_format: {
              type: 'json_object'
            },
            temperature: 0.1
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || 'Extraction Failed'
        );
      }

      const parsed = JSON.parse(
        data.choices[0].message.content
      );

      if (
        parsed.ambiguous_flags &&
        parsed.ambiguous_flags.length > 0
      ) {
        setTypoFlags(parsed.ambiguous_flags);
        setShowTypoModal(true);
      }

      const normalizedOrders = (parsed.orders || []).map(order => ({
        ...order,
        cod: Number(order.cod) || 0,
        delivery_fee:
          Number(order.delivery_fee) || 0,
        payment_method:
          order.payment_method || PAYMENT_METHODS.CASH,
        payment_settled:
          Boolean(order.payment_settled)
      }));

      setExtractedOrders(normalizedOrders);
    } catch (err) {
      alert(
        (lang === 'ar'
          ? 'خطأ أثناء تحليل الطلب: '
          : 'Error parsing order: ') + err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const buildFinancialData = order => {
    const normalized = {
      ...order,
      cod: Number(order.cod) || 0,
      deliveryFee: Number(order.deliveryFee) || 0,
      revenueShare: Number(order.revenueShare) || 20,
      paymentMethod:
        order.paymentMethod || PAYMENT_METHODS.CASH,
      paymentSettled:
        order.paymentSettled ||
        order.paymentMethod === PAYMENT_METHODS.ONLINE ||
        order.paymentMethod === PAYMENT_METHODS.PREPAID
    };

    return {
      ...normalized,
      remainingOrderValue:
        getRemainingOrderValue(normalized),
      companyRevenue:
        getCompanyRevenue(normalized),
      driverShare:
        getDriverShare(normalized),
      driverCustomerCollection:
        getDriverCustomerCollection(normalized)
    };
  };

  const handleConfirmOrder = () => {
    if (extractedOrders.length === 0) return;

    let currentNum = orderCounter;

    const now = new Date();
    const isoDateStr = now.toISOString().split('T')[0];

    const newCreatedOrders = extractedOrders.map(ord => {
      const orderNumber = `#${currentNum++}`;

      const baseOrder = {
        id: Date.now() + Math.random(),

        orderNum: orderNumber,

        store: ord.store || t.unspecified,
        customer: ord.customer || t.unspecified,
        phone: ord.phone || '',
        address: ord.address || '',
        cod: Number(ord.cod) || 0,
        deliveryFee: Number(ord.delivery_fee) || 0,
        item: ord.item || '',
        notes: ord.notes || '',

        paymentMethod:
          ord.payment_method || PAYMENT_METHODS.CASH,

        paymentSettled:
          Boolean(ord.payment_settled) ||
          ord.payment_method === PAYMENT_METHODS.ONLINE ||
          ord.payment_method === PAYMENT_METHODS.PREPAID,

        driver: selectedDriver || t.unspecified,

        /*
         * The selected percentage is the COMPANY'S percentage
         * of the DELIVERY FEE.
         */
        revenueShare: selectedRevenueShare,

        status: STATUS.CONFIRMED,

        isoDate: isoDateStr,

        date: now.toLocaleTimeString(
          lang === 'ar' ? 'ar-EG' : 'en-US',
          {
            hour: '2-digit',
            minute: '2-digit'
          }
        )
      };

      const financial = buildFinancialData(baseOrder);

      addAuditLog(
        orderNumber,
        t.created,
        lang === 'ar'
          ? `تم إنشاء الطلب بقيمة ${formatMoney(
              baseOrder.cod
            )} ورسوم توصيل ${formatMoney(
              baseOrder.deliveryFee
            )}. نسبة الشركة ${selectedRevenueShare}%. طريقة الدفع: ${paymentLabel(
              baseOrder.paymentMethod
            )}.`
          : `Created order value ${formatMoney(
              baseOrder.cod
            )}, delivery fee ${formatMoney(
              baseOrder.deliveryFee
            )}. Company share ${selectedRevenueShare}%. Payment: ${paymentLabel(
              baseOrder.paymentMethod
            )}.`
      );

      return {
        ...baseOrder,
        ...financial
      };
    });

    setOrderCounter(currentNum);

    setOrders(prev => [
      ...newCreatedOrders,
      ...prev
    ]);

    extractedOrders.forEach(ord => {
      if (
        ord.store &&
        ord.store !== t.unspecified
      ) {
        setMerchants(prev => {
          const match = prev.find(
            m =>
              m.name?.toLowerCase() ===
              ord.store.toLowerCase()
          );

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
            m.name?.toLowerCase() ===
            ord.store.toLowerCase()
              ? {
                  ...m,
                  totalOrders:
                    (m.totalOrders || 0) + 1
                }
              : m
          );
        });
      }

      if (
        ord.customer &&
        ord.customer !== t.unspecified
      ) {
        setCustomers(prev => {
          const match = prev.find(
            c =>
              c.phone === ord.phone ||
              c.name === ord.customer
          );

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
            c.name === ord.customer ||
            c.phone === ord.phone
              ? {
                  ...c,
                  address:
                    ord.address || c.address
                }
              : c
          );
        });
      }
    });

    setRawText('');
    setExtractedOrders([]);
    setSelectedDriver('');
    setSelectedRevenueShare(20);
    setActiveTab('orders');
  };

  const handleDeleteOrder = order => {
    if (
      window.confirm(
        `${t.confirmDeleteMsg} (${order.orderNum})`
      )
    ) {
      setOrders(prev =>
        prev.filter(o => o.id !== order.id)
      );

      addAuditLog(
        order.orderNum,
        t.deleted,
        lang === 'ar'
          ? `تم حذف الطلب الخاص بـ ${order.customer}.`
          : `Order for ${order.customer} deleted.`
      );
    }
  };

  const handleStatusChange = (order, newStatus) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? {
              ...o,
              status: newStatus
            }
          : o
      )
    );

    addAuditLog(
      order.orderNum,
      t.statusChange,
      lang === 'ar'
        ? `تم تغيير الحالة من "${order.status}" إلى "${newStatus}".`
        : `Status changed from "${order.status}" to "${newStatus}".`
    );
  };

  const handleDriverReassign = (order, newDriver) => {
    const oldDriver = order.driver;

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? {
              ...o,
              driver: newDriver
            }
          : o
      )
    );

    addAuditLog(
      order.orderNum,
      t.driverReassigned,
      lang === 'ar'
        ? `تم تغيير الطيار من "${oldDriver}" إلى "${newDriver}".`
        : `Driver changed from "${oldDriver}" to "${newDriver}".`
    );
  };

  const handleAmountSave = order => {
    const oldAmount = getOrderValue(order);
    const newAmount = Number(tempAmount) || 0;

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? buildFinancialData({
              ...o,
              cod: newAmount
            })
          : o
      )
    );

    addAuditLog(
      order.orderNum,
      t.amountEdited,
      lang === 'ar'
        ? `تم تعديل قيمة الطلب من ${formatMoney(
            oldAmount
          )} إلى ${formatMoney(newAmount)}.`
        : `Order value changed from ${formatMoney(
            oldAmount
          )} to ${formatMoney(newAmount)}.`
    );

    setEditingAmountId(null);
  };

  const handleDeliveryFeeSave = order => {
    const oldFee = getDeliveryFee(order);
    const newFee = Number(tempFee) || 0;

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? buildFinancialData({
              ...o,
              deliveryFee: newFee
            })
          : o
      )
    );

    addAuditLog(
      order.orderNum,
      t.deliveryFeeEdited,
      lang === 'ar'
        ? `تم تعديل رسوم التوصيل من ${formatMoney(
            oldFee
          )} إلى ${formatMoney(newFee)}.`
        : `Delivery fee changed from ${formatMoney(
            oldFee
          )} to ${formatMoney(newFee)}.`
    );

    setEditingFeeId(null);
  };

  const handleRevenueSave = order => {
    const oldRevenue = getRevenueShare(order);
    const newRevenue = Number(tempRevenue);

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? buildFinancialData({
              ...o,
              revenueShare: newRevenue
            })
          : o
      )
    );

    addAuditLog(
      order.orderNum,
      t.revenueEdited,
      lang === 'ar'
        ? `تم تغيير نسبة إيراد الشركة من ${oldRevenue}% إلى ${newRevenue}%.`
        : `Company revenue share changed from ${oldRevenue}% to ${newRevenue}%.`
    );

    setEditingRevenueId(null);
  };

  const handlePaymentChange = (order, method) => {
    const settled =
      method === PAYMENT_METHODS.ONLINE ||
      method === PAYMENT_METHODS.PREPAID;

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? buildFinancialData({
              ...o,
              paymentMethod: method,
              paymentSettled: settled
            })
          : o
      )
    );

    addAuditLog(
      order.orderNum,
      t.paymentEdited,
      lang === 'ar'
        ? `تم تغيير طريقة الدفع إلى "${paymentLabel(
            method
          )}". ${settled ? 'قيمة الطلب مسددة بالفعل.' : 'قيمة الطلب غير مسددة.'}`
        : `Payment method changed to "${paymentLabel(
            method
          )}". ${settled ? 'Order value is already settled.' : 'Order value is unpaid.'}`
    );

    setEditingPaymentId(null);
  };

  const handleNoteSave = order => {
    const oldNote = order.notes;

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? {
              ...o,
              notes: tempNote
            }
          : o
      )
    );

    addAuditLog(
      order.orderNum,
      t.notesEdited,
      lang === 'ar'
        ? `تم تعديل الملاحظات من "${oldNote || ''}" إلى "${tempNote}".`
        : `Notes updated from "${oldNote || ''}" to "${tempNote}".`
    );

    setEditingNoteId(null);
  };

  const handleSaveCustomerExplicit = () => {
    if (
      !newCustomer.name.trim() ||
      !newCustomer.phone.trim()
    ) {
      return alert(
        lang === 'ar'
          ? 'الاسم ورقم الهاتف مطلوبان.'
          : 'Name and phone required.'
      );
    }

    const match = customers.find(
      c => c.id === editingCustomer?.id
    );

    const fillsMissing =
      match &&
      !match.address &&
      newCustomer.address;

    if (fillsMissing) {
      const confirmOk = window.confirm(
        `${t.confirmDbUpdateTitle}\n\n${t.confirmDbUpdateMsg}`
      );

      if (!confirmOk) return;
    }

    if (editingCustomer) {
      setCustomers(prev =>
        prev.map(c =>
          c.id === editingCustomer.id
            ? {
                ...c,
                ...newCustomer
              }
            : c
        )
      );

      setEditingCustomer(null);
    } else {
      setCustomers(prev => [
        {
          id: Date.now(),
          ...newCustomer
        },
        ...prev
      ]);
    }

    setNewCustomer({
      name: '',
      phone: '',
      address: ''
    });
  };

  const totalCollected = orders
    .filter(o => o.status === STATUS.COMPLETED)
    .reduce(
      (sum, o) =>
        sum + getDriverCustomerCollection(o),
      0
    );

  const totalCompanyRevenue = orders
    .filter(o => o.status === STATUS.COMPLETED)
    .reduce(
      (sum, o) => sum + getCompanyRevenue(o),
      0
    );

  const totalDriverShares = orders
    .filter(o => o.status === STATUS.COMPLETED)
    .reduce(
      (sum, o) => sum + getDriverShare(o),
      0
    );

  const activeOrdersCount = orders.filter(
    o =>
      ![
        STATUS.COMPLETED,
        STATUS.CANCELLED
      ].includes(o.status)
  ).length;

  const completedOrdersCount = orders.filter(
    o => o.status === STATUS.COMPLETED
  ).length;

  const filteredOrders = orders.filter(o => {
    const query = searchQuery.toLowerCase();

    return (
      (o.orderNum || '')
        .toLowerCase()
        .includes(query) ||
      (o.customer || '')
        .toLowerCase()
        .includes(query) ||
      (o.store || '')
        .toLowerCase()
        .includes(query) ||
      (o.phone || '')
        .includes(searchQuery)
    );
  });

  const selectedYearMonth = ledgerDate.substring(
    0,
    7
  );

  const filteredLedgerOrders = orders.filter(o => {
    const matchDriver =
      !ledgerDriver ||
      o.driver === ledgerDriver;

    const matchDate =
      o.isoDate === ledgerDate;

    return matchDriver && matchDate;
  });

  const dailyCashToHandIn =
    filteredLedgerOrders
      .filter(o => o.status === STATUS.COMPLETED)
      .reduce(
        (sum, o) =>
          sum + getOrderEffectiveCash(o),
        0
      );

  const dailyCompanyRevenue =
    filteredLedgerOrders
      .filter(o => o.status === STATUS.COMPLETED)
      .reduce(
        (sum, o) =>
          sum + getCompanyRevenue(o),
        0
      );

  const dailyDriverShare =
    filteredLedgerOrders
      .filter(o => o.status === STATUS.COMPLETED)
      .reduce(
        (sum, o) =>
          sum + getDriverShare(o),
        0
      );

  const monthlyOrders = orders.filter(o => {
    const matchDriver =
      !ledgerDriver ||
      o.driver === ledgerDriver;

    const matchMonth =
      (o.isoDate || '').startsWith(
        selectedYearMonth
      );

    return matchDriver && matchMonth;
  });

  const monthlyTotalCash =
    monthlyOrders
      .filter(o => o.status === STATUS.COMPLETED)
      .reduce(
        (sum, o) =>
          sum + getOrderEffectiveCash(o),
        0
      );

  const monthlyCompanyRevenue =
    monthlyOrders
      .filter(o => o.status === STATUS.COMPLETED)
      .reduce(
        (sum, o) =>
          sum + getCompanyRevenue(o),
        0
      );

  const monthlyDriverShare =
    monthlyOrders
      .filter(o => o.status === STATUS.COMPLETED)
      .reduce(
        (sum, o) =>
          sum + getDriverShare(o),
        0
      );

  const selectedPreviewOrder = useMemo(() => {
    if (!extractedOrders.length) return null;

    const order = extractedOrders[0];

    return buildFinancialData({
      ...order,
      deliveryFee:
        Number(order.delivery_fee) || 0,
      revenueShare:
        selectedRevenueShare,
      paymentMethod:
        order.payment_method ||
        PAYMENT_METHODS.CASH,
      paymentSettled:
        Boolean(order.payment_settled) ||
        order.payment_method ===
          PAYMENT_METHODS.ONLINE ||
        order.payment_method ===
          PAYMENT_METHODS.PREPAID
    });
  }, [
    extractedOrders,
    selectedRevenueShare
  ]);

  return (
    <div
      style={{
        ...styles.container,
        direction:
          lang === 'ar' ? 'rtl' : 'ltr'
      }}
    >
      {/* HEADER */}

      <header style={styles.header}>
        <div>
          <h1 style={styles.appTitle}>
            {t.appTitle}
          </h1>

          <p style={styles.appSubtitle}>
            {t.appSubtitle}
          </p>
        </div>

        <div style={styles.headerRight}>
          <button
            style={styles.langBtn}
            onClick={() =>
              setLang(
                lang === 'ar'
                  ? 'en'
                  : 'ar'
              )
            }
          >
            {lang === 'ar'
              ? '🌐 English'
              : '🌐 العربية'}
          </button>

          <div
            style={{
              ...styles.badge,
              background: apiKey
                ? 'linear-gradient(135deg,#059669,#10b981)'
                : 'linear-gradient(135deg,#dc2626,#ef4444)'
            }}
          >
            {apiKey
              ? t.groqConnected
              : t.groqMissing}
          </div>
        </div>
      </header>

      {/* KPI */}

      <div style={styles.kpiRow}>
        <div
          style={{
            ...styles.kpiCard,
            background:
              'linear-gradient(135deg,#0f172a,#312e81,#4f46e5)'
          }}
        >
          <span style={styles.kpiLabel}>
            {t.kpiTotalCod}
          </span>

          <span
            style={{
              ...styles.kpiValue,
              color: '#67e8f9'
            }}
          >
            {formatMoney(totalCollected)}
          </span>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            background:
              'linear-gradient(135deg,#064e3b,#059669,#10b981)'
          }}
        >
          <span style={styles.kpiLabel}>
            {t.kpiActiveOrders}
          </span>

          <span
            style={{
              ...styles.kpiValue,
              color: '#6ee7b7'
            }}
          >
            {activeOrdersCount}
          </span>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            background:
              'linear-gradient(135deg,#701a75,#a21caf,#ec4899)'
          }}
        >
          <span style={styles.kpiLabel}>
            {t.kpiCompleted}
          </span>

          <span
            style={{
              ...styles.kpiValue,
              color: '#f9a8d4'
            }}
          >
            {completedOrdersCount}
          </span>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            background:
              'linear-gradient(135deg,#0c4a6e,#0284c7,#38bdf8)'
          }}
        >
          <span style={styles.kpiLabel}>
            {t.kpiRevenue}
          </span>

          <span
            style={{
              ...styles.kpiValue,
              color: '#bae6fd'
            }}
          >
            {formatMoney(totalCompanyRevenue)}
          </span>
        </div>
      </div>

      {/* NAV */}

      <nav style={styles.nav}>
        <button
          style={
            activeTab === 'new_order'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab('new_order')
          }
        >
          {t.navNewOrder}
        </button>

        <button
          style={
            activeTab === 'orders'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab('orders')
          }
        >
          {t.navOrders} ({orders.length})
        </button>

        <button
          style={
            activeTab === 'driver_ledger'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab('driver_ledger')
          }
        >
          {t.navDriverLedger}
        </button>

        <button
          style={
            activeTab === 'drivers'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab('drivers')
          }
        >
          {t.navDrivers} ({drivers.length})
        </button>

        <button
          style={
            activeTab === 'merchants'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab('merchants')
          }
        >
          {t.navMerchants} ({merchants.length})
        </button>

        <button
          style={
            activeTab === 'customers'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab('customers')
          }
        >
          {t.navCustomers} ({customers.length})
        </button>

        <button
          style={
            activeTab === 'history'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab('history')
          }
        >
          {t.navHistory}
        </button>

        <button
          style={
            activeTab === 'settings'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab('settings')
          }
        >
          {t.navSettings}
        </button>
      </nav>

      <main style={styles.main}>

        {/* NEW ORDER */}

        {activeTab === 'new_order' && (
          <div style={styles.card}>
            <div style={styles.rowBetween}>
              <h2 style={styles.cardTitle}>
                {t.aiHeader}
              </h2>

              <button
                onClick={handlePasteClipboard}
                style={styles.btnGradientCompact}
              >
                {t.btnPaste}
              </button>
            </div>

            <textarea
              rows={7}
              value={rawText}
              onChange={e =>
                setRawText(e.target.value)
              }
              placeholder={t.placeholderOrder}
              style={styles.textarea}
            />

            <button
              onClick={extractOrderInfo}
              disabled={loading}
              style={{
                ...styles.btnPrimaryGradient,
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading
                ? t.btnExtracting
                : t.btnExtract}
            </button>

            {showTypoModal && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalCard}>
                  <h3
                    style={{
                      margin:
                        '0 0 10px 0',
                      color: '#facc15'
                    }}
                  >
                    {t.typoAlertTitle}
                  </h3>

                  <ul
                    style={{
                      paddingLeft: '20px',
                      color: '#fca5a5'
                    }}
                  >
                    {typoFlags.map(
                      (flag, idx) => (
                        <li key={idx}>
                          <strong>
                            {flag}
                          </strong>
                        </li>
                      )
                    )}
                  </ul>

                  <button
                    onClick={() =>
                      setShowTypoModal(
                        false
                      )
                    }
                    style={
                      styles.btnSuccessGradient
                    }
                  >
                    OK, Continue
                  </button>
                </div>
              </div>
            )}

            {extractedOrders.length >
              0 && (
              <div
                style={
                  styles.extractedBox
                }
              >
                <h3
                  style={{
                    marginTop: 0,
                    color: '#facc15'
                  }}
                >
                  {t.reviewTitle}
                </h3>

                {extractedOrders.map(
                  (ord, idx) => {
                    const preview =
                      buildFinancialData({
                        ...ord,
                        deliveryFee:
                          Number(
                            ord.delivery_fee
                          ) || 0,
                        revenueShare:
                          selectedRevenueShare,
                        paymentMethod:
                          ord.payment_method ||
                          PAYMENT_METHODS.CASH,
                        paymentSettled:
                          Boolean(
                            ord.payment_settled
                          ) ||
                          ord.payment_method ===
                            PAYMENT_METHODS.ONLINE ||
                          ord.payment_method ===
                            PAYMENT_METHODS.PREPAID
                      });

                    return (
                      <div
                        key={idx}
                        style={
                          styles.extractedSubCard
                        }
                      >
                        <div
                          style={
                            styles.orderHero
                          }
                        >
                          <div>
                            <div
                              style={
                                styles.orderHeroTitle
                              }
                            >
                              📦{' '}
                              {ord.customer ||
                                t.unspecified}
                            </div>

                            <div
                              style={
                                styles.orderHeroSub
                              }
                            >
                              {ord.store ||
                                t.unspecified}
                            </div>
                          </div>

                          <div
                            style={
                              styles.moneyPill
                            }
                          >
                            {formatMoney(
                              preview.cod
                            )}
                          </div>
                        </div>

                        {isIncompleteAddress(
                          ord.address
                        ) && (
                          <div
                            style={
                              styles.addressWarningBox
                            }
                          >
                            {t.addressWarning}
                          </div>
                        )}

                        <div
                          style={
                            styles.grid2
                          }
                        >
                          <div>
                            <strong>
                              {t.store}:
                            </strong>{' '}
                            {ord.store ||
                              t.unspecified}
                          </div>

                          <div>
                            <strong>
                              {t.customer}:
                            </strong>{' '}
                            {ord.customer ||
                              t.unspecified}
                          </div>

                          <div>
                            <strong>
                              {t.phone}:
                            </strong>{' '}
                            {ord.phone ||
                              t.unspecified}
                          </div>

                          <div>
                            <strong>
                              {t.cod}:
                            </strong>{' '}
                            {formatMoney(
                              preview.cod
                            )}
                          </div>

                          <div>
                            <strong>
                              {t.deliveryFee}:
                            </strong>{' '}
                            {formatMoney(
                              preview.deliveryFee
                            )}
                          </div>

                          <div>
                            <strong>
                              {t.paymentMethod}:
                            </strong>{' '}
                            <span
                              style={
                                styles.paymentBadge
                              }
                            >
                              {paymentLabel(
                                preview.paymentMethod
                              )}
                            </span>
                          </div>

                          <div
                            style={{
                              gridColumn:
                                '1 / -1'
                            }}
                          >
                            <strong>
                              {t.address}:
                            </strong>{' '}
                            {ord.address ||
                              t.unspecified}
                          </div>

                          <div
                            style={{
                              gridColumn:
                                '1 / -1'
                            }}
                          >
                            <strong>
                              {t.item}:
                            </strong>{' '}
                            {ord.item ||
                              t.unspecified}
                          </div>

                          {ord.notes && (
                            <div
                              style={{
                                gridColumn:
                                  '1 / -1',
                                color:
                                  '#facc15'
                              }}
                            >
                              <strong>
                                📌 {t.notes}:
                              </strong>{' '}
                              {ord.notes}
                            </div>
                          )}
                        </div>

                        {/* FINANCIAL PREVIEW */}

                        <div
                          style={
                            styles.financialPanel
                          }
                        >
                          <div
                            style={
                              styles.sectionTitle
                            }
                          >
                            {t.orderBreakdown}
                          </div>

                          <div
                            style={
                              styles.financeGrid
                            }
                          >
                            <FinanceMetric
                              label={
                                t.orderValue
                              }
                              value={formatMoney(
                                preview.cod
                              )}
                            />

                            <FinanceMetric
                              label={
                                t.deliveryFee
                              }
                              value={formatMoney(
                                preview.deliveryFee
                              )}
                            />

                            <FinanceMetric
                              label={
                                t.remainingOrderValue
                              }
                              value={formatMoney(
                                preview.remainingOrderValue
                              )}
                            />

                            <FinanceMetric
                              label={
                                t.customerTotal
                              }
                              value={formatMoney(
                                preview.driverCustomerCollection
                              )}
                              highlight
                            />

                            <FinanceMetric
                              label={
                                `${t.companyShare} (${selectedRevenueShare}%)`
                              }
                              value={formatMoney(
                                preview.companyRevenue
                              )}
                              positive
                            />

                            <FinanceMetric
                              label={
                                t.driverShareLabel
                              }
                              value={formatMoney(
                                preview.driverShare
                              )}
                              accent
                            />

                            <FinanceMetric
                              label={
                                t.companyHandIn
                              }
                              value={formatMoney(
                                preview.remainingOrderValue +
                                  preview.companyRevenue
                              )}
                              highlight
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}

                {/* DRIVER ASSIGNMENT */}

                <div
                  style={
                    styles.assignmentPanel
                  }
                >
                  <div
                    style={
                      styles.assignmentTitle
                    }
                  >
                    🛵 {t.selectDriver}
                  </div>

                  <div
                    style={
                      styles.grid2
                    }
                  >
                    <div>
                      <label
                        style={
                          styles.label
                        }
                      >
                        {t.selectDriver}
                      </label>

                      <select
                        value={
                          selectedDriver
                        }
                        onChange={e =>
                          setSelectedDriver(
                            e.target.value
                          )
                        }
                        style={
                          styles.input
                        }
                      >
                        <option value="">
                          {
                            t.chooseDriver
                          }
                        </option>

                        {drivers.map(
                          (
                            d,
                            i
                          ) => (
                            <option
                              key={i}
                              value={d}
                            >
                              {d}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label
                        style={
                          styles.label
                        }
                      >
                        {t.revenueShare}
                      </label>

                      <select
                        value={
                          selectedRevenueShare
                        }
                        onChange={e =>
                          setSelectedRevenueShare(
                            Number(
                              e.target.value
                            )
                          )
                        }
                        style={
                          styles.input
                        }
                      >
                        {REVENUE_OPTIONS.map(
                          percentage => (
                            <option
                              key={
                                percentage
                              }
                              value={
                                percentage
                              }
                            >
                              {percentage}%
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  {selectedPreviewOrder && (
                    <div
                      style={
                        styles.assignmentSummary
                      }
                    >
                      <div>
                        <span>
                          🏪{' '}
                          {t.orderValue}
                        </span>

                        <strong>
                          {formatMoney(
                            selectedPreviewOrder.cod
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          🚚{' '}
                          {t.deliveryFee}
                        </span>

                        <strong>
                          {formatMoney(
                            selectedPreviewOrder.deliveryFee
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          📈{' '}
                          {t.youEarn}
                        </span>

                        <strong
                          style={{
                            color:
                              '#34d399'
                          }}
                        >
                          {formatMoney(
                            selectedPreviewOrder.companyRevenue
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          🛵{' '}
                          {t.driverKeeps}
                        </span>

                        <strong
                          style={{
                            color:
                              '#60a5fa'
                          }}
                        >
                          {formatMoney(
                            selectedPreviewOrder.driverShare
                          )}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={
                    handleConfirmOrder
                  }
                  style={
                    styles.btnSuccessGradient
                  }
                >
                  {t.btnConfirm}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ORDERS */}

        {activeTab === 'orders' && (
          <div>
            <input
              type="text"
              placeholder={
                t.searchPlaceholder
              }
              value={searchQuery}
              onChange={e =>
                setSearchQuery(
                  e.target.value
                )
              }
              style={
                styles.searchInput
              }
            />

            {filteredOrders.length ===
            0 ? (
              <p style={styles.empty}>
                {t.noOrders}
              </p>
            ) : (
              filteredOrders.map(
                order => {
                  const remaining =
                    getRemainingOrderValue(
                      order
                    );

                  const fee =
                    getDeliveryFee(
                      order
                    );

                  const companyRevenue =
                    getCompanyRevenue(
                      order
                    );

                  const driverShare =
                    getDriverShare(
                      order
                    );

                  const customerCollection =
                    getDriverCustomerCollection(
                      order
                    );

                  const handIn =
                    getOrderEffectiveCash(
                      order
                    );

                  return (
                    <div
                      key={order.id}
                      style={
                        styles.card
                      }
                    >
                      <div
                        style={
                          styles.rowBetween
                        }
                      >
                        <div
                          style={{
                            display:
                              'flex',
                            gap: '8px',
                            alignItems:
                              'center',
                            flexWrap:
                              'wrap'
                          }}
                        >
                          <span
                            style={
                              styles.orderNumTag
                            }
                          >
                            {
                              order.orderNum
                            }
                          </span>

                          <span
                            style={
                              styles.tagStore
                            }
                          >
                            {
                              order.store
                            }
                          </span>

                          <span
                            style={
                              styles.paymentBadge
                            }
                          >
                            {paymentLabel(
                              order.paymentMethod
                            )}
                          </span>
                        </div>

                        <div
                          style={{
                            display:
                              'flex',
                            gap: '8px',
                            alignItems:
                              'center'
                          }}
                        >
                          <select
                            value={
                              order.status
                            }
                            onChange={e =>
                              handleStatusChange(
                                order,
                                e.target
                                  .value
                              )
                            }
                            style={getStatusStyle(
                              order.status
                            )}
                          >
                            <option value="مؤكد">
                              {
                                t.statusConfirmed
                              }
                            </option>

                            <option value="قيد تجهيز الطلب">
                              {
                                t.statusProcessing
                              }
                            </option>

                            <option value="خرج للتوصيل">
                              {
                                t.statusOutForDelivery
                              }
                            </option>

                            <option value="جاري التوصيل">
                              {
                                t.statusInTransit
                              }
                            </option>

                            <option value="مكتمل">
                              {
                                t.statusCompleted
                              }
                            </option>

                            <option value="متأخر">
                              {
                                t.statusDelayed
                              }
                            </option>

                            <option value="ملغي">
                              {
                                t.statusCancelled
                              }
                            </option>
                          </select>

                          <button
                            onClick={() =>
                              handleDeleteOrder(
                                order
                              )
                            }
                            style={
                              styles.btnDeleteCompact
                            }
                          >
                            🗑️{' '}
                            {t.deleteBtn}
                          </button>
                        </div>
                      </div>

                      <p style={styles.p}>
                        <strong>
                          {t.customer}:
                        </strong>{' '}
                        {order.customer}{' '}
                        ({order.phone})
                      </p>

                      {isIncompleteAddress(
                        order.address
                      ) && (
                        <div
                          style={
                            styles.addressWarningBox
                          }
                        >
                          {
                            t.addressWarning
                          }
                        </div>
                      )}

                      <p style={styles.p}>
                        <strong>
                          {t.address}:
                        </strong>{' '}
                        {order.address}
                      </p>

                      {/* PAYMENT */}

                      <div
                        style={
                          styles.editPanel
                        }
                      >
                        <div>
                          <strong>
                            💳{' '}
                            {
                              t.paymentMethod
                            }
                            :
                          </strong>
                        </div>

                        {editingPaymentId ===
                        order.id ? (
                          <select
                            value={
                              order.paymentMethod ||
                              PAYMENT_METHODS.CASH
                            }
                            onChange={e =>
                              handlePaymentChange(
                                order,
                                e.target
                                  .value
                              )
                            }
                            style={
                              styles.inlineSelect
                            }
                          >
                            <option value="cash">
                              {
                                t.paymentCash
                              }
                            </option>

                            <option value="online">
                              {
                                t.paymentOnline
                              }
                            </option>

                            <option value="prepaid">
                              {
                                t.paymentPrepaid
                              }
                            </option>
                          </select>
                        ) : (
                          <div
                            style={{
                              display:
                                'flex',
                              gap: '8px',
                              alignItems:
                                'center'
                            }}
                          >
                            <span
                              style={
                                styles.paymentBadge
                              }
                            >
                              {paymentLabel(
                                order.paymentMethod
                              )}
                            </span>

                            <button
                              onClick={() =>
                                setEditingPaymentId(
                                  order.id
                                )
                              }
                              style={
                                styles.btnEditCompact
                              }
                            >
                              ✏️{' '}
                              {
                                t.editBtn
                              }
                            </button>
                          </div>
                        )}
                      </div>

                      {/* NOTES */}

                      <div
                        style={
                          styles.notePanel
                        }
                      >
                        {editingNoteId ===
                        order.id ? (
                          <div>
                            <textarea
                              rows={2}
                              value={
                                tempNote
                              }
                              onChange={e =>
                                setTempNote(
                                  e.target
                                    .value
                                )
                              }
                              style={
                                styles.textareaMargin
                              }
                            />

                            <button
                              onClick={() =>
                                handleNoteSave(
                                  order
                                )
                              }
                              style={
                                styles.btnSaveCompact
                              }
                            >
                              {
                                t.saveBtn
                              }
                            </button>
                          </div>
                        ) : (
                          <div
                            style={
                              styles.rowBetween
                            }
                          >
                            <span
                              style={{
                                color:
                                  '#facc15'
                              }}
                            >
                              <strong>
                                📌{' '}
                                {
                                  t.notes
                                }
                                :
                              </strong>{' '}
                              {order.notes ||
                                t.unspecified}
                            </span>

                            <button
                              onClick={() => {
                                setEditingNoteId(
                                  order.id
                                );

                                setTempNote(
                                  order.notes ||
                                    ''
                                );
                              }}
                              style={
                                styles.btnEditCompact
                              }
                            >
                              ✏️{' '}
                              {
                                t.editNoteBtn
                              }
                            </button>
                          </div>
                        )}
                      </div>

                      {/* FINANCIAL BREAKDOWN */}

                      <div
                        style={
                          styles.orderFinancialCard
                        }
                      >
                        <div
                          style={
                            styles.financialHeader
                          }
                        >
                          <span>
                            {t.orderBreakdown}
                          </span>

                          <span
                            style={
                              styles.bigRevenueBadge
                            }
                          >
                            {getRevenueShare(
                              order
                            )}
                            %
                          </span>
                        </div>

                        <div
                          style={
                            styles.financeGrid
                          }
                        >
                          <FinanceMetric
                            label={
                              t.orderValue
                            }
                            value={formatMoney(
                              getOrderValue(
                                order
                              )
                            )}
                          />

                          <FinanceMetric
                            label={
                              t.deliveryFee
                            }
                            value={formatMoney(
                              fee
                            )}
                          />

                          <FinanceMetric
                            label={
                              t.amountAlreadyPaid
                            }
                            value={
                              isPaymentSettled(
                                order
                              )
                                ? formatMoney(
                                    getOrderValue(
                                      order
                                    )
                                  )
                                : formatMoney(
                                    0
                                  )
                            }
                          />

                          <FinanceMetric
                            label={
                              t.remainingOrderValue
                            }
                            value={formatMoney(
                              remaining
                            )}
                          />

                          <FinanceMetric
                            label={
                              t.cashToCollect
                            }
                            value={formatMoney(
                              customerCollection
                            )}
                            highlight
                          />

                          <FinanceMetric
                            label={
                              `${t.companyShare} (${getRevenueShare(
                                order
                              )}%)`
                            }
                            value={formatMoney(
                              companyRevenue
                            )}
                            positive
                          />

                          <FinanceMetric
                            label={
                              t.driverShareLabel
                            }
                            value={formatMoney(
                              driverShare
                            )}
                            accent
                          />

                          <FinanceMetric
                            label={
                              t.cashToHand
                            }
                            value={formatMoney(
                              handIn
                            )}
                            highlight
                          />
                        </div>
                      </div>

                      {/* EDIT VALUES */}

                      <div
                        style={
                          styles.editGrid
                        }
                      >
                        <div>
                          <strong>
                            {t.cod}:{' '}
                          </strong>

                          {editingAmountId ===
                          order.id ? (
                            <span
                              style={{
                                display:
                                  'inline-flex',
                                gap: '5px'
                              }}
                            >
                              <input
                                type="number"
                                value={
                                  tempAmount
                                }
                                onChange={e =>
                                  setTempAmount(
                                    e.target
                                      .value
                                  )
                                }
                                style={
                                  styles.inlineInput
                                }
                              />

                              <button
                                onClick={() =>
                                  handleAmountSave(
                                    order
                                  )
                                }
                                style={
                                  styles.btnSaveCompact
                                }
                              >
                                {
                                  t.saveAmount
                                }
                              </button>
                            </span>
                          ) : (
                            <>
                              <strong
                                style={{
                                  color:
                                    '#67e8f9'
                                }}
                              >
                                {formatMoney(
                                  getOrderValue(
                                    order
                                  )
                                )}
                              </strong>

                              <button
                                onClick={() => {
                                  setEditingAmountId(
                                    order.id
                                  );

                                  setTempAmount(
                                    getOrderValue(
                                      order
                                    )
                                  );
                                }}
                                style={
                                  styles.btnEditCompact
                                }
                              >
                                ✏️
                              </button>
                            </>
                          )}
                        </div>

                        <div>
                          <strong>
                            {
                              t.deliveryFee
                            }:{' '}
                          </strong>

                          {editingFeeId ===
                          order.id ? (
                            <span
                              style={{
                                display:
                                  'inline-flex',
                                gap: '5px'
                              }}
                            >
                              <input
                                type="number"
                                value={
                                  tempFee
                                }
                                onChange={e =>
                                  setTempFee(
                                    e.target
                                      .value
                                  )
                                }
                                style={
                                  styles.inlineInput
                                }
                              />

                              <button
                                onClick={() =>
                                  handleDeliveryFeeSave(
                                    order
                                  )
                                }
                                style={
                                  styles.btnSaveCompact
                                }
                              >
                                {
                                  t.saveAmount
                                }
                              </button>
                            </span>
                          ) : (
                            <>
                              <strong
                                style={{
                                  color:
                                    '#a7f3d0'
                                }}
                              >
                                {formatMoney(
                                  fee
                                )}
                              </strong>

                              <button
                                onClick={() => {
                                  setEditingFeeId(
                                    order.id
                                  );

                                  setTempFee(
                                    fee
                                  );
                                }}
                                style={
                                  styles.btnEditCompact
                                }
                              >
                                ✏️
                              </button>
                            </>
                          )}
                        </div>

                        <div>
                          <strong>
                            {t.revenueShare}:{' '}
                          </strong>

                          {editingRevenueId ===
                          order.id ? (
                            <select
                              value={
                                tempRevenue
                              }
                              onChange={e =>
                                setTempRevenue(
                                  e.target.value
                                )
                              }
                              onBlur={() =>
                                handleRevenueSave(
                                  order
                                )
                              }
                              style={
                                styles.inlineSelect
                              }
                            >
                              {REVENUE_OPTIONS.map(
                                percentage => (
                                  <option
                                    key={
                                      percentage
                                    }
                                    value={
                                      percentage
                                    }
                                  >
                                    {
                                      percentage
                                    }
                                    %
                                  </option>
                                )
                              )}
                            </select>
                          ) : (
                            <>
                              <strong
                                style={{
                                  color:
                                    '#facc15'
                                }}
                              >
                                {getRevenueShare(
                                  order
                                )}
                                %
                              </strong>

                              <button
                                onClick={() => {
                                  setEditingRevenueId(
                                    order.id
                                  );

                                  setTempRevenue(
                                    getRevenueShare(
                                      order
                                    )
                                  );
                                }}
                                style={
                                  styles.btnEditCompact
                                }
                              >
                                ✏️
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div
                        style={
                          styles.orderFooter
                        }
                      >
                        <p
                          style={{
                            ...styles.p,
                            fontSize:
                              '0.8rem',
                            color:
                              '#94a3b8',
                            margin: 0
                          }}
                        >
                          🕒 {order.date}{' '}
                          ({order.isoDate})
                        </p>

                        <div
                          style={{
                            display:
                              'flex',
                            alignItems:
                              'center',
                            gap: '6px'
                          }}
                        >
                          <span>
                            🛵
                          </span>

                          <select
                            value={
                              order.driver
                            }
                            onChange={e =>
                              handleDriverReassign(
                                order,
                                e.target
                                  .value
                              )
                            }
                            style={{
                              ...styles.inlineInput,
                              width:
                                'auto',
                              padding:
                                '5px 8px'
                            }}
                          >
                            <option
                              value={
                                t.unspecified
                              }
                            >
                              {
                                t.unspecified
                              }
                            </option>

                            {drivers.map(
                              (
                                d,
                                idx
                              ) => (
                                <option
                                  key={
                                    idx
                                  }
                                  value={d}
                                >
                                  {d}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        )}

        {/* DRIVER LEDGER */}

        {activeTab ===
          'driver_ledger' && (
          <div>
            <div
              style={styles.card}
            >
              <h2
                style={{
                  marginTop: 0,
                  color: '#67e8f9'
                }}
              >
                {t.driverLedgerTitle}
              </h2>

              <div
                style={
                  styles.grid2
                }
              >
                <div>
                  <label
                    style={
                      styles.label
                    }
                  >
                    {t.filterDriver}
                  </label>

                  <select
                    value={
                      ledgerDriver
                    }
                    onChange={e =>
                      setLedgerDriver(
                        e.target.value
                      )
                    }
                    style={
                      styles.input
                    }
                  >
                    <option value="">
                      -- {t.allDrivers} --
                    </option>

                    {drivers.map(
                      (
                        d,
                        i
                      ) => (
                        <option
                          key={i}
                          value={d}
                        >
                          {d}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label
                    style={
                      styles.label
                    }
                  >
                    {t.filterDate}
                  </label>

                  <input
                    type="date"
                    value={
                      ledgerDate
                    }
                    onChange={e =>
                      setLedgerDate(
                        e.target.value
                      )
                    }
                    style={
                      styles.input
                    }
                  />
                </div>
              </div>
            </div>

            <div
              style={styles.kpiRow}
            >
              <div
                style={{
                  ...styles.kpiCard,
                  background:
                    'linear-gradient(135deg,#064e3b,#059669,#10b981)'
                }}
              >
                <span
                  style={
                    styles.kpiLabel
                  }
                >
                  {
                    t.cashToHandIn
                  }
                </span>

                <span
                  style={{
                    ...styles.kpiValue,
                    color:
                      '#6ee7b7'
                  }}
                >
                  {formatMoney(
                    dailyCashToHandIn
                  )}
                </span>
              </div>

              <div
                style={{
                  ...styles.kpiCard,
                  background:
                    'linear-gradient(135deg,#0c4a6e,#0284c7,#2563eb)'
                }}
              >
                <span
                  style={
                    styles.kpiLabel
                  }
                >
                  {
                    t.todaysOrdersCount
                  }
                </span>

                <span
                  style={{
                    ...styles.kpiValue,
                    color:
                      '#bae6fd'
                  }}
                >
                  {
                    filteredLedgerOrders.length
                  }
                </span>
              </div>

              <div
                style={{
                  ...styles.kpiCard,
                  background:
                    'linear-gradient(135deg,#581c87,#9333ea,#c026d3)'
                }}
              >
                <span
                  style={
                    styles.kpiLabel
                  }
                >
                  {t.youEarn}
                </span>

                <span
                  style={{
                    ...styles.kpiValue,
                    color:
                      '#e9d5ff'
                  }}
                >
                  {formatMoney(
                    dailyCompanyRevenue
                  )}
                </span>
              </div>

              <div
                style={{
                  ...styles.kpiCard,
                  background:
                    'linear-gradient(135deg,#713f12,#ca8a04,#f59e0b)'
                }}
              >
                <span
                  style={
                    styles.kpiLabel
                  }
                >
                  {t.driverKeeps}
                </span>

                <span
                  style={{
                    ...styles.kpiValue,
                    color:
                      '#fef08a'
                  }}
                >
                  {formatMoney(
                    dailyDriverShare
                  )}
                </span>
              </div>
            </div>

            <div
              style={{
                ...styles.card,
                marginTop:
                  '18px'
              }}
            >
              <div
                style={
                  styles.ledgerHero
                }
              >
                <div>
                  <span
                    style={
                      styles.ledgerHeroLabel
                    }
                  >
                    {t.cashToHand}
                  </span>

                  <strong
                    style={
                      styles.ledgerHeroAmount
                    }
                  >
                    {formatMoney(
                      dailyCashToHandIn
                    )}
                  </strong>
                </div>

                <div
                  style={
                    styles.ledgerHeroSide
                  }
                >
                  <span>
                    {t.youEarn}
                  </span>

                  <strong>
                    {formatMoney(
                      dailyCompanyRevenue
                    )}
                  </strong>
                </div>
              </div>

              <h3
                style={{
                  marginTop:
                    '20px',
                  color:
                    '#facc15'
                }}
              >
                {t.ordersHandled}
              </h3>

              {filteredLedgerOrders.length ===
              0 ? (
                <p
                  style={
                    styles.empty
                  }
                >
                  {
                    t.noOrdersForDate
                  }
                </p>
              ) : (
                <div
                  style={{
                    display:
                      'flex',
                    flexDirection:
                      'column',
                    gap:
                      '12px'
                  }}
                >
                  {filteredLedgerOrders.map(
                    order => {
                      const orderValue =
                        getOrderValue(
                          order
                        );

                      const fee =
                        getDeliveryFee(
                          order
                        );

                      const remaining =
                        getRemainingOrderValue(
                          order
                        );

                      const collection =
                        getDriverCustomerCollection(
                          order
                        );

                      const company =
                        getCompanyRevenue(
                          order
                        );

                      const driver =
                        getDriverShare(
                          order
                        );

                      const handIn =
                        getOrderEffectiveCash(
                          order
                        );

                      return (
                        <div
                          key={
                            order.id
                          }
                          style={
                            styles.ledgerOrderCard
                          }
                        >
                          <div
                            style={
                              styles.ledgerOrderTop
                            }
                          >
                            <div>
                              <span
                                style={
                                  styles.orderNumTag
                                }
                              >
                                {
                                  order.orderNum
                                }
                              </span>

                              <span
                                style={{
                                  margin:
                                    '0 6px',
                                  color:
                                    '#38bdf8',
                                  fontWeight:
                                    'bold'
                                }}
                              >
                                {
                                  order.customer
                                }
                              </span>

                              <span
                                style={
                                  styles.paymentBadge
                                }
                              >
                                {paymentLabel(
                                  order.paymentMethod
                                )}
                              </span>
        </
