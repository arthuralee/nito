var auth = require('./Auth.js');

module.exports = function(acl) {
  return {
    statics: {
      willTransitionTo: function (transition) {
        var nextPath = transition.path;
        if (!auth.signedIn()) {
          transition.redirect('/signin',{},
            { 'r' : nextPath });
        } else if (acl && auth.acl() !== acl) {
          transition.redirect('/error');
        }
      }
    }
  };
};
