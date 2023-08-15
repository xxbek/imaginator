FROM node:19.5.0-alpine as base

WORKDIR /app/

# Add package file
COPY package.json ./
COPY package-lock.json ./

# Install deps
RUN npm install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN nom run build

# Start production image build
FROM node:19.5.0-alpine

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

CMD ["npm", "start"]
