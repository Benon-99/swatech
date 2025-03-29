"use client";

import SolutionDetail from '@/components/solutions/SolutionDetail';

export default function NetworkSecurityPage() {
  return (
    <SolutionDetail 
      title="Network Security"
      description="Advanced network protection systems that safeguard your organization's critical infrastructure and data."
      overview="Our network security solutions provide comprehensive protection for your entire network infrastructure. We implement multiple layers of defense to secure your data, applications, and devices from unauthorized access and cyber threats. Our solutions are designed to detect and prevent network-based attacks while ensuring your legitimate network traffic flows smoothly and efficiently."
      features={[
        "Next-generation firewall implementation and management",
        "Intrusion Detection and Prevention Systems (IDS/IPS)",
        "Network segmentation and micro-segmentation",
        "Secure remote access and VPN solutions",
        "Network traffic analysis and monitoring",
        "DNS security and protection",
        "DDoS protection and mitigation",
        "Network access control and policy enforcement"
      ]}
      industries={[
        "Healthcare",
        "Financial Services",
        "Telecommunications",
        "Manufacturing",
        "Government",
        "Education",
        "Utilities",
        "Transportation"
      ]}
      image="/images/solutions/network-security.jpg"
    />
  );
}
