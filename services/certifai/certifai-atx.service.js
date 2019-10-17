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
        staticPreview: this.render({ certifaiScore: '65' }),
      },
      {
        title: 'Certifai AI Trust Index Branch Score',
        pattern: ':projectId/:branch',
        namedParams: {
          projectId: 'e27821fb6289410b8f58338c7e0bc686',
          branch: 'master',
        },
        staticPreview: this.render({ certifaiScore: '65' }),
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
    const url = `https://storage.googleapis.com/reports_certifai_innovation-lab-sandbox/certifai-scan-${encodeURIComponent(
      projectId
    )}-atx.json`
    const { res } = await this._request({
      url,
      options: { qs: { branch } },
      errorMessages: { 404: 'project or branch not found' },
    })

    const { atx } = JSON.parse(res.body)

    return this.constructor.render({ certifaiScore: atx.toFixed(2) })
  }
}
