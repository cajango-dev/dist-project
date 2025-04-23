const apiRoutes = require('./api');
const errorHandler = require('./api/middlewares/errorHandler');
const swaggerSetup = require('./api/swagger');

app.use('/api', apiRoutes);
app.use(errorHandler);
swaggerSetup(app);
