"use client";

import React, { useState } from 'react';
import '../styles/employee.css'; // Importa el archivo CSS

const employee = () => {
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'Juan Pérez', documento: '123456' },
    { id: 2, nombre: 'María López', documento: '654321' },
    { id: 3, nombre: 'Carlos Gómez', documento: '789012' },
  ]);
  const [filtro, setFiltro] = useState('');

  //filtro para empleados
  const filtrarEmpleados = () => {
    if (!filtro.trim()) { // Si el filtro está vacío o contiene solo espacios en blanco
      return empleados;
    } 
    else if (/^\d+$/.test(filtro)) { // Si el filtro contiene solo números (búsqueda por documento)
      return empleados.filter((empleado) =>
        empleado.documento.includes(filtro)
      );
    } 
    else if (/^[a-zA-Z\s]+$/.test(filtro)) { // Si el filtro contiene solo letras y espacios (búsqueda por nombre)
      return empleados.filter((empleado) =>
        empleado.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
    } 
    else { // Si el filtro no cumple con los criterios anteriores (ni solo números ni solo letras/espacios)
      return [];
    }
  };

  const handleDelete = (id: number) => {
    setEmpleados(empleados.filter((empleado) => empleado.id !== id));
    alert(`Empleado con ID ${id} eliminado.`);
  };

  const empleadosFiltrados = filtrarEmpleados();

  return (
    <div className="listar-empleados-container"> {/*Contenedor de la lista*/}
      <h2>Lista de Empleados</h2>
      <div className="filtro-container"> {/*Contenedor del filtro*/}
        <input
          type="text"
          placeholder="Filtrar por nombre o documento"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />
        <button onClick={() => setFiltro('')} className="filtro-boton">
          Limpiar Filtro
        </button>
      </div>

      <table className="empleados-tabla"> {/*Tabla con empleados*/}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosFiltrados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.nombre}</td>
              <td>{empleado.documento}</td>
              <td>
                <button onClick={() => handleDelete(empleado.id)}>
                  Consultar
                </button>
                <button onClick={() => handleDelete(empleado.id)}>
                  Modificar
                </button>
                <button onClick={() => handleDelete(empleado.id)}>
                  Listar Movimientos
                </button>
                <button onClick={() => handleDelete(empleado.id)}>
                  Insertar Movimientos
                </button>
                <button onClick={() => handleDelete(empleado.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {empleadosFiltrados.length === 0 && (
        <p>No se encontraron empleados con el filtro aplicado.</p>
      )}
    </div>
  );
};

export default employee;