module.exports.routes = {

    // INDEX
    'GET    /'                    : 'front/ProductController.list',
    'GET    /login'               : { view: 'front/login' },
    'GET    /account'             : { view: 'front/account'},

    // USER
    'POST   /login': 'front/UserController.login',
    '/login': 'front/UserController.login',

    'POST   /signup': 'front/UserController.signup',
    'POST   /reset': 'front/UserController.reset',
    'GET    /logout': 'front/UserController.logout',
    'GET    /profile': 'front/UserController.profile',

    // PRODUCT
    'GET    /product/:id': 'front/ProductController.view',
    'GET    /product/status/:id': 'front/ProductController.status',

    // ORDER & CART
    'GET    /cart': 'front/CartController.index',
    'PUT    /cart/apply/:id': 'front/CartController.apply',
    'GET    /cart/add/:id': 'front/CartController.add',
    'GET    /cart/buy/:id': 'front/CartController.add',
    'GET    /cart/clear': 'front/CartController.clear',
    'DELETE /cart/:id': 'front/CartController.delete',
    'GET    /checkout': 'front/CartController.checkout',

    'POST   /paid': 'front/OrderController.paid',
    '/pay/:id': 'front/OrderController.pay',
    '/order': 'front/OrderController.create',
    'GET    /order/cancel/:id': 'front/OrderController.cancel',
    'GET    /order/delivery/:id': 'front/OrderController.delivery',
    'GET    /order/check': 'front/OrderController.check',
    'GET    /order/change': 'front/OrderController.change',

    // FILE & UPLOAD
    'GET    /upload': 'front/FileController.upload',
    'GET    /image/:id': 'front/FileController.retrieve',
    'GET    /test': 'front/FileController.test',
    'GET    /subscription_newsletter': 'front/SubscriptionController.newsletter' //add in table front_subscription_newsletter data


}