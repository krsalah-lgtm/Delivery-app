import React, { useState, useEffect } from 'react';

const translations = {
  ar: {
    appTitle: '🚀 Anti Talabat',
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

    financialBreakdown: '💰 التفاصيل المالية',
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

    navNewOrder: '➕ New Order',
    navOrders: '📋 Manage Orders',
    navDrivers: '🛵 Drivers',
    navDriverLedger: '📊 Driver Ledger',
    navMerchants: '🏪 Stores',
    navCustomers: '👥 Customers',
    navHistory: '📜 Audit History',
    navSettings: '⚙️ Settings',

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

    financialBreakdown: '💰 Financial Breakdown',
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

  /*
    IMPORTANT:
    These are now confirmation-level settings.

    The selected percentage is NOT a percentage of COD/order value.
    It is ONLY a percentage of the delivery fee.
  */
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

  const getDeliveryFee = order =>
    normalizeNumber(order?.deliveryFee);

  const getRevenuePercent = order =>
    normalizeNumber(order?.revenuePercent);

  /*
    The order value belongs to the merchant.
    It is NEVER treated as company revenue.
  */

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

  /*
    What the driver actually collects from the customer.

    CASH:
      order value + delivery fee

    ONLINE/PREPAID:
      delivery fee only

    CANCELLED:
      0
  */
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

  /*
    Merchant money is separate from our revenue.

    For a cash order:
      merchant receives order value.

    For online/prepaid:
      merchant amount is already settled.
  */
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

  /*
    Effective cash for the driver/company financial ledger.
    This replaces using raw order.cod.
  */
  const getOrderEffectiveCash = order => {
    if (isCancelled(order)) return 0;

    return getCustomerCollection(order);
  };

  /*
    Company cash due from this order.

    This is NOT the 1000 EGP order value.
    It is only our percentage of the delivery fee.
  */
  const getCompanyHandIn = order => {
    if (isCancelled(order)) return 0;

    return getCompanyRevenue(order);
  };

  const getDriverDeliveryShare = order => {
    if (isCancelled(order)) return 0;

    return getDriverRevenue(order);
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

Your job is to extract one or multiple delivery orders from messy,
unstructured Egyptian Arabic, English, or mixed Arabic/English text.

STRICT RULES:

1. FINAL AGREED ORDER VALUE:
   If the conversation contains corrections, cancellations,
   replacement items, removed items, or a later confirmed price,
   ALWAYS use the FINAL agreed order value.

2. CANCELLATIONS:
   If an item is cancelled, do not include it in the final order
   value or item description.

3. STORE:
   Preserve merchant and branch names.
   Example:
   "بي تك سموحة" => "بي تك - سموحة"

4. CUSTOMER:
   Extract the recipient/customer name.

5. PHONE:
   Extract Egyptian phone numbers accurately.

6. ADDRESS:
   Preserve the complete address.
   Do not invent missing information.

7. DELIVERY FEE:
   If the text explicitly states a delivery fee, extract it.
   If there is no delivery fee mentioned, use 0.
   Never assume the delivery fee is part of the order value.

8. PAYMENT METHOD:
   Detect:
   - cash / كاش / عند الاستلام => "cash"
   - online / أونلاين / انستا باي / paid online => "online"
   - prepaid / مدفوع مسبقًا => "prepaid"

   If payment status is unclear, use "cash".

9. COD / ORDER VALUE:
   "cod" means ONLY the value of the merchandise/order.
   It MUST NOT include the delivery fee.

10. NOTES:
    Include call instructions, timing instructions,
    delivery notes, fee explanations, and handling instructions.

11. TYPOS:
    Normal Egyptian Arabic slang is NOT a typo.
    Words like:
    "مقاضي", "كيسين", "شغال", "شقه", "عماره", "ساقعة"
    should not be flagged.

12. AMBIGUOUS FLAGS:
    Only flag genuinely unclear or unintelligible words.

13. MULTIPLE ORDERS:
    If multiple customers/orders are present, return each
    as a separate order.

14. JSON ONLY:
    Return valid JSON.
    No markdown.
    No explanation.
    No text outside JSON.

OUTPUT:

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

  /*
    Allows changing extracted order fields before confirmation.
  */

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
      const normalizedDeliveryFee = normalizeNumber(
        ord.deliveryFee
      );

      const paymentMethod =
        ord.paymentMethod || PAYMENT_CASH;

      const newOrder = {
        id: Date.now() + Math.random(),

        orderNum: orderNumber,

        store: ord.store || t.unspecified,
        customer: ord.customer || t.unspecified,
        phone: ord.phone || '',
        address: ord.address || t.unspecified,

        /*
          IMPORTANT:
          cod = MERCHANDISE VALUE ONLY.
        */
        cod: normalizedCod,

        /*
          Delivery fee is a completely separate financial field.
        */
        deliveryFee: normalizedDeliveryFee,

        /*
          Payment method is stored on the order.
        */
        paymentMethod,

        /*
          This percentage belongs to the company,
          and applies ONLY to deliveryFee.
        */
        revenuePercent: selectedRevenuePercent,

        item: ord.item || '',
        notes: ord.notes || '',

        driver: selectedDriver,

        status: 'مؤكد',

        isoDate: isoDateStr,

        date: now.toLocaleTimeString(
          lang === 'ar' ? 'ar-EG' : 'en-US',
          {
            hour: '2-digit',
            minute: '2-digit'
          }
        )
      };

      const companyRevenue =
        normalizedDeliveryFee *
        (selectedRevenuePercent / 100);

      const driverRevenue =
        normalizedDeliveryFee -
        companyRevenue;

      const customerCollection =
        paymentMethod === PAYMENT_ONLINE ||
        paymentMethod === PAYMENT_PREPAID
          ? normalizedDeliveryFee
          : normalizedCod + normalizedDeliveryFee;

      addAuditLog(
        orderNumber,
        'Created',
        lang === 'ar'
          ? `تم إنشاء الطلب للعميل ${newOrder.customer}. قيمة الطلب ${normalizedCod} ج.م، التوصيل ${normalizedDeliveryFee} ج.م، الدفع ${
              paymentMethod === PAYMENT_CASH
                ? 'كاش'
                : 'مدفوع أونلاين'
            }، نسبة الشركة ${selectedRevenuePercent}% = ${companyRevenue.toFixed(
              2
            )} ج.م، نصيب الطيار = ${driverRevenue.toFixed(
              2
            )} ج.م، إجمالي تحصيل الطيار = ${customerCollection.toFixed(
              2
            )} ج.م.`
          : `Order created for ${newOrder.customer}. Order value: ${normalizedCod} EGP, delivery fee: ${normalizedDeliveryFee} EGP, payment: ${
              paymentMethod === PAYMENT_CASH
                ? 'Cash'
                : 'Paid Online'
            }, company share ${selectedRevenuePercent}% = ${companyRevenue.toFixed(
              2
            )} EGP, driver share = ${driverRevenue.toFixed(
              2
            )} EGP, driver collection = ${customerCollection.toFixed(
              2
            )} EGP.`
      );

      return newOrder;
    });

    setOrderCounter(currentNum);

    setOrders(prev => [
      ...newCreatedOrders,
      ...prev
    ]);

    /*
      Sync merchant database.
    */
    extractedOrders.forEach(ord => {
      if (
        ord.store &&
        ord.store !== t.unspecified
      ) {
        setMerchants(prev => {
          const match = prev.find(
            m =>
              m.name?.toLowerCase() ===
              ord.store?.toLowerCase()
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
            ord.store?.toLowerCase()
              ? {
                  ...m,
                  totalOrders:
                    (m.totalOrders || 0) + 1
                }
              : m
          );
        });
      }

      /*
        Sync customer database.
      */
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
    setSelectedRevenuePercent(20);

    setActiveTab('orders');
  };

  /*
    ============================================================
    ORDER ACTIONS
    ============================================================
  */

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
        'Deleted',
        `Order for ${order.customer} deleted.`
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
      'Status Change',
      `Status changed to "${newStatus}"`
    );
  };

  const handleDriverReassign = (
    order,
    newDriver
  ) => {
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
      'Driver Reassigned',
      `Driver changed to "${newDriver}"`
    );
  };

  const handleAmountSave = order => {
    const oldAmount = order.cod;

    const newAmount = normalizeNumber(
      tempAmount
    );

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? {
              ...o,
              cod: newAmount
            }
          : o
      )
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

    const newFee = normalizeNumber(
      tempDeliveryFee
    );

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? {
              ...o,
              deliveryFee: newFee
            }
          : o
      )
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
      'Notes Edited',
      `Notes updated to "${tempNote}"`
    );

    setEditingNoteId(null);
  };

  /*
    ============================================================
    CUSTOMER MANAGEMENT
    ============================================================
  */

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

  /*
    ============================================================
    CALCULATIONS
    ============================================================
  */

  const completedOrders = orders.filter(
    o => o.status === 'مكتمل'
  );

  const totalCollected = completedOrders.reduce(
    (sum, o) =>
      sum + getOrderEffectiveCash(o),
    0
  );

  const totalDeliveryRevenue =
    completedOrders.reduce(
      (sum, o) =>
        sum + getCompanyRevenue(o),
      0
    );

  const activeOrdersCount = orders.filter(
    o =>
      !['مكتمل', 'ملغي'].includes(
        o.status
      )
  ).length;

  const completedOrdersCount =
    orders.filter(
      o => o.status === 'مكتمل'
    ).length;

  const filteredOrders = orders.filter(o => {
    const query =
      searchQuery.toLowerCase();

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

  /*
    ============================================================
    LEDGER
    ============================================================
  */

  const selectedYearMonth =
    ledgerDate.substring(0, 7);

  const filteredLedgerOrders =
    orders.filter(o => {
      const matchDriver =
        !ledgerDriver ||
        o.driver === ledgerDriver;

      const matchDate =
        o.isoDate === ledgerDate;

      return matchDriver && matchDate;
    });

  const dailyCollected =
    filteredLedgerOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getOrderEffectiveCash(o),
        0
      );

  const dailyCompanyRevenue =
    filteredLedgerOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getCompanyRevenue(o),
        0
      );

  const dailyDriverRevenue =
    filteredLedgerOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getDriverRevenue(o),
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
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getOrderEffectiveCash(o),
        0
      );

  const monthlyCompanyRevenue =
    monthlyOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getCompanyRevenue(o),
        0
      );

  const monthlyDriverRevenue =
    monthlyOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getDriverRevenue(o),
        0
      );

  /*
    ============================================================
    UI
    ============================================================
  */

  return (
    <div
      style={{
        ...styles.container,
        direction:
          lang === 'ar'
            ? 'rtl'
            : 'ltr'
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
              'linear-gradient(135deg,#312e81,#4f46e5,#7c3aed)'
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
            {totalCollected.toLocaleString()} {t.currency}
          </span>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            background:
              'linear-gradient(135deg,#065f46,#059669,#10b981)'
          }}
        >
          <span style={styles.kpiLabel}>
            {t.kpiRevenue}
          </span>

          <span
            style={{
              ...styles.kpiValue,
              color: '#6ee7b7'
            }}
          >
            {totalDeliveryRevenue.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2
              }
            )}{' '}
            {t.currency}
          </span>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            background:
              'linear-gradient(135deg,#7e22ce,#c026d3,#ec4899)'
          }}
        >
          <span style={styles.kpiLabel}>
            {t.kpiActiveOrders}
          </span>

          <span
            style={{
              ...styles.kpiValue,
              color: '#f9a8d4'
            }}
          >
            {activeOrdersCount}
          </span>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            background:
              'linear-gradient(135deg,#0f766e,#0891b2,#2563eb)'
          }}
        >
          <span style={styles.kpiLabel}>
            {t.kpiCompleted}
          </span>

          <span
            style={{
              ...styles.kpiValue,
              color: '#93c5fd'
            }}
          >
            {completedOrdersCount}
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
            activeTab ===
            'driver_ledger'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() =>
            setActiveTab(
              'driver_ledger'
            )
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

        {/* =====================================================
            NEW ORDER
        ===================================================== */}

        {activeTab === 'new_order' && (
          <div style={styles.card}>

            <div
              style={
                styles.rowBetween
              }
            >
              <h2
                style={
                  styles.cardTitle
                }
              >
                {t.aiHeader}
              </h2>

              <button
                onClick={
                  handlePasteClipboard
                }
                style={
                  styles.btnGradientCompact
                }
              >
                {t.btnPaste}
              </button>
            </div>

            <textarea
              rows={7}
              value={rawText}
              onChange={e =>
                setRawText(
                  e.target.value
                )
              }
              placeholder={
                t.placeholderOrder
              }
              style={
                styles.textarea
              }
            />

            <button
              onClick={
                extractOrderInfo
              }
              disabled={loading}
              style={
                styles.btnPrimaryGradient
              }
            >
              {loading
                ? t.btnExtracting
                : t.btnExtract}
            </button>

            {/* TYPO MODAL */}

            {showTypoModal && (
              <div
                style={
                  styles.modalOverlay
                }
              >
                <div
                  style={
                    styles.modalCard
                  }
                >
                  <h3
                    style={{
                      margin:
                        '0 0 10px',
                      color:
                        '#facc15'
                    }}
                  >
                    {
                      t.typoAlertTitle
                    }
                  </h3>

                  <ul
                    style={{
                      paddingLeft:
                        '20px',
                      color:
                        '#fca5a5'
                    }}
                  >
                    {typoFlags.map(
                      (
                        flag,
                        idx
                      ) => (
                        <li
                          key={idx}
                        >
                          <strong>
                            {
                              flag
                            }
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
                    {t.confirm}
                  </button>
                </div>
              </div>
            )}

            {/* EXTRACTED ORDERS */}

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
                    color:
                      '#facc15'
                  }}
                >
                  {t.reviewTitle}
                </h3>

                {extractedOrders.map(
                  (ord, idx) => {

                    const orderValue =
                      normalizeNumber(
                        ord.cod
                      );

                    const fee =
                      normalizeNumber(
                        ord.deliveryFee
                      );

                    const company =
                      fee *
                      (selectedRevenuePercent /
                        100);

                    const driver =
                      fee - company;

                    const collection =
                      ord.paymentMethod ===
                        PAYMENT_ONLINE ||
                      ord.paymentMethod ===
                        PAYMENT_PREPAID
                        ? fee
                        : orderValue + fee;

                    return (
                      <div
                        key={idx}
                        style={
                          styles.extractedSubCard
                        }
                      >

                        <div
                          style={{
                            ...styles.orderHero,
                            background:
                              'linear-gradient(135deg,rgba(14,165,233,.15),rgba(124,58,237,.18))'
                          }}
                        >
                          <div>
                            <div
                              style={
                                styles.miniLabel
                              }
                            >
                              {t.customer}
                            </div>

                            <div
                              style={
                                styles.heroCustomer
                              }
                            >
                              👤{' '}
                              {ord.customer ||
                                t.unspecified}
                            </div>
                          </div>

                          <div
                            style={
                              styles.heroMoney
                            }
                          >
                            {collection.toLocaleString()}{' '}
                            {t.currency}
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
                            {
                              t.addressWarning
                            }
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
                              {t.phone}:
                            </strong>{' '}
                            {ord.phone ||
                              t.unspecified}
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

                        </div>

                        {/* FINANCIAL INPUTS */}

                        <div
                          style={
                            styles.financePanel
                          }
                        >
                          <div
                            style={
                              styles.financeTitle
                            }
                          >
                            💰{' '}
                            {
                              t.financialBreakdown
                            }
                          </div>

                          <div
                            style={
                              styles.financeGrid
                            }
                          >

                            <div
                              style={
                                styles.financeBox
                              }
                            >
                              <span>
                                {
                                  t.cod
                                }
                              </span>

                              <input
                                type="number"
                                value={
                                  ord.cod
                                }
                                onChange={e =>
                                  updateExtractedOrder(
                                    idx,
                                    'cod',
                                    e.target
                                      .value
                                  )
                                }
                                style={
                                  styles.financeInput
                                }
                              />

                              <small>
                                {
                                  t.orderValueNotRevenue
                                }
                              </small>
                            </div>

                            <div
                              style={
                                styles.financeBox
                              }
                            >
                              <span>
                                {
                                  t.deliveryFee
                                }
                              </span>

                              <input
                                type="number"
                                value={
                                  ord.deliveryFee
                                }
                                onChange={e =>
                                  updateExtractedOrder(
                                    idx,
                                    'deliveryFee',
                                    e.target
                                      .value
                                  )
                                }
                                style={
                                  styles.financeInput
                                }
                              />
                            </div>

                            <div
                              style={
                                styles.financeBox
                              }
                            >
                              <span>
                                {
                                  t.paymentMethod
                                }
                              </span>

                              <select
                                value={
                                  ord.paymentMethod ||
                                  PAYMENT_CASH
                                }
                                onChange={e =>
                                  updateExtractedOrder(
                                    idx,
                                    'paymentMethod',
                                    e.target
                                      .value
                                  )
                                }
                                style={
                                  styles.financeInput
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
                            </div>

                          </div>

                          <div
                            style={
                              styles.calculationStrip
                            }
                          >

                            <div>
                              <span>
                                {
                                  t.customerCollection
                                }
                              </span>

                              <strong>
                                {collection.toLocaleString()}{' '}
                                {
                                  t.currency
                                }
                              </strong>
                            </div>

                            <div>
                              <span>
                                {
                                  t.merchantAmount
                                }
                              </span>

                              <strong>
                                {orderValue.toLocaleString()}{' '}
                                {
                                  t.currency
                                }
                              </strong>
                            </div>

                            <div>
                              <span>
                                {
                                  t.companyRevenue
                                }
                              </span>

                              <strong
                                style={{
                                  color:
                                    '#34d399'
                                }}
                              >
                                {company.toFixed(
                                  2
                                )}{' '}
                                {
                                  t.currency
                                }
                              </strong>
                            </div>

                            <div>
                              <span>
                                {
                                  t.driverRevenue
                                }
                              </span>

                              <strong
                                style={{
                                  color:
                                    '#60a5fa'
                                }}
                              >
                                {driver.toFixed(
                                  2
                                )}{' '}
                                {
                                  t.currency
                                }
                              </strong>
                            </div>

                          </div>

                          <div
                            style={
                              styles.infoMessage
                            }
                          >
                            {ord.paymentMethod ===
                              PAYMENT_ONLINE ||
                            ord.paymentMethod ===
                              PAYMENT_PREPAID
                              ? t.onlineNoCollection
                              : t.cashCollectionExplanation}
                          </div>

                        </div>

                        {ord.notes && (
                          <div
                            style={{
                              marginTop:
                                '10px',
                              color:
                                '#facc15'
                            }}
                          >
                            <strong>
                              📌{' '}
                              {t.notes}:
                            </strong>{' '}
                            {ord.notes}
                          </div>
                        )}

                      </div>
                    );
                  }
                )}

                {/* DRIVER CONFIRMATION */}

                <div
                  style={
                    styles.confirmationPanel
                  }
                >

                  <div
                    style={
                      styles.confirmationHeader
                    }
                  >
                    <div>
                      <div
                        style={
                          styles.miniLabel
                        }
                      >
                        STEP 2
                      </div>

                      <h3
                        style={{
                          margin:
                            '3px 0',
                          color:
                            '#fff'
                        }}
                      >
                        🛵{' '}
                        {t.selectDriver}
                      </h3>
                    </div>
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
                        {
                          t.selectDriver
                        }
                      </label>

                      <select
                        value={
                          selectedDriver
                        }
                        onChange={e =>
                          setSelectedDriver(
                            e.target
                              .value
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
                        {
                          t.chooseRevenue
                        }
                      </label>

                      <select
                        value={
                          selectedRevenuePercent
                        }
                        onChange={e =>
                          setSelectedRevenuePercent(
                            Number(
                              e.target
                                .value
                            )
                          )
                        }
                        style={
                          styles.revenueSelect
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

                  <div
                    style={
                      styles.revenueExplanationBox
                    }
                  >
                    <strong>
                      💡{' '}
                      {
                        t.revenueExplanation
                      }
                    </strong>

                    <div
                      style={{
                        marginTop:
                          '8px',
                        display:
                          'grid',
                        gridTemplateColumns:
                          'repeat(3,1fr)',
                        gap: '10px'
                      }}
                    >

                      <div>
                        <small>
                          {
                            t.deliveryPool
                          }
                        </small>
                        <strong>
                          {extractedOrders
                            .reduce(
                              (
                                sum,
                                o
                              ) =>
                                sum +
                                normalizeNumber(
                                  o.deliveryFee
                                ),
                              0
                            )
                            .toLocaleString()}{' '}
                          {
                            t.currency
                          }
                        </strong>
                      </div>

                      <div>
                        <small>
                          {
                            t.myShare
                          }{' '}
                          (
                          {
                            selectedRevenuePercent
                          }
                          %)
                        </small>

                        <strong
                          style={{
                            color:
                              '#34d399'
                          }}
                        >
                          {extractedOrders
                            .reduce(
                              (
                                sum,
                                o
                              ) =>
                                sum +
                                normalizeNumber(
                                  o.deliveryFee
                                ) *
                                  (selectedRevenuePercent /
                                    100),
                              0
                            )
                            .toFixed(2)}{' '}
                          {
                            t.currency
                          }
                        </strong>
                      </div>

                      <div>
                        <small>
                          {
                            t.driverShare
                          }
                        </small>

                        <strong
                          style={{
                            color:
                              '#60a5fa'
                          }}
                        >
                          {extractedOrders
                            .reduce(
                              (
                                sum,
                                o
                              ) =>
                                sum +
                                normalizeNumber(
                                  o.deliveryFee
                                ) *
                                  (1 -
                                    selectedRevenuePercent /
                                      100),
                              0
                            )
                            .toFixed(2)}{' '}
                          {
                            t.currency
                          }
                        </strong>
                      </div>

                    </div>
                  </div>

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

        {/* =====================================================
            ORDERS
        ===================================================== */}

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
              <p
                style={
                  styles.empty
                }
              >
                No orders found.
              </p>
            ) : (
              filteredOrders.map(
                order => {

                  const companyRevenue =
                    getCompanyRevenue(
                      order
                    );

                  const driverRevenue =
                    getDriverRevenue(
                      order
                    );

                  const collection =
                    getCustomerCollection(
                      order
                    );

                  const merchantDue =
                    getMerchantDue(
                      order
                    );

                  return (
                    <div
                      key={
                        order.id
                      }
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
                            gap:
                              '8px',
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
                        </div>

                        <div
                          style={{
                            display:
                              'flex',
                            gap:
                              '8px',
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
                            {
                              t.deleteBtn
                            }
                          </button>

                        </div>
                      </div>

                      <p
                        style={
                          styles.p
                        }
                      >
                        <strong>
                          {
                            t.customer
                          }
                          :
                        </strong>{' '}
                        {
                          order.customer
                        }{' '}
                        (
                        {
                          order.phone
                        }
                        )
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

                      <p
                        style={
                          styles.p
                        }
                      >
                        <strong>
                          {
                            t.address
                          }
                          :
                        </strong>{' '}
                        {
                          order.address
                        }
                      </p>

                      {/* FINANCIAL SUMMARY */}

                      <div
                        style={
                          styles.orderFinancialCard
                        }
                      >

                        <div
                          style={
                            styles.financeTitle
                          }
                        >
                          {
                            t.financialBreakdown
                          }
                        </div>

                        <div
                          style={
                            styles.financeGrid
                          }
                        >

                          <div
                            style={
                              styles.summaryMetric
                            }
                          >
                            <span>
                              {
                                t.cod
                              }
                            </span>

                            <strong>
                              {
                                getOrderValue(
                                  order
                                )
                              }{' '}
                              {
                                t.currency
                              }
                            </strong>
                          </div>

                          <div
                            style={
                              styles.summaryMetric
                            }
                          >
                            <span>
                              {
                                t.deliveryFee
                              }
                            </span>

                            {editingDeliveryId ===
                            order.id ? (
                              <div
                                style={{
                                  display:
                                    'flex',
                                  gap:
                                    '5px'
                                }}
                              >
                                <input
                                  type="number"
                                  value={
                                    tempDeliveryFee
                                  }
                                  onChange={e =>
                                    setTempDeliveryFee(
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
                                    t.saveBtn
                                  }
                                </button>
                              </div>
                            ) : (
                              <strong>
                                {
                                  getDeliveryFee(
                                    order
                                  )
                                }{' '}
                                {
                                  t.currency
                                }
                              </strong>
                            )}

                            {editingDeliveryId !==
                              order.id && (
                              <button
                                onClick={() => {
                                  setEditingDeliveryId(
                                    order.id
                                  );

                                  setTempDeliveryFee(
                                    getDeliveryFee(
                                      order
                                    )
                                  );
                                }}
                                style={
                                  styles.btnEditTiny
                                }
                              >
                                ✏️
                              </button>
                            )}
                          </div>

                          <div
                            style={
                              styles.summaryMetric
                            }
                          >
                            <span>
                              {
                                t.revenuePercent
                              }
                            </span>

                            <strong>
                              {
                                getRevenuePercent(
                                  order
                                )
                              }
                              %
                            </strong>
                          </div>

                          <div
                            style={
                              styles.summaryMetric
                            }
                          >
                            <span>
                              {
                                t.paymentMethod
                              }
                            </span>

                            <strong>
                              {order.paymentMethod ===
                              PAYMENT_CASH
                                ? t.paymentCash
                                : order.paymentMethod ===
                                  PAYMENT_ONLINE
                                ? t.paymentOnline
                                : t.paymentPrepaid}
                            </strong>
                          </div>

                        </div>

                        <div
                          style={
                            styles.calculationStrip
                          }
                        >

                          <div>
                            <span>
                              {
                                t.customerCollection
                              }
                            </span>

                            <strong>
                              {
                                collection.toLocaleString()
                              }{' '}
                              {
                                t.currency
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              {
                                t.merchantDue
                              }
                            </span>

                            <strong>
                              {
                                merchantDue.toLocaleString()
                              }{' '}
                              {
                                t.currency
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              {
                                t.companyRevenue
                              }
                            </span>

                            <strong
                              style={{
                                color:
                                  '#34d399'
                              }}
                            >
                              {
                                companyRevenue.toFixed(
                                  2
                                )
                              }{' '}
                              {
                                t.currency
                              }
                            </strong>
                          </div>

                          <div>
                            <span>
                              {
                                t.driverRevenue
                              }
                            </span>

                            <strong
                              style={{
                                color:
                                  '#60a5fa'
                              }}
                            >
                              {
                                driverRevenue.toFixed(
                                  2
                                )
                              }{' '}
                              {
                                t.currency
                              }
                            </strong>
                          </div>

                        </div>

                        {order.status ===
                          'ملغي' && (
                          <div
                            style={
                              styles.cancelledBox
                            }
                          >
                            {
                              t.cancelledFinancial
                            }
                          </div>
                        )}

                      </div>

                      {/* NOTES */}

                      <div
                        style={{
                          backgroundColor:
                            'rgba(250,204,21,.08)',
                          padding:
                            '10px',
                          borderRadius:
                            '8px',
                          border:
                            '1px solid rgba(250,204,21,.2)',
                          margin:
                            '10px 0'
                        }}
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
                              {
                                order.notes ||
                                t.unspecified
                              }
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

                      {/* COD EDIT */}

                      <div
                        style={
                          styles.amountRow
                        }
                      >
                        <div>
                          <strong>
                            {
                              t.cod
                            }:{' '}
                          </strong>

                          {editingAmountId ===
                          order.id ? (
                            <span
                              style={{
                                display:
                                  'inline-flex',
                                gap:
                                  '5px'
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
                            <span
                              style={{
                                color:
                                  order.status ===
                                  'ملغي'
                                    ? '#ef4444'
                                    : '#34d399',
                                fontWeight:
                                  'bold',
                                textDecoration:
                                  order.status ===
                                  'ملغي'
                                    ? 'line-through'
                                    : 'none'
                              }}
                            >
                              {
                                order.cod
                              }{' '}
                              {
                                t.currency
                              }
                            </span>
                          )}
                        </div>

                        {editingAmountId !==
                          order.id && (
                          <button
                            onClick={() => {
                              setEditingAmountId(
                                order.id
                              );

                              setTempAmount(
                                order.cod
                              );
                            }}
                            style={
                              styles.btnEditCompact
                            }
                          >
                            ✏️{' '}
                            {
                              t.editAmount
                            }
                          </button>
                        )}
                      </div>

                      {/* DRIVER */}

                      <div
                        style={{
                          display:
                            'flex',
                          justifyContent:
                            'space-between',
                          alignItems:
                            'center',
                          marginTop:
                            '10px',
                          gap: '10px',
                          flexWrap:
                            'wrap'
                        }}
                      >

                        <p
                          style={{
                            ...styles.p,
                            fontSize:
                              '.85rem',
                            color:
                              '#94a3b8',
                            margin: 0
                          }}
                        >
                          🕒{' '}
                          {
                            order.date
                          }{' '}
                          (
                          {
                            order.isoDate
                          }
                          )
                        </p>

                        <div
                          style={{
                            display:
                              'flex',
                            alignItems:
                              'center',
                            gap:
                              '6px'
                          }}
                        >
                          <span>
                            🛵{' '}
                            {
                              t.selectDriver
                            }
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
                                'auto'
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
                                  value={
                                    d
                                  }
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

        {/* =====================================================
            DRIVER LEDGER
        ===================================================== */}

        {activeTab ===
          'driver_ledger' && (
          <div>

            <div
              style={
                styles.card
              }
            >
              <h2
                style={{
                  marginTop: 0,
                  color:
                    '#67e8f9'
                }}
              >
                {
                  t.driverLedgerTitle
                }
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
                    {
                      t.filterDriver
                    }
                  </label>

                  <select
                    value={
                      ledgerDriver
                    }
                    onChange={e =>
                      setLedgerDriver(
                        e.target
                          .value
                      )
                    }
                    style={
                      styles.input
                    }
                  >
                    <option value="">
                      --{' '}
                      {
                        t.allDrivers
                      }{' '}
                      --
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
                    {
                      t.filterDate
                    }
                  </label>

                  <input
                    type="date"
                    value={
                      ledgerDate
                    }
                    onChange={e =>
                      setLedgerDate(
                        e.target
                          .value
                      )
                    }
                    style={
                      styles.input
                    }
                  />
                </div>

              </div>
            </div>

            {/* LEDGER KPIs */}

            <div
              style={
                styles.kpiRow
              }
            >

              <div
                style={{
                  ...styles.kpiCard,
                  background:
                    'linear-gradient(135deg,#075985,#0284c7,#06b6d4)'
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
                      '#a5f3fc'
                  }}
                >
                  {
                    dailyCollected.toLocaleString()
                  }{' '}
                  {
                    t.currency
                  }
                </span>
              </div>

              <div
                style={{
                  ...styles.kpiCard,
                  background:
                    'linear-gradient(135deg,#065f46,#059669,#10b981)'
                }}
              >
                <span
                  style={
                    styles.kpiLabel
                  }
                >
                  {
                    t.companyRevenueLedger
                  }
                </span>

                <span
                  style={{
                    ...styles.kpiValue,
                    color:
                      '#a7f3d0'
                  }}
                >
                  {
                    dailyCompanyRevenue.toFixed(
                      2
                    )
                  }{' '}
                  {
                    t.currency
                  }
                </span>
              </div>

              <div
                style={{
                  ...styles.kpiCard,
                  background:
                    'linear-gradient(135deg,#1e3a8a,#2563eb,#6366f1)'
                }}
              >
                <span
                  style={
                    styles.kpiLabel
                  }
                >
                  {
                    t.driverRevenueLedger
                  }
                </span>

                <span
                  style={{
                    ...styles.kpiValue,
                    color:
                      '#bfdbfe'
                  }}
                >
                  {
                    dailyDriverRevenue.toFixed(
                      2
                    )
                  }{' '}
                  {
                    t.currency
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
                  {
                    t.todaysOrdersCount
                  }
                </span>

                <span
                  style={{
                    ...styles.kpiValue,
                    color:
                      '#e9d5ff'
                  }}
                >
                  {
                    filteredLedgerOrders.length
                  }
                </span>
              </div>

            </div>

            {/* MONTHLY SUMMARY */}

            <div
              style={
                styles.monthlySummary
              }
            >

              <div>
                <span>
                  {
                    t.monthsTotalCash
                  }
                </span>

                <strong>
                  {
                    monthlyTotalCash.toLocaleString()
                  }{' '}
                  {
                    t.currency
                  }
                </strong>
              </div>

              <div>
                <span>
                  {
                    t.companyRevenueLedger
                  }
                </span>

                <strong
                  style={{
                    color:
                      '#34d399'
                  }}
                >
                  {
                    monthlyCompanyRevenue.toFixed(
                      2
                    )
                  }{' '}
                  {
                    t.currency
                  }
                </strong>
              </div>

              <div>
                <span>
                  {
                    t.driverRevenue
