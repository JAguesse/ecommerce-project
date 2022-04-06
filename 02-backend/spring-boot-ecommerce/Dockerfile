#### Stage 1: Build the applications
FROM openjdk:8-jdk-alpine as build
ADD target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]