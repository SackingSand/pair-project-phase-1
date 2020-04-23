const { Owner, Site, Request } = require('../models/index.js');

class SiteController {
    static showAllSites(req, res) {
        Site
        .findAll({
            include: [Owner],
            order: ['name']
        })
        .then(sites => {
            res.render('./sites/listSites', { sites });
        })
        .catch(err => {
            res.send(err.message);
        })
    } 

    static showAddSiteForm(req, res) {
        const { id } = req.params;

        res.render('./sites/add', { id });
    }

    static addNewSite(req, res) {
        const { id } = req.params;
        const newSite = {
            name: req.body.name,
            location: req.body.location,
            area: req.body.area,
            email: req.body.email,
            OwnerId: +id
        }

        Site
        .create(newSite)
        .then(() => {
            return Owner
            .findByPk(id ,{
                include: [Site] 
            })
        })
        .then(() => {
            res.redirect('/owners/list');
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static showEditSiteForm(req, res) {
        const { id } = req.params;

        Site
        .findByPk(id)
        .then(site => {
            res.render('sites/edit', { site });
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static editSite(req, res) {
        const { id } = req.params;
        const editedSite = {
            name: req.body.name,
            location: req.body.location,
            area: req.body.area,
            email: req.body.email
        }
        let OwnerId = 0;

        Site
        .findByPk(id)
        .then(site => {
            OwnerId = site.OwnerId
            return Site
            .update(editedSite, {
                where: {
                    id: id
                }
            })
        })
        .then(() => {
            res.redirect('/owners/list');
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static deleteSite(req, res) {
        const { id } = req.params;
        let OwnerId = 0;

        Site
        .findByPk(id)
        .then(results => {
            OwnerId = results.OwnerId;
            return Site
            .destroy({
                where: {
                    id: +id
                }
            })
        })
        .then(() => {
            res.redirect('/sites/list/' + OwnerId);
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static getRequest(req, res) {
        console.log(req.session.uid)
        const newRequest = {
            SiteId: req.params.id,
            FossilHunterId: req.session.uid
        }

        Request
        .create(newRequest)
        .then(() => {
            res.redirect('/sites')
        })
        .catch(err => {
            res.send(err.message)
        })
    }
}

module.exports = SiteController;
