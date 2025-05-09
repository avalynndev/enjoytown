'use client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RainbowButton } from './magicui/rainbow-button';

export default function FeedbackBadge() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newSource, setNewSource] = useState({
    name: '',
    url: '',
    reason: '',
  });

  const [deadSource, setDeadSource] = useState({
    name: '',
    issue: '',
    logs: '',
  });

  const [feedback, setFeedback] = useState({
    message: '',
    email: '',
  });

  const handleNewSourceSubmit = async () => {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        type: 'new-source',
        ...newSource,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(await res.json());
    setOpen(false);
  };

  const handleDeadSourceSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        type: 'dead-source',
        ...deadSource,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(await res.json());
    setOpen(false);
    setLoading(false);
  };

  const handleFeedbackSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        type: 'general',
        ...feedback,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(await res.json());
    setOpen(false);
    setLoading(false);
  };

  return (
    <div className="fixed right-4 bottom-20 z-50 lg:bottom-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <RainbowButton className="h-8 gap-1.5 rounded rounded-md px-3 text-xs has-[>svg]:px-2.5">
            Feedback
          </RainbowButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Feedback</DialogTitle>
          <Tabs defaultValue="feedback" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="feedback">💬 Feedback</TabsTrigger>
              <TabsTrigger value="add">📝 Add Source</TabsTrigger>
              <TabsTrigger value="report">🐞 Report</TabsTrigger>
            </TabsList>

            {/* General Feedback */}
            <TabsContent value="feedback">
              <div className="space-y-4">
                <Textarea
                  placeholder="Your feedback, thoughts, or suggestions..."
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                />
                <Input
                  placeholder="Optional email (for follow-up)"
                  value={feedback.email}
                  onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                />
                <Button onClick={handleFeedbackSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading..
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Add Source */}
            <TabsContent value="add">
              <div className="space-y-4">
                <Input
                  placeholder="Source Name"
                  value={newSource.name}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                />
                <Input
                  placeholder="Source API URL"
                  value={newSource.url}
                  onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                />
                <Textarea
                  placeholder="Why it's useful (e.g., good speed, quality, reliability)"
                  value={newSource.reason}
                  onChange={(e) => setNewSource({ ...newSource, reason: e.target.value })}
                />
                <Button onClick={handleNewSourceSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading..
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Report Dead Source */}
            <TabsContent value="report">
              <div className="space-y-4">
                <Input
                  placeholder="Source Name"
                  value={deadSource.name}
                  onChange={(e) => setDeadSource({ ...deadSource, name: e.target.value })}
                />
                <Input
                  placeholder="Issue encountered (e.g., 404 error, not loading)"
                  value={deadSource.issue}
                  onChange={(e) => setDeadSource({ ...deadSource, issue: e.target.value })}
                />
                <Textarea
                  placeholder="Screenshot or logs (if possible)"
                  value={deadSource.logs}
                  onChange={(e) => setDeadSource({ ...deadSource, logs: e.target.value })}
                />
                <Button onClick={handleDeadSourceSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading..
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
