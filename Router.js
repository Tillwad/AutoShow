const bcrypt = require('bcrypt');
const e = require('express');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.register(app, db);
        this.save(app, db);
    }

    login(app, db) {
        app.post('/login', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;

            username = username.toLowerCase();

            if (username.length > 12 || password.length > 12) {
                res.json({
                    success: false,
                    msg: 'An error occured, please try again'
                })
                return;
            }

            let cols = [username];
            db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {

                if (err) {
                    res.json({
                        success: false,
                        msg: 'An error occured, please try again'
                    })
                    return;
                }

                if (data && data.length === 1) {
                    bcrypt.compare(password, data[0].password, (bcrypt, verified) => {

                        if (verified) {
                            req.session.userID = data[0].id;

                            res.json({
                                success: true,
                                username: data[0].username,
                                colors: data[0].colors
                            })

                            return;
                        }

                        else {
                            res.json({
                                success: false,
                                msg: 'Invalid Password'
                            })
                        }
                    })
                }
                else {
                    res.json({
                        success: false,
                        msg: 'User not found, pleas try again'
                    })
                }
            });
        });
    }

    logout(app, db) {
        app.post('/logout', (req, res) => {

            if (req.session.userID) {

                req.session.destroy();
                res.json({
                    success: true
                })

                return true;
            }
            else {
                res.json({
                    success: false
                })
                return false;
            }
        })
    }

    isLoggedIn(app, db) {
        app.post('/isLoggedIn', (req, res) => {

            if (req.session.userID) {

                let cols = [req.session.userID];
                db.query('SELECT * FROM user WHERE id = ? LIMIT 1', cols, (err, data, field) => {

                    if (data && data.length === 1) {

                        res.json({
                            success: true,
                            username: data[0].username,
                            colors: data[0].colors,
                        })
                    }
                    else {
                        res.json({
                            success: false
                        })

                    }

                });
            }
            else {
                res.json({
                    success: false
                })
            }
        })
    }

    register(app, db) {
        app.post('/register', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            username = username.toLowerCase();
            email = email.toLowerCase();

            if (username.length > 12 || password.length > 12 || !regex.test(email)) {
                console.log('user, password or email not right')
                res.json({
                    success: false,
                    msg: 'An error occured, please try again'
                })
                return;
            }

            let cols = [username, bcrypt.hashSync(password, 9), email, "#000000,#000000,#000000,#000000,#000000,#000000,#000000,#000000"];

            db.query('INSERT INTO user (id, username, password, email, colors) VALUES (NULL, ?, ?, ?, ?)', cols, (err, data, fields) => {
                if (err) {
                    console.log('Error Faild to Insert: ' + err)
                    res.json({
                        success: false,
                        msg: 'An error occured, please try again'
                    })
                    return;
                }


                if (data && data.length === 1) {
                    res.json({
                        success: true,
                        username: data[0].username
                    })
                }
            })
        }
    )}

    save(app, db) {
        app.post('/save', (req, res) => {

            if (req.session.userID) {
                console.log(req.body.colors)
                let cols = [req.body.colors, req.session.userID];
                db.query('UPDATE user SET colors = ? WHERE id = ? LIMIT 1', cols, (err, data, field) => {
                    
                    if(err) {
                        
                        console.log('Error Faild to Update: ' + err)
                        res.json({
                            success: false,
                            msg: 'An error occured, please try again'
                        })
                        return;
                    }
                    
                    if (data) {
                        res.json({
                            success: true,
                            msg: 'Saved'
                        })
                    }
                    else {
                        console.log('/ende')
                        res.json({
                            success: false,
                            msg: "Nothin wrong"
                        })
                        return;
                    }

                });
            }
            else {
                console.log('No user')
                res.json({
                    success: false,
                    msg: 'Failed'
                })
            }
        })
    }
}

module.exports = Router;