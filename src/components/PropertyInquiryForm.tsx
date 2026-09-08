
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface PropertyInquiryFormProps {
  propertyId: string;
}

export const PropertyInquiryForm = ({ propertyId }: PropertyInquiryFormProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please login to send an inquiry",
        variant: "destructive"
      });
      return;
    }
    
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message for your inquiry",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact/property-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId,
          message,
          preferredDate: preferredDate || undefined
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send inquiry');
      }
      
      toast({
        title: "Success!",
        description: "Your inquiry has been sent successfully",
      });
      
      // Reset form
      setMessage('');
      setPreferredDate('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send inquiry",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Your message
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="I'm interested in this property and would like more information..."
          required
          className="min-h-[120px]"
        />
      </div>
      
      <div>
        <label htmlFor="preferredDate" className="block text-sm font-medium mb-1">
          Preferred viewing date (optional)
        </label>
        <Input
          id="preferredDate"
          type="date"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
};
