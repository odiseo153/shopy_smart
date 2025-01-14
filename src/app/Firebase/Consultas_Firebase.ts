import db from "./FireConfig";
import { 
  getDocs, 
  query, 
  where, 
  collection, 
  addDoc, 
  DocumentData 
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface Consultas {
  login: () => Promise<boolean>;
  getByEmail: ( queryEmail: string) => Promise<boolean>;
  addWithDate: (newEmail: string) => Promise<boolean>;
}


const consultas: Consultas = {
  // Inicia sesión con correo y contraseña
  login: async function (): Promise<boolean> {
    const auth = getAuth();
    
    const email = "odiseo@gmail.com"
    const password = "123456"
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso.");
      return true;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return false;
    }
  },

  // Obtiene un documento basado en el correo
  getByEmail: async function (queryEmail: string): Promise<boolean> {
    const isLoggedIn = await this.login();
    if (!isLoggedIn) {
      console.error("No se pudo iniciar sesión. Operación cancelada.");
      return false;
    }

    const coleccion = collection(db, "Correos_shop_mart");
    const consulta = query(coleccion, where("email", "==", queryEmail));
    const querySnapshot = await getDocs(consulta);

    return querySnapshot.empty;
  },

  // Agrega un correo con la fecha actual
  add: async function (newEmail: string): Promise<boolean> {
    const isLoggedIn = await this.login();
    if (!isLoggedIn) {
      console.error("No se pudo iniciar sesión. Operación cancelada.");
      return false;
    }

    try {
      const coleccion = collection(db, "Correos_shop_mart");
      const fechaActual = new Date().toISOString();

      await addDoc(coleccion, {
        email: newEmail,
        fecha: fechaActual,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default consultas;
