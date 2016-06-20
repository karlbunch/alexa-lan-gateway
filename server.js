function AlexaLanGateway(gwConfig) {
    var fs = require('fs');
    var AlexaAppServer = require('alexa-app-server');

    this.sslInit = function () {
        console.log('\nPlease generate your SSL keys first:\n\n\tcd sslcert\n\t./gen-cert.sh\n');
	process.exit();
    };

    this.start = function () {
	    console.log('Config:\n', gwConfig, '\n');

	    // Check for SSL keys
	    if (!fs.existsSync('sslcert/' + gwConfig.privateKey) || !fs.existsSync('sslcert/' + gwConfig.certificate)) {
	      console.log('** ERROR: Missing SSL keys\n');
	      this.sslInit();
	    }

	    var dirsNeeded = [
	        gwConfig.server_root,
	        gwConfig.server_root + '/' + (gwConfig.server_dir || 'server'),
	        gwConfig.server_root + '/' + gwConfig.public_html,
	        gwConfig.server_root + '/' + gwConfig.app_dir,
	    ];

	    dirsNeeded.forEach(function(k) {
		if (!fs.existsSync(k)) {
		    if (fs.mkdirSync(k)) {
		        console.log('** failed to create directory ' + k);
			process.exit();
		    } else {
		        console.log('** Created directory ' + k);
		    }
		}
	    });

	    var server = new AlexaAppServer(gwConfig);
	    server.start();
	    server.express.use('/ping', function (req, res) {
	        res.send("OK\n");
	    });
    };
}

var gateway = new AlexaLanGateway(require('./config'));
gateway.start();
