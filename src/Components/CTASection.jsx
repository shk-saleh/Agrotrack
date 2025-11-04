import { Button } from './Button.jsx';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Agricultural Practices?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Join thousands of farmers already using AgroTrack to maximize their yields and profits.
        </p>
        <div className="flex gap-4 justify-center">
          <Button to="/signup" variant="white" className="text-lg px-8 py-4">
            Start Free Trial
          </Button>
          <Button variant="secondary" className="text-lg px-8 py-4 border-white text-white hover:bg-white/10">
            Talk to an Expert
          </Button>
        </div>
      </div>
    </section>
  );
}