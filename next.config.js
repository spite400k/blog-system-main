/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// Next.jsとRecoilを組み合わせた時の Duplicate atom key を表示させなくする
// https://tech-broccoli.life/articles/engineer/hide-duplicate-key-message-next-recoil/
const withInterceptStdout = require('next-intercept-stdout')

module.exports = withInterceptStdout(
  {
    env: {
      HOGE: process.env.HOGE,
    },
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text)
)




module.exports = nextConfig
