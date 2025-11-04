# Real-World-Problem
A simple, dockerised contacts app created with React, Tailwind and Vite. 
This guide will walk you through installation and running the app on your machine.
## Features
* **Contact Info Display:** Shows details of the selected contact.
* **Searchable Contacts:** Find contacts using the search bar.
* **Responsive Design:** Optimized for both mobile and desktop.
## Prerequisites
* Docker: Ensure you have Docker installed on your machine. You can check if Docker is installed by running:
```
docker --version
```
* Git: You'll need git installed if you want to clone the source code from this repository. You can check if Git is installed by running:
```
git --version
```

## Getting Started
### 1. Clone the git repo
```
git clone https://github.com/joonhyoo/real-world-problem.git
```
### 2. Build and run the app with Docker Compose
Navigate to the project repo:
```
cd real-world-problem
```
Build the Docker image and start up the application:
```
docker compose up --build -d
```
> [!TIP]
> The `--build flag` ensures Docker rebuilds the image, while the `-d` flag runs the container in detached mode, allowing you to keep using your terminal.
### 3. Open the app in your web browser
The app should be available on `http://localhost:3000`
### 4. Stop the app with Docker Compose
When you're done using the application, stop the app:
```
docker compose down
```
