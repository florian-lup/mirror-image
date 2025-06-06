import { FileText, ShieldAlert, Mail, CheckCircle, RotateCcw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useCallback } from "react"
import { Privacy } from "./privacy"
import { Terms } from "./terms"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

interface HeaderProps {
  hasMessages?: boolean;
  onNewChat?: () => void;
}

export default function Header({ hasMessages = false, onNewChat }: HeaderProps) {
  const [isEmailCopied, copy] = useCopyToClipboard();

  const handleGitHubClick = () => {
    window.open("https://github.com/florian-lup", "_blank", "noopener,noreferrer")
  }

  const handleContactClick = useCallback(async () => {
    const success = await copy("contact@florianlup.com")
    if (success) {
      toast.success("Email copied to clipboard!")
    } else {
      toast.error("Failed to copy email to clipboard")
    }
  }, [copy])

  const handleReloadClick = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      window.location.reload();
    }
  }

  return (
    <header className="w-full py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Left side - Reload button (only when there are messages) */}
        <div className="flex items-center">
          {hasMessages && (
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleReloadClick}>
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">New Chat</span>
            </Button>
          )}
        </div>

        {/* Right side - Other buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleGitHubClick}>
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">GitHub</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleContactClick}>
            {isEmailCopied ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <Mail className="w-4 h-4" />
            )}
            <span className="hidden sm:inline ml-2">Contact</span>
          </Button>
          <Terms>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Terms</span>
            </Button>
          </Terms>
          <Privacy>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ShieldAlert className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Privacy</span>
            </Button>
          </Privacy>
        </div>
      </div>
    </header>
  )
}
