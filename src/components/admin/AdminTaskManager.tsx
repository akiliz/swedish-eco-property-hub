
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardList, Plus, Calendar, Users, Tag, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  assignee?: string;
  dueDate?: string;
}

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Review new property listings",
    completed: false,
    priority: "high",
    assignee: "Alex",
    dueDate: "Today"
  },
  {
    id: "task-2",
    title: "Update pricing on featured properties",
    completed: false,
    priority: "medium",
    assignee: "Sarah",
    dueDate: "Tomorrow"
  },
  {
    id: "task-3",
    title: "Follow up with potential investors",
    completed: false,
    priority: "high",
    dueDate: "Feb 18"
  },
  {
    id: "task-4",
    title: "Schedule property photoshoots",
    completed: true,
    priority: "medium",
    assignee: "Michael",
    dueDate: "Feb 15"
  },
  {
    id: "task-5",
    title: "Update eco-certification requirements",
    completed: true,
    priority: "low",
    assignee: "Emma"
  },
];

const AdminTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { toast } = useToast();

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      completed: false,
      priority: "medium",
      dueDate: "Tomorrow"
    };
    
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle("");
    
    toast({
      description: "New task added",
      variant: "success",
    });
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      description: "Task removed",
      variant: "success",
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const priorityClasses = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Task Manager</CardTitle>
            <CardDescription>Manage your team's tasks</CardDescription>
          </div>
          <ClipboardList className="text-muted-foreground" size={20} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
            className="flex-1"
          />
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex space-x-1">
            <Button 
              variant={filter === "all" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilter("all")}
              className="text-xs h-8"
            >
              All
            </Button>
            <Button 
              variant={filter === "active" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilter("active")}
              className="text-xs h-8"
            >
              Active
            </Button>
            <Button 
              variant={filter === "completed" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setFilter("completed")}
              className="text-xs h-8"
            >
              Completed
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">
            {tasks.filter(t => !t.completed).length} tasks remaining
          </span>
        </div>

        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {filteredTasks.length === 0 ? (
            <div className="flex items-center justify-center h-20 text-muted-foreground text-sm">
              No tasks to display
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={cn(
                  "flex items-start space-x-3 p-3 rounded-md border",
                  task.completed ? "bg-muted/50" : "bg-card"
                )}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-medium truncate",
                    task.completed && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.priority && (
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full border",
                        priorityClasses[task.priority]
                      )}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} priority
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="text-xs flex items-center bg-muted px-2 py-1 rounded-full">
                        <Calendar className="h-3 w-3 mr-1" />
                        {task.dueDate}
                      </span>
                    )}
                    {task.assignee && (
                      <span className="text-xs flex items-center bg-muted px-2 py-1 rounded-full">
                        <Users className="h-3 w-3 mr-1" />
                        {task.assignee}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => deleteTask(task.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" size="sm">
          <Tag className="h-4 w-4 mr-1" />
          Assign
        </Button>
        <Button variant="ghost" size="sm">
          <Clock className="h-4 w-4 mr-1" />
          Set Due Date
        </Button>
        <Button variant="ghost" size="sm">
          <Users className="h-4 w-4 mr-1" />
          Manage Users
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminTaskManager;
