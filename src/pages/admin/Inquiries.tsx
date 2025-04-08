
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

// Mock data - would be fetched from API in production
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

// Mock users for assignment dropdown
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

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // Filter inquiries based on search and filters
  const filteredInquiries = mockInquiries.filter(inquiry => {
    const matchesSearch = searchTerm === "" || 
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.sender.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === null || inquiry.status === statusFilter;
    const matchesAgent = agentFilter === null || 
      (inquiry.assignedTo && inquiry.assignedTo.name === agentFilter);
    
    return matchesSearch && matchesStatus && matchesAgent;
  });

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get badge variant based on status
  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'new': return 'default';
      case 'in-progress': return 'warning';
      case 'resolved': return 'success';
      default: return 'outline';
    }
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

          {/* Filters */}
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
                  <DropdownMenuContent align="end">
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
                  <DropdownMenuContent align="end">
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

          {/* Inquiries Table */}
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
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <User className="h-4 w-4" /> Assign
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
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
    </div>
  );
};

export default AdminInquiries;
