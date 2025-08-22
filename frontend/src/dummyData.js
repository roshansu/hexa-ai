const dummy = [
  {
    role: 'user',
    text: 'hello how are you ai'
  },
  {
    role: 'model',
    text: 'I am doing great, thank you for asking! I am here and ready to help you with any questions or tasks you have today.'
  },

  {
    role: 'user',
    text: 'can you explain what artificial intelligence is?'
  },
  {
    role: 'model',
    text: 'Sure! Artificial Intelligence (AI) is a field of computer science that focuses on creating systems capable of performing tasks that usually require human intelligence. These tasks include problem solving, learning, decision-making, understanding natural language, and recognizing patterns in data.'
  },

  {
    role: 'user',
    text: 'write a motivational quote for students'
  },
  {
    role: 'model',
    text: 'Of course! Here’s one: “Success doesn’t come from what you do occasionally, it comes from what you do consistently. Stay disciplined, and every small step will bring you closer to your dreams.”'
  },

  {
    role: 'user',
    text: 'what is the difference between frontend and backend development?'
  },
  {
    role: 'model',
    text: 'Frontend development is everything that users see and interact with on a website or app, like buttons, layouts, colors, and design. Backend development, on the other hand, deals with the server, database, and application logic that work behind the scenes to process requests and deliver data to the frontend.'
  },

  {
    role: 'user',
    text: 'can you solve 25 * 16?'
  },
  {
    role: 'model',
    text: 'Yes! 25 multiplied by 16 equals 400. A quick trick is: 25 × 4 = 100, and since 16 is 4 × 4, you multiply 100 × 4 = 400.'
  },

  {
    role: 'user',
    text: 'tell me about black holes'
  },
  {
    role: 'model',
    text: 'Black holes are regions in space where gravity is so strong that nothing, not even light, can escape from them. They are formed when massive stars collapse at the end of their life cycle. Black holes come in different sizes, from small stellar-mass black holes to supermassive black holes found at the center of galaxies.'
  },

  {
    role: 'user',
    text: 'explain recursion with an example'
  },
  {
    role: 'model',
    text: 'Recursion is when a function calls itself to solve a smaller version of the problem until it reaches a base condition. For example, calculating factorial: factorial(5) = 5 × factorial(4). This continues until factorial(1), which returns 1. Then results are multiplied backward, giving 120 for factorial(5).'
  },

  {
    role: 'user',
    text: 'recommend me some books on self improvement'
  },
  {
    role: 'model',
    text: 'Absolutely! Here are a few great ones: 1) “Atomic Habits” by James Clear – about building effective habits. 2) “Deep Work” by Cal Newport – about focus and productivity. 3) “The 7 Habits of Highly Effective People” by Stephen Covey – about mindset and success strategies.'
  },

  {
    role: 'user',
    text: 'what are the benefits of exercising daily?'
  },
  {
    role: 'model',
    text: 'Exercising daily has many benefits: it improves cardiovascular health, strengthens muscles and bones, reduces stress, enhances mental focus, and helps maintain a healthy weight. Regular exercise also boosts your mood by releasing endorphins, often called the “feel-good hormones.”'
  },

  {
    role: 'user',
    text: 'explain blockchain in simple terms'
  },
  {
    role: 'model',
    text: 'Blockchain is like a digital ledger that records transactions in a secure and transparent way. Instead of being stored in one place, it is shared across many computers. Each block contains data, and once it is added, it cannot be changed easily, making it very secure. It’s used in cryptocurrencies like Bitcoin but also in other fields like supply chain tracking.'
  },

  {
    role: 'user',
    text: 'give me some tips to improve my english speaking'
  },
  {
    role: 'model',
    text: 'Here are a few tips: 1) Practice speaking daily, even small sentences. 2) Listen to podcasts or watch shows in English to understand pronunciation. 3) Read books or articles out loud. 4) Try to think in English instead of translating from your native language. 5) Don’t fear mistakes; they are part of learning.'
  }
];

