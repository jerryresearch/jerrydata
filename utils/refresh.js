const start = async () => {
  const response = await fetch("https://www.jerrydata.com/api/refresh");
  const data = await response.json();
  console.log(data);
};

start();
