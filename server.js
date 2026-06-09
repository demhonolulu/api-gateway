const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3000;


app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/favicon.ico'
}));
app.use('/water', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
//app.use('/gis', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

app.listen(PORT, () => {
    console.log(`gateway running on port ${PORT}`);
});