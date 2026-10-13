#!/bin/sh
set -eu

# Docker keeps quotes from some env-file formats. Normalize only Nuxt runtime
# variables before the server reads them, without writing secrets to the image.
for key in \
  NUXT_SQUIDEX_CLIENT_ID \
  NUXT_SQUIDEX_CLIENT_SECRET \
  NUXT_PUBLIC_SQUIDEX_URL \
  NUXT_PUBLIC_SQUIDEX_APP \
  NUXT_PUBLIC_GTAG_ID
do
  value="$(printenv "$key" 2>/dev/null || true)"

  case "$value" in
    \"*\") value="${value#\"}"; value="${value%\"}" ;;
    \'*\') value="${value#\'}"; value="${value%\'}" ;;
  esac

  export "$key=$value"
done

exec "$@"
