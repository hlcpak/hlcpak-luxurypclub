
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateContent } from '@/lib/gemini';
import { useToast } from '@/components/ui/use-toast';

interface AIContentGeneratorProps {
  onGeneratedContent: (content: string) => void;
  defaultPrompt?: string;
  label?: string;
  buttonText?: string;
  placeholder?: string;
}

export default function AIContentGenerator({
  onGeneratedContent,
  defaultPrompt = '',
  label = 'Generate with AI',
  buttonText = 'Generate',
  placeholder = 'Enter a prompt for AI to generate content...'
}: AIContentGeneratorProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Missing prompt",
        description: "Please enter a prompt for content generation",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await generateContent(prompt);
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        });
        return;
      }
      
      onGeneratedContent(result.text);
      
      toast({
        title: "Content generated",
        description: "AI has successfully generated content"
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <div className="flex items-center mb-2">
        <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
        <Label>{label}</Label>
      </div>
      <div className="space-y-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="h-20"
          disabled={isGenerating}
        />
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        AI will create content based on your prompt. You can edit it afterward.
      </p>
    </div>
  );
}
