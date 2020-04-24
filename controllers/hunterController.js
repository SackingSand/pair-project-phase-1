'use strict'

const bcrypt = require(`bcrypt`);
const Model = require(`../models/`);
const { FossilHunter, Request, Site } = Model;
const { Op } = require("sequelize");


class Controller {

    static huntersOnly(req, res, next){
        if(req.session.role!==`hunter`){
            res.redirect(`/`);
        }
     next()
    } 

    static getProfiles (req, res){
        FossilHunter
            .findOne({
                where : {
                    id : req.session.uid
                }
            })
            .then(data => {
                res.render('./hunters/hunterPage', { data })
                // res.send([data,req.session])
            })
            .catch(err => {
                res.send()
            })
    }

    static createHunterForm( req, res){
        res.render(`./hunters/addHunter`, {data : null, msg :null, err : {errors : null}})
    }

    static createHunter (req, res){
        const { first_name, last_name, password, password2, phone_number, email, hunting_experience, team_size} = req.body;
        let newHunter = { first_name, last_name, password, phone_number, email, hunting_experience, team_size }
        if(password!==password2){
            console.log(`masuk`)
            res.render(`./hunters/addHunter`, { data : newHunter, msg : null, err : { message : `password mismatch`}})
            return
        }
        FossilHunter
            .create(newHunter)
            .then(() => {
                res.render(`./hunters/login`, { data : email, msg : `Hunter ${first_name+' '+last_name} is registered, you may now login`, err : null})
            })
            .catch(err => {
                // res.send(err.message)
                res.render(`./hunters/addHunter`, { data : newHunter, msg : null, err : err})
            })
    }

    static loginHunterForm(req, res) {
        res.render(`./hunters/login`, {data : null, msg :null, err : null})
    }
    
    static loginHunter (req, res) {
        const { email, password} = req.body;
        FossilHunter
            .findOne({
                where : {
                    email : email
                }
            })
            .then((data) => {
                if(!data){
                    throw new Error(`Kombinasi email & password tidak ditemukan`)
                }
                if(!bcrypt.compareSync(password, data.password)){
                    throw new Error(`Kombinasi email & password tidak ditemukan`)
                }
                req.session.uid = data.id;
                req.session.role = `hunter`;
                req.session.cookie.expires = false;
                res.redirect(`/hunters`)
            })
            .catch(err => {
                res.render(`./hunters/login`, { data : email, msg :null, err : err})
            })
    }

    static logout (req, res){
        req.session.destroy(err => {
            res.redirect(`/`)
        })
    }

    static showRequest(req, res) {
        console.log(req.session.uid);
        const id = req.session.uid;
        let request = [];

        Request
        .findAll({
            include: [FossilHunter, Site],
            where: {
                FossilHunterId: id,
                status: "pending"
            }
        })
        .then(results => {
            request = results;
            return FossilHunter
            .findByPk(id)
        })
        .then(hunters => {
            res.render('./requests/requestStatus', { request, hunters })
        })
        .catch(err => {
            res.send(err);
        })
    }

    static acceptRequest(req, res) {
        const { id } = req.params;

        Request
        .findByPk(id)
        .then(request => {
            request.status = "accept"
            res.send('Request for Excavation Granted')
        })
        .catch(err => {
            res.send(err.message)
        })
    }

    static rejectRequest(req, res) {
        const { id } = req.params;

        Request
        .findByPk(id)
        .then(request => {
            request.status = "reject"
            res.send('Request for Excavation Revoked')
        })
        .catch(err => {
            res.send(err.message)
        })
    }
    static editHunterForm( req, res){
        FossilHunter
            .findOne({
                where : { id : req.session.uid}
            })
            .then(data => {
                res.render(`./hunters/editHunter`, {data, msg :null, err : {errors : null}})
            })
            .catch(err => {
                res.send(err);
            })
    }

    static updateHunter ( req, res){
        const { first_name, last_name, password, password2, phone_number, hunting_experience, team_size} = req.body;
        let newHunter = { 
            first_name : first_name, 
            last_name : last_name, 
            phone_number : phone_number,
            hunting_experience : hunting_experience, 
            team_size : team_size
        }
        if(password!==password2){
            console.log(`masuk`)
            res.render(`./hunters/edit`, { data : newHunter, msg : null, err : { message : `password mismatch`}})
            return
        }
        FossilHunter
            .update(newHunter, {
                where : {
                    id : req.session.uid
                }
            })
            .then(data => {
                res.redirect(`/hunters`);
            })
            .catch(err => {
                res.send(err);
            })
    }

    static openList ( req, res){
        Site
            .findAll({
                include : [`Owner`]
            })
            .then(owner => res.render(`./hunters/opensites`, {owner}))
            .catch(err => {
                res.send(err);
            })
    }

    static createRequest ( req, res){
        Request
            .findOne({
                where : {
                    FossilHunterId : req.session.uid,
                    SiteId : req.params.id
                }
            })
            .then(data => {
                if(!data){
                    return Request. create({
                                        FossilHunterId : req.session.uid,
                                        SiteId : req.params.id,
                                        status : `pending`
                                    })
                } else {
                    throw new Error (`You already requested for this site before`)
                }
            })
            .then(()=> res.redirect(`/hunters/request`))
            .catch(err => {
                    res.send(err.message);
            })
    }

}

module.exports = Controller;