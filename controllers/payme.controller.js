
const paymeService = require('../services/payme.service')
const { PaymeMethod } = require("../enums/payme.enum");

class PaymeController {
  async pay(req, res, next) {
    try {
      console.log('PaymeController');
      const { method, params, id } = req.body;
      console.log(method, params, id);

      switch (method) {
        case PaymeMethod.CheckPerformTransaction: {
          console.log('CheckPerformTransaction');
          await paymeService.checkPerformTransaction(params, id);
          return res.json({ result: { allow: true } });
        }
        /*case PaymeMethod.CreateTransaction: {
          console.log('CreateTransaction');
          const result = await paymeService.createTransaction(params, id)
          return res.json({ result, id })
        }*/
      }
    } catch (error) {
      console.log('error');
      console.error(error);
      next(error);
    }
  }
}

module.exports = new PaymeController();
