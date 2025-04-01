
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export const SubscriptionPlans = () => {
  const { t } = useLanguage();
  
  const plans = [
    {
      name: 'Basic',
      price: '500 SEK/mo',
      features: ['5 listings', 'Basic analytics', 'Email support'],
    },
    {
      name: 'Premium',
      price: '1,500 SEK/mo',
      features: ['Unlimited listings', 'Advanced analytics', 'Priority support', 'Featured listings'],
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <Card key={plan.name} className="p-6">
          <h3 className="text-2xl font-bold">{plan.name}</h3>
          <p className="text-xl mt-2">{plan.price}</p>
          <ul className="mt-4 space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <span className="mr-2">✓</span> {feature}
              </li>
            ))}
          </ul>
          <Button className="w-full mt-6">Subscribe</Button>
        </Card>
      ))}
    </div>
  );
};
