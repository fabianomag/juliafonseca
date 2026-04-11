/** @type {import('next').NextConfig} */
const nextConfig = {
  // 301 Redirects — Webador migration
  // Maps old Webador URLs to new Next.js routes to preserve SEO juice
  async redirects() {
    return [
      // Webador used hash-based or flat navigation — redirect known patterns
      { source: "/residencial.html", destination: "/residencial", permanent: true },
      { source: "/comercial.html", destination: "/comercial", permanent: true },
      { source: "/interiores.html", destination: "/interiores", permanent: true },
      { source: "/escritorio.html", destination: "/sobre", permanent: true },
      { source: "/escritorio", destination: "/sobre", permanent: true },
      { source: "/produtos.html", destination: "/", permanent: true },
      { source: "/produtos", destination: "/", permanent: true },
      { source: "/contato.html", destination: "/contato", permanent: true },
      // Common Webador patterns with trailing slash or index
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
