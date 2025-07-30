
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Plus, 
  CheckCircle,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function SuggestBrand() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    brandName: '',
    genericName: '',
    strength: '',
    form: '',
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your brand suggestion has been submitted for review.",
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-medicine-available/10 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-medicine-available" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Thank You!
              </h1>
              <p className="text-muted-foreground">
                Your brand suggestion has been submitted successfully
              </p>
            </div>

            <Card className="gradient-card border-border text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li> Our team will review your suggestion within 2-3 business days</li>
                  <li> We'll verify the medicine details with official sources</li>
                  <li> Once approved, the brand will be added to our database</li>
                  <li> You'll be notified when the medicine becomes searchable</li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full gradient-primary text-primary-foreground" asChild>
                <a href="/">Search for Medicines</a>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
                Suggest Another Brand
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Back Navigation */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-primary" />
                  <span>Suggest a New Brand</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Help us expand our medicine database by suggesting new brands
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brandName">Brand Name *</Label>
                      <Input
                        id="brandName"
                        type="text"
                        placeholder="e.g., Crocin, Dolo, Panadol"
                        value={formData.brandName}
                        onChange={(e) => handleInputChange('brandName', e.target.value)}
                        className="bg-background border-border"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="genericName">Generic Name</Label>
                      <Input
                        id="genericName"
                        type="text"
                        placeholder="e.g., Paracetamol, Ibuprofen"
                        value={formData.genericName}
                        onChange={(e) => handleInputChange('genericName', e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="strength">Strength</Label>
                      <Input
                        id="strength"
                        type="text"
                        placeholder="e.g., 500mg, 650mg, 10ml"
                        value={formData.strength}
                        onChange={(e) => handleInputChange('strength', e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="form">Form</Label>
                      <Input
                        id="form"
                        type="text"
                        placeholder="e.g., Tablet, Syrup, Capsule"
                        value={formData.form}
                        onChange={(e) => handleInputChange('form', e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      placeholder="Any additional information about the medicine, manufacturer, or where you've seen it..."
                      value={formData.comments}
                      onChange={(e) => handleInputChange('comments', e.target.value)}
                      className="bg-background border-border min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gradient-primary text-primary-foreground"
                    disabled={isLoading || !formData.brandName}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Suggestion'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>Why Suggest?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Help other patients find medicines easily</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Expand our comprehensive medicine database</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Support local pharmacies with better visibility</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Contribute to healthcare accessibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li> Provide accurate brand and generic names</li>
                  <li> Include strength if known (e.g., 500mg)</li>
                  <li> Mention the form (tablet, syrup, etc.)</li>
                  <li> Only suggest legitimate medicines</li>
                  <li> We verify all suggestions before adding</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about suggesting a brand?
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 