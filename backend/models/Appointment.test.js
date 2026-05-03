const mongoose = require('mongoose');
const Appointment = require('./Appointment');

describe('Appointment Model Test', () => {
  it('should validate successfully with correct fields', () => {
    const appointment = new Appointment({
      applicantName: 'Jane Doe',
      nic: '987654322V',
      age: 28,
      gender: 'Female',
      bloodGroup: 'B+',
      contactNumber: '0777654321',
      address: 'Kandy, Sri Lanka',
      appointmentDate: new Date('2026-06-01T10:00:00Z'),
      hospitalId: new mongoose.Types.ObjectId(),
      status: 'Pending'
    });
    
    const error = appointment.validateSync();
    expect(error).toBeUndefined();
  });

  it('should fail validation if required fields are missing', () => {
    const appointment = new Appointment({});
    const error = appointment.validateSync();
    
    expect(error).toBeDefined();
    expect(error.errors.applicantName).toBeDefined();
    expect(error.errors.nic).toBeDefined();
    expect(error.errors.age).toBeDefined();
    expect(error.errors.gender).toBeDefined();
    expect(error.errors.bloodGroup).toBeDefined();
    expect(error.errors.contactNumber).toBeDefined();
    expect(error.errors.address).toBeDefined();
    expect(error.errors.appointmentDate).toBeDefined();
  });

  it('should have default status as Pending', () => {
    const appointment = new Appointment({
      applicantName: 'Jane Doe',
      nic: '987654322V',
      age: 28,
      gender: 'Female',
      bloodGroup: 'B+',
      contactNumber: '0777654321',
      address: 'Kandy, Sri Lanka',
      appointmentDate: new Date()
    });
    
    expect(appointment.status).toBe('Pending');
  });
});
