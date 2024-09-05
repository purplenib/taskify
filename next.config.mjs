/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/taskify/**',
      },
    ],
  },
  webpack: config => {
    // 추가 Webpack 설정
    config.module.rules.push({
      test: /\.m?js$/, // .js 또는 .mjs 파일에 대한 설정
      resolve: {
        fullySpecified: false, // Node.js와 호환되지 않는 패키지의 문제를 해결
      },
    });

    return config;
  },
};

export default nextConfig;
