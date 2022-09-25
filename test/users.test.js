import app from '../app/app';
import request from 'supertest';
import db from '../app/models';
import bcrypt from 'bcrypt';

var TOKEN = '';
var user = {};
var password = '123456';

describe("GET /", () => {

  beforeEach(async () => {

    await db.users.deleteMany({})

    const users = new db.users({
			username: 'admin',
			password: bcrypt.hashSync(password, 10),
		})

    await users.save(users);

    await db.users.find({})
              .then(data => {
                user = data[0]
              })
              .catch(err => {
                console.log(err.message)
              });
  });

  test("login users", async () => {
    const response = await request(app).post("/api/login").send({
      username: user.username,
      password: password
    })
    .expect(200)
    .expect("Content-Type", /json/);
    expect(response.body.token).toBeDefined();
    TOKEN = response.body.token;
  })

  test("users", async () => {
    const response = await request(app).get("/api/users").set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(200)
    .expect("Content-Type", /json/);
    // console.log(response.body)
  })

  test("users find id", async () => {

    let users = await db.users.find({});
    
    expect(users.length).toBeDefined();
    users = users[0]

    const response = await request(app).get("/api/users").set('Authorization', `Bearer ${TOKEN}`).send({})
    .expect(200)
    .expect("Content-Type", /json/);
    // console.log(response.body)
  })
})