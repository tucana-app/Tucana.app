If you want to participate in the code, first, thank you for your contribution, then please follow these instructions to set up your environment:

Requirements:

- NodeJS

# 1 - Set up the database

- Download and Install pgAdmin: https://www.pgadmin.org/download/
- Create a database. Please take notes of the following info:
  - Database host URL
  - Database port
  - Database name
  - Database user
  - Database password

_NB: usually, when installing pgAdmin, the database URL is: `localhost`, port is `5432`, user is `postgres`._

- Let pgAdmin run in the background

# 2 - Prepare the Back-End

- Clone the server: https://github.com/tucana-app/Tucana.app-back
- Create a `.env` file at the root of the project with the following info:

```
REACT_APP_URL_CLIENT=
REACT_APP_URL_API=[URL]/api
REACT_APP_GOOGLE_MAPS_API_KEY=

DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_NAME=
DATABASE_PASSWORD=

USER_PASSWORD=
PASS_PHRASE=
```

_Check out an example of a `.env` for the Back-End at the bottom of this explanation._

- Install the dependencies: `npm install && npm install --only=dev`
- Run the Sequelize command to populate the Database
  - `npx sequelize db:migrate && npx sequelize db:seed:all`
- Start the dev server: `npm dev`

# 3 - Run the Front-End

- Clone the Front-End: https://github.com/tucana-app/Tucana.app
- Create a `.env` file at the root of the project with the following info:

```
REACT_APP_URL_CLIENT=
REACT_APP_URL_API=
REACT_APP_GOOGLE_MAPS_API_KEY=
REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY=
REACT_APP_GOOGLE_RECAPTCHA_SECRET_KEY=
```

_Check out an example of a `.env` for the Front-End at the bottom of this explanation._

- Run `npm install && npm install --only=dev`
- Start the dev app: `npm run dev`

# Contribute

You can now use the app with different credentials:

- user: alex
- password: 123456

---

- user: peter
- password: 123456

---

- Etc.

_NB: You can find all the default users in the seeder file named `20210716125238-users.js` in the Back-End in the `./seeders/` folder in the root of the project._

## Further notes:

- We do not provide Google Maps API keys and Google Captcha API keys.
- A PostgreSQL testing database is not available online yet.
- In dev mode, the back-end app is not sending emails. So if you are creating accounts and want to confirm them, find the confirmation link looks like "`http://localhost/confirm/UUID`".

## Example of a Back-End `.env` file:

_These data are not exhaustive, they are shown as an example_

```
REACT_APP_URL_CLIENT=http://localhost:3000
REACT_APP_URL_ADMIN=http://localhost:3001
REACT_APP_URL_API=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=[YOUR_GMAPS_API_KEY]

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_NAME=tucana
DATABASE_PASSWORD=123456

USER_PASSWORD=123456
PASS_PHRASE=ehLLg$#5YtT@V6gQinXX
```

## Example of a Front-End `.env` file:

_These data are not exhaustive, they are shown as an example_

```
REACT_APP_URL_CLIENT=http://localhost:3000
REACT_APP_URL_API=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=[YOUR_GMAPS_API_KEY]
REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY=[PUBLIC_KEY]
REACT_APP_GOOGLE_RECAPTCHA_SECRET_KEY=[SECRET_KEY]
```
