const express = require('express');
const router  = express.Router();

router.get("/:orgId/passwords", (req, res) => {
  return res.send('Should GET /organizations/{org_id}/passwords');
});

router.post('/:orgId/passwords', (req, res) => {
  return res.send('Should POST /organizations/{org_id}/passwords');
});

router.delete('/:orgId/passwords', (req, res) => {
  return res.send('Should DELETE /organizations/{org_id}/passwords');
});

router.patch('/:orgId/passwords', (req, res) => {
  return res.send('Should UPDATE /organizations/{org_id}/passwords');
});

module.exports = router;
