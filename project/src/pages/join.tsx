import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, Heart, Calendar, MessageSquare, Filter, Plus } from 'lucide-react';

interface PostType {
  id: string;
  content: string;
  likes: number;
  date: string;
  pinned: boolean;
}

interface Community {
  id: number;
  name: string;
  members: number;
  category: string;
  adminName: string;
  description: string;
  image: string;
  posts: PostType[];
}

const sampleCommunities: Community[] = [
  {
    id: 1,
    name: "Marathon Runners",
    members: 1250,
    category: "Running",
    adminName: "Sarah Johnson",
    description: "Join fellow marathon enthusiasts in training and preparation for upcoming events.",
    image: "/assets/marathon.jpg",
    posts: [
      {
        id: "1",
        content: "🎉 New community challenge starting next week! Get ready for our 30-day running streak.",
        likes: 45,
        date: "2024-02-15",
        pinned: true
      },
      {
        id: "2",
        content: "Tips for maintaining proper form during long-distance runs. Check out our new video guide!",
        likes: 32,
        date: "2024-02-14",
        pinned: false
      }
    ]
  },
  {
    id: 2,
    name: "HIIT Warriors",
    members: 890,
    category: "HIIT",
    adminName: "Mike Chen",
    description: "High-intensity interval training community focused on maximum results.",
    image: "/assets/HIIT.jpg",
    posts: [
      {
        id: "1",
        content: "New HIIT workout schedule posted! 💪 20-minute sessions, maximum burn.",
        likes: 28,
        date: "2024-02-15",
        pinned: false
      }
    ]
  },
  {
    id: 3,
    name: "Zen Yoga Flow",
    members: 1580,
    category: "Yoga",
    adminName: "Emma Patel",
    description: "Find your inner balance with daily yoga practices, meditation sessions, and mindful movement.",
    image: "/assets/zen.jpg",
    posts: [
      {
        id: "1",
        content: "🧘‍♀️ Join our sunrise yoga sessions every Monday! New breathing techniques this week.",
        likes: 67,
        date: "2024-02-16",
        pinned: true
      },
      {
        id: "2",
        content: "Beginner-friendly yoga flow series starting this weekend. No experience needed!",
        likes: 42,
        date: "2024-02-15",
        pinned: false
      }
    ]
  },
  {
    id: 4,
    name: "PowerLift Pro",
    members: 950,
    category: "Strength Training",
    adminName: "Alex Strong",
    description: "Serious about strength? Join fellow powerlifters in technique discussions and training programs.",
    image: "/assets/powerlift.jpg",
    posts: [
      {
        id: "1",
        content: "💪 New PR challenge! Post your best lifts this week for a chance to win coaching sessions.",
        likes: 89,
        date: "2024-02-16",
        pinned: true
      },
      {
        id: "2",
        content: "Form check Friday! Share your lift videos in the comments for expert feedback.",
        likes: 56,
        date: "2024-02-15",
        pinned: false
      }
    ]
  }
];

interface CommunityCardProps {
  community: Community;
  onJoin: (communityId: number) => void;
  isJoined: boolean;
  isSelected: boolean;
  onSelect: (communityId: number) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ 
  community, 
  onJoin, 
  isJoined,
  isSelected,
  onSelect 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
        isSelected ? 'ring-2 ring-indigo-600' : ''
      }`}
      onClick={() => onSelect(community.id)}
    >
      <div className="relative">
        <img 
          src={community.image} 
          alt={community.name}
          className="w-full h-18 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full">
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="mr-1 h-4 w-4" />
            <span>{community.members.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{community.name}</h3>
            <p className="text-gray-600 text-sm">{community.category}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{community.description}</p>
        <div className="flex items-center mb-3 text-sm">
          <Crown className="text-yellow-500 mr-1 h-4 w-4" />
          <span className="text-gray-600">{community.adminName}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onJoin(community.id);
          }}
          className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
            isJoined 
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isJoined ? 'Joined' : 'Join Community'}
        </button>
      </div>
    </motion.div>
  );
};

const CommunityPost: React.FC<{ 
  post: PostType; 
  onLike: (postId: string) => void; 
  isLiked: boolean 
}> = ({ post, onLike, isLiked }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-3"
    >
      {post.pinned && (
        <div className="bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full inline-block mb-2">
          📌 Pinned
        </div>
      )}
      <p className="text-gray-800 text-sm mb-3">{post.content}</p>
      <div className="flex justify-between items-center text-sm">
        <button 
          onClick={() => onLike(post.id)}
          className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
        >
          <Heart 
            className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
          />
          <span>{post.likes}</span>
        </button>
        <div className="flex items-center text-gray-500">
          <Calendar className="mr-1 h-4 w-4" />
          {new Date(post.date).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
};

const EmptyStateCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center h-48 flex flex-col items-center justify-center"
    >
      <MessageSquare className="h-8 w-8 text-indigo-400 mb-2" />
      <h3 className="text-base font-semibold text-gray-800 mb-1">
        Select a Community
      </h3>
      <p className="text-gray-600 text-sm">
        Click on any community card to view their updates
      </p>
    </motion.div>
  );
};

const CreateCommunityCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6 text-center h-full flex flex-col items-center justify-center text-white">
        <div className="bg-white/20 rounded-full p-3 mb-4 group-hover:scale-110 transition-transform">
          <Plus className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold mb-2">Create Community</h3>
        <p className="text-white/80 text-sm">
          Start your own fitness journey with others
        </p>
      </div>
    </motion.div>
  );
};

const Join: React.FC = () => {
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const handleJoinCommunity = (communityId: number) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(prev => prev.filter(id => id !== communityId));
    } else {
      setJoinedCommunities(prev => [...prev, communityId]);
    }
  };

  const handleLikePost = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setLikedPosts(prev => [...prev, postId]);
    }
  };

  const filteredCommunities = sampleCommunities.filter(community => {
    if (filter === 'joined') return joinedCommunities.includes(community.id);
    if (filter === 'available') return !joinedCommunities.includes(community.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Fitness Communities</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Join our fitness communities to get exclusive content from experts,
            participate in challenges, and connect with like-minded individuals.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Communities List */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Communities</h2>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="text-sm border rounded-lg px-2 py-1"
                >
                  <option value="all">All Communities</option>
                  <option value="joined">Joined</option>
                  <option value="available">Available</option>
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <CreateCommunityCard />
              {filteredCommunities.map(community => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onJoin={handleJoinCommunity}
                  isJoined={joinedCommunities.includes(community.id)}
                  isSelected={selectedCommunity === community.id}
                  onSelect={setSelectedCommunity}
                />
              ))}
            </div>
          </div>

          {/* Selected Community Posts */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
              {selectedCommunity ? (
                <>
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-bold text-gray-800">
                      {sampleCommunities.find(c => c.id === selectedCommunity)?.name} - Updates
                    </h2>
                  </div>
                  <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
                    {sampleCommunities
                      .find(c => c.id === selectedCommunity)
                      ?.posts.map(post => (
                        <CommunityPost
                          key={post.id}
                          post={post}
                          onLike={handleLikePost}
                          isLiked={likedPosts.includes(post.id)}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <EmptyStateCard />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;