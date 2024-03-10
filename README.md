# Product Filter

The Product Filter is a web application that allows users to filter products based on property operators and property values.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Product Filter is a tool designed to simplify the process of finding products by providing filtering options based on specific property operators and values. It helps users narrow down their search criteria and quickly locate the desired products.

## Features

- Filter products by property operators such as equals, greater than, less than, etc.
- Filter products by property values.
- Dynamic updating of product list based on applied filters.
- User-friendly interface for easy navigation and interaction.

## Installation

To run the Product Filter locally, follow these steps:

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Navigate to the project directory:

```bash
cd product-filter
```

3. Install dependencies:

```bash
npm install
```

## Usage

Once the installation is complete, you can start the development server to use the Product Filter:

```bash
npm run dev
```

Access the application in your web browser at [http://localhost:3000](http://localhost:3000).

## Testing

The Product Filter includes automated tests to ensure its functionality. To run the tests, use the following command:

```bash
npx cypress run
```