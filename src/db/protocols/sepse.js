const hpp = require('../stages/hpp');
const initialApproach = require('../stages/initialApproach');
const initialDiagnosis = require('../stages/initialDiagnosis');
const laboratory = require('../stages/laboratory');
const lactate = require('../stages/lactate');
const antibiotic = require('../stages/antibiotic');
const inputSofa = require('../stages/inputSofa');
const outputSofa = require('../stages/outputSofa');
const extraSofa = require('../stages/extraSofa');
const outcome = require('../stages/outcome');
const actingTime = require('../stages/actingTime');

module.exports = {
  title: 'Sepse',
  description: 'Infecção generalizada',
  code: 'sepse',
  stages: {
    hpp,
    initialApproach,
    initialDiagnosis,
    laboratory,
    lactate,
    antibiotic,
    inputSofa,
    outputSofa,
    extraSofa,
    outcome,
    actingTime,
  }
}