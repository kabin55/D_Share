import { Message } from '../models/messageModel.js'
import { Conversation } from '../models/conversationModel.js'

export const sendMessage = async (req, res) => {
  // const { conversationId, text } = req.body
  const { text } = req.body
  const { id: receiverId } = req.params
  const senderId = req.user._id
  try {
    console.log(`22`, req.body)
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      })
    }

    const message = await Message.create({
      conversationId: conversation._id,
      sender: senderId,
      receiver: receiverId,
      text,
    })
    conversation.messages.push(message._id)
    await Promise.all([conversation.save(), message.save()])
    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params
  const senderId = req.user._id

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: 'messages',
      populate: { path: 'sender', select: 'username' }, // optional: populate sender info
      options: { sort: { createdAt: 1 } },
    })

    if (!conversation) return res.status(200).json([])

    res.status(200).json(conversation.messages)
  } catch (error) {
    console.error('Error in getMessages:', error.message)

    res.status(500).json({ message: error.message })
  }
}
