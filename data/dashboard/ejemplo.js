const getData = (tag, cb) => {
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
      cb(data);
    });
};

export default getData;
