import React, { useState } from "react";
import styles from "./Login.module.css"
import { Link,useNavigate } from "react-router-dom";
import { InputControl } from "../InputControl/InputControl";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export function Login(){

  const navigate = useNavigate();
  const [values, setvalues] = useState({email:"", pass:""});
  const [errorMsg, seterrorMsg] = useState([]);
  const [submitButtonDisabled, setsubmitButtonDisabled] = useState(false);

  const Login = () => {
    if(!values.email || !values.pass){
      seterrorMsg("Ingrese correo y contraseña");
      return;
    }
    seterrorMsg("");
    setsubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass).then(async(res)=>{
      setsubmitButtonDisabled(false);
      navigate("/");
    }).catch((err)=>{
      setsubmitButtonDisabled(false);
      seterrorMsg(err.message);
    });
  };

  return(
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>
        <InputControl
        type="email"
        label="Correo "
        onChange={(event)=> setvalues((prev)=>({
          ...prev, email: event.target.value
        }))}
        placeholder="ejemplo@email.com" />
        <InputControl
        type="password"
        label="Contraseña "
        onChange={(event)=> setvalues((prev)=>({
          ...prev, pass: event.target.value
        }))}
        placeholder="Ingrese contraseña" />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={Login} disabled={submitButtonDisabled}>
            Iniciar Sesión
          </button>
          <p>
            <Link to="/signup">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}