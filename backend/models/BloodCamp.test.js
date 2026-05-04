const mongoose = require('mongoose');
const BloodCamp = require('./BloodCamp');

describe('BloodCamp Model Test', () => {
  it('should validate successfully with correct fields', () => {
    const bloodCamp = new BloodCamp({
      name: 'Annual Blood Drive',
      location: 'Town Hall',
      date: new Date('2026-07-15'),
      time: '09:00 AM - 04:00 PM',
      hospitalId: new mongoose.Types.ObjectId()
    });
    
    const error = bloodCamp.validateSync();
    expect(error).toBeUndefined();
  });

  it('should fail validation if required fields are missing', () => {
    const bloodCamp = new BloodCamp({});
    const error = bloodCamp.validateSync();
    
    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.location).toBeDefined();
    expect(error.errors.date).toBeDefined();
    expect(error.errors.time).toBeDefined();
    expect(error.errors.hospitalId).toBeDefined();
  });
});
