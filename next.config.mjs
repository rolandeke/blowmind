/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '/**'
        },
    ],
},
    images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

export default nextConfig;
