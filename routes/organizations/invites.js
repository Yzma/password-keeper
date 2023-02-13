const express = require('express');
const router  = express.Router();

router.get("/:orgId/invites", (req, res) => {
  return res.send('Should GET /organizations/{org_id}/invites');
});

router.post('/:orgId/invites', (req, res) => {
  return res.send('Should POST /organizations/{org_id}/invites');
});

router.delete('/:orgId/invites', (req, res) => {
  return res.send('Should DELETE /organizations/{org_id}/invites');
});

module.exports = router;
