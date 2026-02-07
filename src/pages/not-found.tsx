import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-border/60">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-accent" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-foreground">404 Page Not Found</h1>
            <p className="text-muted-foreground">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>

          <Link href="/">
            <Button className="w-full mt-4">
              Return to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
