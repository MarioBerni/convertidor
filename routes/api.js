'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function(req, res) {
      const input = req.query.input;
      let initNum;
      let initUnit;
      try {
        initNum = convertHandler.getNum(input);
      } catch (error) {
        initNum = null;
      }
      try {
        initUnit = convertHandler.getUnit(input);
      } catch (error) {
        initUnit = null;
      }
      
      if (!initNum && !initUnit) {
        return res.json({ error: 'invalid number and unit' });
      } else if (!initNum) {
        return res.json({ error: 'invalid number' });
      } else if (!initUnit) {
        return res.json({ error: 'invalid unit' });
      }
      
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
    });
};
