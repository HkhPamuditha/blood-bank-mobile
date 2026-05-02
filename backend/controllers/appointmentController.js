const Appointment = require('../models/Appointment');
const BloodStock = require('../models/BloodStock');
const Donor = require('../models/Donor');
const BloodCamp = require('../models/BloodCamp');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('donorId', 'name bloodGroup nic')
      .populate('hospitalId', 'hospitalName location')
      .populate('bloodCampId', 'name location');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // Create Donor and update stock if status changes to Approved
    if (req.body.status === 'Approved' && appointment.status !== 'Approved') {
      if (!appointment.donorId) {
        const newDonor = await Donor.create({
          name: appointment.applicantName,
          nic: appointment.nic,
          age: appointment.age,
          gender: appointment.gender,
          bloodGroup: appointment.bloodGroup,
          contactNumber: appointment.contactNumber,
          address: appointment.address,
        });
        appointment.donorId = newDonor._id;
      }

      // Automatically update blood stock upon approval
      const bloodGroup = appointment.bloodGroup;
      let hospitalId = appointment.hospitalId;

      if (!hospitalId && appointment.bloodCampId) {
        const camp = await BloodCamp.findById(appointment.bloodCampId);
        if (camp) {
          hospitalId = camp.hospitalId;
        }
      }
      if (bloodGroup && hospitalId) {
        let stock = await BloodStock.findOne({ hospitalId, bloodGroup });
        if (stock) {
          stock.unitsAvailable += 1;
          await stock.save();
        } else {
          await BloodStock.create({ hospitalId, bloodGroup, unitsAvailable: 1 });
        }
      }
    }

    appointment.status = req.body.status || appointment.status;
    appointment.appointmentDate = req.body.appointmentDate || appointment.appointmentDate;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
