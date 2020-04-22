'use strict'

const Model = require(`../models/`);
const FossilHunter = Model.FossilHunter;
const ExcavationSite = Model.ExcavationSite;
const Owner = Model.Owner;
const Request = Model.Request;

class Controller {

    static createHunter (req, res){
        const { name, phone_number, email, start_hunt_year, team_size} = req.body;
        let newHunter = { name, phone_number, email, start_hunt_year, team_size }

        FossilHunter
            .create(newHunter)
            .then((data) => {
                res.send(data)
            })
            .catch(err => {
                res.send(err.message)
            })
    }

}

module.exports = Controller;