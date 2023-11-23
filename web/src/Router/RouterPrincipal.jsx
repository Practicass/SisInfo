
import {Route, BrowserRouter, Link, Routes} from "react-router-dom"
import PageLogin from '../Components/PageLogin'
import { AuthProvider } from '../context/AuthProvider'
import PageHome2 from '../Components/PageHome2'
import PageHistory from '../Components/PageHistory'
import PageRegister from '../Components/PageRegister'
import PageRoutines from '../Components/PageRoutines'
import PageAddRoutine from '../Components/PageAddRoutine'
import PageRoutine from '../Components/PageRoutine'
import PageProfile from '../Components/PageProfile'
import PageStats from '../Components/PageStats'
import PageListFriends from '../Components/PageListFriends'
import PageSettings from '../Components/PageSettings'
import PageNuevaRutina from '../Components/PageNuevaRutina'
import PageTraining from '../Components/PageTraining'
import PageStat from "../Components/PageStat"

import PageShowTraining from "../Components/PageShowTraining"

import PageAdminHome from '../Components/PageAdminHome'
import PageAddExerciseAdmin from '../Components/PageAddExerciseAdmin'
import PageAddRoutineAdmin from '../Components/PageAddRoutineAdmin'
import PageEditExerciseAdmin from '../Components/PageEditExerciseAdmin'
import PageEditRoutineAdmin from '../Components/PageEditRoutineAdmin'
import PageEditRoutine from "../Components/PageEditRoutine"
// import PageNewPassword from '../Components/PageNewPassword'




const RouterPrincipal = () => {
    return (
      <BrowserRouter >
        <AuthProvider>
          <Routes>
            
              <Route path='/' element={<PageLogin/>}/>
              <Route path='/login' element={<PageLogin/>}/>

              <Route path='/home' element={<PageHome2/>}/>

              {/* <Route path='/newPassword' element={<PageNewPassword/>}/> */}

              <Route path='/history' element={<PageHistory/>}/>
              <Route path='/register' element={<PageRegister/>}/>
              <Route path='/routines' element={<PageRoutines/>}/>
              <Route path='/addRoutine' element={<PageAddRoutine/>}/>
              <Route path='/routine' element={<PageRoutine/>}/>
              <Route path='/profile' element={<PageProfile/>}/>
              <Route path='/stats' element={<PageStats/>}/>
              <Route path='/stats/:num' element={<PageStat/>}/>
              <Route path='/friends' element={<PageListFriends/>}/>
              <Route path='/profile/settings' element={<PageSettings/>}/>

              <Route path='/newroutine' element={<PageNuevaRutina ejercicios={ejercicios} setEjercicios={setEjercicios}/>}/>
              <Route path='/exercises' element={<PageEjercicios ejercicios={ejercicios} setEjercicios={setEjercicios}/>}/>
              <Route path='/showTraining/:id' element={<PageShowTraining/>}/>

              <Route path='/newroutine' element={<PageNuevaRutina/>}/>
              <Route path='/editroutine/:id' element={<PageEditRoutine/>}/>



              <Route path='/training/:id' element={<PageTraining/>}/>
      
              <Route path='/adminHome' element={<PageAdminHome />}/>
              <Route path='/adminHome/addExercise' element={<PageAddExerciseAdmin />}/>
              <Route path='/adminHome/editExercise/:id' element={<PageEditExerciseAdmin />}/>
              <Route path='/adminHome/addRoutine' element={< PageAddRoutineAdmin/>}/>
              <Route path='/adminHome/editRoutine/:id' element={< PageEditRoutineAdmin/>}/>


              
                {/* <Footer/> */}
                <Route path="*"  element ={
                    <>
                        
                      <h1>Error 404</h1>
                      <Link to="/">Volver al inicio</Link>
                        

                    </>
                }/>
            </Routes>
        </AuthProvider>
  
      </BrowserRouter>
    )
  }
  
  export default RouterPrincipal