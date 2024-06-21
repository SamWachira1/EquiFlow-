# FROM python:3.9.18-alpine3.18

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

# ARG FLASK_APP
# ARG FLASK_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY

# WORKDIR /var/www

# COPY requirements.txt .

# RUN pip install -r requirements.txt
# RUN pip install psycopg2

# COPY . .

# RUN flask db upgrade
# RUN flask seed all
# CMD gunicorn app:app



FROM python:3.9.18-alpine3.18

# Install necessary packages
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set environment variables
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SCHEMA=EquiFlow
ENV DATABASE_URL=postgresql://aaprojects_10nl_user:sfKWkmHD9uOvn4H97JwjJRsOfUqJGgmc@dpg-cn6qmttjm4es73bo1c60-a.ohio-postgres.render.com/aaprojects_10nl
ENV SECRET_KEY=chopman

# Set working directory
WORKDIR /var/www

# Copy and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Copy project files
COPY . .

# Run database migrations
RUN flask db upgrade

# Seed the database
RUN flask seed all

# Start the application
CMD ["gunicorn", "app:app"]
