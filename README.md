# Goku Video - AI-Powered Video Analysis Platform

## 📖 Project Description

Goku Video is an intelligent video analysis platform that leverages Large Language Models (LLMs) to provide automated insights and descriptions of uploaded videos. The application enables users to upload videos and receive comprehensive AI-generated analysis, including descriptions, key insights, and relevant metadata about the video content.

### Key Features

- 🎥 **Video Upload**: Seamless video upload functionality with secure cloud storage
- 🤖 **AI-Powered Analysis**: Backend LLM integration for automated video content analysis
- 📧 **Email Notifications**: Automated email notifications when video analysis is complete
- 🔐 **Secure Authentication**: AWS Cognito-based user authentication and authorization
- 📊 **Video Insights Dashboard**: View detailed AI-generated insights about uploaded videos
- 🔒 **Secure File Transfer**: Pre-signed URLs for secure S3 uploads

## 🏗️ Architecture Overview

### Workflow

1. **User Authentication**: Users sign up/sign in through AWS Cognito
2. **Pre-Signed URL Generation**: Backend server generates secure pre-signed S3 URLs for video upload
3. **Video Upload**: Users upload videos directly to S3 using the pre-signed URL
4. **LLM Processing**: Backend triggers LLM analysis of the uploaded video content
5. **Insights Generation**: LLM generates descriptions, summaries, and insights about the video
6. **Email Notification**: Users receive email notification with a link to view the analysis
7. **Results Viewing**: Users access detailed video insights through the web interface

### Technology Stack

#### Frontend
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.3.1
- **UI Components**: AWS Amplify UI React
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Authentication**: AWS Amplify (Cognito integration)

#### Backend
- **Runtime**: Node.js with Express 5.2.1
- **Authentication**: AWS Cognito JWT verification
- **Cloud Services**:
  - AWS S3 (Video storage)
  - AWS Cognito (User authentication)
  - AWS SDK v3 (S3 operations and pre-signed URLs)
- **Middleware**: 
  - CORS for cross-origin requests
  - JWT verification for protected routes

#### AWS Services
- **Amazon Cognito**: User authentication and authorization
- **Amazon S3**: Secure video storage
- **AWS SDK**: S3 client and pre-signed URL generation
- **LLM Service**: Backend video analysis (implementation ready)

## 📁 Project Structure

```
goku-video/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── component/              # React components
│   │   │   ├── AuthPage.tsx        # Authentication UI
│   │   │   ├── VideoUploadPage.tsx # Video upload interface
│   │   │   └── ProtectedRoute.tsx  # Route protection component
│   │   ├── context/
│   │   │   └── authContext.tsx     # Authentication context
│   │   ├── aws-config.js           # AWS Amplify configuration
│   │   ├── axios.js                # Axios HTTP client setup
│   │   ├── App.tsx                 # Main application component
│   │   └── main.tsx                # Application entry point
│   ├── package.json
│   └── vite.config.ts
│
├── server/                          # Backend Node.js/Express server
│   ├── clients/
│   │   └── s3Client.js             # AWS S3 client configuration
│   ├── middlewares/
│   │   └── jwtVerifier.js          # JWT token verification
│   ├── index.js                    # Server entry point and routes
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- AWS Account with configured services:
  - AWS Cognito User Pool
  - AWS S3 Bucket
  - AWS credentials configured

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gokulkar879/goku-video.git
   cd goku-video
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:
   ```env
   AWS_REGION=your-aws-region
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   S3_BUCKET_NAME=your-s3-bucket-name
   COGNITO_USER_POOL_ID=your-user-pool-id
   COGNITO_CLIENT_ID=your-client-id
   PORT=3000
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

   Create a `.env` file in the `client` directory:
   ```env
   VITE_AWS_REGION=your-aws-region
   VITE_COGNITO_USER_POOL_ID=your-user-pool-id
   VITE_COGNITO_CLIENT_ID=your-client-id
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:3000`

2. **Start the Frontend Application**
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 🔐 Authentication Flow

1. Users register/login through the AWS Cognito-powered authentication page
2. Upon successful authentication, JWT tokens are stored securely
3. Protected routes verify JWT tokens before granting access
4. API requests include JWT tokens in headers for backend verification

## 📤 Video Upload Process

1. User selects a video file from the upload interface
2. Frontend requests a pre-signed S3 URL from the backend
3. Backend generates a temporary pre-signed URL with upload permissions
4. Frontend uploads video directly to S3 using the pre-signed URL
5. Backend triggers LLM analysis workflow
6. User receives email notification when analysis is complete
7. User can view video insights in the dashboard

## 🛠️ Development

### Frontend Development
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

### Backend Development
```bash
cd server
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
```

## 📝 API Endpoints

- `POST /api/auth/verify` - Verify JWT token
- `POST /api/upload/presigned-url` - Generate pre-signed S3 URL
- `GET /api/videos` - List user's uploaded videos
- `GET /api/videos/:id/insights` - Get video analysis insights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

gokulkar879

## 🔗 Links

- Repository: [https://github.com/gokulkar879/goku-video](https://github.com/gokulkar879/goku-video)

---

**Note**: This project is under active development. LLM integration and email notification features are being implemented.