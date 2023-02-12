const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
  return res.send('Should GET /organizations/{org_id}/users');
});

router.post('/', (req, res) => {
  return res.send('Should POST /organizations/{org_id}/users');
});

router.delete('/', (req, res) => {
  return res.send('Should DELETE /organizations/{org_id}/users');
});

module.exports = router;
