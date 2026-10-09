export function generateOrderID() {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()
}

export function createOrder(user, checkout, totals) {
  return {
    id: generateOrderID(),
    userEmail: user.email,
    userName: user.name,
    phone: checkout.phone,
    address: checkout.address,
    city: checkout.city,
    state: checkout.state,
    pincode: checkout.pincode,
    paymentMethod: checkout.paymentMethod,
    items: totals.lines,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    createdAt: new Date().toISOString(),
  }
}
