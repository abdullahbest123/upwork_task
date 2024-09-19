# Project Upwork

## Overview

This project is a backend server built with TypeScript, Node.js, and Express.js. It provides a RESTful API for user management and integrates with Zapier to handle webhooks.

### Features
- **Create a User**: `POST /user` - Create a new user with fields like `id`, `name`, and `email`.
- **Post Data**: `POST /user/:id/data` - Post data related to a specific user and trigger a webhook to Zapier.
- **Get Data**: `GET /user/:id/data` - Retrieve data associated with a specific user.

## Installation

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd project_upwork
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Setup Environment Variables**

    Create a `.env` file in the root directory and add the following:

    ```env
    ZAPIER_WEBHOOK_URL=<your-zapier-webhook-url>
    ```

4. **Run the Server**

    For development:

    ```bash
    npm run dev
    ```

    For production:

    ```bash
    npm run build
    npm start
    ```

## API Endpoints

### 1. Create a User

- **Endpoint**: `POST /user`
- **Request Body**:

    ```json
    {
      "id": "user-id",
      "name": "User Name",
      "email": "user@example.com"
    }
    ```

- **Response**:

    ```json
    {
      "message": "User created successfully",
      "data": {
        "id": "user-id",
        "name": "User Name",
        "email": "user@example.com"
      }
    }
    ```

### 2. Post Data

- **Endpoint**: `POST /user/:id/data`
- **Request Body**:

    ```json
    {
      "key1": "value1",
      "key2": "value2"
    }
    ```

- **Response**:

    ```json
    {
      "message": "Data posted and webhook triggered"
    }
    ```

### 3. Get Data

- **Endpoint**: `GET /user/:id/data`
- **Response**:

    ```json
    {
      "data": [
        {
          "key1": "value1",
          "key2": "value2"
        }
      ]
    }
    ```

## Zapier Integration

- The `POST /user/:id/data` endpoint triggers a webhook to Zapier with the user’s data and the posted information.
- Ensure you have set up a Zap in Zapier that listens to the webhook and processes the data accordingly.

## Deployment

You can deploy this application to your preferred cloud platform. Make sure to configure environment variables and set up proper deployment scripts.

## Contributing

Feel free to submit issues or pull requests to improve this project.

## License

This project is licensed under the [MIT License](LICENSE).

