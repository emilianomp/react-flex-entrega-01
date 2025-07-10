import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import productos from "../../data/productos_pesca.json";

export async function importarProductosAFirebase() {
  const productosCollection = collection(db, "productos");

  for (const producto of productos) {
    try {
      // Verifica si ya existe un producto con ese ID
      const q = query(productosCollection, where("id", "==", producto.id));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        await addDoc(productosCollection, producto);
        console.log("✅ Producto agregado:", producto.title);
      } else {
        console.log("⚠️ Producto ya existe:", producto.title);
      }
    } catch (error) {
      console.error("❌ Error al agregar producto:", producto.title, error);
    }
  }

  console.log("🎣 Importación completa");
}
