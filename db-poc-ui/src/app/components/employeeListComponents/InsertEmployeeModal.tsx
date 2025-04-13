"use client";

import React, { useState, useEffect } from 'react';
import LoginMessage from '../loginComponents/LoginMessage';

interface InsertEmployeeModalProps {
  onClose: () => void;
  onSubmit: (empleado: { documento: string; nombre: string; NombrePuesto: string }) => void;
}

const InsertEmployeeModal: React.FC<InsertEmployeeModalProps> = ({ onClose, onSubmit}) => {
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [NombrePuesto, setNombrePuesto] = useState<string | ''>('');
  const [mensaje, setMensaje] = useState('');
  const [puestos, setPuestos] = useState<{ Id: number; Nombre: string }[]>([]);

  // Obtener los puestos desde la API al montar el componente
  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v2/position");
        if (response.ok) {
          const data = await response.json();
          setPuestos(data.data.puestos); // Guardar los puestos en el estado
        } 
        else {
          console.error("Error al obtener los puestos:", response.status);
          alert('No se pudieron cargar los puestos. Inténtalo de nuevo.');
        }
      } 
      catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert('Ocurrió un error al intentar cargar los puestos.');
      }
    };

    fetchPuestos();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //el documento no solo contiene numeros
    if (!(/^\d+$/.test(documento))) {
      setMensaje('❌ El documento de identidad debe de contener sólo números.');
      return;
    }
    //el nombre no solo contiene caracteres y espacios
    else if (!(/^[a-zA-Z\s]+$/.test(nombre))) {
      setMensaje('❌ El nombre del empleado debe de contener sólo carácteres y espacios.');
      return;
    } 
    //todo está correcto (se envian los datos al componente padre)
    onSubmit({ documento, nombre, NombrePuesto });
    //no hay onClose, esta modal se cierra desde employeeList
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Insertar Nuevo Empleado</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Documento de Identidad:</label>
            <input
              type="text"
              value={documento}
              onChange={(e) => {
                setDocumento(e.target.value)
                setMensaje('');
              }}
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value)
                setMensaje('')
              }}
              required
            />
          </div>
          <div className="form-group-Lista">
            <label>Puesto:</label>
            <select
              value={NombrePuesto}
              onChange={(e) => {
                setNombrePuesto((e.target.value))
              }}
              required
            >
              <option value="">Selecciona un puesto</option> 
              {/*Se mapean los puestos en la lista*/}
              {puestos.map((puesto) => (
                <option key={puesto.Id} value={puesto.Nombre}>
                  {puesto.Nombre}
                </option>
              ))}
            </select>
          </div>
          <LoginMessage mensaje={mensaje} />
          <div className="form-buttons">
            <button type="submit" className="confirm-button">Insertar</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsertEmployeeModal;