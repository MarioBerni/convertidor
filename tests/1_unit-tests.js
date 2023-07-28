const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal number input', function(done) {
      const input = '3.1mi';
      assert.equal(convertHandler.getNum(input), 3.1);
      done();
    });

    test('Fractional input', function(done) {
      const input = '1/2km';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('Fractional input with decimal', function(done) {
      const input = '2.5/5kg';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('Invalid input (double fraction)', function(done) {
      const input = '3/2/3gal';
      assert.throws(() => convertHandler.getNum(input), 'invalid number');
      done();
    });

    test('No numerical input', function(done) {
      const input = 'mi';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('For each valid input unit', function(done) {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'GAL', 'l', 'MI', 'KM', 'LBS', 'KG'];
      const output = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getUnit(ele), output[i]);
      });
      done();
    });

    test('Invalid input unit', function(done) {
      assert.throws(() => convertHandler.getUnit('32g'), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('For each valid input unit', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const output = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), output[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('For each valid input unit', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), output[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Gal to L', function(done) {
      const input = [5, 'gal'];
      const output = 18.92705;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    });

    test('L to Gal', function(done) {
      const input = [5, 'l'];
      const output = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    });

    test('Mi to Km', function(done) {
      const input = [5, 'mi'];
      const output = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    });

    test('Km to Mi', function(done) {
      const input = [5, 'km'];
      const output = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    });

    test('Lbs to Kg', function(done) {
      const input = [5, 'lbs'];
      const output = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    });

    test('Kg to Lbs', function(done) {
      const input = [5, 'kg'];
      const output = 11.02312;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    });
  });
});
