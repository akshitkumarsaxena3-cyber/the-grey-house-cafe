const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ADMIN_PIN = process.env.ADMIN_PIN || 'greyhouse2026';

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory and initial DB exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getInitialDB() {
  return {
    users: [],
    orders: [
      {
        id: 'TGH-1001',
        customerName: 'Aman Verma',
        customerPhone: '9876543210',
        items: [
          { id: 1, name: 'Signature Cheese Balls', price: 332, qty: 1 },
          { id: 5, name: 'Paneer Angara Tikka', price: 380, qty: 1 },
          { id: 7, name: 'Fresh Mint Virgin Mojito', price: 238, qty: 2 }
        ],
        subtotal: 1188,
        gst: 59,
        total: 1247,
        status: 'Preparing',
        space: 'The Open Sky Terrace',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        note: 'Terrace corner table preferred'
      },
      {
        id: 'TGH-1002',
        customerName: 'Pooja Sharma',
        customerPhone: '9897123456',
        items: [
          { id: 2, name: 'Veg Kurkure Momos (8 Pcs)', price: 257, qty: 2 },
          { id: 3, name: 'Mix Sauce Pasta (Pink Sauce)', price: 401, qty: 1 },
          { id: 19, name: 'Thick Oreo Fudge Shake', price: 265, qty: 2 }
        ],
        subtotal: 1445,
        gst: 72,
        total: 1517,
        status: 'Served',
        space: 'The Green Courtyard',
        timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
        note: 'Birthday celebration'
      }
    ],
    bookings: [
      {
        id: 'RES-801',
        name: 'Rahul Khanna',
        phone: '9758112233',
        date: new Date().toISOString().split('T')[0],
        time: '08:00 PM - 10:00 PM (Prime Dinner)',
        guests: '2 Guests (Couple / Date)',
        space: 'The Open Sky Terrace',
        special: 'Candlelight romantic anniversary setup',
        status: 'Confirmed',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      {
        id: 'RES-802',
        name: 'Neha Kapoor',
        phone: '9919887766',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '05:00 PM - 07:30 PM (Sunset Terrace)',
        guests: '9-15 Guests (Party Table)',
        space: 'The Luxury Lounge',
        special: 'Ladies Kitty Party, please arrange separate section',
        status: 'Confirmed',
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString()
      }
    ]
  };
}

function loadDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialDB();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB, using memory:', err);
    return getInitialDB();
  }
}

