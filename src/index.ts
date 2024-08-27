import http from "node:http";

const notes = [
  { id: 1, content: "Hacer la cama" },
  { id: 2, content: "Lavar los platos" },
  { id: 3, content: "Estudiar JavaScript" },
  { id: 4, content: "Hacer las compras" },
  { id: 5, content: "Limpiar mi habitación" },
  { id: 6, content: "Almorzar a tiempo" },
];

const requestListener: http.RequestListener = (req, response) => {
  //responder a la url raíz
  if (req.url === "/") {
    response.setHeader("Content-Type", "text/plain");
    response.writeHead(200);
    response.end("Bienvenido a Notas");
  }

  //responder a la url /notes
  if (req.url === "/notes") {
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(JSON.stringify(notes));
  }

  //responder a la url /notes/:id
  const id = Number(req.url?.split("/")[2]);
  const note = notes.find((note) => note.id === id);
  if (req.url?.match(/\/notes\/[0-9]+/) && note) {
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(JSON.stringify(note));
  } else {
    response.setHeader("Content-Type", "application/json");
    response.writeHead(404);
    response.end(JSON.stringify({ message: "Note not found" }));
  }
};

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(requestListener);
server.listen(5500);
