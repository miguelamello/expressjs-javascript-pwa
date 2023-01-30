## CURRENCY CONVERSION CALCULATOR MICROSERVICE

This microservice allows an easily conversion between country currencies. Currency rates are updated frequently and applied to the conservion calculation. All the information relevant to 
this microservice is provided in this documentation. 

## Objective

The main objective of this microservice is to offer a fast and effective way of converting between two currencies. The application is developed to be fast in performing the task. Following the microservice guidelines, the application is focused on executing a limited number of actions, and executing these actions in the most efficient way possible.

## Features

The application is developed in Node.js with Typescript, which ensures robustness and resilience in the event of runtime errors. Node.js is known for its speed, security and versatility. Typescript is known as a language that values good programming practice, which reduces or even eliminates code execution errors.

We can highlight the following characteristics about this application:

* Robustness
* Resilience
* Speed
* Safety
* Versatility
* Accuracy

## Installing

The application is simple to install. Below is a suggestion of steps to follow:

1) Clone the repository in a directory on your localhost or remotehost.

&emsp;`$ cd dev-projects` <br>
&emsp;`$ git clone https://github.com/miguelamello/currency-calculator` <br>

2) Install all packages and dependencies needed to run the application.

&emsp;`$ cd currency-calculator` <br>
&emsp;`$ npm i` <br>

3) You should install globally the package `ts-node`. 
This package is needed for running a Typescript script under Node.js without transpiling to Javascript before. `ts-node` makes the compilation at runtime and allows Node.js understand Typescript.
More about this ahead.

&emsp;`$ sudo npm i ts-node -g` <br> 

Obs: Under Linux, MacOS, Unix you should see the ts-node binary under `/usr/local/bin/ts-node`. Under Windows you should look for how running Typescript applications under Node.js. I recommend you install `ts-node` in the global npm. 


## Executing

Running `currency-calculator` is extremely simple, but first adjust the `hostname`and `port` in the `server.ts` script. 

`const hostname = 'localhost';` <br>
`const port = 3000;`

Obs: You can set above contants to any value that makes sense to your environment.

After that you can Just call the main application script `server.ts` under the `currency-calculator` directory. 

&emsp;`$ ./server.ts` <br>

Now it's where the `ts-node` binary comes in help. You can look for a `shebang` markup in the first line of the `server.ts` contents. This calls `ts-node` compilation at runtime and we can just run Typescript directly. 

`#!/usr/local/bin/ts-node` `//shebang makup`

Obs: The path of `ts-node` binary can be different in your host. Pay attention to that. ;-)<br>
Well, if you want, you can just search for how to compile Typescript before running in Node.js, and run the main script under `node` binary. 

`$ node server.ts` 

For testing, this is enough. You should see a message in the terminal console like:

`Listening to http://your-hostname:port/transactions/`

Where `your-hostname` should be the local domain given to your `hostname` constant, and `port`should be the local port chosen.<br>
Just navigate to the URL given... and you should be able to operate the service.<br>

You can also change the service port.<br>
Look for the following line in the first line of `server.ts` script.<br>

`const port = 3000;`

Just change the `port` constant to any integer between 1000 to 65535, which is not assigned to another TCP services. 










