
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';

export const GDPRContactForm = () => {
  const { t } = useLanguage();
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Please provide GDPR consent');
      return;
    }
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Textarea
        placeholder="Message"
        required
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="gdpr"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked as boolean)}
        />
        <label htmlFor="gdpr" className="text-sm text-gray-600">
          I consent to the processing of my personal data according to GDPR
        </label>
      </div>
      <Button type="submit" className="w-full">Send Message</Button>
    </form>
  );
};
