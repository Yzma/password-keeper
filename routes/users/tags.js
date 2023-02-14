const express = require('express');
const router  = express.Router();



// router.get("/tags", (req, res) => {
//   const orgId = req.params.orgId;
//   const { userId } = req.body;

//   return organizationHelper.getAllOrganizationTags(orgId)
//     .then(rows => res.json(rows))
//     .catch(err => res.json(err));
// });

// router.post('/tags', (req, res) => {
//   const orgId = req.params.orgId;
//   const { name } = req.body;

//   return organizationHelper.createOrganizationTag(orgId, name)
//     .then(rows => res.json(rows))
//     .catch(err => res.json(err));
// });

// router.delete('/tags', (req, res) => {
//   const orgId = req.params.orgId;
//   const { name } = req.body;

//   return organizationHelper.deleteOrganizationTag(orgId, name)
//     .then(rows => res.json(rows))
//     .catch(err => res.json(err));
// });

module.exports = router;
