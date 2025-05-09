// src/lib/blog-data.ts
import type { Post, User } from "@/lib/types";

const mockUsers: User[] = [
  { id: "user-1", name: "Dr. Ava Jensen", avatarUrl: "https://picsum.photos/100/100?random=u1", email: "ava@ainexus.com" },
  { id: "user-2", name: "Ben Carter", avatarUrl: "https://picsum.photos/100/100?random=u2", email: "ben@ainexus.com" },
];

const mockPosts: Post[] = [
  {
    id: "1",
    slug: "getting-started-with-ai-integration",
    title: "Getting Started with AI Integration: A Beginner's Guide",
    excerpt: "Learn the fundamentals of AI integration and how it can revolutionize your business processes. This guide covers key concepts, benefits, and first steps.",
    content: `
## Introduction to AI Integration

Artificial Intelligence (AI) is no longer a futuristic concept but a present-day reality transforming industries. AI integration involves incorporating AI technologies into existing business processes, systems, and applications to enhance efficiency, automate tasks, and unlock new capabilities.

### Why is AI Integration Important?

*   **Increased Efficiency:** Automate repetitive tasks, freeing up human resources for more strategic work.
*   **Improved Decision-Making:** Leverage AI-powered analytics for data-driven insights.
*   **Enhanced Customer Experience:** Personalize interactions and provide faster support with AI chatbots and recommendation engines.
*   **Innovation:** Develop new products and services powered by AI.

### Key Steps for Successful AI Integration

1.  **Identify Business Needs:** Determine which areas of your business can benefit most from AI.
2.  **Data Preparation:** AI models thrive on data. Ensure you have quality, relevant data.
3.  **Choose the Right AI Tools:** Select appropriate AI technologies and platforms.
4.  **Develop or Procure AI Solutions:** Build custom models or integrate off-the-shelf AI services.
5.  **Integrate and Test:** Carefully integrate AI into your existing systems and conduct thorough testing.
6.  **Monitor and Iterate:** Continuously monitor performance and refine your AI solutions.

At AI Nexus, we specialize in guiding businesses through every step of this journey. Contact us to learn more!
    `,
    imageUrl: "https://picsum.photos/800/400?random=p1",
    author: mockUsers[0],
    createdAt: "2024-05-15T10:00:00Z",
    updatedAt: "2024-05-16T14:30:00Z",
    tags: ["AI Integration", "Beginner Guide", "Business AI"],
    seoTitle: "AI Integration Beginner's Guide | AI Nexus",
    seoDescription: "Your first steps into AI integration for business. Learn key concepts, benefits, and how AI Nexus can help you succeed.",
  },
  {
    id: "2",
    slug: "future-of-nlp-in-customer-service",
    title: "The Future of Natural Language Processing (NLP) in Customer Service",
    excerpt: "Explore how NLP is reshaping customer service, from intelligent chatbots to sentiment analysis, and what the future holds for this exciting technology.",
    content: `
## NLP: Revolutionizing Customer Interactions

Natural Language Processing (NLP) is a branch of AI that enables computers to understand, interpret, and generate human language. In customer service, NLP is a game-changer.

### Current Applications of NLP in Customer Service

*   **AI Chatbots:** Provide 24/7 support, answer common queries, and escalate complex issues.
*   **Sentiment Analysis:** Analyze customer feedback from reviews, surveys, and social media to gauge satisfaction.
*   **Automated Ticketing:** Categorize and route customer inquiries automatically.
*   **Voice Assistants:** Power IVR systems and voice-controlled support channels.

### The Future Trends

1.  **Hyper-Personalization:** NLP will enable even more tailored and context-aware customer interactions.
2.  **Proactive Support:** AI will predict customer needs and offer assistance before problems arise.
3.  **Multilingual Capabilities:** Seamless support across different languages will become standard.
4.  **Emotional Intelligence:** Chatbots will better understand and respond to customer emotions.

AI Nexus is at the forefront of NLP solutions. We help businesses implement advanced NLP strategies to elevate their customer service.
    `,
    imageUrl: "https://picsum.photos/800/400?random=p2",
    author: mockUsers[1],
    createdAt: "2024-06-01T12:00:00Z",
    updatedAt: "2024-06-02T09:15:00Z",
    tags: ["NLP", "Customer Service", "AI Trends", "Chatbots"],
    seoTitle: "Future of NLP in Customer Service | AI Nexus Insights",
    seoDescription: "Discover how Natural Language Processing is transforming customer service and the future trends to watch. AI Nexus expertise in NLP.",
  },
  {
    id: "3",
    slug: "seo-optimization-with-ai",
    title: "Leveraging AI for Advanced SEO Optimization",
    excerpt: "Artificial Intelligence is revolutionizing Search Engine Optimization. Discover how AI tools can help you create better content, understand user intent, and climb search rankings.",
    content: `
## AI: Your SEO Superpower

SEO is a constantly evolving field. AI offers powerful tools to stay ahead of the curve.

### How AI Enhances SEO

*   **Content Generation & Optimization:** AI can help draft content, suggest improvements, and ensure it aligns with target keywords and user intent. Our own <a href="/seo-tool">SEO Tool</a> is an example of this!
*   **Keyword Research:** AI can uncover long-tail keywords and predict keyword trends with greater accuracy.
*   **Understanding User Intent:** AI algorithms analyze search patterns to help you understand what users are truly looking for.
*   **Technical SEO Audits:** AI can quickly identify technical issues on your website that might impact rankings.
*   **Link Building Insights:** AI can help identify valuable link-building opportunities.

### Implementing AI in Your SEO Strategy

1.  **Utilize AI-Powered SEO Tools:** Many platforms now offer AI features for various SEO tasks.
2.  **Focus on Quality and Relevance:** AI can assist, but human oversight is crucial for creating high-quality, authoritative content.
3.  **Stay Updated:** The intersection of AI and SEO is rapidly evolving. Continuous learning is key.

AI Nexus provides AI-driven SEO strategies and tools to maximize your online visibility.
    `,
    imageUrl: "https://picsum.photos/800/400?random=p3",
    author: mockUsers[0],
    createdAt: "2024-06-10T09:30:00Z",
    updatedAt: "2024-06-11T11:00:00Z",
    tags: ["SEO", "AI Marketing", "Content Strategy", "AI Tools"],
    seoTitle: "AI for SEO Optimization: Advanced Strategies | AI Nexus",
    seoDescription: "Learn how to use Artificial Intelligence for SEO. AI tools for content, keywords, user intent, and technical SEO. Boost your rankings with AI Nexus.",
  },
];

