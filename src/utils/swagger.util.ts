import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    swaggerDefinition: {
        info: {
            title: 'OpenWChat Swagger',
            version: '2.0.0',
            description: 'This is the api documentation of OpenWChat server.',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                url: 'http://localhost:8000',
                specs: 'Client',
            },
        ],
    },
    apis: [
        './src/routes/auth.routes.ts',
        './src/routes/conversation.routes.ts',
        './src/routes/message.routes.ts',
        './src/routes/user.routes.ts',
    ],
}

export const specs = swaggerJSDoc(options)
