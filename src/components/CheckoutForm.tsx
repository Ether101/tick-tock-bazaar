
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City is required." }),
  postalCode: z.string().min(3, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  phone: z.string().min(5, { message: "Phone number is required." }),
  notes: z.string().optional(),
  paymentMethod: z.enum(['card', 'paypal']).optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => void;
  isProcessing: boolean;
  includePaymentFields?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  onSubmit, 
  isProcessing, 
  includePaymentFields = false 
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phone: '',
      notes: '',
      paymentMethod: undefined,
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
    form.setValue('paymentMethod', value as 'card' | 'paypal');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!includePaymentFields ? (
          // Customer Information Fields
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="United States" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Special instructions for delivery, etc." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          // Payment Method Selection and Card Input Fields
          <>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={handlePaymentMethodChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                          <CreditCard size={16} /> Credit/Debit Card
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="paypal" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0070ba">
                              <path d="M19.554 9.488c.122.051.247.098.371.146-.194.646-.524 1.227-.944 1.703-.944 1.137-2.575 1.774-4.728 1.774h-.314c-.415 0-.733.3-.796.712l-.07.495-.459 2.911c-.03.197-.198.347-.398.347h-2.757c-.22 0-.348-.227-.302-.445l1.05-6.658c.041-.264.266-.455.532-.455h4.463c.806 0 1.48-.027 2.033-.159.334-.08.638-.198.912-.347.257-.145.466-.328.645-.55.17-.207.296-.44.383-.707.075-.24.122-.495.142-.763.01-.136.015-.276.015-.417.002-.136-.01-.263-.026-.387.142.07.27.151.392.225.33.197.595.454.79.756.193.3.308.646.342 1.026.008.134.006.28-.016.446zm-2.077-4.826a4.933 4.933 0 0 0-.792-.446 4.211 4.211 0 0 0-.49-.18c-.352-.107-.729-.177-1.158-.197-.43-.025-.878-.025-1.362-.025h-4.43c-.486 0-.888.365-.961.847L7.135 12.74l-.089.513c-.066.457-.103.93.256 1.365.33.394.781.543 1.292.543h1.272c.844 0 1.563-.584 1.682-1.416l.158-1.141.088-.632c.066-.457.452-.763.912-.763h.3c2.092 0 3.677-.584 4.607-1.766.445-.567.728-1.303.728-2.132.001-.783-.247-1.433-.664-1.926a3.786 3.786 0 0 0-.298-.313zm1.618 3.073c-.434 2.157-1.77 3.304-3.506 3.928-1.256.45-2.848.557-4.574.557h-1.21c-.87 0-1.295.583-1.431 1.376a726.57 726.57 0 0 1-.35 2.092c-.1.608-.158.952-.232 1.222-.071.27-.165.471-.321.612-.074.068-.165.118-.264.15a.815.815 0 0 1-.321.06H5.568a.901.901 0 0 1-.667-.27.845.845 0 0 1-.184-.69l1.455-9.248a1 1 0 0 1 .983-.847h6.692c.725 0 1.25.06 1.638.186.38.12.661.299.91.535.227.222.394.494.496.804.1.31.136.65.126 1.016.017.372-.048.713-.148 1.017-.087.267-.193.49-.31.67v.001z" />
                            </svg>
                            PayPal
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedPaymentMethod === 'card' && (
              <div className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          {...field} 
                          maxLength={19}
                          onChange={(e) => {
                            // Format card number with spaces
                            const value = e.target.value.replace(/\s/g, '');
                            const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
                            field.onChange(formattedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cardExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY" 
                            {...field} 
                            maxLength={5}
                            onChange={(e) => {
                              // Format expiry date with slash
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              if (value.length <= 2) {
                                field.onChange(value);
                              } else {
                                field.onChange(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardCvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123" 
                            {...field} 
                            maxLength={3}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            includePaymentFields ? 'Complete Payment' : 'Continue to Payment'
          )}
        </button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
