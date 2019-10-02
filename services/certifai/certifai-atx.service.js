'use strict'

//const Joi = require('@hapi/joi')
const { renderCertifaiAtxBadge } = require('./certifai-helpers')
const { BaseSvgScrapingService } = require('..')

//const schema = Joi.array().items(Joi.object())

module.exports = class CertifaiAtx extends BaseSvgScrapingService {
  static get category() {
    return 'analysis'
  }

  static get route() {
    return {
      base: 'certifai/atx',
      pattern: ':projectId/:branch*',
    }
  }

  static get examples() {
    return [
      {
        title: 'Certifai AI Trust Index Score',
        pattern: ':projectId',
        namedParams: { projectId: 'e27821fb6289410b8f58338c7e0bc686' },
        staticPreview: this.render({ certifaiScore: '650' }),
      },
      {
        title: 'Certifai AI Trust Index Branch Score',
        pattern: ':projectId/:branch',
        namedParams: {
          projectId: 'e27821fb6289410b8f58338c7e0bc686',
          branch: 'master',
        },
        staticPreview: this.render({ certifaiScore: '650' }),
      },
    ]
  }

  static get defaultBadgeData() {
    return {
      label: 'ATX Score',
    }
  }

  static render({ certifaiScore }) {
    return renderCertifaiAtxBadge({ certifaiScore })
  }

  async handle({ projectId, branch }) {
    /*
    const { message: certifaiScore } = await this._requestSvg({
      schema,
      url: `https://api.certifai.ai/project/badge/atx/${encodeURIComponent(
        projectId
      )}`,
      options: { qs: { branch } },
      errorMessages: { 404: 'project or branch not found' },
      valueMatcher: /visibility="hidden">([^<>]+)<\/text>/,
    })
    */
    return this.constructor.render({ certifaiScore: '650' })
  }
}
