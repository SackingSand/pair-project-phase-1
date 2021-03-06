const { Owner, Site, Request, FossilHunter } = require('../models/index.js');
const mailer = require(`../helpers/mailer.js`)
const bcrypt = require(`bcrypt`);

class OwnerController {

    static ownersOnly(req, res, next){
        if(req.session.role!==`owner`){
            res.redirect(`/`);
        }
     next()
    } 

    static ownerPage(req, res) {
        console.log(req.session)
        const { uid } = req.session;

        Owner
        .findByPk(uid)
        .then(owner =>{
            res.render('./owners/home', { owner })
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static showOwnedSites(req, res){
        const id = req.session.uid;

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
        const { id } = req.params;
        let request = [];
        let site = '';

        Request
        .findAll({
            include: [{model: Site,
            where: {
                id: id
            }}, FossilHunter ]
        })
        .then(results => {
            request = results;
            return Site
            .findByPk(id)
        })
        .then(results => {
            site = results;
            return Owner
            .findByPk(req.session.uid)
        })
        .then(owner => {
            res.json(request)
            // res.render('./requests/listRequest', { owner, request, site });
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    
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
                res.redirect(`/owners`)
            })
            .catch(err => {
                res.render(`./owners/login`, { data : email, msg :null, err : err})
            })
    }

    static createOwnerForm( req, res){
        res.render(`./owners/addOwner`, {data : null, msg :null, err : {errors : null}})
    }

    static createOwner (req, res){
        const { first_name, last_name, email, password, password2, address, phone_number} = req.body;
        let newOwner = { first_name, last_name, email, password, address, phone_number}
        if(password!==password2){
            console.log(`masuk`)
            res.render(`./owners/addOwner`, { data : newOwner, msg : null, err : { message : `password mismatch`}})
            return
        }
        Owner
            .create(newOwner)
            .then(() => {
                res.render(`./owners/login`, { data : email, msg : `Hunter ${first_name+' '+last_name} is registered, you may now login`, err : null})
            })
            .catch(err => {
                // res.send(err.message)
                res.render(`./owners/addOwner`, { data : newOwner, msg : null, err : err})
            })
    }

    static logout (req, res){
        req.session.destroy(err => {
            res.redirect(`/`)
        })
    }
    static acceptRequest(req, res) {
        Request
        .findOne({
            where: {
                FossilHunterId: req.params.hunt_id,
                SiteId: req.params.site_id
            },
            include: [FossilHunter]
        })
        .then(request => {
            request.status = "accept";
            const mailOptions = {
            from: 'excavadm@gmail.com',
            to: request.FossilHunter.email,
            subject: 'Excusvation Mail',
            text: 'Your excavation request is granted.'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static rejectRequest(req, res) {
        Request
        .findOne({
            where: {
                FossilHunterId: req.params.hunt_id,
                SiteId: req.params.site_id
            }
        })
        .then(request => {
            request.status = "reject";
            const mailOptions = {
            from: 'excavadm@gmail.com',
            to: request.FossilHunter.email,
            subject: 'Excusvation Mail',
            text: 'Your excavation request is revoked.'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        })
        .catch(err => {
            res.send(err.message);
        })
    }

}

module.exports = OwnerController;