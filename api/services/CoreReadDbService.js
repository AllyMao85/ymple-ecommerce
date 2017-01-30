// InsertDbService.js

var nodemailer = require('nodemailer');


var url = "mongodb://localhost:27017/ymple-commerce";


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: sails.config.project.nodemailer.auth
});

module.exports = {
    sendAlertEmail: function () {
        var mailOptions = {
            from: sails.config.project.nodemailer.sender, // sender address
            to: sails.config.project.nodemailer.mailToAlert, // send to self
            subject: 'New order created!', // Subject line
            html: '<p>You have new order.</p> Check your admin panel at <a href="' + sails.config.project.website + '/admin/' + '"></a> ' // html body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) return console.log(err);
            else return console.log('Message sent: ' + info.response);
        });
    },


    test: function () {

        return 'test ok service';
    },


    getNewIdProduct: function (fieldName) { // initialize the counter for name field, for example the productId

        return getNewIdProduct(fieldName);

        function getNewIdProduct() { // return the new id product to use
            var MongoClient = require('mongodb').MongoClient;
            return new Promise(
                function (resolve, reject) {
                    MongoClient.connect(url, function (err, db) {
                        var col = db.collection('counter');
                        var data = col.find({id: fieldName}).toArray(function (err, docs) {
                            db.close();
                            resolve(docs[0].seq);//docs[0].name.toString()); // returns to the function that calls the callback
                        });
                    })
                })
        }
    },

    getListCoreModule: function () {

        return new Promise(
            function (resolve, reject) {

                var MongoClient = require('mongodb').MongoClient;
                var fieldName = 'product';

                MongoClient.connect(url, function (err, db) {
                    var collectionName = "core_module_installed";
                    var col = db.collection(collectionName);
                    var data = col.find({}).toArray(function (err, data) {
                        db.close();
                        console.log('getListCoreModule - data', data);
                        resolve(data);//docs[0].name.toString()); // returns to the function that calls the callback
                    });
                })
            })
    }
};
