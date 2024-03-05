# Locke Bio Senior Software Engineer Technical Test

## Overview
This service is powered by Hono and validated using Zod.

### Directory Structure
* `lib` - contains generic libraries; these are generally candidates for getting extracted
* `src/modules` - web (http) specific code (controllers, DTOs, model structures)
* `src/db` - our makeshift, in-memory database
* `src/integration` - adapter-style setup for future integrations; this allows us to expand the service without impacting the general function of the API

## Assumptions
* Error handling is loose.
* Users don't require authentication.
* Adapters effectively run off of the same transformation assumptions (i.e., they have consistent prefixes).  An actual implementation would likely have different clients, key structures, etc.

## Requirements
This project runs on Node 20 and uses corepack, nvm, and tsx.

To install nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

## Installation
```bash
# make a copy of .env.default (there are no secrets, so there's nothing to add)
cp .env.default .env

# use the configured node runtime
nvm install

# enable corepack
corepack enable

# install dependencies
pnpm i

# run in development
pnpm dev
```

## Building the project
While running `pnpm dev` is enough to execute, you can also build and run the project with the following commands:

```bash
# build the project
pnpm build

# start the project with node
pnpm start
```

## Running tests
I'm using vitest to provide testing
```bash
# to run and exit
pnpm test run

# to watch for changes
pnpm test
```

## Sending a request
The endpoint expects the following shape of data.

```bash
curl --request POST \
  --url http://localhost:3000/orders \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.0' \
  --data '{	
	"pharmacy": "careplus",
	"product": "1709626335",
	"quantity": 3,
	"customer": {
		"name": "Rickey Hartmann DVM",
		"address": "4329 Heller Mountain",
		"city": "North Torrancefurt",
		"state": "North Dakota",
		"zipcode": "87434",
		"country": "Sri Lanka"
	}
}'
```

## Other
Typechecking may be performed by running `pnpm typecheck`
