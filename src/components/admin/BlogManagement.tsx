
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Trash2, Edit, Plus, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateBlogContent } from '@/lib/gemini';

// Mock blog data - to be replaced with actual database integration
const initialBlogs = [
  { 
    id: '1', 
    title: 'Luxury Safari Experiences in Tanzania', 
    slug: 'luxury-safari-tanzania',
    excerpt: 'Discover the ultimate safari experience with our exclusive luxury packages in Tanzania.',
    content: 'Full content would go here...',
    published: true,
    createdAt: '2023-12-01T00:00:00Z'
  },
  { 
    id: '2', 
    title: 'Top 5 Private Islands for Your Next Getaway', 
    slug: 'top-private-islands-getaway',
    excerpt: 'Explore the most exclusive private islands available for your next luxury vacation.',
    content: 'Full content would go here...',
    published: true,
    createdAt: '2023-11-15T00:00:00Z'
  },
];

export default function BlogManagement() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [activeTab, setActiveTab] = useState('all');
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false
  });
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleCreateBlog = () => {
    if (!newBlog.title || !newBlog.content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const id = Date.now().toString();
    const slug = newBlog.slug || newBlog.title.toLowerCase().replace(/\s+/g, '-');
    
    setBlogs([
      ...blogs,
      {
        ...newBlog,
        id,
        slug,
        createdAt: new Date().toISOString(),
        published: newBlog.published || false
      }
    ]);
    
    toast({
      title: "Blog created",
      description: "The blog post has been created successfully"
    });
    
    // Reset form
    setNewBlog({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false
    });
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog);
    setActiveTab('edit');
  };

  const handleUpdateBlog = () => {
    if (!editingBlog) return;
    
    setBlogs(blogs.map(blog => 
      blog.id === editingBlog.id ? editingBlog : blog
    ));
    
    toast({
      title: "Blog updated",
      description: "The blog post has been updated successfully"
    });
    
    setEditingBlog(null);
    setActiveTab('all');
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    
    toast({
      title: "Blog deleted",
      description: "The blog post has been deleted successfully"
    });
  };

  const generateWithAI = async (target: 'new' | 'edit') => {
    if (!aiPrompt) {
      toast({
        title: "Missing prompt",
        description: "Please enter a topic for the AI to write about",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await generateBlogContent(aiPrompt);
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        });
        return;
      }
      
      // Generate a title if not provided
      const title = aiPrompt.length > 3 ? aiPrompt : "AI Generated Blog Post";
      
      if (target === 'new') {
        setNewBlog({
          ...newBlog,
          title: newBlog.title || title,
          content: result.text,
          excerpt: result.text.split('\n\n')[0].substring(0, 150) + '...'
        });
      } else {
        setEditingBlog({
          ...editingBlog,
          content: result.text,
          excerpt: editingBlog.excerpt || result.text.split('\n\n')[0].substring(0, 150) + '...'
        });
      }
      
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
      setAiPrompt('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Blog Management</CardTitle>
        <CardDescription>Create, edit and manage blog posts for your website</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
            {editingBlog && <TabsTrigger value="edit">Edit Post</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="all">
            <div className="mb-4 flex justify-end">
              <Button onClick={() => setActiveTab('create')}>
                <Plus className="mr-2 h-4 w-4" /> New Blog Post
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No blog posts found. Create your first one!
                    </TableCell>
                  </TableRow>
                ) : (
                  blogs.map(blog => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">{blog.title}</TableCell>
                      <TableCell>{blog.slug}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          blog.published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditBlog(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBlog(blog.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="create">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    placeholder="Enter blog title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">
                    Slug <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="slug"
                    value={newBlog.slug}
                    onChange={(e) => setNewBlog({...newBlog, slug: e.target.value})}
                    placeholder="enter-custom-slug"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="excerpt">
                  Excerpt <span className="text-muted-foreground">(brief summary)</span>
                </Label>
                <Textarea
                  id="excerpt"
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                  placeholder="Enter a brief summary of your blog post"
                  className="h-20"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                  <Label>Generate with AI</Label>
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Enter a topic or idea (e.g., 'Luxury beach resorts in Maldives')"
                    disabled={isGenerating}
                  />
                  <Button 
                    onClick={() => generateWithAI('new')}
                    disabled={isGenerating}
                    className="shrink-0"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  AI will create blog content based on your prompt. You can edit it after generation.
                </p>
              </div>
              
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                  placeholder="Write your blog content here"
                  className="min-h-[300px]"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={newBlog.published}
                  onChange={(e) => setNewBlog({...newBlog, published: e.target.checked})}
                  className="mr-2"
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
            </div>
          </TabsContent>
          
          {editingBlog && (
            <TabsContent value="edit">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={editingBlog.title}
                      onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-slug">Slug</Label>
                    <Input
                      id="edit-slug"
                      value={editingBlog.slug}
                      onChange={(e) => setEditingBlog({...editingBlog, slug: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-excerpt">Excerpt</Label>
                  <Textarea
                    id="edit-excerpt"
                    value={editingBlog.excerpt}
                    onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                    className="h-20"
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
                    <Label>Generate with AI</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Enter a topic to generate new content"
                      disabled={isGenerating}
                    />
                    <Button 
                      onClick={() => generateWithAI('edit')}
                      disabled={isGenerating}
                      className="shrink-0"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This will replace your current content with AI-generated content
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                    className="min-h-[300px]"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="edit-published"
                    checked={editingBlog.published}
                    onChange={(e) => setEditingBlog({...editingBlog, published: e.target.checked})}
                    className="mr-2"
                  />
                  <Label htmlFor="edit-published">Published</Label>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          setActiveTab('all');
          setEditingBlog(null);
        }}>
          Cancel
        </Button>
        {activeTab === 'create' && (
          <Button onClick={handleCreateBlog}>Create Blog Post</Button>
        )}
        {activeTab === 'edit' && (
          <Button onClick={handleUpdateBlog}>Update Blog Post</Button>
        )}
      </CardFooter>
    </Card>
  );
}
