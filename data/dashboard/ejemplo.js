const getData = () => {
  fetch("/api/hashtag/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hashtags: ["hola", "b"],
    }),
  })
   /*  .then((data) => data.json())
    .then((data) => {
      return data;
    }); */
};

export default getData;
