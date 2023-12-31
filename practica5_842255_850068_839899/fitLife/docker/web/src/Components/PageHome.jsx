import React, { useEffect } from 'react'
import Header from './Header'
import {FaBars} from "react-icons/fa"
import { Global } from '../helpers/Global'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate, NavLink } from 'react-router-dom'
import Stat3 from './Stat3'
import Stat4 from './Stat4'
import "../css/PageHome.css"
import Feed from './Feed'
import ReactTimeAgo from "react-time-ago"

const PageHome = () => {

  const [sidebar, setSidebar] = useState(false)
  const [routines, setRoutines] = useState([])
  const [history, setHistory] = useState([])
  let navigate = useNavigate()

  const getRoutines = async() => {

    const request = await fetch(Global.url+"rutine/favRutines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          }
    })

    const data = await request.json()

    setRoutines(data.routines)
    
    
  }
  const getHistory = async() => {

    const request = await fetch(Global.url+"training/trainingsFriends/1/1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          }
    })

    const data = await request.json()


    setHistory(data.trainings)

    

    
}

const minutosATiempo = (minutos) => {
  const horas = Math.floor( minutos / 60);
  //console.log(horas, minutos)
  if(horas == 0){
      return`${minutos}m`
  }else{
      
      return `${horas}h ${Math.floor(minutos % 60)}m`;
  }
  
}




  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/")
    }else{
      getRoutines()
      getHistory()
    }

  },[])
  
  const uniqueExerciseNames = []
  

  ////console.log(auth)
  return (
    <div className={"page-"+sidebar }>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <div className='principal-home '>

                <NavLink to="/stats/3" className="stats "><Stat3/></NavLink>
                <div to="/routines" className="routines-home text-xs lg:text-xl">
                  {routines.map((routine) =>  {
                      return(
                        <div className='routine-home' key={routine._id}>
                          <label>{routine.name}</label>
                          <NavLink to={"/training/"+routine._id} className="iniciar-training-home text-xs lg:text-xl">INICIAR</NavLink>
                        </div>
                      )
                    }
                  )} 
                </div>
                <NavLink to="/stats/4" className="stats"><Stat4/></NavLink>
                <div className="lastFriendTraining">
                  {history.map(training => {
                    
                    return(
                        <NavLink to={"/showTraining/"+training._id} key={training._id} className='rectangle'>
                            <div className='info-rectangle'>
                                <h3 className='text-1xs lg:text-xl '>{training.name}</h3>
                                <h3 className='text-xs lg:text-xl'>@{training.user.nick}</h3>
                                <ReactTimeAgo date={Date.parse(training.created_at)} locale='es-ES' className='text-xs lg:text-xl date-rectangle'/>
                                <label className='text-xs lg:text-xl'>{minutosATiempo(training.duration)}</label>
                            </div>
                            <div className='separator '></div>
                            <div className='exercises-rectangle text-xs lg:text-xl'>
                                <h4 className='text-1xs lg:text-xl'>Ejercicios:</h4>
                                {training.sets.map(set => {
                                    const exerciseName = set.exercise.name;

                                    if (!uniqueExerciseNames.includes(exerciseName)) {
                                        uniqueExerciseNames.push(exerciseName);

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
                </div>
            
            
            
        </div>
      </div>
    </div>
  ) 
}

export default PageHome
