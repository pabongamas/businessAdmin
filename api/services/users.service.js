const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt=require('bcrypt');
class UsersService {
  constructor() {
 
  }
  // async create(data) {
  //   const hash=await bcrypt.hash(data.password,10);
  //   const newUser = await models.User.create({
  //     ...data,
  //     password:hash
  //   });
  //   //quitar password del usuario creado al retornanr la informacion al frontend
  //   delete newUser.dataValues.password;
  //   return newUser;
  // }

  async find() {
    const rta = await models.User.findAll({
      include:['roles']
    });
    return rta;
    // const query='select * from tasks';
    // try {
    //   const rta=await this.pool.query(query);
    //   return rta.rows;
    // } catch (e) {
    // }

    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    // return rta.rows;
  }
  // async findByEmail(email) {
  //   const rta = await models.User.findOne({
  //     where:{email}
  //   });
  //   return rta;
  // }

  // async findOne(id) {
  //   const user = await models.User.findByPk(id);
  //   if(!user){
  //     throw boom.notFound('user not found');
  //   }
  //   return  user ;
  //   // return this.users.find((user) => user.id === id);
  // }

  // async update(id, changes) {
  //   const user = await this.findOne(id);
  //   const rta = await user.update(changes);
  //   return rta;
  // }

  // async delete(id) {
  //   const user =  await this.findOne(id);
  //   await user.destroy();
  //   return { id };
  // }
}

module.exports = UsersService;
