# CarMeet
CarMeet - A web app (viewable on PC and mobile) for car enthusiasts to find other car enthusiasts on a social platform mimicking dating apps (e.g. Tinder, Bumble).

## Set Up Development Environment
### Step 1: Use Node.js
We recommend using NVM to install Node: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
We will be using the most recent Node and NPM to date:
- Node: v18.11.0
- NPM: v8.19.2

### Step 2: Install dependencies
In the directory, run the command:
```sh
npm i
```
Package Dependencies:
- React
- React-Bootstrap
- Bootstrap
- Socket.io
- React-Icons
- TensorFlow JS

### Step 3: Start local server
In the 'Database_api/API.js' file: edit the "IP" variable to your current public IP address.

Next, start the server by running the command:
```sh
node src/backend/server.js
```
This should display "Running" then "Connected". If it does not, you are likely missing dependencies (which you may have to install via npm).

If the server port is already take, consider replacing the locations of the port number in the 'Database_api/API.js' file.


### Step 4: Test port
Run the command:
```sh
npm start
```
If it succeeds, it will display a prompt asking to direct to something like: (http://localhost:3000).
The port number may be different depending on your setup.

If it does not succeed, return to Step 2.