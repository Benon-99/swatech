import Link from "next/link";
import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const data = await apiClient.post("/api/auth/logout");
      console.log(data);

      if (data.statusText.toLowerCase() == "ok") {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-[#0a0b2e] text-white border-b border-gray-800">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex justify-between items-center px-6 py-3">
          {/* Left section with logo and title */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative h-12 w-32">
                <Image
                  src="/images/logo.png"
                  alt="IC&I Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-wide">
                  IC&I Admin
                </span>
                <span className="text-xs text-gray-400">Management Portal</span>
              </div>
            </Link>
          </div>

          {/* Right section with nav items and profile */}
          <div className="flex items-center gap-8">
            {/* Navigation items */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/admin"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/blogs"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Blogs
              </Link>
              <Link
                href="/admin/messages"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Messages
              </Link>
            </nav>

            {/* Profile and Logout */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  Admin
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
