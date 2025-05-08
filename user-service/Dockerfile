FROM openjdk:23-slim
WORKDIR /app
COPY build/libs/user-service-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
