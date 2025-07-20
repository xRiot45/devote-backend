# 🗳️ Devote Backend

Devote Backend is the server-side application for the Devote platform, a decentralized voting system built with **NestJS** and **MySQL**. It manages off-chain logic such as user authentication, session management, proposal creation, and interaction with Ethereum smart contracts for on-chain voting.

## 🚀 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Blockchain**: [Ethereum](https://ethereum.org/) (via [Hardhat](https://hardhat.org/))
- **Smart Contracts**: Written in Solidity
- **Authentication**: JWT & MetaMask (wallet-based)
- **Language**: TypeScript

---

## ✨ Key Features

- ✅ **User Authentication**
    - Login with MetaMask wallet signature
    - JWT-based session management

- ✅ **Proposal Management**
    - Create, read, update, delete proposals via REST API
    - Role-based access for managing proposals

- ✅ **On-Chain Voting**
    - Blockchain interaction using `ethers.js` and Hardhat
    - Only the voting action is recorded on-chain (Ethereum)

- ✅ **Modular Codebase**
    - Organized using NestJS modules for scalability and maintainability

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js v18+
- MySQL
- (Optional for blockchain dev) Hardhat + Ethereum wallet (e.g., MetaMask)

### Installation

```bash
# Clone the repository
git clone https://github.com/xRiot45/devote-backend
cd devote-backend

# Install dependencies
npm install

# Edit the .env file with your database and JWT config

# Run the application
npm run start:dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following configuration:

```env
APP_NAME='devote-backend'
APP_PORT=3001
APP_ENV=development
APP_DEBUG=true
APP_URL=http://localhost
APP_TIMEZONE=UTC

APP_LOCALE=en
APP_FALLBACK_LOCALE=
APP_FAKER_LOCALE=

APP_MAINTENANCE_DRIVER=
APP_MAINTENANCE_STORE=

BCRYPT_ROUNDS=10

LOG_CHANNEL=
LOG_STACK=
LOG_DEPRECATIONS_CHANNEL=
LOG_LEVEL=

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
DB_SYNCHRONIZE=true

SESSION_DRIVER=
SESSION_LIFETIME=
SESSION_ENCRYPT=
SESSION_PATH=
SESSION_DOMAIN=

BROADCAST_CONNECTION=
FILESYSTEM_DISK=
QUEUE_CONNECTION=

CACHE_STORE=
# CACHE_PREFIX=

MEMCACHED_HOST=

REDIS_CLIENT=
REDIS_HOST=
REDIS_PASSWORD=
REDIS_PORT=

MAIL_MAILER=
MAIL_SCHEME=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=

JWT_ACCESS_TOKEN_SECRET=<your_jwt_access_token_secret>
JWT_REFRESH_TOKEN_SECRET=<your_jwt_refresh_token_secret>


RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=<your_contract_address>
```

---

## 📦 API Endpoints (Overview)

| Method | Endpoint                                     | Description                         |
| ------ | -------------------------------------------- | ----------------------------------- |
| GET    | `/api/users`                                 | Get all users                       |
| GET    | `/api/users/me`                              | Get current authenticated user      |
| POST   | `/api/auth/wallet`                           | Authenticate using wallet signature |
| GET    | `/api/auth/wallet/check`                     | Check wallet authentication status  |
| GET    | `/api/proposals`                             | List all proposals                  |
| GET    | `/api/proposals/:proposalId`                 | Get proposal details                |
| POST   | `/api/proposals`                             | Create a new proposal               |
| PATCH  | `/api/proposals/:proposalId`                 | Update an existing proposal         |
| DELETE | `/api/proposals/:proposalId`                 | Delete a proposal                   |
| PATCH  | `/api/proposals/:proposalId/reorder-options` | Reorder voting options              |
| PUT    | `/api/proposals/:proposalId/status`          | Update proposal status              |
| GET    | `/api/voting-sessions`                       | List all voting sessions            |
| POST   | `/api/proposal-votes`                        | Submit a vote                       |
| GET    | `/api/proposal-votes/:proposalId/has-voted`  | Check if user has voted             |
| GET    | `/api/voting-results`                        | Get voting results                  |
| GET    | `/api/voting-results/:proposalId`            | Get result for a specific proposal  |
| GET    | `/api/dashboard/summary`                     | Get dashboard summary info          |

---

## 📘 Smart Contract Integration

- Interactions are done using `ethers.js` and integrated in the `vote` module.
- Only **voting** is performed on-chain.
- Proposals and user sessions are managed off-chain.