function saveDB(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error saving DB:', err);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const urlParts = req.url.split('?');
  const pathname = urlParts[0];
  const queryStr = urlParts[1] || '';
  const searchParams = new URLSearchParams(queryStr);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // ==========================================
  // API ROUTING
  // ==========================================

  // Customer Register
  if (pathname === '/api/register' && req.method === 'POST') {
    const { name, phone, password } = await parseBody(req);
    if (!name || !phone || !password) {
      return sendJSON(res, 400, { ok: false, error: 'Name, phone and password are required' });
    }
    const db = loadDB();
    const existing = db.users.find(u => u.phone === phone.trim());
    if (existing) {
      return sendJSON(res, 409, { ok: false, error: 'Phone number already registered. Please login.' });
    }
    const newUser = {
      id: 'USR-' + Date.now().toString().slice(-6),
      name: name.trim(),
      phone: phone.trim(),
      password: password.trim(),
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    saveDB(db);
    return sendJSON(res, 201, {
      ok: true,
      user: { id: newUser.id, name: newUser.name, phone: newUser.phone }
    });
  }

  // Customer Login
  if (pathname === '/api/login' && req.method === 'POST') {
    const { phone, password } = await parseBody(req);
    if (!phone || !password) {
      return sendJSON(res, 400, { ok: false, error: 'Phone and password are required' });
    }
    const db = loadDB();
    const user = db.users.find(u => u.phone === phone.trim() && u.password === password.trim());
    if (!user) {
      return sendJSON(res, 401, { ok: false, error: 'Invalid phone number or password' });
    }
    return sendJSON(res, 200, {
      ok: true,
      user: { id: user.id, name: user.name, phone: user.phone }
    });
  }

  // Owner / Admin Login
  if (pathname === '/api/admin/login' && req.method === 'POST') {
    const { pin } = await parseBody(req);
    if (pin && pin.trim() === ADMIN_PIN) {
      return sendJSON(res, 200, { ok: true, message: 'Admin verified successfully' });
    }
    return sendJSON(res, 401, { ok: false, error: 'Incorrect Owner PIN. Default is greyhouse2026' });
  }

  // Create Order (Guest or Logged in customer)
  if (pathname === '/api/orders' && req.method === 'POST') {
    const orderData = await parseBody(req);
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return sendJSON(res, 400, { ok: false, error: 'Cart items cannot be empty' });
    }
    const db = loadDB();
    const orderId = 'TGH-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      customerName: orderData.customerName || 'Walk-in Guest',
      customerPhone: orderData.customerPhone || 'N/A',
      items: orderData.items,
      subtotal: orderData.subtotal || 0,
      gst: orderData.gst || 0,
      total: orderData.total || 0,
      status: 'Pending',
      space: orderData.space || 'Dine-In',
      note: orderData.note || '',
      timestamp: new Date().toISOString()
    };
    db.orders.unshift(newOrder);
    saveDB(db);
    return sendJSON(res, 201, { ok: true, order: newOrder });
  }

  // Get Orders (Filter by customer phone, or return all for Owner)
  if (pathname === '/api/orders' && req.method === 'GET') {
    const phoneFilter = searchParams.get('phone');
    const db = loadDB();
    if (phoneFilter) {
      const userOrders = db.orders.filter(o => o.customerPhone === phoneFilter);
      return sendJSON(res, 200, { ok: true, orders: userOrders });
    }
    return sendJSON(res, 200, { ok: true, orders: db.orders });
  }

  // Update Order Status (Owner Action)
  if (pathname.startsWith('/api/orders/') && req.method === 'PATCH') {
    const id = pathname.replace('/api/orders/', '');
    const { status } = await parseBody(req);
    const db = loadDB();
    const order = db.orders.find(o => o.id === id);
    if (!order) {
      return sendJSON(res, 404, { ok: false, error: 'Order not found' });
    }
    if (status) order.status = status;
    saveDB(db);
    return sendJSON(res, 200, { ok: true, order });
  }

  // Create Table Booking
  if (pathname === '/api/bookings' && req.method === 'POST') {
    const bookingData = await parseBody(req);
    if (!bookingData.name || !bookingData.phone || !bookingData.date) {
      return sendJSON(res, 400, { ok: false, error: 'Name, phone and date are required' });
    }
    const db = loadDB();
    const bookingId = 'RES-' + Math.floor(100 + Math.random() * 900);
    const newBooking = {
      id: bookingId,
      name: bookingData.name,
      phone: bookingData.phone,
      date: bookingData.date,
      time: bookingData.time || 'Dinner',
      guests: bookingData.guests || '2 Guests',
      space: bookingData.space || 'The Open Sky Terrace',
      special: bookingData.special || '',
      status: 'Confirmed',
      timestamp: new Date().toISOString()
    };
    db.bookings.unshift(newBooking);
    saveDB(db);
    return sendJSON(res, 201, { ok: true, booking: newBooking });
  }

  // Get Bookings
  if (pathname === '/api/bookings' && req.method === 'GET') {
    const phoneFilter = searchParams.get('phone');
    const db = loadDB();
    if (phoneFilter) {
      const userBookings = db.bookings.filter(b => b.phone === phoneFilter);
      return sendJSON(res, 200, { ok: true, bookings: userBookings });
    }
    return sendJSON(res, 200, { ok: true, bookings: db.bookings });
  }

  // Update Booking Status
  if (pathname.startsWith('/api/bookings/') && req.method === 'PATCH') {
    const id = pathname.replace('/api/bookings/', '');
    const { status } = await parseBody(req);
    const db = loadDB();
    const booking = db.bookings.find(b => b.id === id);
    if (!booking) {
      return sendJSON(res, 404, { ok: false, error: 'Booking not found' });
    }
    if (status) booking.status = status;
    saveDB(db);
    return sendJSON(res, 200, { ok: true, booking });
  }

  // Get Owner Dashboard Summary Stats
  if (pathname === '/api/admin/stats' && req.method === 'GET') {
    const db = loadDB();
    const totalOrders = db.orders.length;
    const totalRevenue = db.orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
    const totalBookings = db.bookings.length;
    const pendingOrders = db.orders.filter(o => o.status === 'Pending').length;
    return sendJSON(res, 200, {
      ok: true,
      stats: {
        totalOrders,
        totalRevenue,
        totalBookings,
        pendingOrders
      }
    });
  }

  // ==========================================
  // STATIC ASSETS ROUTING
  // ==========================================
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`The Grey House Cafe server with Owner & Customer API running on port ${PORT}`);
});
