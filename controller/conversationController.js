const conversationSchema = require('../models/conversationSchema');
const userSchema = require('../models/userSchema');

const createConversation = async (req, res) => {
  try {
    const { participentEmail } = req.body;
    if (!participentEmail) {
      return res.status(400).send({ error: 'Participent Email is Required!' });
    }
    const participentData = await userSchema.findOne({
      email: participentEmail,
    });
    if (!participentData) {
      return res.status(400).send({ error: 'No User Found!' });
    }
    const conversation = new conversationSchema({
      creator: req.user.id,
      participent: participentData._id,
    });
    conversation.save();
    res.status(200).send(conversation);
  } catch (error) {}

  res.send('creat Convartation');
};
module.exports = { createConversation };
