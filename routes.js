const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');

module.exports = (app) => {
	app.use('/api/auth', authRoutes);
	app.use('/api/user', userRoutes);
	app.use('/api/product', productRoutes);
	app.use('/api/category', categoryRoutes);
};
