import express from 'express'
import userModel from '../models/UserSchema.js'
import bcrypt from 'bcrypt'

const routes = express.Router()

routes.post('/add', (req, res) => {

    const user = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            return res.status(530).send('error gen salt')

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                return res.status(530).send('error gen hash')

            user.password = hash
            userModel.create(user)
                .then((u) => {
                    res.status(201).json(u)
                })
                .catch((err) => {
                    res.status(530).send(err)
                })
        })
    })

})

routes.get('/checklogin', (req, res) => {
    const user = req.body

    userModel.findOne({ login: user.login })
        .then((u) => {
            bcrypt.compare(user.password, u.password, (err, resultat) => {
                if (resultat)
                    res.send('Authentification Reussie')
                else
                    res.send('Echec Authentification')
            })
        })
        .catch((err) => {
            res.status(530).send(err)
        })
})

routes.get('/checkmail', (req, res) => {
    const user = req.body

    userModel.findOne({ email: user.email })
        .then((u) => {
            bcrypt.compare(user.password, u.password, (err, resultat) => {
                if (resultat)
                    res.send('Authentification Reussie')
                else
                    res.send('Echec Authentification')
            })
        })
        .catch((err) => {
            res.status(530).send(err)
        })
})

export default routes;