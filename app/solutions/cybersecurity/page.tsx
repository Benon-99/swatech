"use client";

import SolutionDetail from '@/components/solutions/SolutionDetail';

export default function CybersecuritySolutionsPage() {
  return (
    <SolutionDetail 
      title="Cybersecurity Solutions"
      description="Comprehensive security services to protect your business from evolving cyber threats and ensure data protection."
      overview="Our cybersecurity solutions provide a multi-layered approach to protecting your organization's most valuable assets. We combine advanced technology, expert monitoring, and proactive threat hunting to detect and neutralize threats before they can cause damage. Our team of security experts continuously evaluates the latest threats and vulnerabilities to ensure your defenses remain robust against evolving cyber risks."
      features={[
        "24/7 Security Operations Center (SOC) with real-time monitoring",
        "Advanced threat detection and response capabilities",
        "Vulnerability assessment and penetration testing",
        "Security awareness training for employees",
        "Data loss prevention strategies",
        "Incident response planning and execution",
        "Compliance management for regulatory requirements",
        "Security architecture design and implementation"
      ]}
      industries={[
        "Financial Services",
        "Healthcare",
        "Government",
        "Manufacturing",
        "Retail",
        "Education",
        "Technology",
        "Energy"
      ]}
      image="/images/solutions/cybersecurity.jpg"
    />
  );
}
