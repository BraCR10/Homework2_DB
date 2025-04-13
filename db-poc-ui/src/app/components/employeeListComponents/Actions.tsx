"use client";

import React from 'react';

interface ActionsProps {
  empleadoId: number;
  handleDelete: (id: number) => void;
}

const Actions: React.FC<ActionsProps> = ({ empleadoId, handleDelete }) => {
  return (
    <>
      <button onClick={() => alert(`Consultar empleado ${empleadoId}`)}>
        Consultar
      </button>
      <button onClick={() => alert(`Modificar empleado ${empleadoId}`)}>
        Modificar
      </button>
      <button onClick={() => alert(`Listar movimientos de empleado ${empleadoId}`)}>
        Listar Movimientos
      </button>
      <button onClick={() => alert(`Insertar movimientos para empleado ${empleadoId}`)}>
        Insertar Movimientos
      </button>
      <button onClick={() => handleDelete(empleadoId)}>Eliminar</button>
    </>
  );
};

export default Actions;