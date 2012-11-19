var winston = require("winston"),
	logger = new (winston.Logger)({transports: [new (winston.transports.Console)({level: 'info'}) ]}),
	createMinionMaster = require("../../").minionMaster.create;

var minionMaster = createMinionMaster({	logger:logger });
minionMaster.on("workerProviderConnected", function(){
	var workforce, i;

	for(i = 2; i > 0; i--){
		workforce = minionMaster.getWorkforce();

		workforce.on('workStart', function(worker){
			worker.on('ping', function(){
				console.log('ping');
				worker.emit('pong');
				console.log('pong');
			});

			worker.on('timeout', function(){
				console.log('timeout');
			});
		});

		workforce.start({scripts: ['http://localhost/ping.js']}, 1000 * 10);
	}
});