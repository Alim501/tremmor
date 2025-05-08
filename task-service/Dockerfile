FROM openjdk:23-slim
WORKDIR /app
COPY build/libs/task-service-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
