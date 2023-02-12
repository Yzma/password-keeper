const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
  return res.send('Should GET /organizations/{org_id}/passwords');
});

router.post('/', (req, res) => {
  return res.send('Should POST /organizations/{org_id}/passwords');
});

router.delete('/', (req, res) => {
  return res.send('Should DELETE /organizations/{org_id}/passwords');
});

router.patch('/', (req, res) => {
  return res.send('Should UPDATE /organizations/{org_id}/passwords');
});

module.exports = router;
