<h1 align="center">
  <img src="./Icon-bordered.png" width="350"/><br>
  E-PRESCRIPTION
</h1>

Medication scheduler build on `React Native`

## Getting Started

`$ git clone https://github.com/bohdanbirdie/e-prescription.git`

`$ cd e-prescription`

`$ npm install && npm link`

`$ react-native run-ios` or open ePrescription.xcodeproj from `ios` folder, select debug schema and run it.

### Prerequisites

- React Native CLI
`$ npm install -g react-native-cli`

- Imagemagick
`$ brew install imagemagick`

- Yeoman
`$ npm install -g yo`


## Running on the device

Open ePrescription.xcodeproj from `ios` folder, select debug or release schema (Product -> Schema) and run app build.

### Roadmap
- [X] Add registration via QR code
- [ ] Cleanup all styles
- [ ] Animate course application
- [ ] Lock scroll on `medicine list` page when user is swiping course item
- [ ] Write tests
- [ ] Add ability to modify submission hours for drugs
- [ ] Fix submission list date formar from `HH-MM-ss` to `HH:MM:ss`

### Tests

Under development

## Deployment

Go to project folder, then run `$ npm run build:ios`, this will create new `main.jsbundle` for your app.
Open ePrescription.xcodeproj from `ios` folder, select release schema and connected device, run app build.

## Screenshots

![image](https://user-images.githubusercontent.com/23266928/32684856-2bd4e16e-c691-11e7-81aa-1fa99583072c.png)
![image](https://user-images.githubusercontent.com/23266928/32684857-2e9356f6-c691-11e7-8b69-9208afd04497.png)


## Built With

* [React Native](https://facebook.github.io/react-native/)

## Contributing

Any contributing is well appreciated, please - run `eslint` before PR, pre-commit hook is coming soon.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Bohdan Ptyts** - *Initial work* - [bohdanbirdie](https://github.com/bohdanbirdie)

See also the list of [contributors](https://github.com/bohdanbirdie/contributors) who participated in this project.

## Acknowledgments

* Thanks to Bohdan Yemets for design help
* Thanks to [Roman Rodomansky](https://github.com/itspoma/) for idea

