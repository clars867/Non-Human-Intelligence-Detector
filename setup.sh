#!/bin/bash

# Install Node dependencies (if a package.json exists)
if [ -f package.json ]; then
    echo "Installing Node.js dependencies..."
    npm install
fi

# Install Python dependencies (if requirements.txt exists)
if [ -f requirements.txt ]; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
else
    echo "No Python requirements.txt found, skipping pip install."
fi
