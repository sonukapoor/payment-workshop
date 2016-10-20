# Payment-Workshop-Demo

This is a demo application that connects to the cybersource SOAP API to do authorizations and captures. 

## Angular-CLI

The front end is generated using the angular-CLI. 

## Backend-Node

For the backend I have used node.js. The node server will run on port 8000. 

## Cybersource 

The CyberSource merchant id and transaction key are stored in the CyberSourceGateway.ts. 

## To get started

Start the server:

```bash
cd cybersource/code/server/build/server/app
node server.js
```

Start the client:

```bash
cd cybersource/code/client
ng serve
```

Browse to http://localhost:4200/