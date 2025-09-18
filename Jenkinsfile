pipeline {
    agent any

    tools {
        nodejs "node16"
    }

    environment {
        SONARQUBE = "MySonarQube"   // Configure in Jenkins > Manage Jenkins > Configure System
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR-USERNAME/my-app-deployment-with-sonar.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd app && npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'cd app && npm test'
            }
            post {
                always {
                    junit 'app/junit.xml'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE}") {
                    sh '''
                        cd app
                        npx sonar-scanner                           -Dsonar.projectKey=my-app                           -Dsonar.sources=.                           -Dsonar.host.url=$SONAR_HOST_URL                           -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-app:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name my-app my-app:latest || true'
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'app/junit.xml', fingerprint: true
        }
    }
}
