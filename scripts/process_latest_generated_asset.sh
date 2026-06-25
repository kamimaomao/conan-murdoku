#!/usr/bin/env bash
set -euo pipefail

key="$1"
size="${2:-192}"
generated_dir="${3:-/Users/kamisola/.codex/generated_images/019ef7dd-96a7-7223-8a89-2bef6e5ec906}"

latest="$(
  find "$generated_dir" -type f -name '*.png' -exec stat -f '%m %N' {} + |
    sort -nr |
    sed -n '1s/^[0-9]* //p'
)"

base="tmp/imagegen/${key}"
mkdir -p tmp/imagegen
cp "$latest" "${base}-source.png"

python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/imagegen/scripts/remove_chroma_key.py" \
  --input "${base}-source.png" \
  --out "${base}-alpha.png" \
  --auto-key border \
  --soft-matte \
  --transparent-threshold 12 \
  --opaque-threshold 220 \
  --despill \
  --force >/dev/null

python3 scripts/normalize_png_asset.py \
  --input "${base}-alpha.png" \
  --output "public/conan-assets/obj_${key//-/_}.png" \
  --size "$size" \
  --mode transparent

python3 - "$key" <<'PY'
from pathlib import Path
from PIL import Image
import sys

key = sys.argv[1]
path = Path("public/conan-assets") / f"obj_{key.replace('-', '_')}.png"
print(path.name, Image.open(path).size, path.stat().st_size)
PY
