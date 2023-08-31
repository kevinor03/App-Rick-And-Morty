import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function validar(input) {
    let errors = {}
    let veri = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let num = /\d/;

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

export default function Form(login) {

    const navigate = useNavigate();
    const [access, setAccess] = useState(false);
    const EMAIL = 'kevin@gmail.com';
    const PASSWORD = 'password4';

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "Ingrese su email",
        password: "Ingrese su password"
    })

    function login(userData) {
        if (userData.password === PASSWORD && userData.email === EMAIL) {
            setAccess(true);
            navigate('/home');
        }
    }

    useEffect(() => {
        !access && navigate('/');
        //esLint-disable-next-Line
    }, [access]);

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

    // mensaje de "bienvenida"
    function submitHandler(event) {
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
            <form onSubmit={submitHandler}>
                <div>
                    <label>Email</label>
                    <input type="text"
                        placeholder="correo@gmail.com"
                        value={userData.email}
                        name="email"
                        onChange={handlerChange} />
                    <span>{errors.email}</span>
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