import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import services from './services/index.js';

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
				styleSrc: ["'self'", 'unsafe-inline'],
				imgSrc: ['self', 'data:', '*.amazonaws.com'],
			},
		}),
	);
	app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
}

app.get('/', (req, res, next) => {
	console.log(`Root route hit. Request path: ${req.path}`);
	console.log('first function');
});

const serviceNames = Object.keys(services);

for (let i = 0; i < serviceNames.length; i += 1) {
	const name = serviceNames[i];
	if (name === 'graphql') {
		(async () => {
			await services[name].start();
			services[name].applyMiddleware({ app });
		})();
	} else {
		app.use(`/${name}`, services[name]);
	}
}

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
