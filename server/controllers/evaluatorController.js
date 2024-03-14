const Evaluator = require('../models/evaluatorModel');

exports.getAllEvaluators = async (req, res) => {
  try {
    const evaluators = await Evaluator.find();
    res.json(evaluators);
  } catch (error) {
    console.error('Error fetching evaluators:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getEvaluatorById = async (req, res) => {
  try {
    const evaluator = await Evaluator.findById(req.params.id);
    if (!evaluator) {
      return res.status(404).json({ error: 'Evaluator not found' });
    }
    res.json(evaluator);
  } catch (error) {
    console.error('Error fetching evaluator by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createEvaluator = async (req, res) => {
  try {
    const newEvaluator = await Evaluator.create(req.body);
    res.json(newEvaluator);
  } catch (error) {
    console.error('Error creating evaluator:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateEvaluator = async (req, res) => {
  try {
    const updatedEvaluator = await Evaluator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvaluator) {
      return res.status(404).json({ error: 'Evaluator not found' });
    }
    res.json(updatedEvaluator);
  } catch (error) {
    console.error('Error updating evaluator:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteEvaluator = async (req, res) => {
  try {
    const deletedEvaluator = await Evaluator.findByIdAndDelete(req.params.id);
    if (!deletedEvaluator) {
      return res.status(404).json({ error: 'Evaluator not found' });
    }
    res.json({ message: 'Evaluator deleted successfully' });
  } catch (error) {
    console.error('Error deleting evaluator:', error);
    res.status(500).send('Internal Server Error');
  }
};
