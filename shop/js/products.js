const CATEGORIES = [
  { id: 'solar', name: 'Solar & Green Energy', icon: '☀️' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'mobile', name: 'Mobile & Gadgets', icon: '📲' },
  { id: 'computing', name: 'Laptops & PCs', icon: '💻' },
  { id: 'audio', name: 'Audio & Headphones', icon: '🎧' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'smart', name: 'Smart Home', icon: '🏠' },
  { id: 'accessories', name: 'Accessories', icon: '🔌' },
];

const PRODUCTS = [
  { id: 1, name: 'Jinko Tiger Neo 625W Bifacial Solar Panel (Pre-Order)', category: 'solar', price: 15499, oldPrice: 16500, badge: 'hot', emoji: '☀️' },
  { id: 2, name: 'GearUP 12V 100Ah LiFePO4 Lithium Battery with Bluetooth BMS', category: 'solar', price: 29000, oldPrice: 35000, badge: 'hot', emoji: '🔋' },
  { id: 3, name: 'EcoFlow E980 Portable Power Station 980Wh', category: 'solar', price: 49900, oldPrice: 55900, badge: 'hot', emoji: '⚡' },
  { id: 4, name: 'GearUP 800W Pure Sine Wave Inverter for 12V Battery', category: 'solar', price: 14000, oldPrice: 15900, badge: 'hot', emoji: '🔌' },
  { id: 5, name: 'EcoFlow DELTA Pro 3600W Portable Solar Power Station', category: 'solar', price: 169000, oldPrice: 224900, badge: 'hot', emoji: '⚡' },
  { id: 6, name: 'Hex Flange Self Drilling Screw for Solar (2 Pcs)', category: 'solar', price: 50, oldPrice: 99, badge: 'sale', emoji: '🔩' },
  { id: 7, name: 'Aluminum End Clamp for Solar Mounting (2 Pcs)', category: 'solar', price: 600, oldPrice: 890, badge: 'sale', emoji: '📐' },
  { id: 8, name: 'TOMZN 2 Pole AC SPD Surge Protective Device 275V', category: 'solar', price: 1100, oldPrice: 1500, badge: 'sale', emoji: '⚡' },
  { id: 9, name: 'TOMZN WiFi Automatic Transfer Switch 125A', category: 'solar', price: 5500, oldPrice: 7000, badge: 'new', emoji: '🔄' },
  { id: 10, name: 'GearUP 2KW Hybrid Inverter + 100Ah Battery Combo', category: 'solar', price: 55000, oldPrice: 60000, badge: 'new', emoji: '📦' },
  { id: 11, name: 'Samsung Galaxy A55 5G (8GB/256GB)', category: 'mobile', price: 42999, oldPrice: 45999, badge: 'hot', emoji: '📱' },
  { id: 12, name: 'Xiaomi Redmi Note 13 Pro', category: 'mobile', price: 32999, oldPrice: 35999, badge: 'sale', emoji: '📱' },
  { id: 13, name: 'Apple AirPods Pro (2nd Gen)', category: 'audio', price: 24999, oldPrice: 27999, badge: 'hot', emoji: '🎧' },
  { id: 14, name: 'Sony WH-1000XM5 Wireless Headphones', category: 'audio', price: 34999, oldPrice: 38999, badge: 'sale', emoji: '🎧' },
  { id: 15, name: 'ASUS TUF Gaming F15 RTX 4050 Laptop', category: 'computing', price: 124999, oldPrice: 134999, badge: 'hot', emoji: '💻' },
  { id: 16, name: 'Lenovo IdeaPad Slim 3 Core i5', category: 'computing', price: 54999, oldPrice: 59999, badge: 'new', emoji: '💻' },
  { id: 17, name: 'Logitech G502 Hero Gaming Mouse', category: 'gaming', price: 4999, oldPrice: 5999, badge: 'sale', emoji: '🖱️' },
  { id: 18, name: 'Redragon K617 Fizz Gaming Keyboard', category: 'gaming', price: 2999, oldPrice: 3499, badge: 'hot', emoji: '⌨️' },
  { id: 19, name: 'Xiaomi Smart Air Purifier 4', category: 'smart', price: 18999, oldPrice: 21999, badge: 'new', emoji: '🌬️' },
  { id: 20, name: 'TP-Link Tapo Smart WiFi Plug (2-Pack)', category: 'smart', price: 2499, oldPrice: 2999, badge: 'sale', emoji: '🔌' },
  { id: 21, name: 'Anker 65W GaN USB-C Charger', category: 'accessories', price: 3499, oldPrice: 3999, badge: 'hot', emoji: '🔋' },
  { id: 22, name: 'Baseus 20000mAh Power Bank 65W', category: 'accessories', price: 3999, oldPrice: 4499, badge: 'sale', emoji: '🔋' },
  { id: 23, name: 'Canon EOS R50 Mirrorless Camera Kit', category: 'electronics', price: 89999, oldPrice: 94999, badge: 'new', emoji: '📷' },
  { id: 24, name: 'JBL Flip 6 Portable Bluetooth Speaker', category: 'audio', price: 11999, oldPrice: 13999, badge: 'hot', emoji: '🔊' },
];

function formatBDT(amount) {
  return '৳' + amount.toLocaleString('en-BD');
}

function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

function getByCategory(catId) {
  return PRODUCTS.filter(p => p.category === catId);
}

function getMostSold() {
  return PRODUCTS.filter(p => p.badge === 'hot').slice(0, 6);
}

function getMostDiscount() {
  return [...PRODUCTS]
    .sort((a, b) => discountPercent(b.price, b.oldPrice) - discountPercent(a.price, a.oldPrice))
    .slice(0, 6);
}

function getNewArrivals() {
  return PRODUCTS.filter(p => p.badge === 'new').slice(0, 6);
}
