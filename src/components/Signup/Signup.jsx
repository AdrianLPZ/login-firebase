import styles from "./Signup.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { InputControl } from "../InputControl/InputControl";

export function Signup() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({ name: "", email: "", pass: "" });
  const [errorMsg, seterrorMsg] = useState([]);
  const [submitButtonDisabled, setsubmitButtonDisabled] = useState(false);

  const registro = () =>{
    if(!values.name || !values.email || !values.pass){
      seterrorMsg("Llene todos los campos");
      return;
    }
    seterrorMsg("");
    setsubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass).then (async (res)=>{
      setsubmitButtonDisabled(false);
      const user = res.user;
      await updateProfile(user,{
        displayName:values.name,
      });
      navigate("/");
    })
    .catch((err) =>{
      setsubmitButtonDisabled(false);
      seterrorMsg(err.message);
    })
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Registro</h1>
        <InputControl label="Usuario"
        type="text"
        placeholder="Nombre de usuario"
        onChange={
          (event) => setvalues((prev) => ({...prev,
          name:event.target.value}))
        } />
        <InputControl label="Email"
        type="email"
        placeholder="ejemplo@email.com"
        onChange={
          (event) => setvalues((prev) => ({...prev,
          email:event.target.value}))
        } />
        <InputControl label="Contraseña"
        type="password"
        placeholder="Ingrese una contraseña"
        onChange={
          (event) => setvalues((prev) => ({...prev,
          pass:event.target.value}))
        } />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={registro} disabled={submitButtonDisabled}>
            Registrar
          </button>
          <p>Si ya tienes una cuenta 
            <span>
              <Link to="/login"> inicia sesión</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
