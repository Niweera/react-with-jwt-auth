# Quick template for ReactJS app with JWT authentication.

ReactJS with Redux as the global state management and with JWT authentication.

## How to setup

1. Define actions in `/src/actions/` directory
2. Define reducers in `/src/reducers/` directory
3. Define components in `/src/components/` directory
4. Define routes in `/src/App.js` file
5. Change `/package.json` file as per requirements
6. If you want to host the API in Google-App-Engine, create a project in GAE and follow the [Official Travis-CI Documentation](https://docs.travis-ci.com/user/deployment/google-app-engine/)
7. To specify the env variables in Travis-CI follow the [Official Travis-CI Documentation](https://docs.travis-ci.com/user/environment-variables/)
8. To specify the Google-App-Engine `/app.yaml` file follow the [Official Google App Engine Documentation](https://cloud.google.com/appengine/docs/standard/nodejs/config/appref)
9. To specify the Google-App-Engine `/dispatch.yaml` file follow the [Official Google App Engine Documentation](https://cloud.google.com/appengine/docs/standard/nodejs/reference/dispatch-yaml)
10. Done. Test your App in local environment by [http://localhost:PORT](http://localhost:PORT)
11. Publish your repo to GitHub and Travis-CI will do the rest... ["rest" means that it will deploy the `ReactJS` app to Google App Engine.]

## Meta

Nipuna Weerasekara – [@Niweera](https://twitter.com/Niweera) – w.nipuna@gmail.com

Distributed under the MIT license. See `LICENSE` for more information.

## Contributing

1. Fork it (<https://github.com/Niweera/react-with-jwt-auth/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
