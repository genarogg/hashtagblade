const data = () => {
  const nombre = {
    numeroDeCuentas: "Cuentas de Instagram",
    seguimiento: "Hashtag Seguimiento del rendimiento",
    numeroColecciones: "Colecciones de hashtags",
  };

  const data = {
    basico: {
      title: "básico",
      numeroDeCuentas: {
        numero: 1,
        nombre: nombre.numeroDeCuentas,
      },
      seguimientoHashtag: {
        numero: 10,
        nombre: nombre.seguimiento,
      },
      numeroColecciones: {
        numero: 15,
        nombre: nombre.numeroColecciones,
      },

      plan: [
        "Hashtag Search & Filtering",
        "Store & Manage hashtags",
        "Check for banned hashtags",
        "Auditoría de hashtags inteligentes",
        "Análisis de cuentas y correos",
      ],
    },
    manager: {
      title: "Community Manager",
      numeroDeCuentas: {
        numero: 5,
        nombre: nombre.numeroDeCuentas,
      },
      seguimientoHashtag: {
        numero: 25,
        nombre: nombre.seguimiento,
      },
      numeroColecciones: {
        numero: 50,
        nombre: nombre.numeroColecciones,
      },

      plan: [
        "Everything in Solo plan",
        "Advanced Search filters",
        "Advanced hashtag metrics",
      ],
    },
    agencia: {
      title: "Agencia",
      numeroDeCuentas: {
        numero: 15,
        nombre: nombre.numeroDeCuentas,
      },
      seguimientoHashtag: {
        numero: 50,
        nombre: nombre.seguimiento,
      },
      numeroColecciones: {
        numero: 80,
        nombre: nombre.numeroColecciones,
      },

      plan: [
        "Everything in Growth plan",
        "White label Instagram Reports (coming soon)",
      ],
    },
  };

  return data;
};

export default data;
