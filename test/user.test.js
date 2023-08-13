const chai = require('chai');
const expect = chai.expect;
const app = require('../index'); 
const User = require('../models/user');
const request = require('supertest');

chai.use(require('chai-http'));

describe('User  API', () => {

let userId;
  it('should register a new user', async () => {
   
    const email = 'test@example.com'; 
    const res = await request(app)
      .post('/users')
      .send({ email });
    
     expect(res).to.have.status(200);
     userId =res.body._id
    expect(res.body).to.have.property('email', email);
    expect(res.body).to.have.property('userId');
  });

  it('should handle registration failure', async () => {
   
    const originalUserCreate = User.create;
    User.create = async () => {
      throw new Error('Mocked error');
    };

    const email = 'test@example.com';

    const res = await request(app)
      .post('/')
      .send({ email });

    expect(res).to.have.status(404); 
    expect(res.body).to.have.property('error');

    User.create = originalUserCreate;
  });

  it('should return top favorite movies for a valid user', async () => {

    const validUserId = userId;

    const res = await request(app)
      .get(`/users/topFavouriteMovies/${validUserId}`)
      .expect(200); 

    expect(res.body).to.have.property('topTreeMovies');
    
  });
  it('should return an error for an invalid user ID', async () => {
    const invalidUserId = '546';

    const res = await request(app)
      .get(`/topFavouriteMovies/${invalidUserId}`)
      .expect(404); 

    expect(res.body).to.have.property('error');
    
  });
});
