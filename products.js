// Product data lives here. To use an API later, replace the three functions
// at the bottom (getProducts / getProductById / filterProducts) and keep the rest of the app unchanged.
export const categories = ['Electronics', 'Fashion', 'Shoes', 'Accessories', 'Home']

const products = [
  { id: 1, name: 'iPhone 15', category: 'Electronics', price: 60000, rating: 4.7, image: '📱',
    shortDescription: '128 GB smartphone with a sharp camera.',
    fullDescription: 'A 6.1-inch display, a 48 MP main camera and all-day battery life. Comes with 128 GB storage, USB-C charging and a one-year brand warranty.' },
  { id: 2, name: 'Wireless Headphones', category: 'Electronics', price: 3499, rating: 4.4, image: '🎧',
    shortDescription: 'Over-ear Bluetooth headphones with deep bass.',
    fullDescription: 'Soft ear cushions, 30 hours of playback and fast charging. Fold flat to fit in your bag. Works with any Bluetooth phone or laptop.' },
  { id: 3, name: 'Smart Watch', category: 'Electronics', price: 4999, rating: 4.3, image: '⌚',
    shortDescription: 'Tracks steps, sleep and heart rate.',
    fullDescription: 'A bright AMOLED screen, 7-day battery and water resistance up to 50 m. Shows call and message alerts and tracks 20+ workout types.' },
  { id: 4, name: 'Laptop Pro 14', category: 'Electronics', price: 72000, rating: 4.6, image: '💻',
    shortDescription: 'Light 14-inch laptop with a fast SSD.',
    fullDescription: 'Built for study and work: 16 GB RAM, 512 GB SSD and a full-HD display. Weighs 1.4 kg and lasts about 10 hours on one charge.' },
  { id: 5, name: 'Cotton T-Shirt', category: 'Fashion', price: 599, rating: 4.2, image: '👕',
    shortDescription: 'Soft everyday tee in 100% cotton.',
    fullDescription: 'A regular-fit crew-neck t-shirt made from breathable combed cotton. Machine washable and available in sizes S to XXL.' },
  { id: 6, name: 'Denim Jacket', category: 'Fashion', price: 2299, rating: 4.5, image: '🧥',
    shortDescription: 'Classic mid-wash denim jacket.',
    fullDescription: 'A durable denim jacket with metal buttons and two chest pockets. Pairs with almost anything and gets softer with every wash.' },
  { id: 7, name: 'Running Shoes', category: 'Shoes', price: 2999, rating: 4.5, image: '👟',
    shortDescription: 'Cushioned shoes for daily runs.',
    fullDescription: 'A breathable mesh upper, responsive foam sole and a grippy outsole for roads and tracks. Lightweight at just 260 g per shoe.' },
  { id: 8, name: 'Leather Sandals', category: 'Shoes', price: 1299, rating: 4.1, image: '🩴',
    shortDescription: 'Comfortable sandals with a padded sole.',
    fullDescription: 'Genuine leather straps with an adjustable buckle and a cushioned footbed. Easy to wear all day in warm weather.' },
  { id: 9, name: 'Canvas Sneakers', category: 'Shoes', price: 1799, rating: 4.3, image: '👞',
    shortDescription: 'Casual lace-up sneakers.',
    fullDescription: 'A sturdy canvas upper with a rubber sole and cushioned insole. A simple design that suits school, college and weekends.' },
  { id: 10, name: 'Backpack', category: 'Accessories', price: 1499, rating: 4.2, image: '🎒',
    shortDescription: 'Water-resistant 25 L backpack.',
    fullDescription: 'Fits a 15-inch laptop in a padded sleeve, with a front pocket, two side bottle holders and comfortable padded straps.' },
  { id: 11, name: 'Sunglasses', category: 'Accessories', price: 999, rating: 4.1, image: '🕶️',
    shortDescription: 'UV-protected lenses, light frame.',
    fullDescription: 'Polarised lenses block 100% of UV rays. The lightweight frame stays comfortable on long days outdoors.' },
  { id: 12, name: 'Leather Wallet', category: 'Accessories', price: 799, rating: 4.4, image: '👛',
    shortDescription: 'Slim wallet with six card slots.',
    fullDescription: 'Made from soft genuine leather with a coin pocket, two note compartments and six card slots. Slim enough for a front pocket.' },
  { id: 13, name: 'Coffee Maker', category: 'Home', price: 2499, rating: 4.6, image: '☕',
    shortDescription: 'Brews up to 6 cups with auto shut-off.',
    fullDescription: 'A reusable filter, a glass jug and a keep-warm plate. Brews a full pot in under 10 minutes and switches off automatically.' },
  { id: 14, name: 'LED Desk Lamp', category: 'Home', price: 799, rating: 4.0, image: '💡',
    shortDescription: 'Adjustable lamp, three brightness levels.',
    fullDescription: 'A flexible neck, touch controls and an eye-care LED that does not flicker. Good for studying late without tiring your eyes.' },
  { id: 15, name: 'Study Chair', category: 'Home', price: 5499, rating: 4.4, image: '🪑',
    shortDescription: 'Ergonomic chair with lumbar support.',
    fullDescription: 'A breathable mesh back, adjustable height and a smooth-rolling base. Supports up to 110 kg.' },
  { id: 16, name: 'Cotton Bedsheet Set', category: 'Home', price: 1199, rating: 4.3, image: '🛏️',
    shortDescription: 'Double bedsheet with two pillow covers.',
    fullDescription: 'A 180 TC cotton bedsheet that is soft, fade-resistant and easy to wash. Includes one double bedsheet and two pillow covers.' },
]

export const formatPrice = (n) => '₹' + n.toLocaleString('en-IN')

// --- Data access (swap these for API calls later) ---
export const getProducts = () => products
export const getProductById = (id) => products.find((p) => p.id === Number(id)) || null

export function filterProducts(category = 'All', query = '') {
  const q = query.trim().toLowerCase()
  return products.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  )
}
