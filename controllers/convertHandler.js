function ConvertHandler() {
  this.getNum = function(input) {
    let result;
    const index = input.search(/[a-z]/i);
    if (index !== 0) {
      const num = input.substring(0, index);
      if (num.includes('/')) {
        const fractions = num.split('/');
        if (fractions.length > 2) {
          throw new Error('invalid number');
        } else {
          result = fractions.reduce((a, b) => a / b);
        }
      } else {
        result = parseFloat(num);
      }
    } else {
      result = 1;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    const units = ['gal','l','mi','km','lbs','kg'];
    const unit = input.match(/[a-z]+$/i)[0].toLowerCase();
    if (!units.includes(unit)) {
      throw new Error('invalid unit');
    }
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'l';
      case 'l':
        return 'gal';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        throw new Error('invalid unit');
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      default:
        throw new Error('invalid unit');
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        throw new Error('invalid unit');
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
