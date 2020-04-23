const { Owner, Site } = require('../models/index.js');

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
}

module.exports = OwnerController;
