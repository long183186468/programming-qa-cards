module.exports = {
  apps: [{
    name: "qa-cards",
    script: "node_modules/vite/bin/vite.js",
    args: "preview --port 4173 --host 0.0.0.0",
    env: {
      NODE_ENV: "production",
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env_production: {
      NODE_ENV: "production"
    }
  }]
} 