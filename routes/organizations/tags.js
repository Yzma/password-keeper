const express = require('express');
const router  = express.Router();

router.get("/:orgId/tags", (req, res) => {
  return res.send('Should GET /organizations/{org_id}/tags');
});

router.post('/:orgId/tags', (req, res) => {
  return res.send('Should POST /organizations/{org_id}/tags');
});

router.delete('/:orgId/tags', (req, res) => {
  return res.send('Should DELETE /organizations/{org_id}/tags');
});

module.exports = router;
