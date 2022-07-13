# Stori Transaction Report
This repo provides a function which emails a transaction report based on a CSV transaction file.


## Overview
The function is written in TypeScript and designed to run on AWS Lambda. It uses the [Severless Framework](https://www.serverless.com/framework) to aid development and deployment, and [Postmark](https://postmarkapp.com/) to send emails. Jest is used to ensure quality via an automated test suite.

The function accepts an payload with the following format:

```json
{
  "filename": "/tmp/txns.csv",
  "emailTo": "adam.fenton@gmail.com"
}
```

Where `filename` is the full file path (for local) or S3 key (for AWS) and `emailTo` is the email address where the email will be received.

### Design
The app's business domain logic is in the `/src/domain` folder. This represents pure business logic and can be tested by mocking the external dependencies found in the `/src/utils` folder. `/src/utils` contains services which are not core business logic, e.g. the connection to S3.

### Infrastructure
The app uses CloudFormation via the Serverless Framework to deploy the required services (S3, Lambda, CloudWatch) and configure the IAMs.


## Local Development
Prequesites:

1. Node v14

To set-up the app locally:

1. Clone this repo
2. Run `npm i` to install dependencies
3. Create a `.env.json` file with the following content:

```json
{
  "postmark_api_key": "..."
}
```

Then to invoke the function:

```
npm run invoke -- --data '{"filename":"/tmp/txns.csv", "emailTo":"adam.fenton@gmail.com"}'
```

Replace `filename` with the full path of the test file in your local environment and `emailTo` with the email which should receive the report. The folder `tests/data` contains test CSV files.

To run type checking: `npx tsc`.

To run the test suite: `npm t`.


## Deployment
Prequesites:

1. Follow the Local Development instructions to successfully run the app locally
2. Setup an AWS account
3. Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) locally and [authenticate](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) it to your AWS account

Then run `npm run deploy` to deploy the app to AWS. It uses Infrastructure as Code via the Serverless Framework, and will deploy all necessary resources for you.

To invoke the function deployed to AWS (`filename` is the object's key in the S3 bucket):

```
aws lambda invoke /dev/null \
  --function-name aws-node-project-prod-processTransactions \
  --cli-binary-format raw-in-base64-out \
  --payload '{"filename":"txns.csv", "emailTo":"adam.fenton@gmail.com"}'
```

Look in CloudWatch to view info logs and error messages if the function invocation fails.


## Additional Notes
The following assumptions where made when building this app:

- $0 is a credit
- All amounts are in USD
- All transactions in a given file are for the same year (year is not included in the date)
- Dates are in US format: MM/DD
- All valid rows in CSV files have an id, date and amount in this order

Given more time the app could be improved by:

- More extensive unit tests
- Higher level tests, e.g. contract or full e2e
- CI/CD pipeline to run tests and deploy to AWS
- Smoke tests against a deployed environment to ensure the app works as expected once deployed (include in the pipeline)
- Allow for processing of large files that may not fit in available memory
- Use an IoC container to inject dependencies (e.g. for local vs deployed file storage service)
- Use interfaces to completely separate the domain from the other utils (as in Hexagonal Architecture)
