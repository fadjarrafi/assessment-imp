# assessment-imp
 This is Assessment Test for IMP


## 📁 Project Structure

```
.
├── laravel/              # Laravel API backend
├── nextjs/               # Next.js frontend
├── docker-compose.yml    # Docker orchestration
├── laravel.Dockerfile    # Laravel Docker configuration
├── nextjs.Dockerfile     # Next.js Docker configuration
└── README.md            # This file
```

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

### How To Run Project

```bash
   docker-compose up -d
   ```
## Access
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## API Endpoints

```
POST   /api/v1/signup
POST   /api/v1/signin
POST   /api/v1/signout        (auth required)
GET    /api/v1/posts          (auth required)
GET    /api/v1/posts/{id}     (auth required)
POST   /api/v1/posts          (auth required)
PUT    /api/v1/posts/{id}     (auth required)
DELETE /api/v1/posts/{id}     (auth required)
```

