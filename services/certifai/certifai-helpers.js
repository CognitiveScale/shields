'use strict'

const Joi = require('@hapi/joi')
const { metric } = require('../text-formatters')
const certifaiGrade = Joi.equal('A', 'B', 'C', 'D', 'E', 'F')

function certifaiAtxColor(certifaiScore) {
  if (certifaiScore > 75) {
    return 'brightgreen'
  } else if (certifaiScore > 50) {
    return 'yellow'
  } else {
    return 'red'
  }
}

function certifaiColor(certifaiScore) {
  if (certifaiScore > 75) {
    return 'brightgreen'
  } else if (certifaiScore > 50) {
    return 'yellow'
  } else {
    return 'red'
  }
}

function renderCertifaiAtxBadge({ label, certifaiScore }) {
  return {
    label,
    message: metric(certifaiScore),
    color: certifaiAtxColor(certifaiScore),
  }
}

function renderCertifaiFeatureBadge({ label, certifaiScore }) {
  return {
    label,
    message: metric(certifaiScore),
    color: certifaiColor(certifaiScore),
  }
}

module.exports = {
  certifaiGrade,
  certifaiColor,
  renderCertifaiFeatureBadge,
  renderCertifaiAtxBadge,
}
