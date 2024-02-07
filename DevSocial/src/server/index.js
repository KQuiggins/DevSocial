import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import servicesLoader from './services/index.js';
import initializeDb from './database/index.js'; // Adjusted import

async function startServer() {
    const app = express();
    app.use(cors());
    app.use(compress());

    if (process.env.NODE_ENV === 'production') {
        app.use(helmet());
        app.use(
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    styleSrc: ["'self'", 'https://unsafe-inline'],
                    imgSrc: ['self', 'data:', '*.amazonaws.com'],
                },
            }),
        );
        app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
    }

    try {
        const db = await initializeDb(); // Await the DB initialization
        const utils = { db };
        console.log('utils:', utils);

        const services = servicesLoader(utils);
        
        app.get('/', (req, res, next) => {
            console.log(`Root route hit. Request path: ${req.path}`);
        });

        const serviceNames = Object.keys(services);
        for (let i = 0; i < serviceNames.length; i += 1) {
            const name = serviceNames[i];
            if (name === 'graphql') {
                await services[name].start();
                services[name].applyMiddleware({ app });
            } else {
                app.use(`/${name}`, services[name]);
            }
        }

        app.listen(3000, () => {
            console.log('Example app listening on port 3000!');
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer().catch(console.error);
