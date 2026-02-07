import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUploadTest } from "@/hooks/use-data";
import { UploadCloud, FileText, Mic, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Arena() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any | null>(null);
  
  const { toast } = useToast();
  const uploadMutation = useUploadTest();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    try {
      const res = await uploadMutation.mutateAsync(file);
      setResult(res.analysis);
      toast({
        title: "Analysis Complete",
        description: "Your work has been graded by AI.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl font-display font-bold text-primary">Practice Arena</h1>
        <p className="text-muted-foreground text-lg">Test your skills in a simulated environment with instant AI feedback.</p>
      </div>

      <Tabs defaultValue="writing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
          <TabsTrigger value="writing" className="text-base"><FileText className="w-4 h-4 mr-2"/> Writing Lab</TabsTrigger>
          <TabsTrigger value="speaking" className="text-base"><Mic className="w-4 h-4 mr-2"/> Speaking Booth</TabsTrigger>
        </TabsList>

        <TabsContent value="writing" className="space-y-6">
          <Card className="border-2 border-dashed border-border/60 shadow-none bg-muted/20">
            <CardContent 
              className={`flex flex-col items-center justify-center p-12 transition-colors ${dragActive ? 'bg-primary/5 border-primary' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UploadCloud className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {file ? file.name : "Drag & Drop your essay here"}
              </h3>
              <p className="text-muted-foreground mb-6 text-center max-w-sm">
                Supported formats: .txt, .docx, .pdf. Maximum file size: 5MB.
              </p>
              
              <div className="flex gap-4">
                <Button variant="outline" className="relative" onClick={() => setFile(null)}>
                  {file ? "Change File" : "Browse Files"}
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={handleChange}
                    accept=".txt,.pdf,.docx"
                  />
                </Button>
                {file && (
                  <Button onClick={handleSubmit} disabled={uploadMutation.isPending}>
                    {uploadMutation.isPending ? (
                      <>Analyzing <Loader2 className="ml-2 w-4 h-4 animate-spin" /></>
                    ) : (
                      "Analyze Now"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-card border-l-4 border-l-secondary">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Analysis Report</CardTitle>
                      <div className="text-2xl font-bold text-secondary">
                        Band {result.score}
                      </div>
                    </div>
                    <CardDescription>Based on IELTS assessment criteria</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-green-700">
                        <CheckCircle className="w-4 h-4" /> Strengths
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {result.strengths.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2 text-amber-600">
                        <AlertCircle className="w-4 h-4" /> Areas for Improvement
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {result.weaknesses.map((w: string, i: number) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">AI Feedback</h4>
                      <p className="text-sm text-muted-foreground italic">"{result.feedback}"</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="speaking">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Microphone Access Required</h3>
              <p className="text-muted-foreground mb-6">
                Please allow microphone access to start the speaking simulation.
              </p>
              <Button disabled>Start Recording (Coming Soon)</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
