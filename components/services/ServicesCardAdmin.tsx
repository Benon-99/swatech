"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { apiClient } from "@/lib/api";

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    link: string;
  };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export default function ServiceCardAdmin({ service }: ServiceCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiClient.delete(`/services/service/${id}`);

      if (response.statusText.toLowerCase() !== "ok") {
        throw new Error("Failed to delete service");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      router.refresh();
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting service:", error);
      alert("Failed to delete service. Please try again.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(service.id);
  };

  return (
    <>
      <motion.div variants={itemVariants} className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3785CC]/5 to-[#5B8AF0]/5 rounded-2xl transform -rotate-2 scale-[1.02] opacity-50 group-hover:-rotate-1 transition-transform duration-300 "></div>

        <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 w-[380px]">
          <h3 className="text-2xl font-bold text-white mb-3">
            {service.title}
          </h3>
          <p className="text-white/70 mb-6">{service.description}</p>

          <div className="flex w-full justify-between">
            <div>
              <Link
                href={service.link}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/services/new?id=${service.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil className="h-5 w-5" />
              </Link>
              <AlertDialog.Root
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <AlertDialog.Trigger asChild>
                  <button
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </AlertDialog.Trigger>

                <AlertDialog.Portal>
                  <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                  <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-md rounded-lg bg-[#1a1f4b] border border-gray-700 p-6">
                    <AlertDialog.Title className="text-xl font-semibold text-white mb-2">
                      Confirm Deletion
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-gray-400 mb-6">
                     {` Are you sure you want to delete "${service.title}"? This
                      action cannot be undone.`}
                    </AlertDialog.Description>

                    <div className="flex justify-end gap-4">
                      <AlertDialog.Cancel asChild>
                        <button
                          className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                          disabled={deleteMutation.isPending}
                        >
                          Cancel
                        </button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <button
                          onClick={handleDelete}
                          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
