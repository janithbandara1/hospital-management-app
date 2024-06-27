// Patients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patients.css';
import PatientCard from './PatientCard';

const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [newPatient, setNewPatient] =
		useState({ name: '', age: '', gender: '' });
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);


	useEffect(
		() => {
			axios.get('https://symmetrical-trout-r5xv54x5wj4h5j9r-5000.app.github.dev/patients')
				.then(response => setPatients(response.data))
				.catch(error =>
					console.error('Error fetching patients:', error));
		}, []);


	const handleAddPatient =
		(e) => {
			e.preventDefault();

			axios.post(
				'https://symmetrical-trout-r5xv54x5wj4h5j9r-5000.app.github.dev/patients/add', newPatient)
				.then(response => {
					console.log(response.data);
					setPatients([...patients, response.data]);
					setNewPatient({ name: '', age: '', gender: '' });
				})
				.catch(error =>
					console.error('Error adding patient:', error));
		};

	const handleUpdatePatient =
		(id, e) => {
			e.preventDefault();

			axios.post(
				`https://symmetrical-trout-r5xv54x5wj4h5j9r-5000.app.github.dev/patients/update/${id}`, selectedPatient)
				.then(response => {
					const updatePat = {
						...selectedPatient,
						_id: id
					};

					console.log('update patient', updatePat);

					setPatients(
						patients.map(
							patient =>
							(patient._id === id
								? updatePat : patient)));

					setSelectedPatient(null);
					setIsEditMode(false); // Switch back to Add mode
				})
				.catch(
					error =>
						console.error('Error updating patient:', error));
		};

	const handleDeletePatient =
		(id) => {
			axios.delete(
				`https://symmetrical-trout-r5xv54x5wj4h5j9r-5000.app.github.dev/patients/delete/${id}`)
				.then(response => {
					console.log(response.data);
					setSelectedPatient(null);
					setPatients(
						patients.filter(
							patient => patient._id !== id));
				})
				.catch(
					error =>
						console.error('Error deleting patient:', error));
		};

	const handleEditPatient =
		(patient) => {
			setSelectedPatient(patient);
			setIsEditMode(true); // Switch to Edit mode
		};

	return (
		<div className='patient-container ' style={{ display: 'flex' }}>
			<div className='form-sections '>
				<h2>
					{
						isEditMode ?
							'Edit Patient' :
							'Add New Patient'
					}
				</h2>
				<form onSubmit=
					{
						isEditMode ?
							(e) =>
								handleUpdatePatient(selectedPatient._id, e) :
							handleAddPatient}>
					<label>Name: </label>
					<input type="text"
						value={
							isEditMode ?
								selectedPatient.name :
								newPatient.name
						}
						onChange={
							(e) =>
								isEditMode
									? setSelectedPatient(
										{
											...selectedPatient,
											name: e.target.value
										}) :
									setNewPatient(
										{
											...newPatient,
											name: e.target.value
										}
									)} />
					<br />
					<label>Age: </label>
					<input type="text"
						value=
						{
							isEditMode ?
								selectedPatient.age : newPatient.age
						}
						onChange={
							(e) =>
								isEditMode ?
									setSelectedPatient(
										{
											...selectedPatient,
											age: e.target.value
										}) :
									setNewPatient(
										{
											...newPatient,
											age: e.target.value
										}
									)} />
					<br />
					<label>Gender: </label>
					<input type="text"
						value=
						{
							isEditMode ?
								selectedPatient.gender :
								newPatient.gender
						} onChange={
							(e) =>
								isEditMode ?
									setSelectedPatient(
										{
											...selectedPatient,
											gender: e.target.value
										}) :
									setNewPatient(
										{
											...newPatient,
											gender: e.target.value
										})} />
					<br />
					<button type="submit">
						{
							isEditMode ?
								'Update Patient' :
								'Add Patient'
						}
					</button>
				</form>
			</div>

			<div className='patients-section'>
				<h2>
					Patients
					({patients.length})
				</h2>
				<div className="patient-list">
					{patients.map(patient => (
						<PatientCard
							key={patient._id}
							patient={patient}
							onEdit={handleEditPatient}
							onDelete={handleDeletePatient}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Patients;
