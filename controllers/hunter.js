'use strict'

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
        res.render(`addHunter`, {data : null, msg :null, err : null})
    }

    static createHunter (req, res){
        const { name, phone_number, email, start_hunt_year, team_size} = req.body;
        let newHunter = { name, phone_number, email, start_hunt_year, team_size }

        FossilHunter
            .create(newHunter)
            .then(() => {
                res.render(`addHunter`, { data : null, msg : `Hunter ${name} registered`, err : null})
            })
            .catch(err => {
                // res.send(newHunter)
                res.render(`addHunter`, { data : newHunter, msg : null, err : err.errors})
            })
    }

}

module.exports = Controller;