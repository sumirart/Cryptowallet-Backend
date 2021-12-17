const axios = require("axios");
const helper = require("../helpers/responseStandard");
const configs = require("../configs/configs");

module.exports = {
  getMarket: (req, res) => {
    const limit = req.query.limit || 10;

    axios({
      method: "get",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      headers: {
        "X-CMC_PRO_API_KEY": configs.coinMarketCapAPIKey,
      },
      params: {
        limit,
      },
    })
      .then((response) => {
        return helper.response(res, 200, response.data.data);
      })
      .catch((error) => {
        return helper.response(res, 500, null, true, error);
      });
  },
  getCoinInfo: (req, res) => {
    const id = req.params.id || 1;

    axios({
      method: "get",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      headers: {
        "X-CMC_PRO_API_KEY": configs.coinMarketCapAPIKey,
      },
      params: {
        id,
      },
    })
      .then((response) => {
        return helper.response(res, 200, response.data.data[id]);
      })
      .catch((error) => {
        return helper.response(res, 500, null, true, error);
      });
  },
  getCurrentPrice: (req, res, coinId) => {
    const id = coinId || 1;

    axios({
      method: "get",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      headers: {
        "X-CMC_PRO_API_KEY": configs.coinMarketCapAPIKey,
      },
      params: {
        id,
      },
    })
      .then((response) => {
        return helper.response(
          res,
          200,
          response.data.data[id]["quote"]["USD"]["price"]
        );
      })
      .catch((error) => {
        return helper.response(res, 500, null, true, error);
      });
  },
};
