const usersModule = require('./users');
const ticketsModule = require('./tickets');
const dataPath = './data/organizations.json';

const organizationRoutes = (app, fs) => {

    app.get('/organizations', (req, res) => {
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

            let organizationResults = results.filter(r => {

                for (let k in r) {
                    if (r[k] == search) {
                        return r;
                    }
                }

                }
            )

            let returnDataArr = {};
            let tickets = [];
            
            for (let i = 0; i < organizationResults.length; i++) {
                const organization = organizationResults[i];
                let respData = {}
                let users = [];
                
                let ticketsForOrg = await ticketsModule.getTicketByOrganization(fs, organization._id);
                
                for (let j = 0; j < ticketsForOrg.length; j++) {
                    const ticket = ticketsForOrg[j];
                    let submittedUserOfTicket = await usersModule.getUserDetails(fs, ticket.submitter_id);
                    let ticketObj = {...ticket, userName: submittedUserOfTicket[0].name, organization: {
                        name: organization.name,
                        details: organization.details,
                    }};

                    tickets.push(ticketObj);
                }

            }

            returnDataArr.tickets = tickets;

            res.send(returnDataArr);

        });
    });
};

const getUsersOrganization = (fs, orgId) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', function (err, data) {
            if (err) return reject(err);

            const dataSet = JSON.parse(data);

            let results = [...dataSet];

            if (orgId) {
                results = results.filter(r => r._id == orgId);
            }

            resolve(results);
        })
    });
}
  
module.exports = {
    organizationRoutes,
    getUsersOrganization,
};