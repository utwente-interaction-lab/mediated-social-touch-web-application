# Touch Tracking

This docker container hosts the NodeJS web application of the Mediated Social Touch project. It serves an HTML & Javascript interface that can register multitouch gestures (only on mobile devices), which are forwarded to the [Client Application](https://github.com/utwente-interaction-lab/mediated-social-touch-client)

This source code is based on a Pen created on CodePen.io. Original URL: [https://codepen.io/shustinx/pen/poprRgE](https://codepen.io/shustinx/pen/poprRgE).

# Build and run
You will first need to [install Docker](https://docs.docker.com/engine/install/) on your server. Then follow these steps to build and run the server container:
1. Clone this repository on the server
2. Build the Docker container based on the provided docker file: `docker build -t mediated-touch-web-app .`
3. Running the docker container on the server (modify the port numbers if desired): `docker run -d -p 3000:3000 mediated-touch-web-app:latest`

## Optional - Deployment on an external registry
Pushing it to an external registry:
1. `docker tag <docker-image-id> europe-west4-docker.pkg.dev/playground-351414/playground/mediated-touch-web-app`
2. `docker push europe-west4-docker.pkg.dev/playground-351414/playground/mediated-touch-web-app`

