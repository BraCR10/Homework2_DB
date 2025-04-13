//Descripción: componente principal que maneja el estado y la lógica de la lista de empleados
"use client";

import React, { useState, useEffect } from 'react'; 
import FilterBar from './FilterBar';
import EmployeeTable from './EmployeeTable';
import '../../styles/employee.css';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import InsertEmployeeModal from './InsertEmployeeModal';

const EmployeeList = () => {
  const [empleados, setEmpleados] = useState([ //Esta lista se debe de borrar cuando terminen las pruebas y ya sirvan las peticiones (borrar)
    { id: 1, nombre: 'Juan Pérez', documento: '123266' },
    { id: 2, nombre: 'María López', documento: '654321' },
    { id: 3, nombre: 'Carlos Gómez', documento: '789012' },
    { id: 4, nombre: 'Juan Pérez', documento: '123456' },
    { id: 5, nombre: 'María López', documento: '654321' },
    { id: 6, nombre: 'Carlos Gómez', documento: '789012' },
    { id: 7, nombre: 'Juan Pérez', documento: '123456' },
    { id: 8, nombre: 'María López', documento: '654321' },
    { id: 9, nombre: 'Carlos Gómez', documento: '789012' },
    { id: 0, nombre: 'Juan Pérez', documento: '123456' },
    { id: 11, nombre: 'María López', documento: '654321' },
    { id: 12, nombre: 'Carlos Gómez', documento: '789012' },
    { id: 13, nombre: 'Juan Pérez', documento: '123456' },
    { id: 14, nombre: 'María López', documento: '654321' },
    { id: 15, nombre: 'Carlos Gómez', documento: '789012' },
  ]);
  const [filtro, setFiltro] = useState('');
  const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
  const [insertEmployeeModalVisible, setInsertEmployeeModalVisible] = useState(false);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState<number | null>(null); //su valor puede ser un numero o null, empieza con un null

  /*Esta funcion se debe de des-comentar para que la web pida los empleados a la api apenas esta inicie
  useEffect(() => { //useEffect es un hook que se efectúa apenas se abra la web
    fetchEmpleados();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente
  */
  
  //**************************************************
  //************ACCION DE CARGAR EMPLEADOS************
  // Obtener la lista inicial de empleados desde el backend
  const fetchEmpleados = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v2/employee');
      if (response.ok) {
        const data = await response.json();
        //se recorren todos los empleados del json y se guardan en empleados con los datos necesarios
        const empleadosBackend = data.data.empleados.map((empleado: any) => ({
          id: empleado.Id,
          nombre: empleado.Nombre,
          documento: empleado.ValorDocumentoIdentidad,
        }));
        setEmpleados(empleadosBackend);
      } 
      else {
        console.error('Error al obtener empleados:', response.status);
      }
    } 
    catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  //**************************************************
  //******FIN DE ACCION DE CARGAR EMPLEADOS***********

  //**************************************************
  //***************ACCION DE FILTRO*******************
  //Petición al backend de la lista dependiendo del filtro
  const aplicarFiltro = async () => {
    try {
      let response;

      // Caso 1: No hay filtro
      if (!filtro.trim()) {
        response = await fetch('http://localhost:3001/api/v2/employee');
      }
      // Caso 2: Filtro por DNI (números)
      else if (/^\d+$/.test(filtro)) {
        response = await fetch(`http://localhost:3001/api/v2/employee/DNI/${filtro}`);
      }
      // Caso 3: Filtro por nombre (letras y espacios)
      else if (/^[a-zA-Z\s]+$/.test(filtro)) {
        response = await fetch(`http://localhost:3001/api/v2/employee/name/${filtro}`);
      } 
      else {
        setEmpleados([]);
        return;
      }

      // Procesar la respuesta del backend
      if (response.ok) {
        const data = await response.json();
        const empleadosBackend = data.data.empleados.map((empleado: any) => ({
          id: empleado.Id,
          nombre: empleado.Nombre,
          documento: empleado.ValorDocumentoIdentidad,
        }));
        setEmpleados(empleadosBackend);
      } 
      else {
        console.error('Error al obtener empleados:', response.status);
        setEmpleados([]);
      }
    } 
    
    catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setEmpleados([]);
    }
  };
  //**************************************************
  //***********FIN DE ACCION DE FILTRO****************

  //**************************************************
  //***************ACCION DE INSERTAR*****************
  const handleInsert = async (empleado: { documento: string; nombre: string; NombrePuesto: string }) => {
    try {
      // Realizar la petición POST al backend
      const response = await fetch('http://localhost:3001/api/v2/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NombrePuesto: empleado.NombrePuesto,
          ValorDocumentoIdentidad: empleado.documento,
          NombreEmpleado: empleado.nombre,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.data.detail); // Mensaje de éxito del backend (borrar)
  
        // Actualizar la lista de empleados en el frontend
        fetchEmpleados();
        alert('Empleado insertado correctamente.');
        setInsertEmployeeModalVisible(false);
      } 
      else if (response.status === 400) { 
        const errorData = await response.json();
        console.error('Error al insertar empleado:', errorData.error.detail); //borrar
        alert(`Error: ${errorData.error.detail}`);
      }
      else {
        console.error('Error desconocido al insertar empleado:', response.status);
        alert('No se pudo insertar el empleado. Inténtalo de nuevo.');
      }
    } 
    catch (error) {
      console.error('Error al realizar la solicitud:', error); //borrar
      alert('Ocurrió un error al intentar insertar el empleado.');
    }
  };
  //**************************************************
  //************FIN DE ACCION DE INSERTAR*************

  //**************************************************
  //*****************ACCION DE BORRAR*****************
  const handleDelete = (id: number) => {
    setEmpleadoAEliminar(id);
    setModalConfirmationVisible(true);
  };

  const confirmDelete = async() => {
    if (empleadoAEliminar !== null) {
      try {
        // Realizar la petición DELETE al backend
        const response = await fetch('http://localhost:3001/api/v2/employee', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ IdEmpleado: empleadoAEliminar }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.data.detail); // Mensaje de éxito del backend (borrar)

          // Actualizar la lista de empleados en el frontend
          setEmpleados(empleados.filter((empleado) => empleado.id !== empleadoAEliminar)); //se elimina el empleado de la lista
          alert('Empleado eliminado correctamente.');
        } 
        else {
          console.error('Error al eliminar empleado:', response.status); //borrar
          alert('No se pudo eliminar el empleado. Inténtalo de nuevo.');
        }
      } 
      catch (error) {
        console.error('Error al realizar la solicitud:', error); //borrar
        alert('Ocurrió un error al intentar eliminar el empleado.');
      } 
      finally {
        // Restablecer el valor del estado
        setEmpleadoAEliminar(null);
        setModalConfirmationVisible(false);
      }
    }
  };

  const cancelDelete = async () => {
    setEmpleadoAEliminar(null);
    setModalConfirmationVisible(false);

    //enviar peticion al backend (intento de borrado)
    if (empleadoAEliminar !== null) {
      try {
        const response = await fetch('http://localhost:3001/api/v2/employee/deleteTry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ IdEmpleado: empleadoAEliminar }),
        });
  
        if (response.ok) {
          //no pasa nada
          alert('Alerta de intento de borrado con éxito');//borrar
        } 
        else {
          console.error('Error al verificar eliminación:', response.status);
          alert('No se pudo verificar si el empleado puede ser eliminado. Inténtalo de nuevo.');//borrar
        }
      } 
      catch (error) {
        console.error('Error al realizar la solicitud:', error);
        alert('Ocurrió un error al intentar verificar la eliminación del empleado.'); //borrar
      }
    }
  };
  //**************************************************
  //************FIN DE ACCION DE BORRAR***************

  return (
    <div className="listar-empleados-container">
      <h2>Lista de empleados</h2>
      <div className='filtro-container'>
        <FilterBar filtro={filtro} setFiltro={setFiltro} aplicarFiltro={aplicarFiltro} />
        <button onClick={() => setInsertEmployeeModalVisible(true)} className="insertar-boton">
          Insertar empleado
        </button>
      </div>
      <EmployeeTable empleados={empleados} handleDelete={handleDelete} />
      {empleados.length === 0 && (
        <p>No se encontraron empleados con el filtro aplicado.</p>
      )}
      {modalConfirmationVisible && (
        <DeleteConfirmationModal
          empleadoId={empleadoAEliminar!}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {insertEmployeeModalVisible && (
        <InsertEmployeeModal
          onClose={() => setInsertEmployeeModalVisible(false)}
          onSubmit={handleInsert}
        />
      )}
    </div>
  );
};

export default EmployeeList;