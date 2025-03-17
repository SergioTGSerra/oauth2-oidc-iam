FROM maven:3-amazoncorretto-21-alpine

WORKDIR /app

CMD ["sh", "-c", "mvn clean install -DskipTests && java -jar target/auth-0.0.1-SNAPSHOT.jar"]