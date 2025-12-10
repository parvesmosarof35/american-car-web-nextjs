import PricingPlans from "@/components/pages/pricing-plans"
import PrivateRoute from "@/components/protected/private-route"

export default function PricingPage() {
  return (
    <PrivateRoute>
      <PricingPlans />
    </PrivateRoute>
  )
}
