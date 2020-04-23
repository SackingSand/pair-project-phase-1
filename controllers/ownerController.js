const { Owner, Site, Request } = require('../models/index.js');

const bcrypt = require(`bcrypt`);

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
    static loginOwnerForm(req, res) {
        res.render(`./owners/login`, {data : null, msg :null, err : null})
    }    
    
    static loginOwner (req, res) {
        const { email, password} = req.body;
        Owner
            .findOne({
                where : {
                    email : email
                }
            })
            .then((data) => {
                if(!bcrypt.compareSync(password, data.password)){
                    throw new Error(`Kombinasi email & password tidak ditemukan`)
                }
                req.session.uid = data.id;
                req.session.role = `owner`;
                req.session.cookie.expires = false;
                console.log(req.session);
                res.redirect(`/owners`)
            })
            .catch(err => {
                res.render(`./owners/login`, { data : email, msg :null, err : err})
            })
    }
}

module.exports = OwnerController;
