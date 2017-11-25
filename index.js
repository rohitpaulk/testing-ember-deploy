/* jshint node: true */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-memhog',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,

      // note: most plugins can simply implement these next two properties and use
      // the base class' implementation of the `configure` hook
      defaultConfig: {},
      requiredConfig: [], // throw an error if this is not configured

      // implement any hooks appropriate for your plugin
      willUpload: function(context) {
        console.log("Going to exhaust memory!");

        const spawnSync = require('child_process').spawnSync;
        result = spawnSync("ruby", ["-e", "a = 'a' * (4 * 1024 * 1024 * 1024); sleep 60"])

        console.log("Exited with status " + result.status);
        console.log("Exited with error " + result.error);

        console.log("Done exhausting memory!");

        return true;
      },
    });

    return new DeployPlugin();
  }
};
