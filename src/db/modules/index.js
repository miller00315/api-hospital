const antibiotic = require('./antibiotics');
const hpp = require('./hpp');
const initialApproach = require('./initialApproach');
const initialDiagnosis = require('./initialDiagnosis');
const laboratory = require('./laboratory');
const lactate = require('./lactate');
const outcome = require('./outcome');
const sofa = require('./sofa');

module.exports = [
  antibiotic,
  hpp,
  initialApproach,
  initialDiagnosis,
  laboratory,
  lactate,
  outcome,
  sofa
]