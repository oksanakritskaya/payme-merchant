
const paymeService = require('../services/payme.service')
const { PMMethod } = require("../enums/payme.enum");

class PaymeController {
  async pay(req, res, next) {
    try {
      console.log('PaymeController');
      console.log(req.body);
      const { method, params, id } = req.body;
      console.log(method);
      console.log(params);
      console.log(id);

      switch (method) {
        case PMMethod.CheckPerformTransaction: {
          console.log('CheckPerformTransaction');
          await paymeService.checkPerformTransaction(params, id);
          return res.json({ result: { allow: true } });
        }
      }
    } catch (error) {
      console.log('error');
      console.error(error);
      next(error);
    }
  }
}

module.exports = new PaymeController();
