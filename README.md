<MainGrid>

<HeaderTitle>
  
# AR Tourist Guide Prototype
<TitleAction href="https://github.com/stefanosAgelastos/mern-admin-app-for-android-AR-app" label="Go to github repo" />
  
<TitleAction href="https://ar.stefworks.ml" disabled label="Go to demo" />
</HeaderTitle>

<InfoGrid>

<InfoPaper>

## About the project
This is a product development project, purposed to assist Tour guides with Augmented Reality.
The system was developed in two phases. It started in October 2019 as an internship project for [KøbenhavnerTure](https://www.koebenhavnerture.dk/), and in a second phase (November-December 2019) it was further developed as a final exam project for [KEA's Datamatiker AP](https://kea.dk/en/programmes/academy-profession-degree/computer-science). 

</InfoPaper>

<InfoPaper>
<MyChip label="Product Development"/>
<MyChip label="Design Thinking"/>
<MyChip label="Augmented Reality"/>
<MyChip label="Unity 3D"/>
<MyChip label="Vuforia"/>
<MyChip label="Node.js"/>
<MyChip label="Mongo DB"/>
<MyChip label="React"/>
<MyChip label="SSR"/>
<MyChip label="Heroku"/>
</InfoPaper>

</InfoGrid>

<PanelGrid>
<Panel id="1" heading="Phase 1" secondaryHeading="Prototype development" >

### Goal:
In a multidisciplinary team of 2 multimedia designers and 2 developers, we developed an AR solution for this local guided-tours company.
Our goal was to "Bring Stories Alive" as well as to add a competitive advantage to the company's SoMe presence. 
 
### About our Process
We went through a 4-day course on Unity 3D and 1 day on Ideation. We worked with Scrum. An experienced tutor guided us while practising design methods from the [Amsterdam MediaLab's Toolkit](https://toolkits.dss.cloud/design/).   
We researched about the target group of the company, and through ideation tecniques we developed a series of prototypes. 

### Product: 
After iterative user testing we ended up with a working AR mobile application prototype that we pitched to the client during an open event. 
  
[![Watch the video](https://raw.githubusercontent.com/stefanosAgelastos/gps-tourist-app/master/docs/youtube.png)](https://youtu.be/Lbq94Ef9qJY?t=5).
  
Recomendation letter available. Team: Charlène Marteyn, Modestas Šekštela, Stefanos Agelastos.
</Panel>

<Panel id="2" heading="Phase 2" secondaryHeading="System Development" >
### Goal: MVP Development
Together with two colleagues we developed an augmented reality android tourist guide and a supporting administration system. 
The user harvests GPS and AR technologies through their phone and consumes content relevant to their location. 
The system administrator can add new locations and feed the application with new content.  
  
![overview](https://raw.githubusercontent.com/stefanosAgelastos/gps-tourist-app/master/docs/overview.png) 
  
### About the process:
We combined Scrum and Design thinking. Both methodologies are iterative and incremental by nature, so they combine well:  
  
![overview](https://raw.githubusercontent.com/stefanosAgelastos/gps-tourist-app/master/docs/process.png) 
  
Exam evaluation: excellent. Team: Alexander Kellberg, Kristian Skovlund Rasmussen, Stefanos Agelastos.
 
</Panel>

<Panel id="3" heading="How does it work?" secondaryHeading="An overview of the technologies" >

## Built With

- Android APK by Unity3D and Vuforia
- React isomorphic front end application
- Node.js express API and server side rendering
- MongoDB for semi-structured data model persistence
- Heroku PaaS staging environment 
  

The admin webapp allows you to add Locations to a database, and provide them as a REST resource to the android APK. The admin webapp is based on [MERN](http://mern.io), a scaffolding tool which makes it easy to build isomorphic apps using Mongo, Express, React and NodeJS. Read the [Documentation](http://mern.io/documentation.html).
The android app was made on the [Unity](https://unity.com/) real-time 3d development platform and [Vuforia](https://www.vuforia.com/) library, which provided web, gps and augmented reality capabilitities.
Currently the solution has the following architecture:  
  
![solution](https://raw.githubusercontent.com/stefanosAgelastos/gps-tourist-app/master/docs/solution.png) 
</Panel>

<Panel id="4" heading="For Devs" secondaryHeading="Clone and install, the usual" >

## Getting Started

These instructions will get you a copy of the administration and running on your local machine for development and testing purposes.

### Prerequisites

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also **npm6** is required to install dependencies properly.

## Available Commands

1. `npm run start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors

</Panel>
<Panel id="5" heading="For Devs" secondaryHeading="Model, Webpack, Server, Client" >

## File Structure

### Model
This is the data structure of the location objects.
```
location: {
        author,
        title,
        lon,
        lat,
        images: [
          { id, image_title, image_url }
        ]
      },
```

### Webpack Configs

MERN uses Webpack for bundling modules. There are four types of Webpack configs provided `webpack.config.dev.js` (for development), `webpack.config.prod.js` (for production), `webpack.config.server.js` (for bundling server in production) and `webpack.config.babel.js` (for [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders) for server rendering of assets included through webpack).

The Webpack configuration is minimal and beginner-friendly. You can customise and add more features to it for production build.

### Server

MERN uses express web framework. Our app sits in server.js where we check for NODE_ENV.

If NODE_ENV is development, we apply Webpack middlewares for bundling and Hot Module Replacement.

#### Server Side Rendering

We use React Router's match function for handling all page requests so that browser history works.

All the routes are defined in `client/routes.js`. React Router renders components according to route requested.

### Client

Client directory contains all the shared components, routes, modules.

#### components
This folder contains all the common components which are used throughout the project.

#### index.js
Index.js simply does client side rendering using the data provided from `window.__INITIAL_STATE__`.

#### modules
Modules are the way of organising different domain-specific modules in the project. A typical module contains the following
```
.
└── Location
    ├── __tests__                    // all the tests for this module goes here
    |   ├── components               // Sub components of this module
    |   |   ├── Location.spec.js
    |   |   ├── LocationList.spec.js
    |   |   ├── LocationItem.spec.js
    |   |   └── LocationImage.spec.js
    |   ├── pages
    |   |   ├── LocationPage.spec.js
    |   |   └── LocationViewPage.spec.js
    |   ├── LocationReducer.spec.js
    |   └── LocationActions.spec.js
    ├── components                   // Sub components of this module
    |   ├── Location.js
    |   ├── LocationList.js
    |   ├── LocationItem.js
    |   └── LocationImage.js
    ├── pages                        // React Router Pages from this module
    |   ├── LocationPage
    |   |   ├── LocationPage.js
    |   |   └── LocationPage.css
    |   └── LocationViewPage
    |       ├── LocationViewPage.js
    |       └── LocationViewPage.css
    ├── LocationReducer.js
    └── LocationActions.js
```

 
</Panel>
<Panel id="6" heading="For Devs" secondaryHeading="You are ready to go" >

## Misc

### Importing Assets
Assets can be kept where you want and can be imported into your js files or css files. Those fill be served by webpack in development mode and copied to the dist folder during production.

### ES6 support
We use babel to transpile code in both server and client with `stage-0` plugin. So, you can use both ES6 and experimental ES7 features.

### Docker
There are docker configurations for both development and production.

To run docker for development:
```sh
docker-compose build # re-run after changing dependencies
docker-compose up
```
or, if you want to override the web port:
```sh
WEB_PORT=<your_custom_port> docker-compose up
```

To run docker for production:
```sh
docker-compose -f docker-compose-production.yml up --build
```

To reset the database:
```sh
docker-compose down --volumes
```

## License
MERN is released under the [MIT License](http://www.opensource.org/licenses/MIT).
</Panel>

</PanelGrid>


</MainGrid>
