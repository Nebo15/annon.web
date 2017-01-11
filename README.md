# API Gateway Web

API Gateway Frontend project.

## Technologies

- React
- Redux
- Webpack
- Enzyme
- Karma
- Nightwatch

## Development

### Run web

```
npm run dev ## run app localy
```

### Run API:

```
docker-compose up
```

At the first time, API will not start because a Postgres need time to create database and etc. The official Postgres docker container is sending start signal before the full end of starting the process.

So, after failure of first time up process, exec `docker-compose up` one more time. 

After `docker-compose down` you need to repeat `docker-compose up` twice too.

## Workflow

### Git flow

Every task should start a new branch. Branch should be named as task number what its corresponding.
After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

- Unit tests for business logic (we use Mocha)
- Integration tests for UI components (we use Enzyme)
- Acceptance tests for user stories (we use Nightwatch)

### PR

Every task finishes with PR. Eslint, Stylelint, and tests are blocking PRs. To simplify PR review, we deploy every PR's branch automatically on Heroku.
