'use strict'

const Joi = require('@hapi/joi')
const { metric } = require('../text-formatters')
const certifaiGrade = Joi.equal('A', 'B', 'C', 'D', 'E', 'F')

function certifaiColor(certifaiScore) {
  if (certifaiScore > 700) {
    return 'brightgreen'
  } else if (certifaiScore > 600) {
    return 'yellow'
  } else {
    return 'red'
  }
}

function renderCertifaiBadge({ label, certifaiScore }) {
  return {
    label,
    message: metric(certifaiScore),
    color: certifaiColor(certifaiScore),
  }
}

module.exports = { certifaiGrade, certifaiColor, renderCertifaiBadge}
