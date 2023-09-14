const app = require("../src/app")
const session = require('supertest')
const agent = session(app);

describe("Tests de Rutas", () => {
      describe("GET /rickandmorty/character/:id", () => {
            it("Responde con status: 200", async () => {
                  await agent.get("/rickandmorty/character/1").expect(200);
            });
            it(`Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"`, async () => {
                  const { body } = await agent.get("/rickandmorty/character/1")
                  const atributes = ["id", "name", "species", "gender", "status", "origin", "image"]
                  const keys = Object.keys(body)
                  atributes.forEach((atribute) => {
                        expect(keys).toContain(atribute);
                  })
            })
            it(`Si hay un error responde con status: 500`, async () => {
                  await agent.get("/rickandmorty/character/bioshock4").expect(500);
            })
      })
      describe("GET /rickandmorty/login", () => {
            it("La informacion es correcta y da acceso", async () => {
                  const { body } = await agent.get("/rickandmorty/login?email=kevin@gmail.com&password=password4");
                  expect(body.access).toEqual(true);
            })
            it("La informacion es incorrecta y no nos da acceso", async () => {
                  const { body } = await agent.get("/rickandmorty/login?email=kevin@gmail.com&password=bioshock4");
                  expect(body.access).toEqual(false);
            })
      })
      describe("POST /rickandmorty/fav", () => {
            const char1 = { id: 1, name: "kevin" }
            const char2 = { id: 2, name: "claudia" }

            it("Devuelve un array con el personaje", async () => {
                  const { body } = await agent.post("/rickandmorty/fav").send(char1);
                  expect(body).toContainEqual(char1);
            })
            it("Al enviar mas de un elemento, devuelve todos los elementos", async () => {
                  const { body } = await agent.post("/rickandmorty/fav").send(char2);
                  expect(body).toContainEqual(char1);
                  expect(body).toContainEqual(char2);
            })
      })
      describe("DELETE /rickandmorty/fav/:id", () => {
            const char1 = { id: 1, name: "kevin" }
            const char2 = { id: 2, name: "claudia" }

            // beforeAll(async ()=>{
            //       await agent.post("/rickandmorty/fav").send(char1);
            //       await agent.post("/rickandmorty/fav").send(char2);
            // })

            it("Si no se envia un ID coorecto, se devuelve el mismo array", async () => {
                  const { body } = await agent.delete("/rickandmorty/fav/1repaisdechile");
                  expect(body).toContainEqual(char1);
                  expect(body).toContainEqual(char1);
            });
            it("Elimina correctamente al personaje que tenga el ID", async () => {
                  const { body } = await agent.delete("/rickandmorty/fav/1");
                  expect(body).not.toContainEqual(char1);
            });
      });
});