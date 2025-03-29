"use client";

import SolutionDetail from '@/components/solutions/SolutionDetail';

export default function DisasterRecoveryPage() {
  return (
    <SolutionDetail 
      title="Disaster Recovery"
      description="Robust backup and recovery solutions to ensure business continuity in case of data loss or system failure."
      overview="Our disaster recovery solutions are designed to protect your organization from data loss and minimize downtime during unexpected disruptions. We implement comprehensive backup systems, failover mechanisms, and recovery procedures that ensure your critical systems and data can be quickly restored after any incident. Our approach emphasizes both preventative measures and rapid response capabilities to maintain business continuity."
      features={[
        "Comprehensive disaster recovery planning and implementation",
        "Automated backup solutions with secure offsite storage",
        "High-availability system architecture design",
        "Regular backup testing and validation",
        "Rapid recovery time objectives (RTOs) and recovery point objectives (RPOs)",
        "Cloud-based disaster recovery solutions",
        "Business continuity strategy development",
        "Post-incident analysis and process improvement"
      ]}
      industries={[
        "Financial Services",
        "Healthcare",
        "Manufacturing",
        "Retail",
        "Legal Services",
        "Insurance",
        "Government",
        "Utilities"
      ]}
      image="/images/solutions/disaster-recovery.jpg"
    />
  );
}
