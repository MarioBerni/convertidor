'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.status(400).send('invalid number and unit');
      }
      if (initNum === 'invalid number') {
        return res.status(400).send(initNum);
      }
      if (initUnit === 'invalid unit') {
        return res.status(400).send(initUnit);
      }
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      // Ensure 'L' is used instead of 'l'
      initUnit = initUnit === 'l' ? 'L' : initUnit;
      returnUnit = returnUnit === 'l' ? 'L' : returnUnit;

      res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
    });
};
