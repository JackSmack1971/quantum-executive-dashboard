#!/usr/bin/env bash
set -e

# Set up Node.js environment for Quantum Executive Dashboard
# Installs Node 18.x and project dependencies

NODE_MAJOR=18

if ! command -v node >/dev/null 2>&1; then
    echo "Node.js not found. Installing Node.js ${NODE_MAJOR}.x..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js already installed: $(node --version)"
fi

npm ci
