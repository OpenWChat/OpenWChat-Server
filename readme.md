<br/>
<p align="center">
  <a href="https://github.com/OpenWChat/OpenWChat-Server">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">OpenWChat-Server</h3>

  <p align="center">
    The express ts server for the OpenWChat app.
    <br/>
    <br/>
    <a href="https://github.com/OpenWChat/OpenWChat-Server">View Demo</a>
    .
    <a href="https://github.com/OpenWChat/OpenWChat-Server/issues">Report Bug</a>
    .
    <a href="https://github.com/OpenWChat/OpenWChat-Server/issues">Request Feature</a>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/OpenWChat/OpenWChat-Server?color=dark-green) ![Forks](https://img.shields.io/github/forks/OpenWChat/OpenWChat-Server?style=social) ![Stargazers](https://img.shields.io/github/stars/OpenWChat/OpenWChat-Server?style=social) ![Issues](https://img.shields.io/github/issues/OpenWChat/OpenWChat-Server) ![License](https://img.shields.io/github/license/OpenWChat/OpenWChat-Server) 

## About The Project

OpenWChat-server is the backend repository powering the OpenWChat app, a WhatsApp clone developed using Express.js, TypeScript, Socket.IO, and MongoDB. This server facilitates real-time communication, user authentication, and data storage for the OpenWChat application, providing a robust foundation for building a feature-rich and secure messaging platform.

## Built With

- `Express.js`: A fast and minimalist web framework for Node.js.
- `TypeScript`: A statically typed superset of JavaScript that enhances code maintainability and scalability.
- `Socket.IO`: Real-time bidirectional event-based communication for enabling instant messaging features.
- `MongoDB`: A NoSQL database for efficient and scalable data storage.
- `Docker`: A platform for developing, shipping, and running applications in containers.

## Getting Started

Follow these steps to get a local copy up and running:

### Installation

1. Clone the repository:

```sh
git clone https://github.com/OpenWChat/OpenWChat-server.git
```

## Running locally

**Without docker**

1. Provide environment variables based on the .env.example file.
2. Install dependencies:

```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

**With docker**

1. Provide environment variables based on the .env.example file.
2. Make sure Docker is installed and running on your system.
3. Run the following command to start both the server and RTMP microservice using Docker Compose:

```bash
docker-compose up app
```

## Contributing

We welcome contributions from the community to enhance OpenWChat. If you'd like to contribute, please follow these guidelines:

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. State your Changes (`npm run clean`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/OpenWChat/OpenWChat-Server/master/LICENSE.md) for more information.

## Authors

* **Mahdi EttehadNejad** - *AI & Backend developer* - [Mahdi EttehadNejad](https://github.com/Mahdi-Eth) - *Built the server*
