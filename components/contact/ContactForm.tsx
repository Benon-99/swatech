import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, Shield, AlertCircle } from "lucide-react";
import { apiClient } from "@/lib/api";
import ReCAPTCHA from "react-google-recaptcha";

// Define form data type
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  // reCAPTCHA site key - replace with your actual site key in production
  const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // This is Google's test key

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    subject: Yup.string()
      .min(5, "Subject must be at least 5 characters")
      .required("Subject is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  // reCAPTCHA change handler
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setCaptchaError(null);
  };

  // Form submission handler with reCAPTCHA verification
  const onSubmit = async (formData: FormData) => {
    // Verify reCAPTCHA first
    if (!recaptchaToken) {
      setCaptchaError("Please verify that you are not a robot.");
      return;
    }
    
    // Clear any previous error
    setCaptchaError(null);
    setIsSending(true);
    
    try {
      // In a production environment, you should verify the reCAPTCHA token on your backend
      const response = await apiClient.post("/api/email/send-email", {
        ...formData,
        recaptchaToken // Include token for server-side verification
      });

      if (response.status === 200) {
        setShowSuccess(true);
        reset();
        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        throw new Error(response.data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full bg-[#0a0d16] rounded-lg p-6 relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-12 left-0 right-0 bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-400 rounded-lg p-3 flex items-center gap-2 z-10"
          >
            <CheckCircle2 size={18} className="text-green-400" />
            <span className="text-sm">Message sent successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-700">
        <div className="flex items-center gap-2 text-cyan-400 text-sm">
          <Lock size={14} className="text-cyan-400" />
          <span className="font-mono">secure_transmission_enabled</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name field */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="name" className="text-white font-medium">
              Full Name
            </label>
            <span className="text-cyan-400 text-sm font-mono">required</span>
          </div>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            className={`w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none ${
              errors.name ? "border-2 border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email field */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="email" className="text-white font-medium">
              Email Address
            </label>
            <span className="text-cyan-400 text-sm font-mono">required</span>
          </div>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none ${
              errors.email ? "border-2 border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Subject field */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="subject" className="text-white font-medium">
              Subject
            </label>
            <span className="text-cyan-400 text-sm font-mono">required</span>
          </div>
          <input
            id="subject"
            type="text"
            placeholder="What is this regarding?"
            {...register("subject")}
            className={`w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none ${
              errors.subject ? "border-2 border-red-500" : ""
            }`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message field */}
        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="message" className="text-white font-medium">
              Message
            </label>
            <span className="text-cyan-400 text-sm font-mono">required</span>
          </div>
          <textarea
            id="message"
            placeholder="How can we assist with your security needs?"
            rows={5}
            {...register("message")}
            className={`w-full bg-white text-gray-800 p-3 rounded-md focus:outline-none resize-none ${
              errors.message ? "border-2 border-red-500" : ""
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* reCAPTCHA field */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-white font-medium">
              Security Verification
            </label>
            <span className="text-cyan-400 text-sm font-mono">required</span>
          </div>
          
          <div className="bg-[#141824] border border-gray-700 rounded-md p-4">
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
                theme="dark"
                className="mx-auto transform scale-90 sm:scale-100"
              />
            </div>
            
            {captchaError && (
              <p className="text-red-500 text-sm mt-4 flex items-center gap-1 justify-center">
                <AlertCircle size={14} className="flex-shrink-0" />
                {captchaError}
              </p>
            )}
            
            <p className="text-gray-400 text-xs mt-4 flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </span>
              <span>
                This security verification helps us ensure you are not a bot. Your data is processed securely.
              </span>
            </p>
          </div>
        </div>

        {/* Security notice */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Shield size={14} className="text-cyan-400" />
          <span>All communications are encrypted and secure</span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSending || !recaptchaToken}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-md font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
        >
          {isSending ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Secure Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
