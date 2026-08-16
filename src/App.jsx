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

    kpiTotalCod: '💰 إجمالي النقدية المحصلة',
    kpiActiveOrders: '⚡ طلبات نشطة',
    kpiCompleted: '✅ تم التوصيل',
    kpiHandIn: '💵 مستحق التوريد',

    aiHeader: '✨ استخراج بيانات الطلب بواسطة AI',
    placeholderOrder: 'ألصق نص الطلب هنا...',
    btnPaste: '📋 لصق من الحافظة',
    btnExtract: '⚡ استخراج البيانات بالذكاء الاصطناعي',
    btnExtracting: 'جاري التحليل والتدقيق...',

    reviewTitle: 'مراجعة البيانات المستخرجة:',
    store: 'المتجر',
    customer: 'العميل',
    phone: 'رقم الهاتف',
    cod: 'الإجمالي المحصل',
    orderValue: 'قيمة الطلب',
    deliveryFee: 'التوصيل',
    handIn: 'المطلوب توريده',
    address: 'العنوان',
    item: 'الأصناف',
    notes: 'ملاحظات الطلب',

    addressWarning: '📍 تنبيه عنوان غير مكتمل: يرجى مراجعة وتأكيد العنوان!',
    selectDriver: 'اختيار طيار التوصيل:',
    chooseDriver: '-- اختر طيار --',
    btnConfirm: '✅ تأكيد وحفظ الطلبات',

    searchPlaceholder: '🔍 بحث برقم الطلب، اسم العميل، المتجر، أو الهاتف...',
    unspecified: 'غير محدد',
    currency: 'ج.م',

    statusConfirmed: 'مؤكد',
    statusProcessing: 'قيد تجهيز الطلب',
    statusOutForDelivery: 'خرج للتوصيل',
    statusInTransit: 'جاري التوصيل',
    statusCompleted: 'مكتمل',
    statusDelayed: 'متأخر',
    statusCancelled: 'ملغي',

    addDriver: 'إضافة طيار جديد',
    driverName: 'اسم الطيار...',
    btnAdd: 'إضافة',

    driverCash: 'النقدية المطلوب توريدها:',
    totalTrips: 'إجمالي الرحلات:',
    deliveredTrips: 'الطلبات المكتملة:',
    totalCollected: 'إجمالي المحصل:',
    totalDeliveryFees: 'إجمالي رسوم التوصيل:',
    driverLedgerHistory: '📒 سجل توريدات الطيار',
    handInSummary: '💵 إجمالي المطلوب توريده',

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

    confirmDeleteMsg: 'هل أنت متأكد من رغبتك في حذف هذا الطلب نهائياً؟',

    typoAlertTitle: '🔍 تم رصد كلمات قد تحتوي على خطأ إملائي غير معروف:',
    historyTitle: '📜 سجل عمليات وتعديلات الطلبات',
    noHistory: 'لا توجد سجلات تعديل حتى الآن.',

    driverLedgerTitle: '📊 كشف حساب وتوريد الطيارين',
    filterDriver: 'تصفية بالطيار:',
    filterDate: 'التاريخ:',
    allDrivers: 'كل الطيارين',

    cashToHandIn: '💵 النقدية الواجب توريدها',
    todaysOrdersCount: '📦 طلبات اليوم',
    monthsOrdersCount: '📅 طلبات الشهر الحالي',
    monthsTotalCash: '💰 إجمالي تحصيل الشهر',

    ordersHandled: 'تفاصيل الطلبات المسندة:',
    noOrdersForDate: 'لا توجد طلبات مسجلة لهذه الفلاتر.',

    collected: 'المحصل',
    breakdown: 'تفاصيل المبلغ',
    productAmount: 'قيمة المنتجات',
    fee: 'رسوم التوصيل',
    driverMustHandIn: 'الطيار يورد',
    driverKeeps: 'رسوم التوصيل',
    cancelledZero: 'ملغي — 0 ج.م توريد',

    orderCreated: 'تم إنشاء الطلب',
    statusChanged: 'تغيير الحالة',
    driverReassigned: 'تغيير الطيار',
    amountEdited: 'تعديل المبلغ',
    notesEdited: 'تعديل الملاحظات',

    noOrders: 'لا توجد طلبات.',
    noDrivers: 'لا يوجد طيارون.',
    okContinue: 'متابعة',
    time: 'الوقت',
    driver: 'الطيار',
    action: 'الإجراء',
    details: 'التفاصيل'
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

    kpiTotalCod: '💰 Total Collected',
    kpiActiveOrders: '⚡ Active Orders',
    kpiCompleted: '✅ Completed',
    kpiHandIn: '💵 Cash to Hand In',

    aiHeader: '✨ AI Order Extraction',
    placeholderOrder: 'Paste delivery text here...',
    btnPaste: '📋 Paste Clipboard',
    btnExtract: '⚡ Extract Data with AI',
    btnExtracting: 'Analyzing & Checking...',

    reviewTitle: 'Extracted Orders Review:',
    store: 'Store',
    customer: 'Customer',
    phone: 'Phone',
    cod: 'Total Collected',
    orderValue: 'Order Value',
    deliveryFee: 'Delivery Fee',
    handIn: 'Cash to Hand In',
    address: 'Address',
    item: 'Items',
    notes: 'Order Notes',

    addressWarning: '📍 Incomplete Address Alert: Double check details!',
    selectDriver: 'Assign Driver:',
    chooseDriver: '-- Select Driver --',
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
    deliveredTrips: 'Completed Orders:',
    totalCollected: 'Total Collected:',
    totalDeliveryFees: 'Total Delivery Fees:',
    driverLedgerHistory: '📒 Driver Handover History',
    handInSummary: '💵 Total Cash to Hand In',

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

    confirmDeleteMsg: 'Are you sure you want to permanently delete this order?',

    typoAlertTitle: '🔍 Unrecognized words detected:',
    historyTitle: '📜 Audit Log & Order Edits History',
    noHistory: 'No edit history recorded yet.',

    driverLedgerTitle: '📊 Driver Cash & Orders Ledger',
    filterDriver: 'Filter Driver:',
    filterDate: 'Filter Date:',
    allDrivers: 'All Drivers',

    cashToHandIn: '💵 Cash to Hand In',
    todaysOrdersCount: "📦 Today's Orders",
    monthsOrdersCount: "📅 This Month's Orders",
    monthsTotalCash: "💰 This Month's Collection",

    ordersHandled: 'Assigned Orders & Financial Breakdown:',
    noOrdersForDate: 'No orders match selected filters.',

    collected: 'Collected',
    breakdown: 'Financial Breakdown',
    productAmount: 'Order Value',
    fee: 'Delivery Fee',
    driverMustHandIn: 'Driver Hands In',
    driverKeeps: 'Delivery Fee',
    cancelledZero: 'Cancelled — 0 EGP hand-in',

    orderCreated: 'Order Created',
    statusChanged: 'Status Change',
    driverReassigned: 'Driver Reassigned',
    amountEdited: 'Amount Edited',
    notesEdited: 'Notes Edited',

    noOrders: 'No orders found.',
    noDrivers: 'No drivers.',
    okContinue: 'Continue',
    time: 'Time',
    driver: 'Driver',
    action: 'Action',
    details: 'Details'
  }
};

const STATUS_KEYS = [
  'مؤكد',
  'قيد تجهيز الطلب',
  'خرج للتوصيل',
  'جاري التوصيل',
  'مكتمل',
  'متأخر',
  'ملغي'
];

const getTodayISO = () => new Date().toISOString().split('T')[0];

const safeNumber = value => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

  if (typeof value === 'string') {
    const cleaned = value.replace(/[^\d.-]/g, '');
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
};

const getOrderCollectedCash = order => {
  return safeNumber(order?.cod);
};

/*
 * Driver hand-in:
 *
 * Normal order:
 *   customer pays = order value + delivery fee
 *   driver hands in = order value
 *   delivery fee = driver/delivery earnings
 *
 * Cancelled:
 *   driver hands in = 0
 *
 * Backward compatibility:
 * Old orders don't have itemAmount/deliveryFee.
 * In that case we treat COD as the hand-in amount.
 */
const getOrderEffectiveCash = order => {
  if (order?.status === 'ملغي') return 0;

  if (
    order &&
    (order.itemAmount !== undefined ||
      order.orderValue !== undefined ||
      order.deliveryFee !== undefined)
  ) {
    const orderValue =
      safeNumber(order.itemAmount ?? order.orderValue);

    if (orderValue > 0) return orderValue;

    const fee = safeNumber(order.deliveryFee);

    if (fee > 0) {
      return Math.max(0, getOrderCollectedCash(order) - fee);
    }
  }

  return getOrderCollectedCash(order);
};

const getOrderDeliveryFee = order => {
  const explicit = safeNumber(order?.deliveryFee);

  if (explicit > 0) return explicit;

  const cod = getOrderCollectedCash(order);
  const handIn = getOrderEffectiveCash(order);

  if (cod > handIn) return cod - handIn;

  return 0;
};

const getOrderValue = order => {
  const explicit = safeNumber(order?.itemAmount ?? order?.orderValue);

  if (explicit > 0) return explicit;

  return Math.max(
    0,
    getOrderCollectedCash(order) - getOrderDeliveryFee(order)
  );
};

