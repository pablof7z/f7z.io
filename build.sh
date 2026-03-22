#!/bin/bash
# Ensure .well-known directory is included in Vercel deployment
cp -r .well-known ./
echo "✓ .well-known directory prepared for deployment"
