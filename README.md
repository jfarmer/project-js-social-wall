# Social Wall

This is a small web application built for beginners that highlights essential web programming topics such as:

- The HTTP request response life cycle
- Node's [Express][url-expressjs] web application framework
- Fundamental patterns in computer programming (loops, branching, variables)
- Data persistence using a SQL database
- HTML templating using [Handlebars][url-handlebarsjs]
- Deploying an application using Heroku

## Contents <!-- omit in toc -->

- [Getting Started](#Getting-Started)
- [Installing PostgreSQL](#Installing-PostgreSQL)
  - [Mac](#Mac)
  - [Windows](#Windows)
- [Interacting With The Database](#Interacting-With-The-Database)
- [Iterations](#Iterations)
- [Deploying To Heroku](#Deploying-To-Heroku)

## Getting Started

**Note**: This project requires you to install PostgreSQL. See [Installing PostgreSQL](#Installing-PostgreSQL) for instructions.

1. Fork this repository
1. Clone your fork
1. Run `npm install` inside the project directory
1. Get started on the [Iterations](#Iterations)

`npm run db:create` will create local databases for development and testing.

## Installing PostgreSQL

### Mac

You can install PostgreSQL on a Mac with `brew`:

```console
brew install postgresql
```

Once installed, start the database server with

```console
brew services start postgresql
```

### Windows

You can install PostgreSQL on Windows using [Chocolatey's][url-chocolatey] `choco` command:

```console
choco install postgresql
```

See the [Chocolatey PostgreSQL package page][url-chocolatey-postgresql] for more details.

Once installed, you have to add PostgreSQL's `bin` directory to your PATH environment variable. Search for *Edit system environment variable* to open *System Properties*. From there, click the *Environment Variables* button.

Under *User variables*, click the row labeled *Path* and then click the *Edit...* button. Click *New* and add the following directory to the PATH environment variable:

```text
C:\Program Files\PostgreSQL\12\bin
```

## Interacting With The Database

We are using two libraries two interact with the database:

1. [Knex.js][url-knexjs], which is used to generate SQL queries and interact with PostgreSQL
1. [Objection.js][url-objectionjs], which allows us to interact with the database using JavaScript objects (rather than writing SQL queries). Under the hood, it uses Knex to talk to the database.

## Iterations

### [v0.1] Start The Core App <!-- omit in toc -->

To create the local development database, run the following command inside the project directory:

```console
npm run db:create
```

If this fails it means your PostgreSQL installation is broken. Find an instructor and get help! If PostgreSQL isn't set up correctly, nothing will work.

Next, run the following command to create the initial tables:

```console
npx knex migrate:latest
```

Finally, run the following to start the server:

```console
npm start
```

Visit <http://localhost:3000> to see the app!

### [v0.2] Deploy App To Heroku <!-- omit in toc -->

See [Deploying To Heroku](#Deploying-To-Heroku) below for instructions on how to make the application available to the public. You can skip this step for now, if you want.

### [v1.0] Posting Messages <!-- omit in toc -->

- :heavy_check_mark: A guest may create a message
- :heavy_check_mark: A guest may see a list of all messages

### [v1.1] Liking Messages <!-- omit in toc -->

- [ ] A guest may 'like' a message
- [ ] A guest may see the number of likes on a message

### [v1.2] Message Mood <!-- omit in toc -->

- [ ] A guest may assign a 'mood' to a message, i.e., 'happy', 'sad', 'fun'
- [ ] A guest may see the mood assigned to a message

### [v1.3] Design improvements <!-- omit in toc -->

- [ ] Use some html and css to make this site look a little better
- [ ] Think of 1-2 UX improvements and make them

### [v2.0] User Authentication <!-- omit in toc -->

- [ ] Users can log in
- [ ] A message becomes associated ('owned') when it is created by a logged in User

### [v2.1] Deleting And Updating Messages <!-- omit in toc -->

- [ ] An author may destroy a message they own
- [ ] An author may update a message they own
- [ ] Every author has a page displaying their messages

## Deploying To Heroku

[Heroku][url-heroku] is a service that allows us to host our application and make it available to the whole world. Every time we have a new version of our application, we push it to Heroku (a process called *deploying*).

One nice feature of Heroku is that we use `git` to publish new versions of your application.

Before anything else, do the following:

1. Create an account on [Heroku][url-heroku]
1. [Download and install the Heroku command line tool][url-heroku-install-cli]
1. Once the `heroku` command is available, log into your Heroku account with the following command:

   ```console
   heroku login
   ```

1. Inside the project directory, run the following command to create a new Heroku application (replace `some-example-app` with a *unique* name for your application):

    ```console
    heroku create some-example-app
    ```

1. Add PostgreSQL to your Heroku instance with the following command:

    ```console
    heroku addons:create heroku-postgresql:hobby-dev
    ```

You're now ready to deploy to Heroku using `git`:

```console
git push heroku master
```

Once `git push` has finished, run the following command to ensure the database is up to date:

```console
heroku run npx knex migrate:latest
```

Finally, run

```console
heroku domains
```

to see the domain for your application. Open it up in your browser of choice!

[url-expressjs]: https://expressjs.com/
[url-handlebarsjs]: https://handlebarsjs.com/
[url-chocolatey]: https://chocolatey.org
[url-chocolatey-postgresql]: https://chocolatey.org/packages/postgresql
[url-knexjs]: http://knexjs.org/
[url-objectionjs]: https://vincit.github.io/objection.js/
[url-heroku]: https://heroku.com
[url-heroku-install-cli]: https://devcenter.heroku.com/articles/heroku-cli#download-and-install
