# Touch Tracking

A Pen created on CodePen.io. Original URL: [https://codepen.io/shustinx/pen/poprRgE](https://codepen.io/shustinx/pen/poprRgE).



Docker commands:
  docker build -t mediated-touch-web-app .

Running the docker container somewhere:
  docker run -d -p 3000:3000 mediated-touch-web-app:latest

Pusing it to an external registry:
  docker tag <docker-image-id> europe-west4-docker.pkg.dev/playground-351414/playground/mediated-touch-web-app

  docker push europe-west4-docker.pkg.dev/playground-351414/playground/mediated-touch-web-app    

