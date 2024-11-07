// componente funcional

//Función flecha
//Fución anónima
//Función de expresión
//Función de asignación

//IIFE (Inmediately Invoked Function Expression)
//Función de expresión invocada inmediatamente


//Función de Expresión

//Orden de presedencia
//1. Estilos en Linea
//2. Estilos por id
//3. Estilos por etiqueta
//4. Estilos por clase
"use client"
import {useState} from "react"
import styles from "./page.module.css"

export default function Page(){

  const [nuevaTarea, setNuevaTarea] = useState({
    nombre:"",
    fecha:"",
    prioridad:""
  })

  const[tareas, setTareas] = useState([]);

  const[filtroTexto, setFiltroTexto]= useState("");

  const[filtroPrioridad, setFiltroPrioridad]= useState("");

  console.log(nuevaTarea)
  console.log(tareas)

  function handleChange(event){
    setNuevaTarea({
      ...nuevaTarea,
      [event.target.name]: event.target.value
    })
  }

  function handleChangeSearchTexto(event){
    setFiltroTexto(event.target.value);
  }
  function handleChangeSearchPrioridad(event){
    setFiltroPrioridad(event.target.value);
  }

  function agregarTarea(){
    const newListaTareas = tareas.slice();
    const newTarea = {
      nombre: nuevaTarea.nombre,
      fecha:nuevaTarea.fecha,
      prioridad: nuevaTarea.prioridad,
      creadoEl: new Date().toISOString()
    }
    newListaTareas.push(newTarea);
    setTareas(newListaTareas);
    setNuevaTarea({
      nombre:"",
      fecha:"",
      prioridad:""

    })
  }




  return(
    <div className={styles.container}>

      <div className={styles.box}>
        <h1>to-do list</h1>
        <input value={nuevaTarea.nombre}
          onChange={handleChange}
          type="text" 
          placeholder="Agregar Tarea.." 
          name="nombre">
        </input>        
        
        <input 
          onChange={handleChange} 
          type="date" 
          name="fecha"
          value={nuevaTarea.fecha}>
        </input>
        <select
        onChange={handleChange}
        name="prioridad"
        value={nuevaTarea.prioridad}>

        <option > Prioridad</option>
        <option>Alta</option>
        <option>Media</option>
        <option>Baja</option>
        </select>     
        <button onClick={agregarTarea}>Guardar</button>
        <div style={{
          marginTop:"20px",
          }}><h4>Filtros</h4></div>   
          <input type="text" placeholder="Buscar tareas..." className={styles.busqueda} onChange={handleChangeSearchTexto}
          value={filtroTexto}
          ></input>

          <div >
            <p>Ordernar por prioridad:</p>
            <select 
            className={styles.busqueda}
            onChange={handleChangeSearchPrioridad}
            value={filtroPrioridad}
            >

        <option > Prioridad</option>
        <option>Alta</option>
        <option>Media</option>
        <option>Baja</option>
        </select>     
          </div>

        <div style={{
          marginTop:"20px",
          }}>
          <ul>

            {
              tareas.filter((tarea)=> tarea.nombre.toLowerCase().includes(filtroTexto.toLowerCase()))
              .filter(
                (tarea)=>{
                  if(filtroPrioridad===""){
                    return true;
                  }
                  return tarea.prioridad === filtroPrioridad;
                }
              )
              .map(
                (tarea)=>{
                  return(
                    <li key={tarea.creadoEl} className={styles.tarea}>
                      <h5>Tarea: {tarea.nombre}</h5>
                      <p>Fecha: {tarea.fecha}</p>
                      <p>Prioridad: {tarea.prioridad}</p>
                      <button 
                      style={{
                        background:"red",
                      }}>
                        eliminar</button>
                      <button
                      style={{
                        background:"green",
                      }}>actualizar</button>
                   </li>
                  )
                }//callback
              )
            }
            
          </ul>
            
        </div>
      </div>

    </div>
  )
}