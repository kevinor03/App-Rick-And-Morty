import { useState } from "react"

function validar(input) {
    let errors = {}
    let veri = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let num = /\d/;

    if (!input.email) {
        errors.email = "hace falta un email"
    }
    if (!veri.test(input.email)) {
        errors.email = "email incorrecto"
    }
    if (input.email.length >= 35) {
        errors.email = "el email no puede tener mas de 35 caracteres"
    }

    if (!num.test(input.password)) {
        errors.password = "el password no tiene numeros"
    }
    if (input.password.length < 6 || input.password.length > 10) {
        errors.password = "el password debe tener minimo 6 caracteres y maximo 10"
    }

    return errors;
}

export default function Form({ login }) {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "Ingrese su email",
        password: "Ingrese su password"
    })

    function handlerChange(event) {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })

        setErrors(validar({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

    function handlerSubmit(event) {
        event.preventDefault()
        login(userData)
    }

    function unSubmit() {
        let noBoton;
        for (let error in errors) {
            if (errors[error] === '') noBoton = false
            else {
                noBoton = true
                break;
            }
        }
        return noBoton;
    }

    return (
        <div>
            <span>Rick and Morty App</span>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text"
                        placeholder="correo@gmail.com"
                        value={userData.email}
                        name="email"
                        onChange={handlerChange} />
                    {<span>{errors.email}</span> && errors.email}
                </div>

                <div>
                    <label>Password</label>
                    <input type="text"
                        placeholder="password"
                        value={userData.password}
                        name="password"
                        onChange={handlerChange} />
                    {<span>{errors.password}</span> && errors.password} 
                </div>

                <button disabled={unSubmit()} type="submit">
                    Ingresar
                </button>
            </form>
        </div>
    )
} 