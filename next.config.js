const { i18n } = require('./next-i18next.config');
const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['hashconnect', '@bladelabs/blade-web3.js', '@mui/system', '@mui/material', '@mui/icons-material'],
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      'verdantnft-repo.s3.amazonaws.com',
      'verdantnft-repo.s3.ap-southeast-1.amazonaws.com',
      'hedera-dao.s3.amazonaws.com',
      'hedera-dao.s3.ap-southeast-1.amazonaws.com'
    ]
  },
  modularizeImports: {
    '@mui/material/?(((\\w*)?/?)*)': {
      transform: '@mui/material/{{ matches.[1] }}/{{member}}',
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
};

module.exports = removeImports({});
module.exports = nextConfig;
