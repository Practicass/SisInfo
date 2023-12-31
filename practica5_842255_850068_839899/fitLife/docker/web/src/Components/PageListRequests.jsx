import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import Header from "./Header"
import { FaUserCircle } from "react-icons/fa"
import {ImCross} from "react-icons/im"
import "../css/PageListFriends.css"
import { Global } from "../helpers/Global"
import { MyButton } from "./MyButton"
import { NavLink } from "react-router-dom"

const PageListRequests = () => {
    
    const [reload, setReload] = useState(true);
    
    const[friends, setFriends] = useState([])
    const getFriendList = async() => {
        const request = await fetch(Global.url+'user/searchRequests', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
        })
        //if (request.status == "success") {
            const data = await request.json()
            if(data.status == "success"){
                console.log(data)

                setFriends(data.users)
            }

        //} 
    }


    useEffect(() => {
        getFriendList()
        setReload(true)
    }, [reload])

    const eliminarAmigo = async (idAmigo) => {
        try {
            await fetch(Global.url+'friend/eliminate/' + idAmigo, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })
            // window.location.reload()
            setReload(false)
        } catch (error) {
            console.error("No se pudo eliminar el amigo: ", error)
        }
    }



    const confirmarAmigo = async(idFriend) => {
        try {
            await fetch(Global.url + "friend/confirm/"+idFriend, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
            })
            // window.location.reload()
            setReload(false)
        } catch (error) {
            console.error("Error al añadir el amigo: ", error)
        }
    }

    return (
        <div className="page-list-friends">
            <NavLink to={-1} className="cruz-list-friends">
                <ImCross size="35px" color="#fba92c"></ImCross>
            </NavLink>
            <div className='content-list-friends'>
                <Header/>
                <h1 className="titulo-list-friends"> SOLICITUDES DE AMISTAD </h1>
                <div className="principal-list">
                    
                    <div className="list-friends">
                    { reload && friends.usersRequesting && friends.usersRequesting.length > 0 ? (
                         friends.usersRequesting.map((friend, index) => {
                            
                            return(
                                <div className='user-request' key={index}>
                                <div className="foto-friend">
                                    <FaUserCircle color='#fba92c' size="50px"/>
                                </div>
                                <h2 className="nick-friend"> {friend.name} </h2>
                                <MyButton
                                    className="anadir-friend-request"
                                    color="orangeblack"
                                    size="xl"
                                    type="submit"
                                    onClick={() => confirmarAmigo(friend._id)}>
                                    Aceptar
                                </MyButton>
                                <div className="cruz-request">
                                    <ImCross size="25px" onClick={() => eliminarAmigo(friend._id)}/>
                                </div>
                            </div>
                            )
                        })
                    ) : (
                        <p style={{"marginLeft": "41%", 
                            "alignSelf": "center",
                            "fontWeight":"bolder"}}> 
                            No hay solicitudes pendientes
                        </p>
                    )}
                    </div>
                    
                    
                    
                </div>
             </div>
        </div>
    )
}

export default PageListRequests
