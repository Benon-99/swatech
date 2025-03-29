"use client";

import SolutionDetail from '@/components/solutions/SolutionDetail';

export default function EnterpriseSoftwarePage() {
  return (
    <SolutionDetail 
      title="Enterprise Software Solutions"
      description="Custom software development and implementation to streamline operations and drive business growth."
      overview="Our enterprise software solutions are tailored to address your organization's unique challenges and opportunities. We design, develop, and implement custom applications that automate processes, improve efficiency, and provide valuable business insights. Our development approach combines deep technical expertise with industry knowledge to deliver scalable, secure, and user-friendly software that drives tangible business results."
      features={[
        "Custom application development for specific business needs",
        "Enterprise resource planning (ERP) implementation",
        "Customer relationship management (CRM) solutions",
        "Business intelligence and data analytics platforms",
        "Workflow automation and process optimization",
        "Legacy system modernization and integration",
        "API development and system integration",
        "Mobile enterprise applications"
      ]}
      industries={[
        "Manufacturing",
        "Financial Services",
        "Healthcare",
        "Retail and E-commerce",
        "Logistics and Transportation",
        "Professional Services",
        "Education",
        "Energy and Utilities"
      ]}
      image="/images/solutions/enterprise-software.jpg"
    />
  );
}