const formatMoney = (amount, currency) =>
  `${safeNumber(amount).toLocaleString()} ${currency}`;

const getStatusStyle = status => {
  const base = {
    padding: '7px 12px',
    borderRadius: '999px',
    fontWeight: '800',
    border: '1px solid rgba(255,255,255,0.12)',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '0.78rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.18)'
  };

  switch (status) {
    case 'مؤكد':
      return {
        ...base,
        background: 'linear-gradient(135deg,#2563eb,#4f46e5)'
      };

    case 'قيد تجهيز الطلب':
      return {
        ...base,
        background: 'linear-gradient(135deg,#7c3aed,#a855f7)'
      };

    case 'خرج للتوصيل':
      return {
        ...base,
        background: 'linear-gradient(135deg,#0284c7,#06b6d4)'
      };

    case 'جاري التوصيل':
      return {
        ...base,
        background: 'linear-gradient(135deg,#d97706,#f59e0b)'
      };

    case 'مكتمل':
      return {
        ...base,
        background: 'linear-gradient(135deg,#059669,#10b981)'
      };

    case 'متأخر':
      return {
        ...base,
        background: 'linear-gradient(135deg,#dc2626,#f43f5e)'
      };

    case 'ملغي':
      return {
        ...base,
        background: 'linear-gradient(135deg,#475569,#1e293b)'
      };

    default:
      return base;
  }
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
  const [selectedDriver, setSelectedDriver] = useState('');
  const [newDriverName, setNewDriverName] = useState('');

  const [ledgerDriver, setLedgerDriver] = useState('');
  const [ledgerDate, setLedgerDate] = useState(getTodayISO());

  const [typoFlags, setTypoFlags] = useState([]);
  const [showTypoModal, setShowTypoModal] = useState(false);

  const [editingAmountId, setEditingAmountId] = useState(null);
  const [tempAmount, setTempAmount] = useState('');

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

  useEffect(
    () => localStorage.setItem('app_lang', lang),
    [lang]
  );

  useEffect(
    () => localStorage.setItem('groq_api_key', apiKey),
    [apiKey]
  );

  useEffect(
    () =>
      localStorage.setItem(
        'order_counter_num',
        orderCounter.toString()
      ),
    [orderCounter]
  );

  useEffect(
    () =>
      localStorage.setItem(
        'delivery_orders_v5',
        JSON.stringify(orders)
      ),
    [orders]
  );

  useEffect(
    () =>
      localStorage.setItem(
        'delivery_merchants_v5',
        JSON.stringify(merchants)
      ),
    [merchants]
  );

  useEffect(
    () =>
      localStorage.setItem(
        'delivery_customers_v5',
        JSON.stringify(customers)
      ),
    [customers]
  );

  useEffect(
    () =>
      localStorage.setItem(
        'delivery_drivers_v5',
        JSON.stringify(drivers)
      ),
    [drivers]
  );

  useEffect(
    () =>
      localStorage.setItem(
        'delivery_history_v5',
        JSON.stringify(historyLogs)
      ),
    [historyLogs]
  );

  /*
   * Cross-tab synchronization.
   * Storage events don't fire in the same tab, but they do fire
   * when another browser tab changes the same key.
   */
  useEffect(() => {
    const handleStorage = event => {
      if (!event.key) return;

      try {
        switch (event.key) {
          case 'delivery_orders_v5':
            setOrders(JSON.parse(event.newValue || '[]'));
            break;

          case 'delivery_merchants_v5':
            setMerchants(JSON.parse(event.newValue || '[]'));
            break;

          case 'delivery_customers_v5':
            setCustomers(JSON.parse(event.newValue || '[]'));
            break;

          case 'delivery_drivers_v5':
            setDrivers(JSON.parse(event.newValue || '[]'));
            break;

          case 'delivery_history_v5':
            setHistoryLogs(JSON.parse(event.newValue || '[]'));
            break;

          default:
            break;
        }
      } catch {
        // Ignore malformed external localStorage changes.
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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

Your job is to convert messy Egyptian Arabic delivery conversations into strict JSON.

IMPORTANT EXTRACTION RULES:

1. Understand Egyptian Arabic slang, spelling mistakes, abbreviations,
   voice-transcription errors, and informal wording.

2. NEVER treat common Egyptian delivery words such as:
   "مقاضي", "كيسين", "شغال", "شقة", "عمارة", "ساقعة"
   as spelling mistakes.

3. Track the conversation chronologically.

4. If an item is cancelled, removed, replaced, or its quantity changes,
   update the final order accordingly.

5. If an earlier total is mentioned and a later total is confirmed,
   ALWAYS use the FINAL AGREED TOTAL.

6. Example:
   "الحساب 930 ... الميه اتلغت ... يبقى 840؟ آه بالضبط"
   => cod must be 840.

7. Extract the store INCLUDING branch when available.
   Example:
   "بي تك سموحة" => "بي تك - سموحة"

8. Extract delivery instructions into notes.

9. Extract delivery fee separately whenever mentioned.

10. Extract the merchandise/order value separately whenever possible.

11. Financial relationship:
   order value + delivery fee = final customer COD.

12. If the final COD is explicitly confirmed but the order value
   or delivery fee is not explicitly known, do NOT invent them.
   Use 0 for unknown fields.

13. phone must contain only the phone number as much as possible.

14. If there are multiple customers/orders in the same message,
   return multiple objects.

15. "ambiguous_flags" should ONLY contain genuinely unclear or
   potentially mistyped words that could materially affect the order.

16. Do not put explanations outside JSON.

RETURN ONLY VALID JSON.

Required structure:

{
  "ambiguous_flags": [],
  "orders": [
    {
      "store": "",
      "customer": "",
      "phone": "",
      "address": "",
      "item": "",
      "item_amount": 0,
      "delivery_fee": 0,
      "cod": 0,
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

      const normalizedOrders = (parsed.orders || []).map(
        order => {
          const cod = safeNumber(order.cod);
          const itemAmount = safeNumber(
            order.item_amount
          );

          const deliveryFee = safeNumber(
            order.delivery_fee
          );

          /*
           * If AI extracted COD but one of the components is missing,
           * preserve the final COD and avoid inventing data.
           */
          return {
            ...order,
            cod,
            itemAmount,
            deliveryFee
          };
        }
      );

      setExtractedOrders(normalizedOrders);
    } catch (err) {
      alert(
        `${lang === 'ar' ? 'خطأ في تحليل الطلب' : 'Error parsing order'}: ${
          err.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = () => {
    if (extractedOrders.length === 0) return;

    let currentNum = orderCounter;

    const now = new Date();
    const isoDateStr = now.toISOString().split('T')[0];

    const newCreatedOrders = extractedOrders.map(ord => {
      const orderNumber = `#${currentNum++}`;

      const cod = safeNumber(ord.cod);
      const itemAmount = safeNumber(ord.itemAmount);
      const deliveryFee = safeNumber(ord.deliveryFee);

      addAuditLog(
        orderNumber,
        t.orderCreated,
        `${ord.customer} — ${formatMoney(cod, t.currency)}`
      );

      return {
        id: Date.now() + Math.random(),
        orderNum: orderNumber,
        ...ord,
        cod,
        itemAmount,
        deliveryFee,
        driver: selectedDriver || t.unspecified,
        status: 'مؤكد',
        isoDate: isoDateStr,
        createdAt: now.toISOString(),
        date: now.toLocaleTimeString(
          lang === 'ar' ? 'ar-EG' : 'en-US',
          {
            hour: '2-digit',
            minute: '2-digit'
          }
        )
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
              m.name.toLowerCase() ===
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
            m.name.toLowerCase() ===
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
        'Deleted',
        `Order for ${order.customer} deleted.`
      );
    }
  };

  const handleStatusChange = (order, newStatus) => {
    const oldStatus = order.status;

    setOrders(prev =>
      prev.map(o =>
        o.id === order.id
          ? {
              ...o,
              status: newStatus,
              ...(newStatus === 'مكتمل'
                ? {
                    completedAt:
                      new Date().toISOString()
                  }
                : {})
            }
          : o
      )
    );

    addAuditLog(
      order.orderNum,
      t.statusChanged,
      `${oldStatus} → ${newStatus}`
    );
  };

  const handleDriverReassign = (
    order,
    newDriver
  ) => {
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
      `${oldDriver} → ${newDriver}`
    );
  };

  const handleAmountSave = order => {
    const oldAmount = order.cod;
    const newAmount = safeNumber(tempAmount);

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
      t.amountEdited,
      `${oldAmount} → ${newAmount} ${t.currency}`
    );

    setEditingAmountId(null);
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
      `"${oldNote || ''}" → "${tempNote}"`
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

  const totalCollectedSum = useMemo(
    () =>
      orders
        .filter(o => o.status === 'مكتمل')
        .reduce(
          (sum, o) =>
            sum + getOrderCollectedCash(o),
          0
        ),
    [orders]
  );

  const totalHandInSum = useMemo(
    () =>
      orders
        .filter(o => o.status === 'مكتمل')
        .reduce(
          (sum, o) =>
            sum + getOrderEffectiveCash(o),
          0
        ),
    [orders]
  );

  const activeOrdersCount = orders.filter(
    o =>
      !['مكتمل', 'ملغي'].includes(o.status)
  ).length;

  const completedOrdersCount =
    orders.filter(o => o.status === 'مكتمل').length;

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
      (o.phone || '').includes(searchQuery)
    );
  });

  const selectedYearMonth =
    ledgerDate.substring(0, 7);

  const filteredLedgerOrders = orders.filter(
    order => {
      const matchDriver =
        !ledgerDriver ||
        order.driver === ledgerDriver;

      const matchDate =
        order.isoDate === ledgerDate;

      return matchDriver && matchDate;
    }
  );

  const dailyCashToHandIn =
    filteredLedgerOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getOrderEffectiveCash(o),
        0
      );

  const dailyCollected =
    filteredLedgerOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getOrderCollectedCash(o),
        0
      );

  const dailyDeliveryFees =
    filteredLedgerOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getOrderDeliveryFee(o),
        0
      );

  const monthlyOrders = orders.filter(
    order => {
      const matchDriver =
        !ledgerDriver ||
        order.driver === ledgerDriver;

      const matchMonth =
        (order.isoDate || '').startsWith(
          selectedYearMonth
        );

      return matchDriver && matchMonth;
    }
  );

  const monthlyTotalCash =
    monthlyOrders
      .filter(o => o.status === 'مكتمل')
      .reduce(
        (sum, o) =>
          sum + getOrderCollectedCash(o),
        0
      );

  const driverStats = drivers.map(
    driverName => {
      const driverOrders =
        orders.filter(
          o => o.driver === driverName
        );

      const completed =
        driverOrders.filter(
          o => o.status === 'مكتمل'
        );

      return {
        driverName,
        totalTrips: driverOrders.length,
        completedTrips: completed.length,
        collected: completed.reduce(
          (sum, o) =>
            sum + getOrderCollectedCash(o),
          0
        ),
        deliveryFees: completed.reduce(
          (sum, o) =>
            sum + getOrderDeliveryFee(o),
          0
        ),
        handIn: completed.reduce(
          (sum, o) =>
            sum + getOrderEffectiveCash(o),
          0
        )
      };
    }
  );

  return (
    <div
      style={{
        ...styles.container,
        direction:
          lang === 'ar' ? 'rtl' : 'ltr'
      }}
    >
      <div style={styles.backgroundGlowOne} />
      <div style={styles.backgroundGlowTwo} />

      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <div style={styles.brandRow}>
            <div style={styles.brandIcon}>🚀</div>

            <div>
              <h1 style={styles.appTitle}>
                {t.appTitle.replace('🚀 ', '')}
              </h1>

              <p style={styles.appSubtitle}>
                {t.appSubtitle}
              </p>
            </div>
          </div>
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
              ...(apiKey
                ? styles.badgeSuccess
                : styles.badgeDanger)
            }}
          >
            {apiKey
              ? t.groqConnected
              : t.groqMissing}
          </div>
        </div>
      </header>

      {/* KPI DASHBOARD */}
      <div style={styles.kpiRow}>
        <KpiCard
          icon="💰"
          title={t.kpiTotalCod}
          value={formatMoney(
            totalCollectedSum,
            t.currency
          )}
          gradient="linear-gradient(135deg,#312e81,#4f46e5,#7c3aed)"
          accent="#a5b4fc"
        />

        <KpiCard
          icon="⚡"
          title={t.kpiActiveOrders}
          value={activeOrdersCount}
          gradient="linear-gradient(135deg,#064e3b,#059669,#10b981)"
          accent="#6ee7b7"
        />

        <KpiCard
          icon="✅"
          title={t.kpiCompleted}
          value={completedOrdersCount}
          gradient="linear-gradient(135deg,#831843,#be185d,#ec4899)"
          accent="#f9a8d4"
        />

        <KpiCard
          icon="💵"
          title={t.kpiHandIn}
          value={formatMoney(
            totalHandInSum,
            t.currency
          )}
          gradient="linear-gradient(135deg,#92400e,#d97706,#f59e0b)"
          accent="#fde68a"
        />
      </div>

      {/* NAV */}
      <nav style={styles.nav}>
        <NavButton
          active={activeTab === 'new_order'}
          onClick={() =>
            setActiveTab('new_order')
          }
        >
          {t.navNewOrder}
        </NavButton>

        <NavButton
          active={activeTab === 'orders'}
          onClick={() =>
            setActiveTab('orders')
          }
        >
          {t.navOrders} ({orders.length})
        </NavButton>

        <NavButton
          active={
            activeTab === 'driver_ledger'
          }
          onClick={() =>
            setActiveTab('driver_ledger')
          }
        >
          {t.navDriverLedger}
        </NavButton>

        <NavButton
          active={activeTab === 'drivers'}
          onClick={() =>
            setActiveTab('drivers')
          }
        >
          {t.navDrivers} ({drivers.length})
        </NavButton>

        <NavButton
          active={activeTab === 'merchants'}
          onClick={() =>
            setActiveTab('merchants')
          }
        >
          {t.navMerchants} ({merchants.length})
        </NavButton>

        <NavButton
          active={activeTab === 'customers'}
          onClick={() =>
            setActiveTab('customers')
          }
        >
          {t.navCustomers} ({customers.length})
        </NavButton>

        <NavButton
          active={activeTab === 'history'}
          onClick={() =>
            setActiveTab('history')
          }
        >
          {t.navHistory}
        </NavButton>

        <NavButton
          active={activeTab === 'settings'}
          onClick={() =>
            setActiveTab('settings')
          }
        >
          {t.navSettings}
        </NavButton>
      </nav>

      <main style={styles.main}>
        {/* NEW ORDER */}
        {activeTab === 'new_order' && (
          <div style={styles.card}>
            <div style={styles.cardHeaderFancy}>
              <div>
                <div style={styles.eyebrow}>
                  AI ORDER INTELLIGENCE
                </div>

                <h2 style={styles.cardTitle}>
                  {t.aiHeader}
                </h2>
              </div>

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
                setRawText(e.target.value)
              }
              placeholder={
                t.placeholderOrder
              }
              style={styles.textarea}
            />

            <button
              onClick={extractOrderInfo}
              disabled={loading}
              style={{
                ...styles.btnPrimaryGradient,
                opacity: loading ? 0.65 : 1
              }}
            >
              {loading
                ? t.btnExtracting
                : t.btnExtract}
            </button>

            {showTypoModal && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalCard}>
                  <div style={styles.modalIcon}>
                    🔍
                  </div>

                  <h3
                    style={
                      styles.modalTitle
                    }
                  >
                    {t.typoAlertTitle}
                  </h3>

                  <ul
                    style={
                      styles.typoList
                    }
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
                      setShowTypoModal(false)
                    }
                    style={
                      styles.btnSuccessGradient
                    }
                  >
                    {t.okContinue}
                  </button>
                </div>
              </div>
            )}

            {extractedOrders.length > 0 && (
              <div style={styles.extractedBox}>
                <div style={styles.sectionHeader}>
                  <div>
                    <span style={styles.sectionBadge}>
                      AI
                    </span>

                    <h3
                      style={
                        styles.sectionTitle
                      }
                    >
                      {t.reviewTitle}
                    </h3>
                  </div>

                  <span style={styles.orderCountBadge}>
                    {extractedOrders.length}{' '}
                    {lang === 'ar'
                      ? 'طلب'
                      : 'orders'}
                  </span>
                </div>

                {extractedOrders.map(
                  (ord, idx) => {
                    const orderValue =
                      safeNumber(
                        ord.itemAmount
                      );

                    const deliveryFee =
                      safeNumber(
                        ord.deliveryFee
                      );

                    const cod =
                      safeNumber(ord.cod);

                    return (
                      <div
                        key={idx}
                        style={
                          styles.extractedSubCard
                        }
                      >
                        <div
                          style={
                            styles.orderCardTop
                          }
                        >
                          <div>
                            <span
                              style={
                                styles.orderIndex
                              }
                            >
                              #{idx + 1}
                            </span>

                            <h4
                              style={
                                styles.customerTitle
                              }
                            >
                              {ord.customer ||
                                t.unspecified}
                            </h4>
                          </div>

                          <div
                            style={
                              styles.collectedPill
                            }
                          >
                            {formatMoney(
                              cod,
                              t.currency
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
                          <InfoItem
                            label={t.store}
                            value={
                              ord.store ||
                              t.unspecified
                            }
                          />

                          <InfoItem
                            label={t.phone}
                            value={
                              ord.phone ||
                              t.unspecified
                            }
                          />

                          <div
                            style={
                              styles.fullWidth
                            }
                          >
                            <InfoItem
                              label={t.address}
                              value={
                                ord.address ||
                                t.unspecified
                              }
                            />
                          </div>

                          <div
                            style={
                              styles.fullWidth
                            }
                          >
                            <InfoItem
                              label={t.item}
                              value={
                                ord.item ||
                                t.unspecified
                              }
                            />
                          </div>
                        </div>

                        <FinancialBreakdown
                          orderValue={
                            orderValue
                          }
                          deliveryFee={
                            deliveryFee
                          }
                          cod={cod}
                          currency={
                            t.currency
                          }
                          t={t}
                        />

                        {ord.notes && (
                          <div
                            style={
                              styles.noteBox
                            }
                          >
                            📌 <strong>
                              {t.notes}:
                            </strong>{' '}
                            {ord.notes}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}

                <div
                  style={{
                    marginTop: '16px'
                  }}
                >
                  <label
                    style={styles.label}
                  >
                    {t.selectDriver}
                  </label>

                  <select
                    value={selectedDriver}
                    onChange={e =>
                      setSelectedDriver(
                        e.target.value
                      )
                    }
                    style={styles.input}
                  >
                    <option value="">
                      {t.chooseDriver}
                    </option>

                    {drivers.map(
                      (driver, i) => (
                        <option
                          key={i}
                          value={driver}
                        >
                          {driver}
                        </option>
                      )
                    )}
                  </select>
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
              <div
                style={styles.emptyState}
              >
                <div
                  style={styles.emptyIcon}
                >
                  📦
                </div>
                <p
                  style={styles.empty}
                >
                  {t.noOrders}
                </p>
              </div>
            ) : (
              filteredOrders.map(
                order => {
                  const orderValue =
                    getOrderValue(order);

                  const deliveryFee =
                    getOrderDeliveryFee(
                      order
                    );

                  const collected =
                    getOrderCollectedCash(
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
                        styles.orderCard
                      }
                    >
                      <div
                        style={
                          styles.rowBetween
                        }
                      >
                        <div
                          style={
                            styles.orderIdentity
                          }
                        >
                          <span
                            style={
                              styles.orderNumTag
                            }
                          >
                            {order.orderNum ||
                              '#1000'}
                          </span>

                          <span
                            style={
                              styles.tagStore
                            }
                          >
                            {order.store ||
                              t.unspecified}
                          </span>
                        </div>

                        <div
                          style={
                            styles.actionRow
                          }
                        >
                          <select
                            value={
                              order.status
                            }
                            onChange={e =>
                              handleStatusChange(
                                order,
                                e.target.value
                              )
                            }
                            style={getStatusStyle(
                              order.status
                            )}
                          >
                            {STATUS_KEYS.map(
                              status => (
                                <option
                                  key={
                                    status
                                  }
                                  value={
                                    status
                                  }
                                >
                                  {status}
                                </option>
                              )
                            )}
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
                            🗑️
                          </button>
                        </div>
                      </div>

                      <div
                        style={
                          styles.orderCustomerLine
                        }
                      >
                        <strong>
                          👤{' '}
                          {order.customer ||
                            t.unspecified}
                        </strong>

                        <span>
                          📞{' '}
                          {order.phone ||
                            t.unspecified}
                        </span>
                      </div>

                      {isIncompleteAddress(
                        order.address
                      ) && (
                        <div
                          style={
                            styles.addressWarningBox
                          }
                        >
                          {t.addressWarning}
                        </div>
                      )}

                      <p style={styles.p}>
                        <strong>
                          📍 {t.address}:
                        </strong>{' '}
                        {order.address ||
                          t.unspecified}
                      </p>

                      <p style={styles.p}>
                        <strong>
                          📦 {t.item}:
                        </strong>{' '}
                        {order.item ||
                          t.unspecified}
                      </p>

                      <div
                        style={
                          styles.financialPanel
                        }
                      >
                        <div
                          style={
                            styles.financialTitle
                          }
                        >
                          💰 {t.breakdown}
                        </div>

                        <div
                          style={
                            styles.financeGrid
                          }
                        >
                          <FinanceCell
                            label={
                              t.orderValue
                            }
                            value={formatMoney(
                              orderValue,
                              t.currency
                            )}
                          />

                          <FinanceCell
                            label={
                              t.deliveryFee
                            }
                            value={formatMoney(
                              deliveryFee,
                              t.currency
                            )}
                          />

                          <FinanceCell
                            label={t.collected}
                            value={formatMoney(
                              collected,
                              t.currency
                            )}
                            highlight
                          />

                          <FinanceCell
                            label={
                              t.handIn
                            }
                            value={formatMoney(
                              handIn,
                              t.currency
                            )}
                            highlight={
                              order.status !==
                              'ملغي'
                            }
                            danger={
                              order.status ===
                              'ملغي'
                            }
                          />
                        </div>
                      </div>

                      <div
                        style={
                          styles.noteBox
                        }
                      >
                        {editingNoteId ===
                        order.id ? (
                          <>
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
                              {t.saveBtn}
                            </button>
                          </>
                        ) : (
                          <div
                            style={
                              styles.rowBetween
                            }
                          >
                            <span>
                              📌{' '}
                              <strong>
                                {t.notes}:
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
                              ✏️
                            </button>
                          </div>
                        )}
                      </div>

                      <div
                        style={
                          styles.amountRow
                        }
                      >
                        <div>
                          <strong>
                            {t.cod}:{' '}
                          </strong>

                          {editingAmountId ===
                          order.id ? (
                            <span
                              style={
                                styles.inlineEdit
                              }
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
                                {t.saveAmount}
                              </button>
                            </span>
                          ) : (
                            <span
                              style={{
                                color:
                                  order.status ===
                                  'ملغي'
                                    ? '#f87171'
                                    : '#6ee7b7',
                                fontWeight: 900,
                                fontSize:
                                  '1.05rem',
                                textDecoration:
                                  order.status ===
                                  'ملغي'
                                    ? 'line-through'
                                    : 'none'
                              }}
                            >
                              {formatMoney(
                                collected,
                                t.currency
                              )}
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
                            ✏️ {t.editAmount}
                          </button>
                        )}
                      </div>

                      <div
                        style={
                          styles.orderFooter
                        }
                      >
                        <span>
                          🕒 {order.date}{' '}
                          ({order.isoDate})
                        </span>

                        <div
                          style={
                            styles.driverSelector
                          }
                        >
                          <span>
                            🛵{' '}
                            {t.driver}:
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
                            style={
                              styles.smallSelect
                            }
                          >
                            <option
                              value={
                                t.unspecified
                              }
                            >
                              {t.unspecified}
                            </option>

                            {drivers.map(
                              (
                                driver,
                                idx
                              ) => (
                                <option
                                  key={idx}
                                  value={
                                    driver
                                  }
                                >
                                  {driver}
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
              style={
                styles.heroLedger
              }
            >
              <div>
                <div
                  style={
                    styles.eyebrow
                  }
                >
                  DRIVER FINANCIAL CONTROL
                </div>

                <h2
                  style={
                    styles.heroLedgerTitle
                  }
                >
                  {t.driverLedgerTitle}
                </h2>

                <p
                  style={
                    styles.heroLedgerSubtitle
                  }
                >
                  {ledgerDriver ||
                    t.allDrivers}{' '}
                  · {ledgerDate}
                </p>
              </div>

              <div
                style={
                  styles.heroHandIn
                }
              >
                <span>
                  {t.handInSummary}
                </span>

                <strong>
                  {formatMoney(
                    dailyCashToHandIn,
                    t.currency
                  )}
                </strong>
              </div>
            </div>

            <div
              style={
                styles.card
              }
            >
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
                        e.target
                          .value
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
                      (driver, i) => (
                        <option
                          key={i}
                          value={driver}
                        >
                          {driver}
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

            <div
              style={
                styles.kpiRow
              }
            >
              <KpiCard
                icon="💵"
                title={
                  t.cashToHandIn
                }
                value={formatMoney(
                  dailyCashToHandIn,
                  t.currency
                )}
                gradient="linear-gradient(135deg,#065f46,#059669,#10b981)"
                accent="#6ee7b7"
              />

              <KpiCard
                icon="💳"
                title={
                  t.collected
                }
                value={formatMoney(
                  dailyCollected,
                  t.currency
                )}
                gradient="linear-gradient(135deg,#1e3a8a,#2563eb,#06b6d4)"
                accent="#93c5fd"
              />

              <KpiCard
                icon="🛵"
                title={
                  t.deliveryFee
                }
                value={formatMoney(
                  dailyDeliveryFees,
                  t.currency
                )}
                gradient="linear-gradient(135deg,#7c2d12,#ea580c,#f59e0b)"
                accent="#fed7aa"
              />

              <KpiCard
                icon="📦"
                title={
                  t.todaysOrdersCount
                }
                value={
                  filteredLedgerOrders.length
                }
                gradient="linear-gradient(135deg,#581c87,#7e22ce,#c026d3)"
                accent="#e9d5ff"
              />
            </div>

            <div
              style={{
                ...styles.card,
                marginTop: '18px'
              }}
            >
              <div
                style={
                  styles.sectionHeader
                }
              >
                <div>
                  <div
                    style={
                      styles.eyebrow
                    }
                  >
                    DAILY HANDOVER
                  </div>

                  <h3
                    style={
                      styles.sectionTitle
                    }
                  >
                    {t.driverLedgerHistory}
                  </h3>
                </div>

                <div
                  style={
                    styles.totalPill
                  }
                >
                  💵{' '}
                  {formatMoney(
                    dailyCashToHandIn,
                    t.currency
                  )}
                </div>
              </div>

              {filteredLedgerOrders.length ===
              0 ? (
                <div
                  style={
                    styles.emptyState
                  }
                >
                  <div
                    style={
                      styles.emptyIcon
                    }
                  >
                    📭
                  </div>

                  <p
                    style={
                      styles.empty
                    }
                  >
                    {t.noOrdersForDate}
                  </p>
                </div>
              ) : (
                <div
                  style={
                    styles.ledgerList
                  }
                >
                  {filteredLedgerOrders.map(
                    order => {
                      const orderValue =
                        getOrderValue(
                          order
                        );

                      const deliveryFee =
                        getOrderDeliveryFee(
                          order
                        );

                      const collected =
                        getOrderCollectedCash(
                          order
                        );

                      const handIn =
                        getOrderEffectiveCash(
                          order
                        );

                      const cancelled =
                        order.status ===
                        'ملغي';

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
                              styles.ledgerOrderHeader
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

                              <strong
                                style={{
                                  marginInlineStart:
                                    '8px'
                                }}
                              >
                                {order.customer ||
                                  t.unspecified}
                              </strong>

                              <div
                                style={
                                  styles.miniMeta
                                }
                              >
                                🏪{' '}
                                {order.store ||
                                  t.unspecified}
                                {' · '}
                                📞{' '}
                                {order.phone ||
                                  t.unspecified}
                              </div>
                            </div>

                            <span
                              style={getStatusStyle(
                                order.status
                              )}
                            >
                              {order.status}
                            </span>
                          </div>

                          <div
                            style={
                              styles.breakdownGrid
                            }
                          >
                            <BreakdownItem
                              icon="📦"
                              label={
                                t.orderValue
                              }
                              value={formatMoney(
                                orderValue,
                                t.currency
                              )}
                            />

                            <BreakdownItem
                              icon="🛵"
                              label={
                                t.deliveryFee
                              }
                              value={formatMoney(
                                deliveryFee,
                                t.currency
                              )}
                              secondary
                            />

                            <BreakdownItem
                              icon="💳"
                              label={
                                t.collected
                              }
                              value={formatMoney(
                                collected,
                                t.currency
                              )}
                              highlight
                            />

                            <BreakdownItem
                              icon="💵"
                              label={
                                t.driverMustHandIn
                              }
                              value={
                                cancelled
                                  ? t.cancelledZero
                                  : formatMoney(
                                      handIn,
                                      t.currency
                                    )
                              }
                              danger={
                                cancelled
                              }
                              highlight={
                                !cancelled
                              }
                            />
                          </div>

                          {!cancelled &&
                            deliveryFee >
                              0 && (
                              <div
                                style={
                                  styles.driverEarningsBar
                                }
                              >
                                <span>
                                  🛵{' '}
                                  {
                                    t.driverKeeps
                                  }
                                </span>

                                <strong>
                                  {formatMoney(
                                    deliveryFee,
                                    t.currency
                                  )}
                                </strong>
                              </div>
                            )}

                          {cancelled && (
                            <div
                              style={
                                styles.cancelledBar
                              }
                            >
                              🚫{' '}
                              {
                                t.cancelledZero
                              }
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            <div
              style={{
                ...styles.card,
                marginTop: '18px'
              }}
            >
              <div
                style={
                  styles.sectionHeader
                }
              >
                <h3
                  style={
                    styles.sectionTitle
                  }
                >
                  📅 {t.monthsTotalCash}
                </h3>

                <div
                  style={
                    styles.monthlyBadge
                  }
                >
                  {selectedYearMonth}
                </div>
              </div>

              <div
                style={
                  styles.monthSummary
                }
              >
                <div>
                  <span>
                    {t.collected}
                  </span>

                  <strong>
                    {formatMoney(
                      monthlyTotalCash,
                      t.currency
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    {t.monthsOrdersCount}
                  </span>

                  <strong>
                    {
                      monthlyOrders.length
                    }
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === 'history' && (
          <div style={styles.card}>
            <div
              style={
                styles.sectionHeader
              }
            >
              <div>
                <div
                  style={
                    styles.eyebrow
                  }
                >
                  SYSTEM AUDIT TRAIL
                </div>

                <h2
                  style={
                    styles.sectionTitle
                  }
                >
                  {t.historyTitle}
                </h2>
              </div>

              <span
                style={
                  styles.orderCountBadge
                }
              >
                {historyLogs.length}
              </span>
            </div>

            {historyLogs.length ===
            0 ? (
              <p
                style={
                  styles.empty
                }
              >
                {t.noHistory}
              </p>
            ) : (
              <div
                style={
                  styles.historyList
                }
              >
                {historyLogs.map(
                  log => (
                    <div
                      key={log.id}
                      style={
                        styles.historyCard
                      }
                    >
                      <div
                        style={
                          styles.rowBetween
                        }
                      >
                        <span
                          style={
                            styles.orderNumTag
                          }
                        >
                          {
                            log.orderNum
                          }
                        </span>

                        <span
                          style={
                            styles.historyTime
                          }
                        >
                          🕒 {log.time}
                        </span>
                      </div>

                      <p
                        style={
                          styles.historyAction
                        }
                      >
                        {log.action}
                      </p>

                      <p
                        style={
                          styles.historyDetails
                        }
                      >
                        {log.details}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* DRIVERS */}
        {activeTab === 'drivers' && (
          <div>
            <div
              style={
                styles.card
              }
            >
              <div
                style={
                  styles.cardHeaderFancy
                }
              >
                <div>
                  <div
                    style={
                      styles.eyebrow
                    }
                  >
                    FLEET MANAGEMENT
                  </div>

                  <h3
                    style={
                      styles.sectionTitle
                    }
                  >
                    {t.addDriver}
                  </h3>
                </div>
              </div>

              <div
                style={
                  styles.addDriverRow
                }
              >
                <input
                  type="text"
                  placeholder={
                    t.driverName
                  }
                  value={
                    newDriverName
                  }
                  onChange={e =>
                    setNewDriverName(
                      e.target.value
                    )
                  }
                  style={
                    styles.input
                  }
                />

                <button
                  onClick={() => {
                    const name =
                      newDriverName.trim();

                    if (
                      name &&
                      !drivers.includes(
                        name
                      )
                    ) {
                      setDrivers(prev => [
                        ...prev,
                        name
                      ]);

                      setNewDriverName(
                        ''
                      );
                    }
                  }}
                  style={
                    styles.btnPrimaryGradient
                  }
                >
                  {t.btnAdd}
                </button>
              </div>
            </div>

            <div
              style={
                styles.grid2
              }
            >
              {driverStats.map(
                stats => (
                  <div
                    key={
                      stats.driverName
                    }
                    style={
                      styles.driverCard
                    }
                  >
                    <div
                      style={
                        styles.driverAvatar
                      }
                    >
                      🛵
                    </div>

                    <div
                      style={
                        styles.rowBetween
                      }
                    >
                      <h3
                        style={
                          styles.driverName
                        }
                      >
                        {
                          stats.driverName
                        }
                      </h3>

                      <button
                        onClick={() =>
                          setDrivers(
                            prev =>
                              prev.filter(
                                d =>
                                  d !==
                                  stats.driverName
                              )
                          )
                        }
                        style={
                          styles.btnDeleteCompact
                        }
                      >
                        🗑️
                      </button>
                    </div>

                    <div
                      style={
                        styles.driverMetricGrid
                      }
                    >
                      <DriverMetric
                        label={
                          t.totalTrips
                        }
                        value={
                          stats.totalTrips
                        }
                      />

                      <DriverMetric
                        label={
                          t.deliveredTrips
                        }
                        value={
                          stats.completedTrips
                        }
                      />

                      <DriverMetric
                        label={
                          t.totalCollected
                        }
                        value={formatMoney(
                          stats.collected,
                          t.currency
                        )}
                      />

                      <DriverMetric
                        label={
                          t.driverCash
                        }
                        value={formatMoney(
                          stats.handIn,
                          t.currency
                        )}
                        accent
                      />
                    </div>

                    <div
                      style={
                        styles.driverFeeBar
                      }
                    >
                      🛵{' '}
                      {t.totalDeliveryFees}:{' '}
                      <strong>
                        {formatMoney(
                          stats.deliveryFees,
                          t.currency
                        )}
                      </strong>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* MERCHANTS */}
        {activeTab ===
          'merchants' && (
          <div>
            <div
              style={
                styles.card
              }
            >
              <h3>
                {t.saveMerchant}
              </h3>

              <input
                type="text"
                placeholder="Store Name..."
                value={
                  merchantForm.name
                }
                onChange={e =>
                  setMerchantForm({
                    ...merchantForm,
                    name: e.target
                      .value
                  })
                }
                style={
                  styles.inputMargin
                }
              />

              <input
                type="text"
                placeholder="Store Phone..."
                value={
                  merchantForm.phone
                }
                onChange={e =>
                  setMerchantForm({
                    ...merchantForm,
                    phone: e.target
                      .value
                  })
                }
                style={
                  styles.inputMargin
                }
              />

              <input
                type="text"
                placeholder="Store Address..."
                value={
                  merchantForm.address
                }
                onChange={e =>
                  setMerchantForm({
                    ...merchantForm,
                    address: e.target
                      .value
                  })
                }
                style={
                  styles.inputMargin
                }
              />

              <textarea
                rows={2}
                placeholder="Store Notes..."
                value={
                  merchantForm.notes
                }
                onChange={e =>
                  setMerchantForm({
                    ...merchantForm,
                    notes: e.target
                      .value
                  })
                }
                style={
                  styles.textareaMargin
                }
              />

              <button
                onClick={() => {
                  if (
                    !merchantForm.name.trim()
                  ) {
                    return alert(
                      'Merchant name required'
                    );
                  }

                  if (merchantForm.id) {
                    setMerchants(
                      prev =>
                        prev.map(m =>
                          m.id ===
                          merchantForm.id
                            ? merchantForm
                            : m
                        )
                    );
                  } else {
                    setMerchants(
                      prev => [
                        {
                          id: Date.now(),
                          ...merchantForm,
                          totalOrders: 0
                        },
                        ...prev
                      ]
                    );
                  }

                  setMerchantForm({
                    id: null,
                    name: '',
                    phone: '',
                    address: '',
                    notes: ''
                  });
                }}
                style={
                  styles.btnSuccessGradient
                }
              >
                {t.saveBtn}
              </button>
            </div>

            <div
              style={
                styles.grid2
              }
            >
              {merchants.map(
                merchant => (
                  <div
                    key={
                      merchant.id
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
                      <h3
                        style={{
                          margin: 0,
                          color: '#facc15'
                        }}
                      >
                        🏪{' '}
                        {
                          merchant.name
                        }
                      </h3>

                      <button
                        onClick={() =>
                          setMerchantForm(
                            merchant
                          )
                        }
                        style={
                          styles.btnEditCompact
                        }
                      >
                        {t.editBtn}
                      </button>
                    </div>

                    <p
                      style={
                        styles.mutedLine
                      }
                    >
                      📞{' '}
                      {merchant.phone ||
                        t.unspecified}
                    </p>

                    <p
                      style={
                        styles.mutedLine
                      }
                    >
                      📍{' '}
                      {merchant.address ||
                        t.unspecified}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* CUSTOMERS */}
        {activeTab ===
          'customers' && (
          <div>
            <div
              style={
                styles.card
              }
            >
              <h3>
                {editingCustomer
                  ? t.editCustomer
                  : t.saveCustomer}
              </h3>

              <input
                type="text"
                placeholder={
                  t.customer
                }
                value={
                  newCustomer.name
                }
                onChange={e =>
                  setNewCustomer({
                    ...newCustomer,
                    name: e.target
                      .value
                  })
                }
                style={
                  styles.inputMargin
                }
              />

              <input
                type="text"
                placeholder={
                  t.phone
                }
                value={
                  newCustomer.phone
                }
                onChange={e =>
                  setNewCustomer({
                    ...newCustomer,
                    phone: e.target
                      .value
                  })
                }
                style={
                  styles.inputMargin
                }
              />

              <input
                type="text"
                placeholder={
                  t.address
                }
                value={
                  newCustomer.address
                }
                onChange={e =>
                  setNewCustomer({
                    ...newCustomer,
                    address: e.target
                      .value
                  })
                }
                style={
                  styles.inputMargin
                }
              />

              <button
                onClick={
                  handleSaveCustomerExplicit
                }
                style={
                  styles.btnSuccessGradient
                }
              >
                {t.saveBtn}
              </button>
            </div>

            <div
              style={
                styles.grid2
              }
            >
              {customers.map(
                customer => (
                  <div
                    key={
                      customer.id
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
                      <h3
                        style={{
                          margin: 0,
                          color: '#c084fc'
                        }}
                      >
                        👤{' '}
                        {
                          customer.name
                        }
                      </h3>

                      <button
                        onClick={() => {
                          setEditingCustomer(
                            customer
                          );

                          setNewCustomer({
                            name:
                              customer.name ||
                              '',
                            phone:
                              customer.phone ||
                              '',
                            address:
                              customer.address ||
                              ''
                          });
                        }}
                        style={
                          styles.btnEditCompact
                        }
                      >
                        {t.editBtn}
                      </button>
                    </div>

                    <p
                      style={
                        styles.mutedLine
                      }
                    >
                      📞{' '}
                      {customer.phone}
                    </p>

                    <p
                      style={
                        styles.mutedLine
                      }
                    >
                      📍{' '}
                      {customer.address}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab ===
          'settings' && (
          <div
            style={
              styles.card
            }
          >
            <div
              style={
                styles.eyebrow
              }
            >
              SYSTEM CONFIGURATION
            </div>

            <h2>
              {t.settingsTitle}
            </h2>

            <label
              style={
                styles.label
              }
            >
              Groq API Key:
            </label>

            <input
              type="password"
              value={apiKey}
              onChange={e =>
                setApiKey(
                  e.target.value
                )
              }
              placeholder="gsk_..."
              style={
                styles.input
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function KpiCard({
  icon,
  title,
  value,
  gradient,
  accent
}) {
  return (
    <div
      style={{
        ...styles.kpiCard,
        background: gradient
      }}
    >
      <div
        style={
          styles.kpiIcon
        }
      >
        {icon}
      </div>

      <span
        style={
          styles.kpiLabel
        }
      >
        {title}
      </span>

      <span
        style={{
          ...styles.kpiValue,
          color: accent
        }}
      >
        {value}
      </span>

      <div
        style={
          styles.kpiShine
        }
      />
    </div>
  );
}

function NavButton({
  active,
  onClick,
  children
}) {
  return (
    <button
      style={
        active
          ? styles.activeTab
          : styles.tab
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function InfoItem({
  label,
  value
}) {
  return (
    <div
      style={
        styles.infoItem
      }
    >
      <span
        style={
          styles.infoLabel
        }
      >
        {label}
      </span>

      <strong>
        {value}
      </strong>
    </div>
  );
}

function FinancialBreakdown({
  orderValue,
  deliveryFee,
  cod,
  currency,
  t
}) {
  const handIn =
    orderValue > 0
      ? orderValue
      : Math.max(
          0,
          cod - deliveryFee
        );

  return (
    <div
      style={
        styles.financialPanel
      }
    >
      <div
        style={
          styles.financialTitle
        }
      >
        💰 {t.breakdown}
      </div>

      <div
        style={
          styles.financeGrid
        }
      >
        <FinanceCell
          label={t.orderValue}
          value={formatMoney(
            orderValue,
            currency
          )}
        />

        <FinanceCell
          label={t.deliveryFee}
          value={formatMoney(
            deliveryFee,
            currency
          )}
        />

        <FinanceCell
          label={t.collected}
          value={formatMoney(
            cod,
            currency
          )}
          highlight
        />

        <FinanceCell
          label={t.handIn}
          value={formatMoney(
            handIn,
            currency
          )}
          highlight
        />
      </div>
    </div>
  );
}

function FinanceCell({
  label,
  value,
  highlight,
  danger
}) {
  return (
    <div
      style={{
        ...styles.financeCell,
        ...(highlight
          ? styles.financeHighlight
          : {}),
        ...(danger
          ? styles.financeDanger
          : {})
      }}
    >
      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>
    </div>
  );
}

function BreakdownItem({
  icon,
  label,
  value,
  secondary,
  highlight,
  danger
}) {
  return (
    <div
      style={{
        ...styles.breakdownItem,
        ...(secondary
          ? styles.breakdownSecondary
          : {}),
        ...(highlight
          ? styles.breakdownHighlight
          : {}),
        ...(danger
          ? styles.breakdownDanger
          : {})
      }}
    >
      <div
        style={
          styles.breakdownIcon
        }
      >
        {icon}
      </div>

      <div>
        <span
          style={
            styles.breakdownLabel
          }
        >
          {label}
        </span>

        <strong
          style={
            styles.breakdownValue
          }
        >
          {value}
        </strong>
      </div>
    </div>
  );
}

function DriverMetric({
  label,
  value,
  accent
}) {
  return (
    <div
      style={
        styles.driverMetric
      }
    >
      <span>
        {label}
      </span>

      <strong
        style={{
          color: accent
            ? '#6ee7b7'
            : '#f8fafc'
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '18px',
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background:
      'radial-gradient(circle at 10% 0%, rgba(59,130,246,.12), transparent 28%), radial-gradient(circle at 90% 20%, rgba(168,85,247,.10), transparent 30%), #070b14',
    color: '#f8fafc',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  },

  backgroundGlowOne: {
    position: 'fixed',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(37,99,235,.13), transparent 70%)',
    top: '-180px',
    left: '-120px',
    pointerEvents: 'none'
  },

  backgroundGlowTwo: {
    position: 'fixed',
    width: '420px',
    height: '420px',
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(168,85,247,.10), transparent 70%)',
    bottom: '-180px',
    right: '-150px',
    pointerEvents: 'none'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    background:
      'linear-gradient(135deg, rgba(30,41,59,.94), rgba(15,23,42,.88))',
    padding: '20px 22px',
    borderRadius: '22px',
    border:
      '1px solid rgba(148,163,184,.18)',
    boxShadow:
      '0 20px 60px rgba(0,0,0,.28)',
    backdropFilter: 'blur(18px)',
    position: 'relative',
    zIndex: 2
  },

  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '13px'
  },

  brandIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.55rem',
    background:
      'linear-gradient(135deg,#0ea5e9,#6366f1,#a855f7)',
    boxShadow:
      '0 10px 30px rgba(99,102,241,.35)'
  },

  headerRight: {
    display: 'flex',
    gap: '9px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  appTitle: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 900,
    background:
      'linear-gradient(90deg,#38bdf8,#818cf8,#c084fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  appSubtitle: {
    margin: '5px 0 0',
    fontSize: '.82rem',
    color: '#94a3b8'
  },

  badge: {
    padding: '7px 13px',
    borderRadius: '999px',
    fontSize: '.78rem',
    fontWeight: 800,
    color: '#fff',
    border:
      '1px solid rgba(255,255,255,.12)'
  },

  badgeSuccess: {
    background:
      'linear-gradient(135deg,#047857,#10b981)'
  },

  badgeDanger: {
    background:
      'linear-gradient(135deg,#b91c1c,#ef4444)'
  },

  langBtn: {
    padding: '7px 13px',
    background:
      'rgba(51,65,85,.75)',
    color: '#fff',
    border:
      '1px solid rgba(148,163,184,.25)',
    borderRadius: '999px',
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: '.78rem'
  },

  kpiRow: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(4, minmax(0,1fr))',
    gap: '13px',
    marginTop: '18px',
    position: 'relative',
    zIndex: 1
  },

  kpiCard: {
    minHeight: '125px',
    border:
      '1px solid rgba(255,255,255,.10)',
    padding: '16px 18px',
    borderRadius: '18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow:
      '0 15px 35px rgba(0,0,0,.22)',
    position: 'relative',
    overflow: 'hidden'
  },

  kpiIcon: {
    fontSize: '1.15rem',
    marginBottom: '5px'
  },

  kpiLabel: {
    fontSize: '.75rem',
    color: '#dbeafe',
    fontWeight: 800
  },

  kpiValue: {
    fontSize: '1.35rem',
    fontWeight: 950,
    marginTop: '4px'
  },

  kpiShine: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background:
      'rgba(255,255,255,.08)',
    right: '-35px',
    bottom: '-40px'
  },

  nav: {
    display: 'flex',
    gap: '7px',
    marginTop: '18px',
    overflowX: 'auto',
    paddingBottom: '6px',
    position: 'relative',
    zIndex: 2
  },

  tab: {
    padding: '10px 13px',
    border:
      '1px solid rgba(71,85,105,.55)',
    background:
      'rgba(30,41,59,.72)',
    borderRadius: '11px',
    cursor: 'pointer',
    fontWeight: 800,
    color: '#94a3b8',
    whiteSpace: 'nowrap',
    fontSize: '.78rem',
    backdropFilter: 'blur(12px)'
  },

  activeTab: {
    padding: '10px 13px',
    border: 'none',
    background:
      'linear-gradient(135deg,#0284c7,#4f46e5,#7c3aed)',
    borderRadius: '11px',
    cursor: 'pointer',
    fontWeight: 900,
    color: '#fff',
    whiteSpace: 'nowrap',
    fontSize: '.78rem',
    boxShadow:
      '0 8px 22px rgba(79,70,229,.35)'
  },

  main: {
    marginTop: '18px',
    position: 'relative',
    zIndex: 1
  },

  card: {
    background:
      'linear-gradient(145deg, rgba(19,28,46,.96), rgba(11,18,32,.96))',
    padding: '20px',
    borderRadius: '20px',
    border:
      '1px solid rgba(51,65,85,.65)',
    marginBottom: '16px',
    boxShadow:
      '0 18px 50px rgba(0,0,0,.22)',
    backdropFilter: 'blur(18px)'
  },

  orderCard: {
    background:
      'linear-gradient(145deg, rgba(19,28,46,.98), rgba(9,15,27,.98))',
    padding: '18px',
    borderRadius: '20px',
    border:
      '1px solid rgba(71,85,105,.55)',
    marginBottom: '14px',
    boxShadow:
      '0 15px 40px rgba(0,0,0,.20)'
  },

  cardHeaderFancy: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '14px'
  },

  eyebrow: {
    color: '#38bdf8',
    fontSize: '.65rem',
    fontWeight: 900,
    letterSpacing: '1.6px',
    marginBottom: '4px'
  },

  cardTitle: {
    margin: 0,
    fontSize: '1.2rem'
  },

  sectionTitle: {
    margin: 0,
    color: '#f8fafc',
    fontSize: '1.05rem'
  },

  textarea: {
    width: '100%',
    padding: '14px',
    borderRadius: '13px',
    border:
      '1px solid rgba(71,85,105,.7)',
    background:
      'linear-gradient(145deg,#0a0f1d,#0f172a)',
    color: '#fff',
    boxSizing: 'border-box',
    fontSize: '.95rem',
    outline: 'none',
    resize: 'vertical'
  },

  textareaMargin: {
    width: '100%',
    padding: '10px',
    borderRadius: '9px',
    border:
      '1px solid #334155',
    background: '#0a0f1d',
    color: '#fff',
    boxSizing: 'border-box',
    marginBottom: '10px'
  },

  input: {
    width: '100%',
    padding: '11px',
    borderRadius: '10px',
    border:
      '1px solid #334155',
    background: '#080e19',
    color: '#fff',
    boxSizing: 'border-box',
    outline: 'none'
  },

  inlineInput: {
    width: '80px',
    padding: '5px 8px',
    borderRadius: '7px',
    border:
      '1px solid #38bdf8',
    background: '#080e19',
    color: '#fff',
    fontWeight: 'bold'
  },

  inputMargin: {
    width: '100%',
    padding: '11px',
    borderRadius: '10px',
    border:
      '1px solid #334155',
    background: '#080e19',
    color: '#fff',
    boxSizing: 'border-box',
    marginBottom: '10px'
  },

  searchInput: {
    width: '100%',
    padding: '14px',
    borderRadius: '13px',
    border:
      '1px solid #2563eb',
    background:
      'linear-gradient(145deg,#0f172a,#0a0f1d)',
    color: '#fff',
    boxSizing: 'border-box',
    marginBottom: '18px',
    fontSize: '.95rem',
    outline: 'none'
  },

  label: {
    display: 'block',
    fontWeight: 800,
    marginBottom: '7px',
    color: '#cbd5e1'
  },

  btnPrimaryGradient: {
    width: '100%',
    padding: '12px',
    background:
      'linear-gradient(135deg,#0284c7,#4f46e5,#7c3aed)',
    color: '#fff',
    border: 'none',
    borderRadius: '11px',
    fontSize: '.95rem',
    fontWeight: 900,
    cursor: 'pointer',
    marginTop: '12px',
    boxShadow:
      '0 10px 25px rgba(79,70,229,.28)'
  },

  btnGradientCompact: {
    padding: '8px 13px',
    background:
      'linear-gradient(135deg,#334155,#475569)',
    color: '#67e8f9',
    border:
      '1px solid #0284c7',
    borderRadius: '9px',
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: '.78rem'
  },

  btnSuccessGradient: {
    width: '100%',
    padding: '12px',
    background:
      'linear-gradient(135deg,#059669,#10b981,#14b8a6)',
    color: '#fff',
    border: 'none',
    borderRadius: '11px',
    fontSize: '.95rem',
    fontWeight: 900,
    cursor: 'pointer',
    marginTop: '12px',
    boxShadow:
      '0 10px 25px rgba(16,185,129,.22)'
  },

  btnDeleteCompact: {
    background:
      'linear-gradient(135deg,#dc2626,#be123c)',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '.8rem',
    fontWeight: 900
  },

  btnEditCompact: {
    background:
      'linear-gradient(135deg,#0284c7,#4f46e5)',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize: '.78rem',
    fontWeight: 900
  },

  btnSaveCompact: {
    background:
      'linear-gradient(135deg,#059669,#10b981)',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '7px',
    cursor: 'pointer',
    fontSize: '.78rem',
    fontWeight: 900
  },

  extractedBox: {
    background:
      'linear-gradient(145deg,#090f1c,#101827)',
    border:
      '1px solid #334155',
    padding: '17px',
    borderRadius: '15px',
    marginTop: '17px'
  },

  extractedSubCard: {
    border:
      '1px solid rgba(71,85,105,.55)',
    padding: '15px',
    borderRadius: '14px',
    marginBottom: '13px',
    background:
      'linear-gradient(145deg,#131c2e,#0e1727)'
  },

  orderCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '13px'
  },

  orderIndex: {
    display: 'inline-block',
    padding: '3px 8px',
    borderRadius: '999px',
    background:
      'linear-gradient(135deg,#4f46e5,#7c3aed)',
    fontSize: '.7rem',
    fontWeight: 900,
    marginInlineEnd: '7px'
  },

  customerTitle: {
    display: 'inline',
    color: '#67e8f9',
    margin: 0
  },

  collectedPill: {
    padding: '7px 11px',
    borderRadius: '999px',
    background:
      'linear-gradient(135deg,#047857,#10b981)',
    color: '#fff',
    fontWeight: 900,
    fontSize: '.78rem'
  },

  addressWarningBox: {
    background:
      'linear-gradient(135deg,#7f1d1d,#991b1b)',
    border:
      '1px solid #f87171',
    padding: '8px 11px',
    borderRadius: '9px',
    color: '#fecaca',
    fontWeight: 800,
    fontSize: '.82rem',
    marginBottom: '10px'
  },

  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor:
      'rgba(0,0,0,.78)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(8px)'
  },

  modalCard: {
    background:
      'linear-gradient(145deg,#182337,#0b1220)',
    border:
      '1px solid #ca8a04',
    padding: '23px',
    borderRadius: '18px',
    maxWidth: '420px',
    width: '90%',
    boxShadow:
      '0 30px 90px rgba(0,0,0,.5)'
  },

  modalIcon: {
    fontSize: '2rem',
    marginBottom: '8px'
  },

  modalTitle: {
    margin: '0 0 12px',
    color: '#facc15'
  },

  typoList: {
    paddingInlineStart: '20px',
    color: '#fca5a5',
    lineHeight: 1.8
  },

  grid2: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(2,minmax(0,1fr))',
    gap: '12px'
  },

  fullWidth: {
    gridColumn: '1 / -1'
  },

  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px'
  },

  orderIdentity: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  actionRow: {
    display: 'flex',
    gap: '7px',
    alignItems: 'center'
  },

  orderNumTag: {
    background:
      'linear-gradient(135deg,#7c3aed,#4c1d95)',
    color: '#fff',
    padding: '4px 9px',
    borderRadius: '7px',
    fontWeight: 900,
    fontSize: '.78rem'
  },

  tagStore: {
    background:
      'linear-gradient(135deg,#0369a1,#0e7490)',
    color: '#fff',
    padding: '4px 9px',
    borderRadius: '7px',
    fontWeight: 900,
    fontSize: '.78rem'
  },

  orderCustomerLine: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    flexWrap: 'wrap',
    padding: '9px 11px',
    borderRadius: '10px',
    background:
      'rgba(30,41,59,.55)',
    color: '#cbd5e1',
    marginBottom: '10px'
  },

  p: {
    margin: '7px 0',
    color: '#cbd5e1',
    lineHeight: 1.55
  },

  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    padding: '9px',
    background:
      'rgba(15,23,42,.65)',
    borderRadius: '9px'
  },

  infoLabel: {
    fontSize: '.7rem',
    color: '#64748b',
    fontWeight: 800
  },

  financialPanel: {
    margin: '12px 0',
    padding: '12px',
    borderRadius: '13px',
    background:
      'linear-gradient(145deg,rgba(15,23,42,.95),rgba(30,41,59,.75))',
    border:
      '1px solid rgba(56,189,248,.14)'
  },

  financialTitle: {
    fontSize: '.75rem',
    fontWeight: 900,
    color: '#67e8f9',
    marginBottom: '9px'
  },

  financeGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(4,minmax(0,1fr))',
    gap: '7px'
  },

  financeCell: {
    padding: '9px',
    borderRadius: '9px',
    background:
      'rgba(30,41,59,.55)',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },

  financeHighlight: {
    border:
      '1px solid rgba(16,185,129,.28)'
  },

  financeDanger: {
    border:
      '1px solid rgba(239,68,68,.35)'
  },

  noteBox: {
    background:
      'rgba(250,204,21,.06)',
    padding: '10px',
    borderRadius: '9px',
    border:
      '1px solid rgba(250,204,21,.16)',
    color: '#fde68a',
    margin: '10px 0',
    fontSize: '.84rem'
  },

  amountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    margin: '10px 0',
    padding: '9px 12px',
    background: '#080e19',
    borderRadius: '9px',
    border:
      '1px solid #1e293b'
  },

  inlineEdit: {
    display: 'inline-flex',
    gap: '5px',
    alignItems: 'center'
  },

  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '10px',
    paddingTop: '10px',
    borderTop:
      '1px solid rgba(51,65,85,.55)',
    fontSize: '.78rem',
    color: '#64748b'
  },

  driverSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },

  smallSelect: {
    padding: '5px 8px',
    borderRadius: '7px',
    border:
      '1px solid #334155',
    background: '#080e19',
    color: '#fff'
  },

  empty: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: '10px'
  },

  emptyState: {
    padding: '50px 20px',
    textAlign: 'center'
  },

  emptyIcon: {
    fontSize: '2.5rem',
    opacity: .65
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '14px'
  },

  orderCountBadge: {
    padding: '5px 9px',
    borderRadius: '999px',
    background:
      'linear-gradient(135deg,#4f46e5,#7c3aed)',
    fontSize: '.72rem',
    fontWeight: 900
  },

  heroLedger: {
    padding: '23px',
    borderRadius: '22px',
    background:
      'linear-gradient(135deg,#0f766e,#0284c7,#4f46e5,#7c3aed)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '16px',
    boxShadow:
      '0 20px 60px rgba(37,99,235,.25)',
    overflow: 'hidden',
    position: 'relative'
  },

  heroLedgerTitle: {
    margin: 0,
    fontSize: '1.35rem',
    fontWeight: 950
  },

  heroLedgerSubtitle: {
    margin: '6px 0 0',
    color: '#dbeafe',
    fontSize: '.8rem'
  },

  heroHandIn: {
    minWidth: '190px',
    padding: '14px 17px',
    borderRadius: '15px',
    background:
      'rgba(0,0,0,.18)',
    border:
      '1px solid rgba(255,255,255,.16)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },

  heroHandIn: {
    minWidth: '190px',
    padding: '14px 17px',
    borderRadius: '15px',
    background:
      'rgba(0,0,0,.18)',
    border:
      '1px solid rgba(255,255,255,.16)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },

  ledgerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '11px'
  },

  ledgerOrderCard: {
    padding: '15px',
    borderRadius: '15px',
    background:
      'linear-gradient(145deg,#101a2c,#0a111e)',
    border:
      '1px solid rgba(71,85,105,.6)',
    boxShadow:
      '0 8px 25px rgba(0,0,0,.15)'
  },

  ledgerOrderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  },

  miniMeta: {
    color: '#64748b',
    fontSize: '.72rem',
    marginTop: '5px'
  },

  breakdownGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(4,minmax(0,1fr))',
    gap: '8px'
  },

  breakdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    borderRadius: '11px',
    background:
      'rgba(30,41,59,.65)',
    border:
      '1px solid rgba(71,85,105,.45)'
  },

  breakdownSecondary: {
    background:
      'rgba(14,116,144,.10)'
  },

  breakdownHighlight: {
    border:
      '1px solid rgba(16,185,129,.32)',
    background:
      'rgba(16,185,129,.08)'
  },

  breakdownDanger: {
    border:
      '1px solid rgba(239,68,68,.32)',
    background:
      'rgba(239,68,68,.08)'
  },

  breakdownIcon: {
    fontSize: '1.05rem'
  },

  breakdownLabel: {
    display: 'block',
    color: '#64748b',
    fontSize: '.68rem',
    fontWeight: 800
  },

  breakdownValue: {
    display: 'block',
    marginTop: '2px',
    fontSize: '.86rem'
  },

  driverEarningsBar: {
    marginTop: '9px',
    padding: '8px 10px',
    borderRadius: '9px',
    background:
      'linear-gradient(90deg,rgba(16,185,129,.08),rgba(6,182,212,.08))',
    border:
      '1px solid rgba(16,185,129,.18)',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#a7f3d0',
    fontSize: '.76rem'
  },

  cancelledBar: {
    marginTop: '9px',
    padding: '8px 10px',
    borderRadius: '9px',
    background:
      'rgba(239,68,68,.08)',
    border:
      '1px solid rgba(239,68,68,.22)',
    color: '#fca5a5',
    fontWeight: 800,
    fontSize: '.76rem'
  },

  totalPill: {
    padding: '8px 12px',
    borderRadius: '999px',
    background:
      'linear-gradient(135deg,#047857,#10b981)',
    fontWeight: 900,
    fontSize: '.78rem'
  },

  monthlyBadge: {
    padding: '6px 10px',
    borderRadius: '8px',
    background:
      'rgba(124,58,237,.15)',
    color: '#c4b5fd',
    fontWeight: 900
  },

  monthSummary: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(2,1fr)',
    gap: '10px'
  },

  monthSummary: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(2,1fr)',
    gap: '10px'
  },

  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '9px'
  },

  historyCard: {
    background:
      'linear-gradient(145deg,#0d1524,#080e19)',
    border:
      '1px solid #1e293b',
    padding: '12px 15px',
    borderRadius: '11px'
  },

  historyTime: {
    fontSize: '.72rem',
    color: '#64748b'
  },

  historyAction: {
    margin: '5px 0',
    color: '#facc15',
    fontWeight: 900,
    fontSize: '.82rem'
  },

  historyDetails: {
    margin: 0,
    color: '#cbd5e1',
    fontSize: '.82rem'
  },

  addDriverRow: {
    display: 'grid',
    gridTemplateColumns:
      '1fr 160px',
    gap: '10px',
    alignItems: 'center'
  },

  driverCard: {
    background:
      'linear-gradient(145deg,#131c2e,#0b1220)',
    padding: '18px',
    borderRadius: '18px',
    border:
      '1px solid rgba(71,85,105,.55)',
    boxShadow:
      '0 15px 40px rgba(0,0,0,.18)'
  },

  driverAvatar: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '14px',
    background:
      'linear-gradient(135deg,#0284c7,#4f46e5)',
    fontSize: '1.4rem',
    marginBottom: '10px'
  },

  driverName: {
    margin: 0,
    color: '#67e8f9',
    fontSize: '1.05rem'
  },

  driverMetricGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(2,1fr)',
    gap: '8px',
    marginTop: '10px'
  },

  driverMetric: {
    padding: '9px',
    borderRadius: '9px',
    background:
      'rgba(15,23,42,.75)',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },

  driverMetric: {
    padding: '9px',
    borderRadius: '9px',
    background:
      'rgba(15,23,42,.75)',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },

  driverFeeBar: {
    marginTop: '10px',
    padding: '9px',
    borderRadius: '9px',
    background:
      'rgba(245,158,11,.08)',
    color: '#fde68a',
    fontSize: '.78rem'
  },

  mutedLine: {
    color: '#94a3b8',
    margin: '7px 0',
    fontSize: '.82rem'
  }
};
