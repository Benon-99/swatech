"use client";

import SolutionDetail from '@/components/solutions/SolutionDetail';

export default function CloudInfrastructurePage() {
  return (
    <SolutionDetail 
      title="Cloud Infrastructure"
      description="Scalable, resilient cloud solutions designed to transform your business and accelerate digital innovation."
      overview="Our cloud infrastructure solutions enable organizations to leverage the power and flexibility of cloud computing while maintaining security and control. We design, implement, and manage cloud environments that align with your business objectives, whether you're looking to migrate existing workloads, develop cloud-native applications, or establish a hybrid cloud strategy. Our approach focuses on optimizing performance, enhancing reliability, and controlling costs."
      features={[
        "Cloud migration strategy and execution",
        "Hybrid and multi-cloud architecture design",
        "Cloud-native application development",
        "Infrastructure as Code (IaC) implementation",
        "Continuous Integration/Continuous Deployment (CI/CD) pipelines",
        "Cloud security and compliance",
        "Cost optimization and management",
        "Disaster recovery and business continuity"
      ]}
      industries={[
        "Technology",
        "E-commerce",
        "Financial Services",
        "Media & Entertainment",
        "Healthcare",
        "Manufacturing",
        "Retail",
        "Professional Services"
      ]}
      image="/images/solutions/cloud-infrastructure.jpg"
    />
  );
}
