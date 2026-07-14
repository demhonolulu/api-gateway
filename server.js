require("dotenv").config();

const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3000;

app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

// // API key check for all /water routes
// app.use('/water', (req, res, next) => {
//     if (req.headers['x-api-key'] !== process.env.API_KEY) {
//         return res.status(403).json({ error: 'Forbidden' });
//     }
//     next();
// });

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/favicon.ico',
    customSiteTitle: 'Oahu DEM API Docs'
}));

app.use('/water', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
//app.use('/gis', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/webeoc', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});