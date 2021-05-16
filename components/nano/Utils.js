/* funciones utiles para js */

/* Se colocara la Preposicion de U para indicar que la funcion pertenese a esta libreria */

/* devuelve un numero rando | el primer valor que resive es en numero minimo al que puede devolver y el segundo sera el maximo valor que podra regresar*/

const Urandom = (iniciaEn, terminaEn) =>{
    return Math.floor(Math.random() * (iniciaEn - terminaEn) + terminaEn)
}

/* organizar un arreglo numerico de nenor a mayor */
const Usort = (numbers) =>{
    return numbers.sort((a, b) =>{
        return a - b
    })
}

export {
    Urandom,
    Usort
}