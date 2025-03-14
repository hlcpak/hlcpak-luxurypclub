
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateContent, generateDealDescription } from '@/lib/gemini';
import { useToast } from '@/components/ui/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface AIContentGeneratorProps {
  onGeneratedContent: (content: string) => void;
  defaultPrompt?: string;
  label?: string;
  buttonText?: string;
  placeholder?: string;
  // New props to handle specialized generation
  generateFor?: string;
  contextData?: string;
  contextType?: 'hotel' | 'tour';
}

export default function AIContentGenerator({
  onGeneratedContent,
  defaultPrompt = '',
  label = 'Generate with AI',
  buttonText = 'Generate',
  placeholder = 'Enter a prompt for AI to generate content...',
  generateFor,
  contextData,
  contextType
}: AIContentGeneratorProps) {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();
  
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'link', 'image'
  ];

  const handleGenerate = async () => {
    if (!prompt && !contextData) {
      toast({
        title: "Missing prompt",
        description: "Please enter a prompt for content generation",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      let result;
      
      // Use contextData and contextType for specialized generation if available
      if (generateFor === 'description' && contextData && contextType) {
        result = await generateDealDescription(contextData, contextType);
      } else {
        result = await generateContent(prompt);
      }
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        });
        return;
      }
      
      setGeneratedContent(result.text);
      setShowEditor(true);
      
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

  const handleApplyContent = () => {
    onGeneratedContent(generatedContent);
    setShowEditor(false);
    setGeneratedContent('');
    toast({
      title: "Content applied",
      description: "AI content has been applied to the form"
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      {!showEditor ? (
        <>
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
        </>
      ) : (
        <div className="space-y-4">
          <Label>Edit AI-Generated Content</Label>
          <div className="bg-white">
            <ReactQuill 
              theme="snow"
              value={generatedContent}
              onChange={setGeneratedContent}
              modules={quillModules}
              formats={quillFormats}
              className="min-h-[200px]"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyContent}>
              Apply Content
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
