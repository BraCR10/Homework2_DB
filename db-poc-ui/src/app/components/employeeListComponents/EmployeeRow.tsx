///Descripción: Componente de los botones de acciones

"use client";

import React from 'react';
import Actions from './Actions';

interface EmployeeRowProps {
  empleado: { id: number; nombre: string; documento: string };
  handleDelete: (id: number) => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ empleado, handleDelete }) => {
  return (
    <tr>
      <td>{empleado.nombre}</td>
      <td>{empleado.documento}</td>
      <td>
        <Actions empleadoId={empleado.id} handleDelete={handleDelete} />
      </td>
    </tr>
  );
};

export default EmployeeRow;