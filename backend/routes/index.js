const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const donorRoutes = require('./donorRoutes');
const hospitalRoutes = require('./hospitalRoutes');
const bloodStockRoutes = require('./bloodStockRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const bloodCampRoutes = require('./bloodCampRoutes');
const userRoutes = require('./userRoutes');

const appRouter = express.Router();

appRouter.use('/auth', authRoutes);
appRouter.use('/donors', donorRoutes);
appRouter.use('/hospitals', hospitalRoutes);
appRouter.use('/bloodstock', bloodStockRoutes);
appRouter.use('/appointments', appointmentRoutes);
appRouter.use('/bloodcamps', bloodCampRoutes);
appRouter.use('/users', userRoutes);

module.exports = appRouter;
