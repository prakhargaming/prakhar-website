import argparse
import base64
import os
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml
from dotenv import load_dotenv

_ = load_dotenv("../.env.local")

MONGODB_URI = os.environ.get("MONGODB_URI", "")
DATABASE_NAME = "Prakharbase"
COLLECTION_NAME = "blogs"


def load_post(path: str) -> tuple[dict[str, Any], str]:
    with open(path, "r") as f:
        text = f.read()

    if not text.startswith("---"):
        return {}, text

    close = text.index("---", 3)
    metadata: dict[str, Any] = yaml.safe_load(text[3:close]) or {}
    body = text[close + 3 :].lstrip("\n")
    return metadata, body


def encode_image(source: str) -> str:
    if source.startswith("http://") or source.startswith("https://"):
        # Create a Request object with a browser-like User-Agent
        req = urllib.request.Request(
            source,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            },
        )
        with urllib.request.urlopen(req) as resp:
            raw = resp.read()
            content_type: str = resp.headers.get_content_type()
            ext = content_type.split("/")[-1]
    else:
        with open(source, "rb") as f:
            raw = f.read()
        ext = Path(source).suffix.lstrip(".")
    data = base64.b64encode(raw).decode("utf-8")
    return f"data:image/{ext};base64,{data}"


def parse_date(value: Any) -> datetime:
    if isinstance(value, datetime):
        return value.replace(tzinfo=timezone.utc) if value.tzinfo is None else value
    return datetime.strptime(str(value), "%Y-%m-%d").replace(tzinfo=timezone.utc)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Upload a markdown blog post to MongoDB"
    )
    parser.add_argument("post", help="Path to the .md file")
    parser.add_argument("--image", help="Path to an image file to attach")
    args = parser.parse_args()

    if not MONGODB_URI:
        print("Error: MONGODB_URI environment variable is not set", file=sys.stderr)
        sys.exit(1)

    metadata, content = load_post(args.post)

    required = ["title", "author", "date", "tags"]
    missing = [f for f in required if f not in metadata]
    if missing:
        print(
            f"Error: missing frontmatter fields: {', '.join(missing)}", file=sys.stderr
        )
        sys.exit(1)

    doc: dict[str, Any] = {
        "title": metadata["title"],
        "author": metadata["author"],
        "date": parse_date(metadata["date"]),
        "tags": metadata["tags"],
        "content": content,
    }

    if args.image:
        doc["image"] = encode_image(args.image)

    from pymongo import MongoClient

    client = MongoClient(MONGODB_URI)
    try:
        collection = client[DATABASE_NAME][COLLECTION_NAME]
        result = collection.replace_one({"title": doc["title"]}, doc, upsert=True)
        if result.upserted_id:
            print(f'Inserted new post: "{doc["title"]}"')
        else:
            print(f'Updated existing post: "{doc["title"]}"')
    finally:
        client.close()


if __name__ == "__main__":
    main()
