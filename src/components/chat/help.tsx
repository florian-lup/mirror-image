"use client";

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HelpDialogProps {
  children: React.ReactNode;
}

export function HelpDialog({ children }: HelpDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About this Website</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>
              This is an AI-powered personal website that uses Retrieval-Augmented
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <div className="text-left space-y-3 pt-2 text-sm text-muted-foreground">
          <p>
            This is an AI-powered personal website that uses Retrieval-Augmented
            Generation (RAG) to provide fast, accurate answers about my background,
            projects, and expertise.
          </p>
          <p>
            Don't hesitate to ask anything or explore the suggested questions to get started.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
