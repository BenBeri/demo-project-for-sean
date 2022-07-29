# Demo project for login & register using Nestjs with Typeorm and Mysql

What it does:

- Registers a new account
- - Checks that the account is available and not in use
- - Creates auth token and sets cookie
    
- Logins user
- Guarded controller example that makes sure that the user is logged in (by validating the cookie token) before the whole endpoint is accessible

### Requirements
- NodeJS version >= 12.20.0 (Check `node -v` to see your version, use `nvm install 12.20.0 && nvm use 12.20.0` to install and use, make sure to install nvm in that case)


## Installation

1. Run `npm install`
2. Make sure `.env` file exists with the following data:

````
JWT_SECRET=84fWTZjmhtnU7oXBVeUU

JWT_TOKEN_HEADER_NAME=auth-session   
````

3. Set your database credentials at `src/app.module.ts`:

````
    TypeOrmModule.forRoot({ // credentials hardcoded as mock
      type: 'mysql',
      host: 'localhost', // change me if not localhost
      port: 3306, // change me
      username:'sean', // change me
      password: '5528469', // change me
      database: 'academy', // change me
      entities: [UserEntity],
      synchronize: true,
    }),
````

4. Run `npm run start:dev` to start the project
5. Check out `postman-collection.json` file and import it to postman to use the endpoints
