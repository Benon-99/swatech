"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  ClipboardList,
  ArrowRight,
  Shield,
  RefreshCcwDot,
} from "lucide-react";
import Link from "next/link";
import ServiceHero from "@/components/services/ServiceHero";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LoadableContext } from "next/dist/shared/lib/loadable-context.shared-runtime";
import { useContext, useEffect } from "react";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import { apiClient } from "@/lib/api";

const fetchingServices = async () => {
  const response = await apiClient.get("/admin/services/");
  console.log("API Response:", response.data.response); // Check structure
  return response.data.response; // This should be an array
};

const icons = [<RefreshCcwDot key={123456789} />, <Shield key={987654321} />];

export default function BusinessOutsourcingPage() {
  const { setIsLoading } = useContext(LoadingContext)!;
  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchingServices,
  });

  useEffect(() => {
    setIsLoading(isFetching || isLoading);
  }, [isFetching, isLoading]);

  // const services = [
  //   {
  //     icon: UserPlus,
  //     title: "Jobs.ici – Recruiting",
  //     description:
  //       "Empowering professionals in Syria to discover their ideal career opportunities. Explore a broad selection of job listings, upload your resume, and receive tailored job alerts.",
  //     link: "/services/business-outsourcing/jobs-ici",
  //     gradient: "from-[#3785CC] to-[#4A9BE4]",
  //   },
  //   {
  //     icon: Users,
  //     title: "HR & Recruitment Management",
  //     description:
  //       "Strategic talent acquisition and assessment, ensuring candidates are matched to positions that drive business success.",
  //     link: "/services/business-outsourcing/hr-recruitment",
  //     gradient: "from-[#4A9BE4] to-[#8590EA]",
  //   },
  //   {
  //     icon: ClipboardList,
  //     title: "HR Payroll & Performance Management",
  //     description:
  //       "Overseeing the payroll system for all personnel, ensuring thorough review of supporting documents and accurate calculations.",
  //     link: "/services/business-outsourcing/hr-payroll",
  //     gradient: "from-[#8590EA] to-[#B5C6F4]",
  //   },
  // ];

  interface servicesTypes {
    id: number;
    title: string;
    description: string;
    servicelink: string;
    overviewtitle: string;
    overviewcontent: string;
    categoryId: number;
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <ServiceHero
        title="Business Outsourcing"
        description="IC&I HR outsourcing services is one of our core strengths. Our scalable services are
        crafted to deliver optimal efficiency and support your business's evolving needs."
      />

      <div className="w-full lg:w-[1280px]  mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-24 flex flex-col items-center text-justify"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-6 inline-block"
          >
            Overview
          </motion.span>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] bg-clip-text text-transparent mb-8">
            Market Leading HR Solutions
          </h2>

          <p className="text-lg text-[#111240]/70 leading-relaxed text-justify">
            {` We are the Syrian market leader with the largest market share in
            providing full recruitment services in UN agencies, NPO's and NGO's.
            Our comprehensive HR outsourcing solutions are designed to
            streamline your operations and drive organizational success through
            effective talent management.`}
          </p>
        </motion.div>

        <div className="w-full h-[1px] bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] my-8 opacity-50" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="text-center mb-16">
            <motion.span
              variants={itemVariants}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-4 inline-block"
            >
              What We Offer
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#4A9BE4] to-[#8590EA] bg-clip-text text-transparent"
            >
              Business Outsourcing Solutions
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
            >
              Explore our range of specialized HR and recruitment solutions
              designed to optimize your workforce management and drive business
              growth.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {data &&
              data.map((service: servicesTypes, index: number) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transform rotate-1 scale-[1.02] opacity-50 group-hover:rotate-2 transition-transform duration-300"></div>
                  <div className="relative p-8 rounded-2xl bg-white backdrop-blur-sm border border-gray-100 hover:bg-gray-50 transition-all duration-300 shadow-sm">
                    {icons && (
                      <div className="pb-[20px] bg-gradient-to-r from-[#92c1ed] to-[#2284da] transform group-hover:scale-110 transition-transform duration-300 mb-6 w-16 h-16 flex items-center justify-center p-4 rounded-xl">
                        {icons[index]}{" "}
                      </div>
                    )}

                    <h3 className="text-xl font-semibold text-[#111240] mb-4">
                      {service.title}
                    </h3>
                    <p className="text-[#111240]/60 mb-6">
                      {service.description}
                    </p>
                    {/* <Link
                    href={service.link}
                    className="inline-flex items-center text-[#111240]/80 hover:text-[#111240] group/link"
                  >
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link> */}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
