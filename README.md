# PWA APP

This application aims to use the concepts of Progressive Web Application, among which allow the application to remain available and interactive for the end user, even in the absence of an internet connection. It also allows information modified by the user during the absence of an internet connection to be automatically saved to remote database, and thus persisted in the application. All of this must occur transparently and imperceptibly for the end user.

### LightHouse Score: 99%
This PWA is scoring 99% of performance in LightHouse. 
PS: Progressive Web Application analisys is out of this score since I'm still implementing it.

### Goals
The main objective is building an PWA APP that does not use any external library or framework. Only standard Web Technologies already present in mobile/desktop browsers shall be used. Babel is used to transpile the code and make the App compatible to browsers up to 10 years behind today.

The App shall be fast and responsive to any device screen. As a PWA App, it shall be working when no internet is present. The app shall be a Single Page Application where only the index.html is loaded to the client browser. Any other UI shall be rendered and loaded using pure ES2021 (Javascript 2021). 

In the Backend only NODE shall be used, as the plataform shall be developed with ES2021 from side to side. Comunication between the App and the Server shall be made using a Single Point REST API. UI abstraction shall be completely independent from Backend implementation. The whole Application shall be asyncronous in order to deliver the fastest response to the end user. All communication between client and server shall be encrypted using CryptoJS behind SSL Protocol.

### 1) Introdution

A Progressive Web Application (PWA) is a type of web application that uses modern web technologies to deliver a native app-like experience to users. PWAs are designed to be fast, reliable and engaging, with the ability to work offline and receive push notifications. They are built using web technologies such as HTML, CSS and JavaScript, and can be accessed through a web browser like any other website.

The main benefits of PWAs are that they offer a seamless user experience across devices, are easy to discover and install, and can be used on any platform that has a modern web browser. They also have the advantage of being easy to maintain and update, as changes can be made and deployed directly to the web server without the need for users to manually update their apps.

To develop a PWA, you will need to design and build the app using web technologies, and configure it to meet the requirements for a PWA. This will involve creating the HTML, CSS and JavaScript files that make up the app, as well as configuring any required libraries or frameworks. You will also need to set up a web server and configure HTTPS to ensure that the app is secure and can be accessed by users.

Once the PWA is complete, you will need to deploy it to a hosting service so that it can be accessed by users. This may involve setting up a web server, configuring HTTPS, and optimizing the app for performance. Finally, you will need to promote the PWA and make it discoverable to users. This may involve creating a landing page, optimizing for search engines, and promoting the app through social media and other channels.

### 2) Technical foundations

- **Web app manifest**: This is a JSON file that provides metadata about the app, including the app name, icons, theme colors, and start URL. The manifest is used to control how the app appears when it is installed on a user's device, and is required for the app to be added to the user's home screen.

- **Service workers**: Service workers are background scripts that enable PWAs to work offline and receive push notifications. They run separately from the web page and can intercept network requests, cache assets, and respond to events such as push notifications.

- **HTTPS**: Secure HTTP (HTTPS) is required for all PWAs to ensure that the app and its data are transmitted securely. This is especially important for apps that handle sensitive information such as user login credentials.

- **Responsive design**: PWAs should be designed to be responsive, meaning that they should work well on a variety of devices and screen sizes. This involves using responsive design techniques such as flexible layouts, media queries, and responsive images.

- **Cross-browser compatibility**: PWAs should be tested and verified to work across a range of modern browsers. This will ensure that the app can be used by the largest possible audience.

- **Web performance optimization**: PWAs should be optimized for performance to ensure that they load quickly and provide a smooth user experience. This may involve techniques such as minimizing the size of assets, optimizing images, and reducing the number of requests made to the server.

### 3) Reasons for Progressive Web Applications (PWAs)

**PWAs are easy to discover and install**: Unlike native apps, which must be downloaded from an app store, PWAs can be accessed directly through a web browser and added to a user's home screen with a single click. This makes them easier to discover and install, especially for users who may not want to download an app from an app store.

**PWAs are cross-platform**: PWAs work on any device that has a modern web browser, which means that they can be used on a wide range of platforms without the need for separate native apps. This makes them a good choice for developers who want to reach a wide audience without the need to build and maintain multiple native apps.

**PWAs are easy to maintain and update**: Changes to a PWA can be made and deployed directly to the web server without the need for users to manually update their apps. This makes them easier to maintain and update, especially for apps that are updated frequently.

**PWAs can work offline**: Service workers, a key technical foundation of PWAs, allow apps to work offline or in low-quality network environments by caching assets and data. This makes PWAs a good choice for apps that need to work in areas with poor or intermittent connectivity.

**PWAs can be shared easily**: PWAs can be shared easily through a URL, which makes it easy for users to share the app with others. This can be especially useful for apps that are designed to be used by a group of people, such as a team or an organization.

### 4) Infrastructure Stack

The goal is not to use heavy frameworks or libraries that only make the application slow and difficult to maintain. The Web Standards already provide enough, and natively in browsers, to support various features. The focus is on making the most of these native browser features, while keeping the PWA Application fully compatible with browsers and devices that were 10 years old.

- **Frontend**
  - JavaScript (ES2021)
  - HTML 5
  - CSS 3
  - Standard Web APIs
  - CryptoJS
  - Webpack for bundling
  - Babel for transpiling

- **Backend**
  - Linux CENTOS STREAM
  - Node 18
  - CryptoJS
  - MySQL
  - Storage

### 5) Notes:

- This application is for case study only, and may need a lot of adjustments to be fully funcional. 
- The development focus now is towards the login screen to dashboard when user fully authenticated. 
- User authentication now is focused in local username/password, and next step in the authentication development will be towards "Social Authentication" using gmail, outlook and apple logins. 

