from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


def fit_with_padding(image: Image.Image, size: int, mode: str) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    if mode == "transparent":
        image = image.convert("RGBA")
        background = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    else:
        image = image.convert("RGB")
        background = Image.new("RGB", (size, size), (245, 242, 232))

    image.thumbnail((size, size), Image.Resampling.LANCZOS)
    left = (size - image.width) // 2
    top = (size - image.height) // 2
    background.paste(image, (left, top), image if image.mode == "RGBA" else None)
    return background


def save_png(image: Image.Image, output: Path, colors: int | None) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    if colors and image.mode == "RGB":
        image = image.quantize(colors=colors, method=Image.Quantize.MEDIANCUT)
    image.save(output, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--size", required=True, type=int)
    parser.add_argument("--mode", choices=["transparent", "opaque"], required=True)
    parser.add_argument("--colors", type=int)
    args = parser.parse_args()

    image = Image.open(args.input)
    normalized = fit_with_padding(image, args.size, args.mode)
    save_png(normalized, args.output, args.colors)


if __name__ == "__main__":
    main()
