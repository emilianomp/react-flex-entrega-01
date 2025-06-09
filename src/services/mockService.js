// Crear una promesa simular una consulta a la base de datos

const products = [
    {
        id: "1",
        title : "Remera JS",
        text: "La mejor remera de Coderhouse que vamos a utilizar cada vez que querramos hacer algo en JS",
        price: 20,
        img: "/assets/reel01.jpg",
        stock: 5,
        category: "javascript"
    }, 
     {
        id: "2",
        title : "Remera nodeJS",
        text: "La mejor remera de Coderhouse ideal para los que quieren ser desarrolladores backend",
        price: 10,
        img: "../assets/reel01.jpg",
        stock: 55,
        category: "otros"
    }, 
     {
        id: "3",
        title : "Remera Typescript",
        text: "La mejor remera de Coderhouse que nos permite poder asegurarnos los tipos de datos en JS",
        price: 25,
        img: "/assets/reel01.jpg",
        stock: 15,
        category: "otros",
    },     
]

function getProducts () {
    return new Promise( ( resolve, reject ) => {
    setTimeout( () => {
        resolve(products)
    }, 3000 )
  })
}

export default getProducts;