export const conversations = [
  {
    id: 1,
    title: "Casual Greeting",
    chatHistory: [
      { role: 'user', text: 'hello how are you ai' },
      { role: 'model', text: 'I am doing great, thank you for asking! I am here and ready to help you with any questions or tasks you have today.' },
      { role: 'user', text: 'what can you do for me?' },
      { role: 'model', text: 'I can answer your questions, explain concepts, write code, summarize text, or even help you brainstorm ideas depending on what you need.' }
    ]
  },
  {
    id: 2,
    title: "AI Basics",
    chatHistory: [
      { role: 'user', text: 'can you explain what artificial intelligence is?' },
      { role: 'model', text: 'Artificial Intelligence (AI) is a branch of computer science that focuses on building systems capable of simulating human intelligence. These systems can learn, reason, solve problems, and understand natural language.' },
      { role: 'user', text: 'give me examples of ai in daily life' },
      { role: 'model', text: 'Some examples include voice assistants like Siri or Alexa, recommendation systems on YouTube and Netflix, and even spam filters in your email.' }
    ]
  },
  {
    id: 3,
    title: "Math Help",
    chatHistory: [
      { role: 'user', text: 'can you solve 25 * 16?' },
      { role: 'model', text: 'Yes! 25 multiplied by 16 equals 400. A quick trick is: 25 × 4 = 100, and since 16 is 4 × 4, you multiply 100 × 4 = 400.' },
      { role: 'user', text: 'what about 144 / 12?' },
      { role: 'model', text: 'That equals 12. Division like this is straightforward because 12 fits evenly into 144 exactly 12 times.' }
    ]
  },
  {
    id: 4,
    title: "Space Facts",
    chatHistory: [
      { role: 'user', text: 'tell me about black holes' },
      { role: 'model', text: 'Black holes are regions in space where gravity is so strong that nothing, not even light, can escape. They are formed when massive stars collapse at the end of their life cycle.' },
      { role: 'user', text: 'do they destroy everything near them?' },
      { role: 'model', text: 'Not exactly. Objects that cross the event horizon cannot escape, but from far away, black holes mostly behave like any massive object with gravity.' }
    ]
  },
  {
    id: 5,
    title: "Programming Help",
    chatHistory: [
      { role: 'user', text: 'explain recursion with an example' },
      { role: 'model', text: 'Recursion is when a function calls itself to solve smaller subproblems. For example, factorial(5) = 5 × factorial(4). This continues until factorial(1), which returns 1. Then results multiply backward, giving 120.' },
      { role: 'user', text: 'show me recursion in javascript' },
      { role: 'model', text: 'Sure! Example: function factorial(n){ if(n===1) return 1; return n * factorial(n-1); } console.log(factorial(5)) // 120' }
    ]
  },
  {
    id: 6,
    title: "Health & Fitness",
    chatHistory: [
      { role: 'user', text: 'what are the benefits of exercising daily?' },
      { role: 'model', text: 'Daily exercise improves heart health, strengthens muscles, reduces stress, enhances mood, and boosts energy. It also helps regulate weight and sleep quality.' },
      { role: 'user', text: 'how much should i exercise daily?' },
      { role: 'model', text: 'The World Health Organization suggests at least 30 minutes of moderate activity per day, like brisk walking, cycling, or light gym workouts.' }
    ]
  },
  {
    id: 7,
    title: "Books & Learning",
    chatHistory: [
      { role: 'user', text: 'recommend me some books on self improvement' },
      { role: 'model', text: 'Here are some great picks: “Atomic Habits” by James Clear, “Deep Work” by Cal Newport, and “The 7 Habits of Highly Effective People” by Stephen Covey.' },
      { role: 'user', text: 'which one should i start with?' },
      { role: 'model', text: 'If you want to build consistent habits, start with Atomic Habits. If you want to focus and reduce distractions, go with Deep Work.' }
    ]
  },
  {
    id: 8,
    title: "Travel Guide",
    chatHistory: [
      { role: 'user', text: 'what is the capital of France?' },
      { role: 'model', text: 'The capital of France is Paris, often called the “City of Light.” It’s famous for the Eiffel Tower, the Louvre, and its rich history in art and culture.' },
      { role: 'user', text: 'what should i visit in Paris?' },
      { role: 'model', text: 'Must-see places: Eiffel Tower, Louvre Museum, Notre Dame Cathedral, Champs-Élysées, and a boat ride on the Seine river.' }
    ]
  },
  {
    id: 9,
    title: "Language Practice",
    chatHistory: [
      { role: 'user', text: 'give me some tips to improve my english speaking' },
      { role: 'model', text: 'Here are a few tips: 1) Speak daily, even small sentences. 2) Listen to podcasts or shows in English. 3) Read out loud. 4) Think in English instead of translating. 5) Don’t fear mistakes.' },
      { role: 'user', text: 'can you practice with me?' },
      { role: 'model', text: 'Of course! Let’s try: I’ll ask you questions, and you answer in English. For example: What did you eat for breakfast today?' }
    ]
  },
  {
    id: 10,
    title: "Technology Trends",
    chatHistory: [
      { role: 'user', text: 'explain blockchain in simple terms' },
      { role: 'model', text: 'Blockchain is a digital ledger shared across many computers. Once data is added, it’s nearly impossible to alter. It’s secure, transparent, and widely used in cryptocurrencies and supply chains.' },
      { role: 'user', text: 'is blockchain only used in cryptocurrency?' },
      { role: 'model', text: 'No, it has many uses. For example, supply chain tracking, digital contracts (smart contracts), secure voting systems, and even decentralized identity management.' }
    ]
  }
];




export default dummy