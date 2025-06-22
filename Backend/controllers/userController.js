import User from '../models/userModel.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id

    const filteredUsers = await User.find({
      _id: { $ne: userId },
    }).select('-password')

    res.status(200).json(filteredUsers)
  } catch (error) {
    console.error('Error in getUsersForSidebar: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const userData = async (req, res) => {
  try {
    const { username, gender, walletAddres } = req.body

    if (!username || !walletAddres) {
      console.log(`all field required`)
      return res.status(400).json({
        error: 'All fields are required: username, walletAddres',
      })
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      username,
      gender,
      walletAddres,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    })

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        walletAddress: newUser.walletAddres,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error) {
    console.log('Error in signup controller', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
