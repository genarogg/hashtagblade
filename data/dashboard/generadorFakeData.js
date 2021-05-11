const data = () => {
  const chuleta = (
    name,
    id,
    tagBoss,
    hashtag,
    likes,
    views,
    img,
    dapc,
    postsMade,
    comments,
    isVideo,
    ownerId
  ) => {
    const data = {
      name,
      id,
      tagBoss,
      hashtag,
      likes,
      views,
      img,
      dapc,
      postsMade,
      comments,
      isVideo,
      ownerId,
    };

    return data;
  };
  const hashtag = [
    "marketingdigital",
    "profecional",
    "programacion",
    "python",
    "java",
    "javascript",
    "visualstudio",
    "extenciones",
    "colores",
    "serpanas",
    "amigos",
    "panas",
    "telefono",
    "tecnologia",
    "holamundo",
    "computadora",
    "smartphone",
    "smart",
    "monitor",
    "paisaje",

    "comida",
    "programa",
    "matematicas",
    "button",
    "clase",
    "estudiante",
    "amor",
    "madre",
    "tecla",
    "mouse",
    "carta",
    "amor",
    "novia",
    "novio",
    "vacio",
    "fisica",
    "atraccion",
    "domino",
    "juego",
    "accion",

    "camara",
    "pantalla",
    "camioneta",
    "carro",
    "auto",
    "autopista",
    "abuso",
    "necesidad",
    "niño",
    "dependencia",
    "interdependencia",
    "indenpendencia",
    "sexo",
    "confucion",
    "acoso",
    "ultra",
    "sol",
    "luna",
    "estrellas",
    "espacio",
    "galaxias",
  ];

  let arreglo = {};
  let tags = {};

  /* obteniendo el arreglo de hashtag aleatorio */
  const tagFunc = () => {
    let tags2 = {};
    for (let j = 1; j <= 30; j++) {
      tags2[j] = "#" + hashtag[Math.floor(Math.random() * (1 - 60) + 60)];
    }
    return tags2;
  };
  const aleatorio = (iniciaEn, terminaEn) => {
    return Math.floor(Math.random() * (iniciaEn - terminaEn) + terminaEn);
  };
  for (let i = 0; i <= 100; i++) {
    let random2 = aleatorio(1, 101);
    tags = tagFunc();
    arreglo[i] = chuleta(
      /* name */ "post" + i,
      /* id */ "id" + i,
      /* tagBoss */ tags[aleatorio(1, 30)],
      /* hashtag */ tags,
      /* likes */ random2 * 2,
      /* views */ random2 * 3,
      /* img */ "/postFake/" + aleatorio(1, 3) + ".jpg",
      /* dapc */ random2 * 4,
      /* postsMade */ "postsMade",
      /* comments */ "comments",
      /* isVideo */ false,
      /* ownerId */ "id" + random2 * 2
    );
  }

  return arreglo;
};

export default data;
