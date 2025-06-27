'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/context';
import { toast } from 'sonner'; // ✅ use sonner

export function InviteModel() {
  const { InviteOpen, SetInviteOpen } = useAppContext();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = () => {
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      toast.success(`Invite sent to ${email}`);
      setLoading(false);
      setEmail('');
      SetInviteOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={InviteOpen} onOpenChange={SetInviteOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to Team</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to invite.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Enter email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Button
            onClick={handleInvite}
            disabled={loading || !email}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Invite'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