// Simulate API calls
export async function getPosts(): Promise<Post[]> {
  // In a real app, this would fetch from Supabase
  return new Promise((resolve) => setTimeout(() => resolve(mockPosts), 500));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // In a real app, this would fetch from Supabase
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockPosts.find((post) => post.slug === slug)), 300)
  );
}

export async function getPostById(id: string): Promise<Post | undefined> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockPosts.find((post) => post.id === id)), 300)
  );
}


// Admin functions (placeholders)
export async function createPost(postData: Omit<Post, "id" | "createdAt" | "updatedAt" | "author">): Promise<Post> {
  console.log("Mock creating post:", postData);
  const newPost: Post = {
    id: String(mockPosts.length + 1),
    slug: postData.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
    ...postData,
    author: mockUsers[0], // Default author for new mock posts
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockPosts.push(newPost);
  return new Promise((resolve) => setTimeout(() => resolve(newPost), 500));
}

export async function updatePost(id: string, postData: Partial<Omit<Post, "id" | "author" | "createdAt">>): Promise<Post | undefined> {
  console.log("Mock updating post:", id, postData);
  const postIndex = mockPosts.findIndex(p => p.id === id);
  if (postIndex === -1) return undefined;
  
  mockPosts[postIndex] = { ...mockPosts[postIndex], ...postData, updatedAt: new Date().toISOString() };
  return new Promise((resolve) => setTimeout(() => resolve(mockPosts[postIndex]), 500));
}

export async function deletePost(id: string): Promise<boolean> {
  console.log("Mock deleting post:", id);
  const initialLength = mockPosts.length;
  const filteredPosts = mockPosts.filter(p => p.id !== id);
  // This direct mutation of mockPosts is for simplicity in this mock environment.
  // In a real scenario, you'd manage state or re-fetch.
  mockPosts.length = 0; 
  mockPosts.push(...filteredPosts);
  return new Promise((resolve) => setTimeout(() => resolve(mockPosts.length < initialLength), 500));
}

export async function getAuthors(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 100));
}
