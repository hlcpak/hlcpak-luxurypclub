
// Gemini API client
import { toast } from '@/components/ui/use-toast';

const API_KEY = "AIzaSyDoIlWVydeBJh69Bnql5OcIR9ru47weBLM";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export type GeminiResponse = {
  text: string;
  error?: string;
}

export const generateContent = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('Gemini API error:', data.error);
      return { 
        text: '', 
        error: data.error.message || 'Error generating content'
      };
    }

    // Extract text from response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return { text: generatedText };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return { 
      text: '', 
      error: 'Failed to generate content. Please try again.' 
    };
  }
};

export const generateBlogContent = async (topic: string): Promise<GeminiResponse> => {
  const prompt = `Write a professional, informative blog post about "${topic}" for a luxury travel website. 
  Include an introduction, 2-3 main sections with heading suggestions, and a conclusion. 
  Focus on providing value to luxury travelers looking for exclusive experiences. 
  Keep the tone sophisticated and aspirational. 
  Format with markdown.`;
  
  return generateContent(prompt);
};

export const generateDealDescription = async (location: string, dealType: 'hotel' | 'tour'): Promise<GeminiResponse> => {
  const prompt = `Write a compelling, detailed description for a luxury ${dealType} package in ${location}. 
  Highlight the exclusive amenities, unique experiences, and why this is a must-visit destination for luxury travelers. 
  Keep the tone sophisticated and aspirational.
  The description should be 2-3 paragraphs long.`;
  
  return generateContent(prompt);
};

export const useAIContentGenerator = () => {
  const generateAndHandle = async (promptFn: (input: string) => Promise<GeminiResponse>, input: string) => {
    try {
      const result = await promptFn(input);
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        });
        return '';
      }
      
      return result.text;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive"
      });
      return '';
    }
  };
  
  return {
    generateBlog: (topic: string) => generateAndHandle(generateBlogContent, topic),
    generateDescription: (location: string, dealType: 'hotel' | 'tour') => 
      generateAndHandle((input) => generateDealDescription(input, dealType), location)
  };
};
