import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import styles from "./Home.module.css"

export function Home(props) {

  const navigate = useNavigate();

  function salir(){  
    return auth.signOut();
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
      <h2>{props.name ? `Bienvenido ${props.name}` : "Inicie Sesión" }</h2>
      <br />
        <div>
          <h1>
            <Link to="/login">Ingresar</Link>
          </h1>
          <br />
          <h1>
            <Link to="/signup">Registrar</Link>
          </h1>
          <br />
        </div>
        {props.name &&
          <button onClick={salir}>Salir</button>
        }
      </div>
    </div>
  );
}
