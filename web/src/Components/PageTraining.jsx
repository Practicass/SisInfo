/* eslint-disable react-hooks/exhaustive-deps */

import {ImCross} from "react-icons/im"
import "../css/PageTraining.css"
import { useParams } from "react-router-dom"
import { Global } from "../helpers/Global"
import { useEffect, useState } from "react"
import {BiSolidXSquare, BiSolidPlusSquare} from "react-icons/bi"


const PageTraining = () => {
    const params = useParams()
    const id = params.id
    const [routine, setRoutine] = useState([])
    const [sets, setSets] = useState([]);
    const [mostrarTerminarMenu, setMostrarTerminarMenu] = useState(false);
  

    useEffect(() => {
      getRoutine()
  }, []) 


    const getRoutine = async() => {
        
        const request = await fetch(Global.url+"rutine/rutine/"+id, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()


        
        let routineAux = data.rutine.exercises

        const setsCopy = [];
        for(let i=0; i<routineAux.length; i++){
          if(!sets[i]){
            setsCopy.push({reps:[], weight:[]});
          }
        } 
        console.log(routineAux, setsCopy)
        console.log("HOLA")
        setSets(setsCopy);
        setRoutine(data.rutine.exercises)

        
    }

    const validarNumero = (e) => {
        // Obtener el código de la tecla pulsada
        const codigoTecla = e.which || e.keyCode;
    
        // Permitir teclas de control como Enter y retroceso
        if (e.ctrlKey || e.altKey || codigoTecla < 32) {
          return;
        }
    
        // Asegurarse de que solo se introduzcan números
        if (codigoTecla < 48 || codigoTecla > 57) {
          e.preventDefault();
        }
      };
      

    


    


  const handleAddSet = (exerciseIndex) => {
    
    const setsCopy = [...sets];

    if (setsCopy[exerciseIndex] && setsCopy[exerciseIndex].reps.length >= 5) {
      console.log("Ya has alcanzado el máximo de 6 sets para este ejercicio.");
      return;
    }
    console.log(exerciseIndex, setsCopy)
    setsCopy[exerciseIndex].reps.push(0);
    setsCopy[exerciseIndex].weight.push(0);
    console.log(setsCopy)

    setSets(setsCopy);
  }

  const handleDeleteSet = (exerciseIndex) => {

    const setsCopy = [...sets];

    setSets(setsCopy);
  

    setSets((prevSets) => {
      const newSets = [...prevSets];
      if (newSets[exerciseIndex]) {

        newSets[exerciseIndex].weight.pop();
        newSets[exerciseIndex].reps.pop();

      }
      return newSets;
    });
  

  };

  const saveInfo = (event, exerciseIndex, setIndex) => {
    const { name, value } = event.target;

    // Actualizar el estado con los nuevos datos
    setSets((prevSets) => {
      const newSets = [...prevSets];

        newSets[exerciseIndex][name][setIndex] = value
      
      
      return newSets;
    });
  };


  return (
    <div className="pageTraining">
      <div className="cross-training"><ImCross size="35px" color='#fba92c'/></div>
      <div className="title-training"><h1>{routine.name}</h1></div>
      <div className="addTraining">
        {routine.map( (exercise,exerciseIndex) => {
          
            return(
                <div className={"exercise-training-"+mostrarTerminarMenu} key={exercise._id}>
                    <h2 className="title-exercise">{exerciseIndex+1}.{exercise.name}</h2>
                    <div className="categories">
                      <label className="title-num">Serie</label>
                      <label className="title-reps">Repeticiones</label>
                      <label className="title-kg">Peso(kg)</label>
                    </div>
                    <div className="sets">
                      {sets[exerciseIndex].reps && sets[exerciseIndex].reps.map((set, setIndex) => (
                        <div className="set" key={setIndex}>
                          <label className="input-exercise num" >{setIndex+1}</label>
                          <input className="input-exercise reps" type="number" name={`reps`} min="1" onKeyDown={validarNumero} onChange={(e) => saveInfo(e, exerciseIndex, setIndex)}/> 
                          <input className="input-exercise kg" type="number" name={`weight`} min="1" onKeyDown={validarNumero} onChange={(e) => saveInfo(e, exerciseIndex, setIndex)}/>
                          <BiSolidXSquare className= "delete-set" size="30px" color='#fba92c' onClick={() => handleDeleteSet(exerciseIndex)}/>
                        </div>
                      ))}
                    </div>
                    
                    <div className="addSet">
                      <BiSolidPlusSquare size="30px" color="#fba92c" onClick={() => handleAddSet(exerciseIndex)}/>
                    </div>
                </div>
            )
        })}
        <button className={"terminar-boton-"+mostrarTerminarMenu} onClick={() => setMostrarTerminarMenu(!mostrarTerminarMenu)} >
        TERMINAR
        </button>
        {mostrarTerminarMenu && <div className="terminar-menu"></div>}
        
      </div>
    </div>
  )
}


export default PageTraining
