/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
// }

// makes sure that things are running properly with nextjs configuration
// default setup is much easier.
// https://www.cypress.io/blog/2021/04/06/cypress-component-testing-react/

const findNextWebpackConfig = require('./findNextWebpackConfig')
const path = require('path')

module.exports = (on, config) => {
    on('dev-server:start', async (options) => {
        const webpackConfig = await findNextWebpackConfig(config)

        // require('webpack') now points to nextjs bundled version
        const { startDevServer } = require('@cypress/webpack-dev-server')

        return startDevServer({
            options,
            webpackConfig,
            template: path.resolve(__dirname, 'index-template.html'),
        })
    })

    config.env.reactDevtools = true

    return config
}
