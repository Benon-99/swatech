"use client";

import SolutionDetail from '@/components/solutions/SolutionDetail';

export default function EndpointProtectionPage() {
  return (
    <SolutionDetail 
      title="Endpoint Protection"
      description="Comprehensive security solutions for all your endpoints, from workstations to mobile devices."
      overview="Our endpoint protection solutions safeguard all devices connecting to your network from cyber threats. We implement advanced security measures to protect workstations, laptops, mobile devices, and IoT devices from malware, ransomware, and unauthorized access. Our multi-layered approach combines next-generation antivirus, behavior monitoring, and threat intelligence to provide robust protection while maintaining device performance."
      features={[
        "Next-generation antivirus and anti-malware protection",
        "Advanced threat detection and prevention",
        "Endpoint detection and response (EDR)",
        "Device control and application whitelisting",
        "Full-disk encryption for data protection",
        "Mobile device management and security",
        "Patch management and vulnerability remediation",
        "Centralized monitoring and management console"
      ]}
      industries={[
        "Healthcare",
        "Financial Services",
        "Education",
        "Legal Services",
        "Government",
        "Manufacturing",
        "Retail",
        "Professional Services"
      ]}
      image="/images/solutions/endpoint-protection.jpg"
    />
  );
}
