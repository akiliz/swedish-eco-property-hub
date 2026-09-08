import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/custom-badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreVertical, MessageSquare, CheckCircle, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const mockInquiries = [
  { 
    id: 1, 
    subject: "Interest in Eco Villa Stockholm", 
    property: "Eco Villa Stockholm",
    sender: { name: "Mark Johnson", email: "mark@example.com", avatar: "" },
    assignedTo: { name: "Jane Smith", email: "jane@example.com", avatar: "" },
    status: "new", 
    date: "2024-04-06"
  },
  { 
    id: 2, 
    subject: "Questions about Green Apartment", 
    property: "Green Apartment",
    sender: { name: "Sarah Davis", email: "sarah@example.com", avatar: "" },
    assignedTo: null,
    status: "new", 
    date: "2024-04-06"
  },
  { 
    id: 3, 
    subject: "Viewing request for Passive House", 
    property: "Passive House",
    sender: { name: "Robert Johnson", email: "robert@example.com", avatar: "" },
    assignedTo: { name: "Jane Smith", email: "jane@example.com", avatar: "" },
    status: "in-progress", 
    date: "2024-04-05"
  },
  { 
    id: 4, 
    subject: "Follow up on Solar Cottage", 
    property: "Solar Cottage",
    sender: { name: "Alice Brown", email: "alice@example.com", avatar: "" },
    assignedTo: { name: "John Doe", email: "john@example.com", avatar: "" },
    status: "resolved", 
    date: "2024-04-02"
  },
  { 
    id: 5, 
    subject: "Price negotiation for Mountain Eco Cabin", 
    property: "Mountain Eco Cabin",
    sender: { name: "Michael Wilson", email: "michael@example.com", avatar: "" },
    assignedTo: { name: "Jane Smith", email: "jane@example.com", avatar: "" },
    status: "in-progress", 
    date: "2024-04-04"
  },
];

const mockAgents = [
  { name: "John Doe", email: "john@example.com", avatar: "" },
  { name: "Jane Smith", email: "jane@example.com", avatar: "" },
];

const AdminInquiries = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [agentFilter, setAgentFilter] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = searchTerm === "" || 
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.sender.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === null || inquiry.status === statusFilter;
    const matchesAgent = agentFilter === null || 
      (inquiry.assignedTo && inquiry.assignedTo.name === agentFilter) || 
      (!inquiry.assignedTo && agentFilter === 'Unassigned');
    
    return matchesSearch && matchesStatus && matchesAgent;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'new': return 'default';
      case 'in-progress': return 'warning';
      case 'resolved': return 'success';
      default: return 'outline';
    }
  };

  const handleViewDetails = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setShowDetailsDialog(true);
  };

  const handleAssign = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setShowAssignDialog(true);
  };

  const assignToAgent = (agent: typeof mockAgents[0]) => {
    if (!selectedInquiry) return;
    
    const updatedInquiries = inquiries.map(inquiry => {
      if (inquiry.id === selectedInquiry.id) {
        return {
          ...inquiry,
          assignedTo: agent,
          status: inquiry.status === 'new' ? 'in-progress' : inquiry.status
        };
      }
      return inquiry;
    });
    
    setInquiries(updatedInquiries);
    setShowAssignDialog(false);
    toast({
      title: "Agent assigned",
      description: `${agent.name} has been assigned to this inquiry.`
    });
  };

  const handleMarkAsResolved = (inquiry: any) => {
    const updatedInquiries = inquiries.map(item => {
      if (item.id === inquiry.id) {
        return {
          ...item,
          status: 'resolved'
        };
      }
      return item;
    });
    
    setInquiries(updatedInquiries);
    toast({
      title: "Inquiry resolved",
      description: "The inquiry has been marked as resolved."
    });
  };

  const handleSubmitResponse = () => {
    if (!responseText.trim() || !selectedInquiry) return;

    const updatedInquiries = inquiries.map(inquiry => {
      if (inquiry.id === selectedInquiry.id) {
        return {
          ...inquiry,
          status: 'in-progress'
        };
      }
      return inquiry;
    });
    
    setInquiries(updatedInquiries);
    setResponseText("");
    setShowDetailsDialog(false);
    toast({
      title: "Response sent",
      description: "Your response has been sent to the client."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <AdminSidebar />
        <main className="flex-grow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Inquiries Management</h1>
          </div>

          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search inquiries..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Status: {statusFilter || 'All'}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("new")}>New</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>In Progress</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>Resolved</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Agent: {agentFilter || 'All'}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => setAgentFilter(null)}>All</DropdownMenuItem>
                    {mockAgents.map(agent => (
                      <DropdownMenuItem key={agent.email} onClick={() => setAgentFilter(agent.name)}>
                        {agent.name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem onClick={() => setAgentFilter('Unassigned')}>Unassigned</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Inquiries List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Inquiry</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No inquiries found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="font-medium">
                          <div>{inquiry.subject}</div>
                          <div className="text-xs text-muted-foreground">Re: {inquiry.property}</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{inquiry.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{getInitials(inquiry.sender.name)}</AvatarFallback>
                            </Avatar>
                            <span>{inquiry.sender.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {inquiry.assignedTo ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{getInitials(inquiry.assignedTo.name)}</AvatarFallback>
                              </Avatar>
                              <span>{inquiry.assignedTo.name}</span>
                            </div>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50">Unassigned</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(inquiry.status)}>
                            {inquiry.status === 'in-progress' ? 'In Progress' : 
                              inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white">
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => handleViewDetails(inquiry)}
                              >
                                <MessageSquare className="h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => handleAssign(inquiry)}
                              >
                                <User className="h-4 w-4" /> Assign
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => handleMarkAsResolved(inquiry)}
                                disabled={inquiry.status === 'resolved'}
                              >
                                <CheckCircle className="h-4 w-4" /> Mark as Resolved
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedInquiry?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedInquiry?.sender.name} ({selectedInquiry?.sender.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm">
                This is a mock inquiry message content. In a real application, this would contain the actual message from the client regarding {selectedInquiry?.property}.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Received on {selectedInquiry?.date}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Your Response</h4>
              <Textarea 
                value={responseText} 
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Type your response here..."
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitResponse}>Send Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Inquiry</DialogTitle>
            <DialogDescription>
              Select an agent to handle this inquiry.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {mockAgents.map((agent) => (
              <div 
                key={agent.email} 
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => assignToAgent(agent)}
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">{agent.name}</h4>
                  <p className="text-xs text-muted-foreground">{agent.email}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInquiries;
