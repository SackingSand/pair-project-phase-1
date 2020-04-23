'use strict'

const bcrypt = require(`bcrypt`);
const Model = require(`../models/`);
const FossilHunter = Model.FossilHunter;
const { Op } = require("sequelize");


class Controller {

    static getProfiles (req, res){
        FossilHunter
            .findOne({
                where : {
                    id : req.session.uid
                }
            })
            .then(data => {
                res.send([data,req.session])
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
                if(!bcrypt.compareSync(password, data.password)){
                    throw new Error(`Kombinasi email & password tidak ditemukan`)
                }
                req.session.uid = data.id;
                req.session.role = `hunter`;
                req.session.cookie.expires = false;
                console.log(req.session);
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
        const { id } = req.session.uid;

        Request
        .findAll({
            include: [FossilHunter],
            where: {
                FossilHunterId: id,
                status: "active"
            }
        })
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            res.send(err);
        })
    }
}

module.exports = Controller;