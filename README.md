# 1Inch Handler

A testing application of 1Inch APIs.

## How to use

### 1. Setup project

```shell
$ npm use
$ npm install
```

### 2. Read source codes

- src path: [src](src)
- test path: [test](test)

### 3. Test yourselves

#### Compile contract files

```shell
$ npm run compile:contract
```

- Generate `typechain` folder that contains typescript files that compiled from solidity file.

#### Setup local mainnet fork environment
This step need a [Alchemyapi](https://alchemyapi.io) key.
And then export the Environment variable **ALCHEMYAPI_KEY**.

```shell
$ export ALCHEMYAPI_KEY=<key>
$ npm run fork:mainnet
```

#### Test all test files

```shell
$ npm run test:sdk
$ npm run test:contract
```

## Write codes to test what you want

- types file name: {filename}.types.ts
- logic file name: {filename}.ts

## And write test code for checking api's working state.

- file name: {filename}.spec.ts
