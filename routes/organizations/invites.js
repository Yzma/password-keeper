const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
  return res.send('Should GET /organizations/{org_id}/invites');
});

router.post('/', (req, res) => {
  return res.send('Should POST /organizations/{org_id}/invites');
});

router.delete('/', (req, res) => {
  return res.send('Should DELETE /organizations/{org_id}/invites');
});

module.exports = router;
