const getData = (tag) => {
  fetch("/api/hashtag/test2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search: tag,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      return data;
    });
};

export default getData;
