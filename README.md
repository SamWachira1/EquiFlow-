# EquiFlow

Welcome to EquiFlow, your comprehensive solution for managing and tracking your stock investments. EquiFlow is designed with a focus on simplicity and efficiency, enabling you to effortlessly navigate through your portfolio, track your favorite stocks, and make informed investment decisions. Dive into the world of stock trading and portfolio management with ease, using features tailored to enhance your trading experience.

## Live Site

(https://equiflow.onrender.com/)

## [Wiki](https://github.com/SamWachira1/EquiFlow-/wiki)

## Technologies Used

<p align="left" style="display: flex; flex-wrap: wrap; gap: 15px;">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" style="width: 120px;">
  <img src="https://img.shields.io/badge/Python-%233776AB.svg?style=for-the-badge&logo=python&logoColor=white" alt="Python" style="width: 120px;">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" style="width: 120px;">
  <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" style="width: 120px;">
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" style="width: 120px;">
  <img src="https://img.shields.io/badge/Flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" style="width: 120px;">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" style="width: 120px;">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" style="width: 120px;">
  <img src="https://img.shields.io/badge/WebSocket.io-%23000000.svg?style=for-the-badge&logo=socket.io&logoColor=white" alt="WebSocket.io" style="width: 100px;">
  <img src="https://img.shields.io/badge/Git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" alt="GIT" style="width: 120px;">
  <img src="https://img.shields.io/badge/Docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" style="width: 120px;">
</p>

## Getting Started

To see EquiFlow live, click the link above. To run EquiFlow locally on your machine follow these steps:

- Clone the repository:

  - `git clone https://github.com/SamWachira1/EquiFlow-`

- Set up environment and local database:

  - In the root directory (same folder as .flaskenv), create a .env file and copy the following environment variables into it:
    - `SECRET_KEY=secret`
      - (set this to whatever you want)
    - `DATABASE_URL=sqlite:///dev.db`
    - `SCHEMA=hyper_comm_clone`
  - Still in the root directory, enter the following commands:

    - `pipenv install`
    - `pipenv shell`
    - `flask db migrate`
    - `flask db upgrade`
    - `flask seed all`
    - `pipenv run flask run`
      - (the backend database should now be running on port 8080)

  - In a separate terminal, CD into react-app folder and run:

    - `npm install`
    - `npm run dev`
        - (the frontend localhost should be running on port 5173)


  - In your favorite browser, navigate to http://localhost:5173
      - (you can confirm the correct port number in the frontend terminal)
