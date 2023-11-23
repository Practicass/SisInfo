

import React from 'react'
import "../css/PageStats.css"
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {ImCross} from "react-icons/im"
import useAuth from '../hooks/useAuth'
import { Global } from '../helpers/Global'


const PageStat = () => {

    const params = useParams()
    const num = params.num

    const StatComponent = React.lazy(() => import(/* @vite-ignore */`./Stat${num}`));
    const {auth} = useAuth()

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
      const valorInput = e.target.value;
      if (valorInput.length >= 3) {
        e.preventDefault();
      }
      console.log(valorInput)
      if(num==4){
        if(e.target.name == "hours" && ((valorInput>2) || (valorInput == 2  && codigoTecla>52) || (valorInput.length >= 2))){
          e.preventDefault()
        }
        if(e.target.name == "minutes" && ((valorInput>6) || (valorInput == 6  && codigoTecla>48) || (valorInput.length >= 2))){
          e.preventDefault()
        }
        
      }
    };

    const saveInfo = async(event) => {
      event.preventDefault()
      let value
      console.log(num)
      if(num == 4){
        value = parseInt(event.target.hours.value)*60+parseInt(event.target.minutes.value)
        console.log(value)
      }else{
        value = event.target.newMetrica.value;
        if (parseInt(value, 10) > 999) {
          return;
        }
      }

      //setMetrica(value);
      let category
      
      if(num == 1){
        category = "Weight"
        
        
      }else if(num == 4){
        category = "Asleep"
      }
      const request = await fetch(Global.url + "stat/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          },
          
          body: JSON.stringify({
            "user": auth._id,
            "value": value,
            "name": category
          })

        })
      const data = await request.json()
      console.log(data.status)
      setTimeout(()=>{window.location.reload()}, 100)
    }

    const eliminateLast = async() => {
      let category
      
      if(num == 1){
        category = "Weight"
        
        
      }else if(num == 4){
        category = "Asleep"
      }
      const request = await fetch(Global.url + "stat/eliminateLast", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          },
          
          body: JSON.stringify({
            "user": auth._id,
            "name": category
          })

        })
      const data = await request.json()
      console.log(data.status)
      setTimeout(()=>{window.location.reload()}, 100)
    }


  return (
    <div className={"page"}>
      <NavLink to={-1}><ImCross size="35px" className='cancelar-stat' color='#fba92c'/></NavLink> 
      
        <div className='principal-stat1'>
            <div className='stat1'>
              <React.Suspense>
                <StatComponent />
              </React.Suspense>
            </div>
            {num == 1 && 
              (<div className='metrica-menu'>
                <form className='newMetrica' onSubmit={(e) => saveInfo(e)}>
                  <input type='number'  placeholder="weight" name="newMetrica" min="1" max="999" onKeyDown={validarNumero} ></input>
                  <input type='submit'  value="INTRODUCIR MÉTRICA"></input>
                </form>
                <button className='eliminar-metrica' onClick={eliminateLast}>ELIMINAR ÚLTIMA MÉTRICA</button>
              </div>)
            }
            {num == 4 && 
              (
              <div className='metrica-menu'>
                <form className='newMetrica' onSubmit={(e) => saveInfo(e)}>
                  <div className='time-hm-metrica'>
                    <input type='number' placeholder="horas" name="hours" min="0" max="24" onKeyDown={validarNumero} ></input>
                    <input type='number' placeholder="mins" name="minutes" min="1" max="60" onKeyDown={validarNumero} ></input>
                  </div>
                  <label>Objetivo: 8h</label>
                  <input type='submit'  value="INTRODUCIR MÉTRICA"></input>
                </form>
                <button className='eliminar-metrica' onClick={eliminateLast}>ELIMINAR ÚLTIMA MÉTRICA</button>
              </div>)
            }
        </div>

    </div>
  )
}



export default PageStat