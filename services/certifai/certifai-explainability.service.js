'use strict'

//const Joi = require('@hapi/joi')
const { renderCertifaiFeatureBadge } = require('./certifai-helpers')
const { BaseSvgScrapingService } = require('..')

//const schema = Joi.array().items(Joi.object())

module.exports = class CertifaiExplaniability extends BaseSvgScrapingService {
  static get category() {
    return 'analysis'
  }

  static get route() {
    return {
      base: 'certifai/explainability',
      pattern: ':projectId/:branch*',
    }
  }

  static get examples() {
    return [
      {
        title: 'Certifai Explainability Score',
        pattern: ':projectId',
        namedParams: { projectId: 'e27821fb6289410b8f58338c7e0bc686' },
        staticPreview: this.render({ certifaiScore: '77' }),
      },
      {
        title: 'Certifai Explainability Branch Score',
        pattern: ':projectId/:branch',
        namedParams: {
          projectId: 'e27821fb6289410b8f58338c7e0bc686',
          branch: 'master',
        },
        staticPreview: this.render({ certifaiScore: '77' }),
      },
    ]
  }

  static get defaultBadgeData() {
    return {
      label: 'AI Explainability Score',
    }
  }

  static render({ certifaiScore }) {
    return renderCertifaiFeatureBadge({ certifaiScore })
  }

  async handle({ projectId, branch }) {
    /*
    const { message: certifaiScore } = await this._requestSvg({
      schema,
      url: `https://api.certifai.ai/project/badge/robustness/${encodeURIComponent(
        projectId
      )}`,
      options: { qs: { branch } },
      errorMessages: { 404: 'project or branch not found' },
      valueMatcher: /visibility="hidden">([^<>]+)<\/text>/,
    })
    */
    return this.constructor.render({ certifaiScore: '77' })
  }
}
