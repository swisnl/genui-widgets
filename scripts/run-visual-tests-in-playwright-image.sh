#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
image="${PLAYWRIGHT_DOCKER_IMAGE:-mcr.microsoft.com/playwright:v1.58.2-noble}"
command="${1:-}"
node_modules_dir="${TMPDIR:-/tmp}/genui-widgets-playwright-node_modules"
npm_cache_dir="${TMPDIR:-/tmp}/genui-widgets-playwright-npm-cache"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required to run the visual tests in the Playwright image." >&2
  exit 1
fi

if [[ "$command" == "--update" ]]; then
  npm_script="test:visual:update"
elif [[ -z "$command" ]]; then
  npm_script="test:visual"
else
  echo "Unsupported argument: $command" >&2
  echo "Usage: $0 [--update]" >&2
  exit 1
fi

mkdir -p "$node_modules_dir" "$npm_cache_dir"

docker run --rm --init \
  --user "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -e npm_config_cache=/tmp/.npm \
  -e VISUAL_SNAPSHOT_ENV=linux \
  -v "${repo_root}:/work" \
  -v "${node_modules_dir}:/work/node_modules" \
  -v "${npm_cache_dir}:/tmp/.npm" \
  -w /work \
  "$image" \
  bash -lc "npm ci && npm run ${npm_script}"
