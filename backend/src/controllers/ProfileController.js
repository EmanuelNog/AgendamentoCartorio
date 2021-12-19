const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    //const user_id = req.headers.authorization;
    const user_id = "9652d999";

    const schedules = await connection('schedules')
      .where('user_id', user_id)
      .select('*');

    return res.json(schedules);
  }
}