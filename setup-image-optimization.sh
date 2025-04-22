#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}      Huzur Mostar Image Optimization Setup       ${NC}"
echo -e "${BLUE}==================================================${NC}"
echo

# Check if Sharp is installed
echo -e "${YELLOW}Checking if Sharp is installed...${NC}"
if npm list sharp --depth=0 2>/dev/null | grep -q "sharp"; then
  echo -e "${GREEN}Sharp is already installed!${NC}"
else
  echo -e "${YELLOW}Installing Sharp...${NC}"
  npm install sharp --save-dev
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Sharp installed successfully!${NC}"
  else
    echo -e "${RED}Error installing Sharp. Please run 'npm install sharp --save-dev' manually.${NC}"
    exit 1
  fi
fi

echo

# Create optimized image directories
echo -e "${YELLOW}Setting up optimized image directories...${NC}"
mkdir -p src/assets/img-optimized/{home,products/bouquets,products/dry-flowers,products/magnets,products/potted-plants,about,blog,testimonials}
echo -e "${GREEN}Directories created successfully!${NC}"

echo

# Run optimization script
echo -e "${YELLOW}Running image optimization script...${NC}"
echo -e "${YELLOW}This may take a while depending on the number and size of your images.${NC}"
npm run optimize-images
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Images optimized successfully!${NC}"
else
  echo -e "${RED}Error optimizing images. Please check the error messages above.${NC}"
  exit 1
fi

echo

# Update ImageService to use optimized images
echo -e "${YELLOW}Updating ImageService to use optimized images...${NC}"
sed -i '' 's/this.useOptimizedImages = false;/this.useOptimizedImages = true;/' src/app/services/image.service.ts
echo -e "${GREEN}ImageService updated successfully!${NC}"

echo
echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}      Image Optimization Setup Complete!          ${NC}"
echo -e "${GREEN}==================================================${NC}"
echo
echo -e "You can now build and run your application with optimized images."
echo -e "If you add new images, run 'npm run optimize-images' again."
echo 