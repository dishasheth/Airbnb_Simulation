var SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'mylogfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
    logger = SimpleNodeLogger.createSimpleLogger( opts );
logger.setLevel('debug');
exports.log=function(message)
{
    logger.debug(message);
}