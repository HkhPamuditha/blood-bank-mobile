// Import mongoose (used to create ObjectId for testing)
const mongoose = require('mongoose');
const BloodStock = require('./BloodStock');

describe('BloodStock Model Test', () => {
  it('should validate successfully with correct fields', () => {
    const bloodStock = new BloodStock({
      hospitalId: new mongoose.Types.ObjectId(),
      bloodGroup: 'O-',
      unitsAvailable: 10
    });
    
    const error = bloodStock.validateSync();
    expect(error).toBeUndefined();
  });

  it('should fail validation if required fields are missing', () => {
    const bloodStock = new BloodStock({});
    const error = bloodStock.validateSync();
    
    expect(error).toBeDefined();
    expect(error.errors.hospitalId).toBeDefined();
    expect(error.errors.bloodGroup).toBeDefined();
  });

  it('should have default unitsAvailable as 0', () => {
    const bloodStock = new BloodStock({
      hospitalId: new mongoose.Types.ObjectId(),
      bloodGroup: 'AB+'
    });
    // Expect default value = 0
    expect(bloodStock.unitsAvailable).toBe(0);
  });
});
