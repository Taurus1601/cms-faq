

# FAQ Management System

A backend system for managing FAQs with multi-language support, automated translations, and Redis caching. Built with **Next.js**, **MongoDB**, and **Redis**.



 Features
- **Multi-language FAQ Support**: Store and retrieve FAQs in English, Hindi, Bengali, and more.
- **WYSIWYG Editor**: Rich text formatting for answers using Quill.js.
- **Redis Caching**: Improve performance with cached FAQ responses.
- **Automated Translations**: Integrates with Google Translate API for seamless translations.
- **RESTful API**: CRUD operations for FAQs with language selection.
- **Admin Panel**: User-friendly interface for managing FAQs (React-based).
- **Docker Support**: Easy deployment with Docker and Docker Compose.
- **Unit Tests**: Test coverage for models and API endpoints.

## Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Redis (local or cloud)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Taurus1601/cms-faq.git
   cd faq-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/faqdb
   REDIS_URL=redis://localhost:6379
   
   ```

4. **Start Redis**:
   ```bash
   brew services start redis  # macOS
   brew service start mongodb-community@8.0
   ```

5. **Run the application**:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint              | Description                           |
|--------|-----------------------|---------------------------------------|
| GET    | `/api/faqs?lang=en`   | Get FAQs in a specific language       |
| POST   | `/api/faqs`           | Create a new FAQ (auto-translates)    |
| PUT    | `/api/faqs?id=:id`    | Update an FAQ by ID                   |
| DELETE | `/api/faqs?id=:id`    | Delete an FAQ by ID                   |

`
id is mongodb object_id generated automatically 
`

`
:id are automatically selected when update or delete is clicked
`

### Example Request
```bash
curl http://localhost:3000/api/faqs?lang=hi
```

###FAQ List

<img width="1440" alt="Screenshot 2025-02-02 at 1 57 16 PM" src="https://github.com/user-attachments/assets/d5500bd6-ece3-418c-90bf-8309381b699e" />

###Admin Pannel
<img width="1440" alt="Screenshot 2025-02-02 at 1 54 29 PM" src="https://github.com/user-attachments/assets/3acfa067-b9c5-4b95-8433-817b2d1bb586" />


## Translation Setup
The system uses **google-translate-api-x** for automated translations. To enable this:
Free and open source
```bash
https://github.com/AidanWelch/google-translate-api#readme
```
<img width="1440" alt="Screenshot 2025-02-02 at 1 55 48 PM" src="https://github.com/user-attachments/assets/0b1953dc-62ce-48ae-aeb4-310173ad928c" />


## Caching with Redis
- FAQs are cached for **1 hour** (adjust TTL in code).

- Cache is invalidated automatically when FAQs are added/updated/deleted.

To check cached data:
```bash
redis-cli get faqs:en
```

## Testing
Run unit tests with:
```bash
npm run cypress:open
file  :  admin.cy.js
```

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Commit changes: `git commit -m "feat: your feature"`.
4. Push to the branch: `git push origin feat/your-feature`.
5. Open a pull request.
