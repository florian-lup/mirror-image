import { FileText, ShieldAlert, Mail, CheckCircle } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"

export default function Header() {
  const [isEmailCopied, setIsEmailCopied] = useState(false)

  const handleGitHubClick = () => {
    window.open("https://github.com/florian-lup", "_blank", "noopener,noreferrer")
  }

  const handleContactClick = async () => {
    try {
      await navigator.clipboard.writeText("contact@florianlup.com")
      setIsEmailCopied(true)
      toast.success("Email copied to clipboard!")

      // Reset the icon after 2 seconds
      setTimeout(() => {
        setIsEmailCopied(false)
      }, 2000)
    } catch (err) {
      toast.error("Failed to copy email to clipboard")
    }
  }

  return (
    <header className="w-full py-4 px-6">
      <div className="flex justify-end items-center gap-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleGitHubClick}>
          <FaGithub className="w-4 h-4" />
          GitHub
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleContactClick}>
          {isEmailCopied ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          Contact
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <FileText className="w-4 h-4" />
          Terms
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <ShieldAlert className="w-4 h-4" />
          Privacy
        </Button>
      </div>
    </header>
  )
}
