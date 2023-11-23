import  { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'
import "../css/Historial.css"
import { IoChevronBackOutline , IoChevronForwardOutline} from "react-icons/io5";
import {NavLink} from "react-router-dom"

import ReactTimeAgo from "react-time-ago"


const Historial = () => {
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    


  
  
  
   const [history, setHistory] = useState([])
    

    const getHistory = async() => {

        const request = await fetch(Global.url+"training/trainings/"+page, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()

        console.log(data)
        setHistory(data.trainings)
        setMaxPage(Math.ceil(data.total/data.itemsPerPage))
        

        
    }

    const segundosATiempo = (segundos) => {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        if(horas == 0){
            return`${minutos}m`
        }else{
            return `${horas}h ${minutos}m`;
        }
        
    }




    useEffect(() => {
        getHistory()
    }, [page])

    const uniqueExerciseNames = new Set();
    
    


  return (
    <div className='principal-history'>
        {history.map(training => {
            
            return(
                <NavLink key={training._id} className='rectangle'>
                    <div className='info-rectangle'>
                        <h3>{training.name}</h3>
                        <ReactTimeAgo date={Date.parse(training.created_at)} locale='es-ES' className='date-rectangle'/>
                        <label>{segundosATiempo(training.duration)}</label>
                    </div>
                    <div className='separator'></div>
                    <div className='exercises-rectangle'>
                        <h4>Ejercicios:</h4>
                        {training.sets.map(set => {
                            const exerciseName = set.exercise.name;

                            if (!uniqueExerciseNames.has(exerciseName)) {
                                uniqueExerciseNames.add(exerciseName);

                            return (
                                <div key={set._id}>
                                <label>{exerciseName}</label>
                                </div>
                            );
                            }

                            // Return null for sets with duplicate exercise names
                            return null;
                        })}
                    </div>
                </NavLink>
            )
        })}
        <div className='pages-historial'>
            <IoChevronBackOutline className="modify-num-page-icon" size="35px" color='#fba92c'onClick={()=>{
                if(page>1){
                    setPage(page-1)
                }
            }}/>
            <label>{page}</label>
            <IoChevronForwardOutline className="modify-num-page-icon"size="35px" color='#fba92c' onClick={()=>{
                if(page<maxPage){
                    setPage(page+1)
                }
            }}/>
        </div>
    </div>
  )
}


export default Historial