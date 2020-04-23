'use strict'

const bcrypt = require(`bcrypt`);
const Model = require(`../models/`);
const FossilHunter = Model.FossilHunter;

class Controller {

    static getProfiles (req, res){
        FossilHunter
            .findAll()
            .then((data) => {
                res.send(data)
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static createHunterForm( req, res){
        res.render(`./hunters/addHunter`, {data : null, msg :null, err : null})
    }

    static createHunter (req, res){
        const { name, password, password2, phone_number, email, start_hunt_year, team_size} = req.body;
        let newHunter = { name, password, phone_number, email, start_hunt_year, team_size }
        if(password!==password2){
            console.log(`masuk`)
            res.render(`./hunters/addHunter`, { data : newHunter, msg : null, err : [{ message : `password mismatch`}]})
            return
        }
        FossilHunter
            .create(newHunter)
            .then(() => {
                res.render(`./hunters/addHunter`, { data : null, msg : `Hunter ${name} registered`, err : null})
            })
            .catch(err => {
                // res.send(newHunter)
                res.render(`./hunters/addHunter`, { data : newHunter, msg : null, err : err.errors})
            })
    }

}

module.exports = Controller;