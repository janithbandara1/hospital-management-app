// AppointmentCard.js
import React from 'react';
import './AppointmentCard.css'

const AppointmentCard =
	(
		{
			appointment,
			onEdit,
			onDelete
		}
	) => {
		return (
			<div className="appointment-card">
				<p>Patient Name: {appointment.patientName}</p>
				<p>Doctor Name: {appointment.doctorName}</p>
				<p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
				<div className='btn-container'>
					<button onClick={
						() =>
							onEdit(appointment)
					}>
						Edit
					</button>
					<button onClick={
						() =>
							onDelete(appointment._id)
					}>
						Delete
					</button>
				</div>
			</div>
		);
	};

export default AppointmentCard;
