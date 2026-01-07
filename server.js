// خادم تطوير محلي بسيط
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// خدمة الملفات الثابتة
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// صفحات لوحة التحكم
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/admin/dashboard.html'));
});

// صفحات المتجر
app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/client/shop.html'));
});

// API للمنتجات
app.get('/api/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/api/products.json'));
});

app.listen(PORT, () => {
    console.log(`🌍 Global Store running at: http://localhost:${PORT}`);
    console.log(`🛍️  Shop: http://localhost:${PORT}/shop`);
    console.log(`👑 Admin: http://localhost:${PORT}/admin`);
});