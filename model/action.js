var User = require('./usertools');
var Form = require('./formtools');

let action = {};

/* Users Actions */
action.getUsername = (session) => {
    return new Promise((resolve, reject)=>{
        User.findById(session.userId)
        .exec((error, user) => {
            if (error) {
                reject(error)
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    reject(err);
                } else {
                    resolve(user.username);
                }
            }
        })
    });
}

action.getUserObject = (session) => {
    return new Promise((resolve, reject)=>{
        User.findById(session.userId)
        .exec((error, user) => {
            if (error) {
                reject(error)
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    reject(err);
                } else {
                    resolve(user); 
                }
            }
        })
    });
}

action.getRole = (session) => {
    return new Promise((resolve, reject)=>{
        User.findById(session.userId)
        .exec((err, user) => {
          if (err) {
            reject(err);
          } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    reject(err);
                } else {
                    resolve(user.role);
                }
            }
        });
    })
}

action.authenticate = (credentials) => {
    return new Promise((resolve, reject)=>{
        User.authenticate(credentials.email, credentials.password, (error, user) => {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                reject(err);
            } else {
              resolve(user);
            }
        });
    })
}

action.userCreate = (userData) => {
    return new Promise((resolve, reject)=>{
        User.create(userData, (error, user) => {
            if (error) {
                console.log(error);
                var err = new Error('User already registred.');
                err.status = 418;
                reject(err);            
            } else {
                resolve(user);
            }
        });
    })
}

/* Forms Action */
action.getForms = () => {
    return new Promise((resolve, reject)=>{
        Form.find({}, (err, forms) => {
            if(err){
                reject(err);
            } else {
                resolve(forms);
            }
        });
    })
}

action.getForm = (formName) => {
    return new Promise((resolve, reject)=>{
        Form.findOne({name: formName}, (err, forms) => {
            if(err){
                reject(err);
            } else {
                resolve(forms);
            }
        });
    })
}
    
action.createForm = (formData) => {
    return new Promise((resolve, reject)=>{
        Form.create(formData, (err, form) => {
            if(err){
                reject(err);
            } else {
                resolve(form);
            }
        });
    })
}

action.removeForm = (formName) => {
    return new Promise((resolve, reject)=>{
        Form.remove({name: formName}, (err) => {
            if(err){
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

module.exports = action;