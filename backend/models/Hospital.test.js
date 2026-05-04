const mongoose = require('mongoose');
const Hospital = require('./Hospital');

describe('Hospital Model Test', () => {
  it('should validate successfully with correct fields', () => {
    const hospital = new Hospital({
      hospitalName: 'General Hospital',
      location: 'Colombo',
      contactNumber: '0112345678'
    });
    
    const error = hospital.validateSync();
    expect(error).toBeUndefined();
  });

  it('should fail validation if required fields are missing', () => {
    const hospital = new Hospital({});
    const error = hospital.validateSync();
    
    expect(error).toBeDefined();
    expect(error.errors.hospitalName).toBeDefined();
    expect(error.errors.location).toBeDefined();
    expect(error.errors.contactNumber).toBeDefined();
  });
});
