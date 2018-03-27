var User = require('./usertools');
var Form = require('./formtools');

let lib = {};


/* Users Actions */
lib.getUser = (session) => {
    return new Promise((resolve, reject)=>{
        User.findById(session.userId)
        .exec(function (error, user) {
            if (error) {
                reject(error)
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    reject(err);
                } else {
                    resolve(user.username   );
                }
            }
        })
    });
}


lib.getRole = (session) => {
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

/* Forms Action */
lib.getForms = () => {
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

lib.getForm = (formName) => {
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

lib.removeForm = (formName) => {
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

module.exports = lib