/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        var result = {
            admin: req.session.user
        };

        return res.view('back/admin.ejs', result);
    },


    product: function (req, res) {
        var result = {
            admin: req.session.user
        };
        var skip = 0;
        var page = 1;

        if (req.query.hasOwnProperty('page')) {
            skip = (req.query.page - 1) * 10;
            page = req.query.page;
        }

        var queryOptions = {
            where: {},
            skip: skip,
            limit: 10,
            sort: 'createdAt DESC'
        };

        result.page = page;

        async.waterfall([
            function GetTotalCount(next) {
                Product.count(function (err, num) {
                    if (err) return next(err);

                    result.pages = [];

                    for (var i = 0, count = parseInt(num / queryOptions.limit); i <= count; i++) {
                        result.pages.push(i + 1);
                    }

                    return next(null);
                });
            },

            function GetProducts(next) {
                Product.find(queryOptions, function (err, products) {
                    if (err) next(err);

                    result.products = products;

                    return next(null);
                });
            },

            function GetEditProduct(next) {
                if (!req.params.hasOwnProperty('id')) {
                    return next(null);
                    return;
                }

                Product.findOne(req.params.id, function (err, product) {
                    if (err) next(err);
                    result.edit = product;

                    return next(null);
                });
            }
        ], function (err) {
            if (err) return res.serverError(err);


            result.templateToInclude = 'list_product';


            return res.view('back/commun/main.ejs', result);
        });
    },

    user: function (req, res) {
        var result = {
            admin: req.session.user
        };
        var skip = 0;
        var page = 1;

        if (req.query.hasOwnProperty('page')) {
            skip = (req.query.page - 1) * 10;
            page = req.query.page;
        }

        var queryOptions = {
            where: {},
            skip: skip,
            limit: 10,
            sort: 'createdAt DESC'
        };

        result.page = page;

        async.waterfall([
            function GetTotalCount(next) {
                User.count(function (err, num) {
                    if (err) return next(err);

                    result.pages = [];

                    for (var i = 0, count = parseInt(num / queryOptions.limit); i <= count; i++) {
                        result.pages.push(i + 1);
                    }

                    return next(null);
                });
            },

            function GetUsers(next) {
                User.find(queryOptions).populate('orders').exec(function (err, users) {
                    if (err) return next(err);

                    result.users = users;

                    return next(null);
                });
            }
        ], function (err) {
            if (err) return res.serverError(err);


            // we add the name of the template to include

            result.templateToInclude = 'customerList';

            return res.view('back/commun/main.ejs', result);
        });
    },


    productCreate: function (req, res) {


        Product.create({name: 'Walter Jr', price: 10}, function (err, product) {
            if (err) return res.serverError(err);

            return res.redirect('/admin/product');
        });

    },


    menu: function (req, res) {


        var result = {};

        result.templateToInclude = 'admin';

        return res.view('back/commun/main.ejs', result);

    },


};
