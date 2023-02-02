// config/content-security-policy.js

module.exports = function (environment) {
    return {
      delivery: ['header'],
      enabled: true,
      failTests: true,
      policy: {
        'default-src': ["'none'"],
        'script-src': ["'self'"],
        'font-src': ["'self'"],
        'connect-src': ["'self'"],
        'img-src': ["'self'"],
        'style-src': ["'self'"],
        'media-src': ["'self'"],
      },
      reportOnly: true,
    };
  };

  // config/content-security-policy.js

module.exports = function (environment) {
    return {
      enabled: environment !== 'production',
      delivery: ['header'],
    };
  };