
# Capital city quiz



## Install & Run

Install and run frontend:

```bash
  cd frontend
  npm Install
  npm start
```

For backend run:

```bash
    cd backend
    npm install -g serverless
    npm install
    serverless offline
```

Now you should be able to navigate to *http://localhost:3000* and see the project.
    
## Considerations

- Needs **caching**: calling answer endpoint calls country api each time
    - Implement `serverless-dynamo-local` plugin to store API call result
- Start page not pretty needs styling update
- Add ID token to calls: after first call create session attributed to ID
- All calls going through BE as storing data in FE makes it far easier to cheat
- Retry functionality to re-call API if it fails
- Unit tests

- External Libraries: react-bootstrap, react-router-dom, prop-types


