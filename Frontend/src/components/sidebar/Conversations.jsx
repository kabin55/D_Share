import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'
import Conversation from './Conversation'

const Conversations = () => {
  const { loading, conversations } = useGetConversations()

  console.log('Conversations component - loading:', loading)
  console.log('Conversations component - conversations:', conversations)
  console.log('Conversations length:', conversations?.length)

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations && conversations.length > 0 ? (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      ) : (
        <div className="text-center text-gray-400 py-4">
          {loading ? 'Loading users...' : 'No users found'}
        </div>
      )}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  )
}
export default Conversations
