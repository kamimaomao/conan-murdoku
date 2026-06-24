# Conan Murdoku Assets

All app-facing assets in this project are original Conan-version raster image
assets stored as PNG files in `/public/conan-assets`.

Do not import, copy, or reference files from the original Murdoku asset
directory.
Stable keys must match `portraitKey`, room names, and object names used by case
data.

The tests fail when an asset URL contains the original asset root or a generated
asset path is not a PNG image.
