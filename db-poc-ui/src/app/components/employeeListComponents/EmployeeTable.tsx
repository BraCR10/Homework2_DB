//Descripción: Componente que carga la tabla de empleados real

"use client";

import React from 'react';
import EmployeeRow from './EmployeeRow';
import '../../styles/employee.css'

interface EmployeeTableProps {
  empleados: { id: number; nombre: string; documento: string }[];
  handleDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ empleados, handleDelete }) => {
  return (
    <table className="empleados-tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Documento</th>
          <th className='a'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <EmployeeRow key={empleado.id} empleado={empleado} handleDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;