import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-green-900">Thank You!</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Your product has been successfully registered.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Registration Complete
            </CardTitle>
            <CardDescription>
              Your warranty is now active and you'll receive product updates via email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Warranty Status:</span>
                <p className="text-green-600 font-semibold">Active</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Coverage Period:</span>
                <p className="font-semibold">2 Years</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                You'll receive an email confirmation shortly with your registration details and warranty information.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">What would you like to do next?</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Button asChild size="lg" className="h-auto p-6 flex flex-col items-center gap-2">
              <Link to="/register">
                <Package className="w-6 h-6" />
                <span>Register Another Product</span>
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="h-auto p-6 flex flex-col items-center gap-2">
              <Link to="/">
                <ArrowLeft className="w-6 h-6" />
                <span>Browse Products</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@homeelem.com" className="text-primary hover:underline">
              support@homeelem.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
