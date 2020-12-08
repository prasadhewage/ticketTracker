const usersModule = require('./users');
const ticketsModule = require('./tickets');
const organizationModule = require('./organizations');
const userRoutes = usersModule.userRoutes;
const ticketsRoutes = ticketsModule.ticketsRoutes;
const organizationRoutes = organizationModule.organizationRoutes;

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to Ticket Tracker API');
    });

    userRoutes(app, fs);
    ticketsRoutes(app, fs);
    organizationRoutes(app, fs);
};

module.exports = appRouter;