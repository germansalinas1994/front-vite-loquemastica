import { useContext } from "react"

import { AuthContext } from "./User/AuthContext"


const Prueba = () => {
    const { token, role } = useContext(AuthContext);

    return (
        <div>
            <h1>Prueba</h1>
            <h2>Token: {token}</h2>
            <h2>Rol: {role}</h2>


        </div>
    )
}

export default Prueba