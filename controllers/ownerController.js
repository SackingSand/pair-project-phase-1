const { Owner, Site, Request } = require('../models/index.js');

class OwnerController {
    static ownerPage(req, res) {
        const { id } = req.params;

        Owner
        .findByPk(+id)
        .then(owner =>{
            res.render('./owners/home', { owner })
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static showOwnedSites(req, res){
        const { id } = req.params;

        Owner
        .findByPk( id, {
            include: [Site]
        })
        .then(owner => {
            res.render('./owners/listSites', { owner });
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static showRequestList(req, res) {
        const id = req.params.id;

        Request
        .findAll({
            include: [Site]
        })
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = OwnerController;
