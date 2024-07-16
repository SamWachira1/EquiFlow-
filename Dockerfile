FROM python:3.9.18-alpine3.18

# Install build dependencies
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set environment variables
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG REDIS_USER
ARG REDIS_PASSWORD
ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_USE_TLS

ENV FLASK_APP=$FLASK_APP
ENV FLASK_ENV=$FLASK_ENV
ENV DATABASE_URL=$DATABASE_URL
ENV SCHEMA=$SCHEMA
ENV SECRET_KEY=$SECRET_KEY
ENV REDIS_USER=$REDIS_USER
ENV REDIS_PASSWORD=$REDIS_PASSWORD
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PORT=$REDIS_PORT
ENV REDIS_USE_TLS=$REDIS_USE_TLS

# Construct the Redis URL based on the environment variables
ENV REDIS_URL=${REDIS_USE_TLS:+rediss}://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}


WORKDIR /var/www

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt && pip install psycopg2

# Copy the rest of the application code
COPY . .

# Run database migrations and seed data
RUN flask db upgrade
RUN flask seed all

# Start the application with Gunicorn
CMD gunicorn app:app
