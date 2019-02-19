let config = {}
// development
let env = process.env.NODE_ENV || 'development'
// TODO change these and hide them
if (env === 'development') {
	config = {
		mongo: "mongodb://rubens:silly#Password1@ds141815.mlab.com:41815/kaplan",
		url: 'http://localhost:3000/'
	}

} else if (env === 'test') {
	config = {
		mongo: "mongodb://rubens:silly#Password1@ds141815.mlab.com:41815/kaplan",
		url: 'http://localhost:3000/'
	}

} else if (env === 'production') {
	config = {
		mongo: "mongodb://rubens:silly#Password1@ds141815.mlab.com:41815/kaplan",
		url: 'http://localhost:3000/'
	}

}

module.exports = config
