
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ContentList, { ContentItem } from "@/components/admin/ContentList";
import ContentEditor from "@/components/admin/ContentEditor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample content data (would come from API in production)
const dummyContent: ContentItem[] = [
  {
    id: "page-1",
    title: "About Us",
    slug: "about-us",
    status: "published",
    lastUpdated: new Date(2025, 4, 10),
    type: "page"
  },
  {
    id: "blog-1",
    title: "Sustainable Living in Swedish Properties",
    slug: "sustainable-living-sweden",
    status: "published",
    lastUpdated: new Date(2025, 4, 8),
    type: "blog"
  },
  {
    id: "page-2",
    title: "Contact Information",
    slug: "contact",
    status: "published",
    lastUpdated: new Date(2025, 4, 5),
    type: "page"
  },
  {
    id: "resource-1",
    title: "Swedish Property Tax Guide",
    slug: "property-tax-guide",
    status: "draft",
    lastUpdated: new Date(2025, 4, 1),
    type: "resource"
  },
  {
    id: "blog-2",
    title: "The Benefits of Energy Efficient Homes",
    slug: "benefits-energy-efficient-homes",
    status: "draft",
    lastUpdated: new Date(2025, 3, 28),
    type: "blog"
  },
  {
    id: "resource-2",
    title: "Nordic Swan Eco-Certification Explained",
    slug: "nordic-swan-certification",
    status: "published",
    lastUpdated: new Date(2025, 3, 25),
    type: "resource"
  }
];

const AdminContent = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [content, setContent] = useState<ContentItem[]>(dummyContent);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentContentId, setCurrentContentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Redirect if not authenticated (will always be authenticated in dev mode)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // Filter content based on active tab
  const filteredContent = content.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "pages") return item.type === "page";
    if (activeTab === "blog") return item.type === "blog";
    if (activeTab === "resources") return item.type === "resource";
    if (activeTab === "drafts") return item.status === "draft";
    if (activeTab === "published") return item.status === "published";
    return true;
  });

  const handleCreateNew = () => {
    setCurrentContentId(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (id: string) => {
    setCurrentContentId(id);
    setIsEditorOpen(true);
  };

  const handleView = (id: string) => {
    const item = content.find(c => c.id === id);
    if (item) {
      // In a real app, we would navigate to the actual page
      toast({
        title: `Viewing ${item.title}`,
        description: `This would navigate to /${item.slug} in production.`,
        variant: "default",
      });
    }
  };

  const handleDelete = (id: string) => {
    setCurrentContentId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentContentId) {
      setContent(content.filter(item => item.id !== currentContentId));
      toast({
        title: "Content deleted",
        description: "The content has been permanently removed.",
        variant: "default",
      });
      setIsDeleteDialogOpen(false);
      setCurrentContentId(null);
    }
  };

  const handleSaveContent = (data: any) => {
    if (currentContentId) {
      // Update existing content
      setContent(prevContent => 
        prevContent.map(item => 
          item.id === currentContentId 
            ? { 
                ...item, 
                title: data.title, 
                slug: data.slug,
                lastUpdated: new Date() 
              } 
            : item
        )
      );
    } else {
      // Create new content
      const newContent: ContentItem = {
        id: `content-${Date.now()}`,
        title: data.title,
        slug: data.slug,
        status: "draft",
        type: "page", // Default type
        lastUpdated: new Date()
      };
      setContent([newContent, ...content]);
    }
    
    setIsEditorOpen(false);
  };

  const getCurrentContent = () => {
    if (!currentContentId) return undefined;
    const item = content.find(c => c.id === currentContentId);
    if (!item) return undefined;
    
    return {
      title: item.title,
      slug: item.slug,
      content: "", // In a real app, we would load the actual content
      metaTitle: "",
      metaDescription: "",
      metaKeywords: ""
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Content Management</h1>
            <p className="text-muted-foreground mt-1">Create and manage website content</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
              </TabsList>
            </Tabs>

            <ContentList 
              items={filteredContent}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onCreateNew={handleCreateNew}
            />
          </div>
        </main>
      </div>
      <Footer />

      {/* Content Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{currentContentId ? "Edit Content" : "Create Content"}</DialogTitle>
            <DialogDescription>
              {currentContentId 
                ? "Make changes to your content below." 
                : "Add a new page, blog post, or resource."}
            </DialogDescription>
          </DialogHeader>
          <ContentEditor 
            initialData={getCurrentContent()}
            contentId={currentContentId || undefined}
            onSave={handleSaveContent}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminContent;
