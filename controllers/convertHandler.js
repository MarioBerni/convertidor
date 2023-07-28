function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    let indexOfFirstChar = input.search(/[a-z]/i);
    if (indexOfFirstChar === 0) return 1;
    let numberPart = input.slice(0, indexOfFirstChar);
    if (numberPart.includes('/')) {
      let numbers = numberPart.split('/');
      if (numbers.length > 2) return 'invalid number';
      result = numbers[0] / numbers[1];
    } else {
      result = numberPart;
    }
    return parseFloat(result);
  };

  this.getUnit = function (input) {
    let result;
    let units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    let indexOfFirstChar = input.search(/[a-z]/i);
    let unitPart = input.slice(indexOfFirstChar).toLowerCase();
    if (units.includes(unitPart)) {
      result = unitPart;
    } else {
      result = 'invalid unit';
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'l';
      case 'l':
        return 'gal';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      default:
        return 'invalid unit';
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      default:
        return 'invalid unit';
    }
  };

  this.convert = function (initNum, initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * 3.78541;
        break;
      case 'l':
        result = initNum / 3.78541;
        break;
      case 'lbs':
        result = initNum * 0.453592;
        break;
      case 'kg':
        result = initNum / 0.453592;
        break;
      case 'mi':
        result = initNum * 1.60934;
        break;
      case 'km':
        result = initNum / 1.60934;
        break;
      default:
        return 'invalid unit';
    }
    // Round to 5 decimal places
    return Math.round(result * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
