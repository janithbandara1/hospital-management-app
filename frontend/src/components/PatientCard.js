// PatientCard.js
import React from 'react';
import './PatientCard.css'

const PatientCard =
	(
		{
			patient,
			onEdit,
			onDelete
		}
	) => {
		return (
			<div className="patient-card">
				<p>Name: {patient.name}</p>
				<p>Age: {patient.age}</p>
				<p>Gender: {patient.gender}</p>
				<div className='btn-container'
					style={{ width: "100%" }}>
					<button onClick={
						() =>
							onEdit(patient)}>
						Edit
					</button>
					<button onClick={
						() =>
							onDelete(patient._id)
					}>
						Delete
					</button>
				</div>
			</div>
		);
	};

export default PatientCard;
