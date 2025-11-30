"""Setup configuration for Slay the Spire Deck Builder."""
from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="slay-the-spire-deck-builder",
    version="1.0.0",
    author="Deck Builder Team",
    description="A card game deck management system inspired by Slay the Spire",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/slay-the-spire-deck-builder",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
    install_requires=[
        "colorama>=0.4.6",
    ],
    entry_points={
        "console_scripts": [
            "deck-builder=src.interactive:main",
        ],
    },
)
