const ticketsModule = require('./tickets');
const organizationModule = require('./organizations');
const dataPath = './data/users.json';

const userRoutes = (app, fs) => {
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', async (err, data) => {
            if (err) {
                throw err;
            }

            const dataSet = JSON.parse(data);

            const { search } = req.query;
            let results = [...dataSet];

            let resObj = {
                data: {},
                success: true,
                error: null,
            };

            console.log("req", req.query);

            let userResults = results.filter(r => {

                for (let k in r) {
                    if (r[k] == search) {
                        return r;
                    }
                }

            })

            let returnDataArr = {};
            let tickets = [];

            for (let i = 0; i < userResults.length; i++) {
                const user = userResults[i];
                let respData = {}
                let users = [];
                
                let userOrg = await organizationModule.getUsersOrganization(fs, user.organization_id);
                let userSubmittedTickets = await ticketsModule.getUserSubmittedTickets(fs, user._id);
                let userAssignedTickets = await ticketsModule.getUserAssignedTickets(fs, user._id);


                for (let j = 0; j < userSubmittedTickets.length; j++) {
                    const submittedTicket = userSubmittedTickets[j];

                    let ticketObj = {...submittedTicket, organization: {
                            name: userOrg[0].name,
                            details: userOrg[0].details,
                        }};

                    tickets.push(ticketObj);
                }

                for (let k = 0; k < userAssignedTickets.length; k++) {
                    const assignedTicket = userAssignedTickets[k];

                    let ticketObj = {...assignedTicket, organization: {
                            name: userOrg[0].name,
                            details: userOrg[0].details, 
                        }};

                    tickets.push(ticketObj);
                }
                returnDataArr.tickets = tickets;

            }

            res.send(returnDataArr);

        });
    });

};

const getUser = (fs, userId) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', function (err, data) {
            if (err) return reject(err);

            const dataSet = JSON.parse(data);

            let results = [...dataSet];

            if (userId) {
                results = results.filter(r => r._id == userId);
            }

            resolve(results);
        })
    });
}

module.exports.userRoutes = userRoutes;
module.exports.getUserDetails = getUser;