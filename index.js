var morgan = require('morgan')
  , fs = require('fs')
  , path = require('path')
  , FileStreamRotator = require('file-stream-rotator');

module.exports = function(sails) {

  return {

    /**
     * Default configuration
     *
     * We do this in a function since the configuration key for
     * the hook is itself configurable, so we can't just return
     * an object.
     */
    defaults: {

      logger: {
        // Turn morgan logging on by default in development environment
        // and off for production, using the 'dev' format
        //see: https://github.com/expressjs/morgan#predefined-formats for more formats
        format: 'dev',
        logLocation: 'console',
        fileLocation: 'access.log',
        inDevelopment: true,
        inProduction: false,
        fileRotationOptions: {
          frequency: 'daily',
          verbose: false,
          date_format: 'YYYYMMDD'
        }
      }
    },

    routes: {

      before: {

        'all /*': function addRequestLogging (req, res, next) {
          // If the hook has been deactivated, just return
          //Need to define requestlogger manually, since don't have acces to this.configKey
          // this has been moved to init as this activity is required only once
          // not in every call
          //var loggerSettings = sails.config['requestloggerfile'];
          if (loggerSettings && !loggerSettings.silently) {
            logger(req, res, function (err) {
              if (err) return res.json(500, err)
              next();
            })
          } else {
            next();
          }
        }
      }
    },

    /**
     * Initialize the hook
     * @param  {Function} cb Callback for when we're done initializing
     */
    initialize: function(cb) {
      // Getting settings from log config
      loggerSettings = sails.config['log'];
      // Log folder
      var logDirectory = path.join(__dirname, '../../../log')

      // ensure log directory exists
      fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

      // create a rotating write stream
      var accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: path.join(logDirectory, 'access-%DATE%.log'),
        frequency: 'daily',
        verbose: false
      })
      //Creating Logger object
      logger = morgan('combined', {stream: accessLogStream});
      // Setting Logger globaly
      sails.config['logger'] = logger;
      cb();
    }

  };
};