const dataPath = './data/tickets.json';

const ticketsRoutes = (app, fs) => {

    app.get('/tickets', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            const dataSet = JSON.parse(data);

            const { priority, type, submitter_id } = req.query;
            let results = [...dataSet];

            let resObj = {
                data: [],
                success: true,
                error: null,
            };

            console.log("req", req.query);

            if (priority) {
                results = results.filter(r => r.priority === priority);
            }

            if (type) {
                results = results.filter(r => r.type === type);
            }

            if (submitter_id) {
                results = results.filter(r => r.submitter_id == submitter_id);
            }

            resObj.data = results;

            res.send(resObj);

        });
    });
};

const getUserAssignedTickets = (fs, userId) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', function (err, data) {
            if (err) return reject(err);

            const dataSet = JSON.parse(data);

            let results = [...dataSet];

            if (userId) {
                results = results.filter(r => r.assignee_id == userId);
            }

            resolve(results);
        })
    });
}

const getUserSubmittedTickets = (fs, userId) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', function (err, data) {
            if (err) return reject(err);

            const dataSet = JSON.parse(data);

            let results = [...dataSet];

            if (userId) {
                results = results.filter(r => r.submitter_id == userId);
            }

            resolve(results);
        })
    });
}

const getTicketByOrganization = (fs, orgId) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, 'utf8', function (err, data) {
            if (err) return reject(err);

            const dataSet = JSON.parse(data);

            let results = [...dataSet];

            if (orgId) {
                results = results.filter(r => r.organization_id == orgId);
            }

            resolve(results);
        })
    });
}
  
module.exports = {
    ticketsRoutes,
    getUserAssignedTickets,
    getUserSubmittedTickets,
    getTicketByOrganization,
};