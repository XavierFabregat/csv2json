import app from "../../app";
import request from "supertest";

const server = request(app);

export default server;
