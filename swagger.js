const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Oahu Water API',
            version: '1.0.0'
        },
        servers: [{ url: 'https://api.oahudem.com' }],
        paths: {
            '/water/get-active-locations': {
                get: {
                    summary: 'get all active gauge locations',
                    responses: { 200: { description: 'Success' } }
                }
            },
            '/water/get-table-overview': {
                get: {
                    summary: 'get all active gauge locations current readings for display',
                    responses: { 200: { description: 'Success' } }
                }
            },
            '/water/get-graph-data': {
                get: {
                    summary: 'get gauge locations gauge readings data',
                    responses: { 200: { description: 'Success' } }
                }
            }
        }
    },
    apis: []
};

module.exports = swaggerJsdoc(options);