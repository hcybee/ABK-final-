// Phone data

const phones = [

  { id: 1, name: 'itel A70', brand: 'itel', price: 105300, condition: 'new', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8JRE6VPXzPuiJwdu6SWMVjl5YGRqfCZVLA&s' },

  { id: 2, name: 'itel A50', brand: 'itel', price: 95000, condition: 'new', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeubHqxwEpdJXD0GU2xjB3oeQbJJ4wK7KApO5Bb-9xHeFon6AHH0QC-3Y&s=10' },

  { id: 3, name: 'Redmi 13C', brand: 'Xiaomi', price: 145000, condition: 'new', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBCDskX-h-OCD6H_-R3jptxzv7txVSeqxxjg&s' },

  { id: 4, name: 'Redmi 14C', brand: 'Xiaomi', price: 160000, condition: 'new', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD5vd5_EsmssITYTn175l3y3z54E3Dk8z_2Q&s' },

  { id: 5, name: 'Redmi A3', brand: 'Xiaomi', price: 110000, condition: 'new', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQg2GSP0B8rFC9_kYS4MxWCbGsFP56l5gU5w&s' },

  { id: 6, name: 'Infinix Hot 30i', brand: 'Infinix', price: 130000, condition: 'new', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnvfT4jWgCELxdPnxL0g2olYviXV5Q_CGfSqTnnp5PA&s' },

  { id: 7, name: 'Tecno Pova 5', brand: 'Tecno', price: 185000, condition: 'new', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyJz1nhtq1H9eCsaaysRN2eOldr3Iued9EgQ&s' },

  { id: 8, name: 'iPhone XR', brand: 'Apple', price: 120000, condition: 'used', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFML6WTAfSUh9_iNMyPTIu4vSPs5MMAxqFLQ&s' },

  { id: 9, name: 'Infinix Smart 9', brand: 'Infinix', price: 140000, condition: 'used', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyjNaQGb4fFNbyAJPeu4Ye8k5uEFi4D3gbJnQcRUghg&s' },

  { id: 10, name: 'Infinix Hot 20i', brand: 'Infinix', price: 95000, condition: 'used', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyjNaQGb4fFNbyAJPeu4Ye8k5uEFi4D3gbJnQcRUghg&s' },

  { id: 11, name: 'Tecno Camon 30i', brand: 'Tecno', price: 180000, condition: 'used', image: 'https://via.placeholder.com/150?text=Tecno+Camon+30i' },

  { id: 12, name: 'Redmi 12C', brand: 'Xiaomi', price: 90000, condition: 'used', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjyjNaQGb4fFNbyAJPeu4Ye8k5uEFi4D3gbJnQcRUghg&s' }

];

// Cart state

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements

const allPhonesContainer = document.getElementById('all-phones');

const newPhonesContainer = document.getElementById('new-phones');

const usedPhonesContainer = document.getElementById('used-phones');

const searchInput = document.getElementById('search');

const brandFilter = document.getElementById('brand-filter');

const priceFilter = document.getElementById('price-filter');

const cartCount = document.getElementById('cart-count');

const cartItems = document.getElementById('cart-items');

const cartTotal = document.getElementById('cart-total');

const swapForm = document.getElementById('swap-form');

// Format price in Naira

function formatPrice(price) {

  return `₦${price.toLocaleString('en-NG')}`;

}

// Render phones

function renderPhones() {

  const searchTerm = searchInput.value.toLowerCase();

  const selectedBrand = brandFilter.value;

  const selectedPrice = priceFilter.value;

  const filteredPhones = phones.filter(phone => {

    const matchesSearch = phone.name.toLowerCase().includes(searchTerm) || phone.brand.toLowerCase().includes(searchTerm);

    const matchesBrand = selectedBrand === 'all' || phone.brand === selectedBrand;

    const matchesPrice = selectedPrice === 'all' ||

      (selectedPrice === '0-100000' && phone.price < 100000) ||

      (selectedPrice === '100000-200000' && phone.price >= 100000 && phone.price <= 200000) ||

      (selectedPrice === '200000+' && phone.price > 200000);

    return matchesSearch && matchesBrand && matchesPrice;

  });

  allPhonesContainer.innerHTML = '';

  newPhonesContainer.innerHTML = '';

  usedPhonesContainer.innerHTML = '';

  filteredPhones.forEach(phone => {

    const card = `

      <div class="product-card">

        <img src="${phone.image}" alt="${phone.name}">

        <h3>${phone.name}</h3>

        <p>${phone.brand} - ${phone.condition.charAt(0).toUpperCase() + phone.condition.slice(1)}</p>

        <p class="price">${formatPrice(phone.price)}</p>

        <button class="btn add-to-cart" data-id="${phone.id}">Add to Cart</button>

      </div>

    `;

    allPhonesContainer.innerHTML += card;

    if (phone.condition === 'new') {

      newPhonesContainer.innerHTML += card;

    } else {

      usedPhonesContainer.innerHTML += card;

    }

  });

  document.querySelectorAll('.add-to-cart').forEach(btn => {

    btn.addEventListener('click', () => addToCart(btn.dataset.id));

  });

}

// Render cart

function renderCart() {

  cartItems.innerHTML = '';

  let total = 0;

  cart.forEach(item => {

    const phone = phones.find(p => p.id === item.id);

    total += phone.price * item.quantity;

    cartItems.innerHTML += `

      <div class="cart-item">

        <span>${phone.name} (${phone.condition}) x${item.quantity}</span>

        <span>${formatPrice(phone.price * item.quantity)}</span>

      </div>

    `;

  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartTotal.textContent = `Total: ${formatPrice(total)}`;

  localStorage.setItem('cart', JSON.stringify(cart));

}

// Add to cart

function addToCart(id) {

  const existing = cart.find(item => item.id === parseInt(id));

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({ id: parseInt(id), quantity: 1 });

  }

  renderCart();

}

// Swap form submission

swapForm.addEventListener('submit', e => {

  e.preventDefault();

  const name = document.getElementById('swap-name').value;

  const phone = document.getElementById('swap-phone').value;

  const model = document.getElementById('swap-model').value;

  alert(`Swap request submitted!\nName: ${name}\nPhone: ${phone}\nModel: ${model}`);

  swapForm.reset();

});

// Event listeners

searchInput.addEventListener('input', renderPhones);

brandFilter.addEventListener('change', renderPhones);

priceFilter.addEventListener('change', renderPhones);

// Initial render

renderPhones();

renderCart();

// Service Worker (commented for CodePen; uncomment for deployment)

if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {

    navigator.serviceWorker.register('/sw.js')

      .then(reg => console.log('Service Worker registered'))

      .catch(err => console.log('Service Worker registration failed:', err));

  });

}

// sw.js content (for deployment, not CodePen):

/*

self.addEventListener('install', event => {

  event.waitUntil(

    caches.open('abk-phones-v1').then(cache => {

      return cache.addAll([

        '/',

        '/index.html',

        '/styles.css',

        '/app.js',

        '/favicon.ico'

      ]);

    })

  );

});

self.addEventListener('fetch', event => {

  event.respondWith(

    caches.match(event.request).then(response => {

      return response || fetch(event.request);

    })

  );

});

*/