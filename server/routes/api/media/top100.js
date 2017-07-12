const request = require('../../../utils').request;
const redisClient = require('../../../lib/Redis');
const { getRedisKey } = require('../../../utils');

module.exports = function getTop100(req, res, next) {
  const [popId, kpopId, vpopId] = ['IWZ9Z097', 'IWZ9Z08W', 'IWZ9Z088'];
  let id;

  switch (req.params.type) {
  case popId:
    id = popId;
    break;
  case kpopId:
    id = kpopId;
    break;
  case vpopId:
    id = vpopId;
    break;
  default:
  }

  const pageNum = req.query.page;
  const start = pageNum ? (pageNum - 1) * 20 : 0;
  const uri = `http://mp3.zing.vn/json/song/get-top-100?start=${start}&length=20&id=${id}`;

  request(uri)
    .then(data => {
      redisClient.set(getRedisKey(req), data, 'EX', 60 * 60 * 24 * 5); // cache the data for 5 days
      res.send(JSON.parse(data));
    })
    .catch(err => next(err));
};
