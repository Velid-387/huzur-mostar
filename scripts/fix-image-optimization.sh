#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}      Huzur Mostar Image Optimization Fix         ${NC}"
echo -e "${BLUE}==================================================${NC}"
echo

# Fix image directory structure
echo -e "${YELLOW}Fixing image directory structure...${NC}"
npm run fix-image-structure
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Image directory structure fixed successfully!${NC}"
else
  echo -e "${RED}Error fixing image directory structure. Please check the error messages above.${NC}"
  exit 1
fi

echo

# Update ImageService to use optimized images
echo -e "${YELLOW}Ensuring ImageService is set to use optimized images...${NC}"
sed -i '' -e '/this.useOptimizedImages = false;/c\
    this.useOptimizedImages = true;' src/app/services/image.service.ts
echo -e "${GREEN}ImageService updated successfully!${NC}"

echo

# Rebuild the application
echo -e "${YELLOW}Rebuilding the application...${NC}"
npm run build
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Application rebuilt successfully!${NC}"
else
  echo -e "${RED}Error rebuilding application. Please check the error messages above.${NC}"
  exit 1
fi

echo
echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}      Image Optimization Fix Complete!           ${NC}"
echo -e "${GREEN}==================================================${NC}"
echo
echo -e "You can now deploy your application with optimized images."
echo 