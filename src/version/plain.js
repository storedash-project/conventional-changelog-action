const core = require('@actions/core');
const BaseVersioning = require('./base');
const bumpVersion = require('../helpers/bumpVersion');

module.exports = class Plain extends BaseVersioning {
  /**
   * Bumps the version in the package.json
   *
   * @param {!string} releaseType - The type of release
   * @return {*}
   */
  bump = async (releaseType) => {
    // Read the file
    const fileContent = this.read();

    // Get the old version
    const oldVersion = fileContent;
    // Get the new version
    this.newVersion = await bumpVersion(releaseType, oldVersion);

    core.info(
      `Bumped file "${this.fileLocation}" from "${oldVersion}" to "${this.newVersion}"`
    );

    // Update the file
    this.update(this.newVersion);
  };
};
