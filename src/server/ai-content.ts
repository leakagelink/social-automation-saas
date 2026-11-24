/**
 * AI content generation service interface.
 * Implement with OpenAI / Anthropic behind a single adapter; add moderation pre-flight.
 */

export interface ContentGenerationInput {
  niche: string;
  topic: string;
  tone: "professional" | "casual" | "playful" | "educational";
  platform: string;
  includeHashtags: boolean;
  includeReelScript: boolean;
}

export interface GeneratedContent {
  caption: string;
  hashtags: string[];
  reelScript?: string;
  model: string;
  moderationPassed: boolean;
}

export interface ContentGenerationService {
  generate(input: ContentGenerationInput): Promise<GeneratedContent>;
}

const MOCK_HASHTAGS = [
  "#contentcreator",
  "#socialmediamarketing",
  "#growthmindset",
  "#digitalmarketing",
  "#reels",
];

export const mockContentService: ContentGenerationService = {
  async generate(input) {
    const caption = `Here's the truth about ${input.topic} in ${input.niche}: consistency beats virality every time. Save this for your next post.`;
    return {
      caption,
      hashtags: input.includeHashtags ? MOCK_HASHTAGS : [],
      reelScript: input.includeReelScript
        ? `HOOK (0-3s): Stop scrolling if you care about ${input.topic}.\nVALUE (3-45s): 3 quick wins for ${input.niche}...\nCTA (45-60s): Follow for the full playbook.`
        : undefined,
      model: "mock-socialflow-v1",
      moderationPassed: true,
    };
  },
};

/** Production interface — swap implementation via DI */
export function getContentService(): ContentGenerationService {
  if (process.env.OPENAI_API_KEY) {
    // TODO: return openAIContentService
  }
  return mockContentService;
}