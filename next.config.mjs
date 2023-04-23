await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      'res.cloudinary.com',
      'abs.twimg.com',
      'pbs.twimg.com',
      'avatars.githubusercontent.com',
      'flowbite.s3.amazonaws.com',
      'tailwindui.com',
      'skybuy-bucket.s3.amazonaws.com',
      'skybuy-bucket.s3.us-east-2.amazonaws.com',
      'avatar.vercel.sh',
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
