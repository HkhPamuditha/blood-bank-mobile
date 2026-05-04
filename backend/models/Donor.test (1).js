const mongoose = require('mongoose');
const Donor = require('./Donor');

describe('Donor Model Test', () => {
  it('should validate successfully with correct fields', () => {
    const donor = new Donor({
      name: 'John Doe',
      nic: '987654321V',
      age: 25,
      gender: 'Male',
      bloodGroup: 'A+',
      contactNumber: '0771234567',
      address: 'Colombo, Sri Lanka'
    });
    
    const error = donor.validateSync();
    expect(error).toBeUndefined();
  });

  
    
    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.nic).toBeDefined();
    expect(error.errors.age).toBeDefined();
    expect(error.errors.gender).toBeDefined();
    expect(error.errors.bloodGroup).toBeDefined();
    expect(error.errors.contactNumber).toBeDefined();
    expect(error.errors.address).toBeDefined();
  });
});
