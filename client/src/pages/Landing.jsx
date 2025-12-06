import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useUserStore from "../stores/useUserStore.js";
import { useEffect } from "react";

const Landing = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="px-6 py-4 border-b border-border flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter">EcoTrack</div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Waste Management <br />
            <span className="text-muted-foreground">Reimagined.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connecting citizens, collectors, and recycling centres for a
            cleaner, sustainable future. Track waste, earn rewards, and make a
            difference.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" className="h-12 px-8 text-lg">
                Join the Movement
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full px-4">
          {[
            {
              title: "Smart Pickup",
              desc: "Schedule waste pickups at your convenience.",
            },
            {
              title: "Earn Rewards",
              desc: "Get points for responsible disposal and recycling.",
            },
            {
              title: "Track Impact",
              desc: "Monitor your contribution to a greener planet.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="p-6 border border-border rounded-xl bg-card hover:bg-accent/50 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} EcoTrack. Built for a cleaner
        tomorrow.
      </footer>
    </div>
  );
};

export default Landing;
