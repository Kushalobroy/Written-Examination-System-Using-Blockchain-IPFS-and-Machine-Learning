const express = require('express');
const router = express.Router();
const evaluatorController = require('../controllers/evaluatorController');

router.get('/', evaluatorController.getAllEvaluators);
router.get('/answerBooks', evaluatorController.ansBooks);
router.get('/:id', evaluatorController.getEvaluatorById);
router.post('/', evaluatorController.createEvaluator);
router.put('/:id', evaluatorController.updateEvaluator);
router.delete('/:id', evaluatorController.deleteEvaluator);

module.exports = router;
