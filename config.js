exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.MONGODB_URI === 'production' ?
                       	//process.env.NODE_ENV === 'production' ?
                       		'mongodb://<dbuser1>:<dbuser1>@ds035776.mlab.com:35776/jk-shopping-list' :
                            //'mongodb://localhost/shopping-list' :
                            'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;

//process.env.MONGODB_URL
//mongodb://<dbuser1>:<dbuser1>@ds035776.mlab.com:35776/jk-shopping-list