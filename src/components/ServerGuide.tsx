
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const ServerGuide = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Backend Server Setup Guide</CardTitle>
        <CardDescription>
          Follow these steps to run the backend server locally
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Step 1: Open Terminal</h3>
          <p className="text-sm text-gray-500">
            Open a terminal in your project directory
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Step 2: Navigate to Server Directory</h3>
          <div className="bg-gray-100 p-2 rounded text-sm font-mono">
            cd src/server
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Step 3: Run the Server</h3>
          <div className="bg-gray-100 p-2 rounded text-sm font-mono">
            tsx index.ts
          </div>
          <p className="text-sm text-gray-500">
            Your server will start on port 5000 (default) or the port specified in your .env file.
          </p>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
          <h3 className="font-medium text-amber-800">Important Notes:</h3>
          <ul className="list-disc pl-5 text-sm text-amber-700 mt-2">
            <li>Make sure MongoDB is running or you have a valid MongoDB connection string in your .env file</li>
            <li>The Express server includes routes for auth, contact, and properties</li>
            <li>API endpoints will be available at <span className="font-mono">http://localhost:5000/api/...</span></li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="mr-2" onClick={() => window.open('https://github.com/your-username/your-repo', '_blank')}>
          View on GitHub
        </Button>
        <Button onClick={() => window.open('http://localhost:5000/api/properties', '_blank')}>
          Test API Connection
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServerGuide;
