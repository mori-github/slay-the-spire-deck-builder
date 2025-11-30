#!/bin/bash
# Run all tests with coverage

echo "Running tests..."
python -m pytest tests/ -v

echo ""
echo "Running tests with coverage..."
python -m pytest tests/ --cov=src --cov-report=html --cov-report=term

echo ""
echo "Coverage report generated in htmlcov/index.html"
