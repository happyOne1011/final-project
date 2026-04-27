
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import yaml from 'js-yaml';
import fs from 'fs';
import productsRoutes from './routes/productsRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js'


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
let specs;
try
{
  specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf8'));
} 
catch (error) {
  console.error('Failed to load OpenAPI specification', error);
  process.exit(1);
}
app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); 
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});             
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
