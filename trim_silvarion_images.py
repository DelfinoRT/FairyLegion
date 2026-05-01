from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable, Optional, Tuple

from PIL import Image, ImageSequence

IMAGE_EXTENSIONS = {".png", ".gif", ".jpg", ".jpeg", ".webp"}


def detect_foreground_bbox(
    rgba_image: Image.Image,
    white_threshold: int,
    alpha_threshold: int,
) -> Optional[Tuple[int, int, int, int]]:
    """Return the tight bbox around non-white/non-transparent pixels."""
    raw = rgba_image.tobytes()

    mask_data = []
    for index in range(0, len(raw), 4):
        r = raw[index]
        g = raw[index + 1]
        b = raw[index + 2]
        a = raw[index + 3]
        is_foreground = a > alpha_threshold and not (
            r >= white_threshold and g >= white_threshold and b >= white_threshold
        )
        mask_data.append(255 if is_foreground else 0)

    mask = Image.new("L", rgba_image.size)
    mask.putdata(mask_data)
    bbox = mask.getbbox()
    if bbox:
        return bbox

    alpha_only = rgba_image.split()[-1].point(
        lambda value: 255 if value > alpha_threshold else 0
    )
    return alpha_only.getbbox()


def expand_bbox(
    bbox: Tuple[int, int, int, int],
    width: int,
    height: int,
    margin: int,
) -> Tuple[int, int, int, int]:
    left, top, right, bottom = bbox
    return (
        max(0, left - margin),
        max(0, top - margin),
        min(width, right + margin),
        min(height, bottom + margin),
    )


def bboxes_union(bboxes: Iterable[Tuple[int, int, int, int]]) -> Tuple[int, int, int, int]:
    boxes = list(bboxes)
    left = min(box[0] for box in boxes)
    top = min(box[1] for box in boxes)
    right = max(box[2] for box in boxes)
    bottom = max(box[3] for box in boxes)
    return left, top, right, bottom


def process_static_image(
    image_path: Path,
    margin: int,
    white_threshold: int,
    alpha_threshold: int,
) -> bool:
    with Image.open(image_path) as image:
        rgba = image.convert("RGBA")
        bbox = detect_foreground_bbox(rgba, white_threshold, alpha_threshold)
        if not bbox:
            return False

        crop_box = expand_bbox(bbox, rgba.width, rgba.height, margin)
        if crop_box == (0, 0, rgba.width, rgba.height):
            return False

        cropped = image.crop(crop_box)
        cropped.save(image_path)
        return True


def process_gif(
    image_path: Path,
    margin: int,
    white_threshold: int,
    alpha_threshold: int,
) -> bool:
    with Image.open(image_path) as image:
        frames_rgba = [frame.convert("RGBA") for frame in ImageSequence.Iterator(image)]
        if not frames_rgba:
            return False

        frame_bboxes = []
        for frame in frames_rgba:
            bbox = detect_foreground_bbox(frame, white_threshold, alpha_threshold)
            if bbox:
                frame_bboxes.append(bbox)

        if not frame_bboxes:
            return False

        merged_bbox = bboxes_union(frame_bboxes)
        crop_box = expand_bbox(merged_bbox, image.width, image.height, margin)

        if crop_box == (0, 0, image.width, image.height):
            return False

        durations = [frame.info.get("duration", image.info.get("duration", 100)) for frame in ImageSequence.Iterator(image)]
        cropped_frames = [frame.crop(crop_box) for frame in frames_rgba]

        first, *rest = cropped_frames
        save_kwargs = {
            "save_all": True,
            "append_images": rest,
            "loop": image.info.get("loop", 0),
            "duration": durations,
            "optimize": False,
            "disposal": 2,
        }

        first.save(image_path, **save_kwargs)
        return True


def process_image(
    image_path: Path,
    margin: int,
    white_threshold: int,
    alpha_threshold: int,
) -> bool:
    if image_path.suffix.lower() == ".gif":
        return process_gif(image_path, margin, white_threshold, alpha_threshold)
    return process_static_image(image_path, margin, white_threshold, alpha_threshold)


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Trim excessive outer whitespace from image sprites while keeping a small border margin."
        )
    )
    parser.add_argument(
        "folder",
        nargs="?",
        default="ColeccionSilvarion",
        help="Folder containing images to process (default: ColeccionSilvarion)",
    )
    parser.add_argument(
        "--margin",
        type=int,
        default=2,
        help="Keep this many pixels of border around detected sprite (default: 2)",
    )
    parser.add_argument(
        "--white-threshold",
        type=int,
        default=248,
        help="Pixels >= threshold in RGB count as white background (default: 248)",
    )
    parser.add_argument(
        "--alpha-threshold",
        type=int,
        default=10,
        help="Pixels with alpha <= threshold are treated as transparent background (default: 10)",
    )
    args = parser.parse_args()

    folder = Path(args.folder)
    if not folder.exists() or not folder.is_dir():
        raise SystemExit(f"Folder not found: {folder}")

    image_paths = sorted(
        path
        for path in folder.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )

    changed = []
    unchanged = 0
    failed = []

    for image_path in image_paths:
        try:
            did_change = process_image(
                image_path,
                margin=args.margin,
                white_threshold=args.white_threshold,
                alpha_threshold=args.alpha_threshold,
            )
            if did_change:
                changed.append(image_path)
            else:
                unchanged += 1
        except Exception as exc:  # pragma: no cover - best effort processing
            failed.append((image_path, str(exc)))

    print(f"Scanned: {len(image_paths)} image files")
    print(f"Updated: {len(changed)}")
    print(f"Unchanged: {unchanged}")
    print(f"Failed: {len(failed)}")

    if changed:
        print("\nUpdated files:")
        for path in changed:
            print(f"- {path.as_posix()}")

    if failed:
        print("\nFailed files:")
        for path, error in failed:
            print(f"- {path.as_posix()}: {error}")


if __name__ == "__main__":
    main()
