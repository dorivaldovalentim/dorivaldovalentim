#!/bin/bash
set -e

echo "Injecting runtime environment variables..."

APP_ENV_FILE="/usr/src/app/.env"

get_runtime_value() {
  local key="$1"
  local value="${!key:-}"

  if [ -z "$value" ] && [ -f "$APP_ENV_FILE" ]; then
    local line
    line="$(grep -m1 "^${key}=" "$APP_ENV_FILE" || true)"
    if [ -n "$line" ]; then
      value="${line#*=}"
      value="${value%\"}"
      value="${value#\"}"
      value="${value%\'}"
      value="${value#\'}"
    fi
  fi

  printf '%s' "$value"
}

replace_placeholder_in_file() {
  local file="$1"
  local key="$2"
  local value="$3"
  local escaped_value

  escaped_value="$(printf '%s' "$value" | sed -e 's/[\/&|]/\\&/g')"
  sed -i "s|\\\${${key}}|${escaped_value}|g" "$file"
}

nuxt_vars=(
  "APP_NAME"
  "SQUIDEX_URL"
  "SQUIDEX_APP_NAME"
  "SQUIDEX_CLIENT_ID"
  "SQUIDEX_CLIENT_SECRET"
)

while IFS= read -r file; do
  for key in "${nuxt_vars[@]}"; do
    value="$(get_runtime_value "$key")"
    if [ -n "$value" ]; then
      replace_placeholder_in_file "$file" "$key" "$value"
    else
      echo "Warning: $key is empty; placeholder in $file was not replaced."
    fi
  done
done < <(find /usr/src/app/.output -type f \( -name "*.mjs" -o -name "*.js" \))

echo "Starting Nuxt..."
exec "$@"