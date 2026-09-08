
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";
import { useApi } from "@/hooks/useApi";

const formSchema = z.object({
  totpCode: z.string().length(6, 'TOTP code must be 6 digits').regex(/^\d+$/, 'TOTP code must contain only digits')
});

type MfaFormValues = z.infer<typeof formSchema>;

interface MfaVerificationFormProps {
  email: string;
  password: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const MfaVerificationForm = ({ email, password, onSuccess, onCancel }: MfaVerificationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useApi();

  const form = useForm<MfaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totpCode: "",
    },
  });

  const onSubmit = async (values: MfaFormValues) => {
    setIsLoading(true);
    try {
      await login(email, password, values.totpCode);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="totpCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="123456" 
                    className="pl-10 text-center letter-spacing-wide" 
                    maxLength={6}
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={onCancel} disabled={isLoading}>
            Back to Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MfaVerificationForm;
