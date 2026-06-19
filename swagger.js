// swagger.js
const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Oahu Dept. of Emergency Management API Docs',
        version: '1.0.0'
    },
    tags: [
        { name: 'water', description: 'Stream gauge endpoints' },
        { name: 'gis', description: 'GIS endpoints' },
        { name: 'id', description: 'ID badge reader' }
    ],
    servers: [{ url: 'https://api.oahudem.com' }],
    paths: {
        '/water/get-active-locations': {
            get: {
                tags: ['water'],
                summary: 'get all active gauge locations',
                parameters: [
                    {
                        name: 'flat',
                        in: 'query',
                        required: true,
                        description: 'Returns a flat area with display order',
                        schema: { type: 'boolean' },
                    }
                ],
                responses: { 200: { description: 'Success' } }
            }
        },
        '/water/get-table-overview': {
            get: {
                tags: ['water'],
                summary: 'get all active gauge locations current readings for display',
                parameters: [
                    {
                        name: 'locations',
                        in: 'query',
                        required: true,
                        description: 'Flat string of comma seperated gauge ids of locations to pull',
                        schema: { type: 'string' },
                    }
                ],
                responses: { 200: { description: 'Success' } }
            }
        },
        '/water/get-graph-data': {
            get: {
                tags: ['water'],
                summary: 'get gauge locations gauge readings data',
                description: 'Returns historical readings for one or more gauges over the past 30 days',
                parameters: [
                    {
                        name: 'gauge_id',
                        in: 'query',
                        required: true,
                        description: 'Comma seperated string of gauge_ids. Must be an active location ie. "USGS-16200000,OA-0001"',
                        schema: { type: 'string' },
                    }
                ],
                responses: {
                    200: {
                        description: 'Readings grouped by gauge ID',
                        content: {
                            'application/json': {
                                example: {
                                    'USGS-16200000': [
                                        { time: '2026-06-01T00:00:00Z', value: 2.73 }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

console.log("swagger loaded");
module.exports = swaggerSpec;