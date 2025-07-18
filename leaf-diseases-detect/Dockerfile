# Use official Python base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app
COPY . .          # copy current directory into /app
CMD ["python", "main.py"]
# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy all code
COPY . .

# Expose port (default Flask)
EXPOSE 5000

# Start the Flask app
CMD ["python", "flask_api.py"]
