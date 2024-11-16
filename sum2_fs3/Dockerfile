# Imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR generado
COPY target/*.jar app.jar

# Copiar las imágenes desde el proyecto al contenedor
COPY src/main/resources/static/images /app/src/main/resources/static/images

# Copiar la wallet desde la ruta en tu máquina local
COPY ./Wallet_ROP5KSUKVLN2GV0H /app/wallet

# Exponer el puerto en el que se ejecutará el backend
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]

