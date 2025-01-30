
const paymeService = require('../services/payme.service')
const { PMMethod } = require("../enums/payme.enum");

class PaymeController {
  async pay(req, res, next) {
    try {
      console.log('PaymeController');
      const { method, params, id } = req.body;
      console.log(method, params, id);

      switch (method) {
        case PMMethod.CheckPerformTransaction: {
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
