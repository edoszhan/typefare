# Build Stage
FROM golang:1.20 AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

# Execution Stage
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]

