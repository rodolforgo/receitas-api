import express from "express";
import { AddressInfo } from "net";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha na conexão do servidor.`);
  }
});