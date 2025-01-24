# Default
default:
  just --list

# Build Docker Image
build-image:
  docker build -t ranckosolutionsinc/locci-wallet:v1.0 .

# Run Docker Container
run-container:
  docker run -dp 3000:3000 \
  --network proxy-net \
  --restart always \
  --name locci-wallet \
  --env-file ./.env \
  ranckosolutionsinc/locci-wallet:v1.0

# Remove Docker container
rm-container:
  docker rm -f locci-wallet   

# Docker compose
compose:
  docker compose -f compose.yaml up -d

# Docker compose down
compose-down:
  docker compose -f compose.yaml down