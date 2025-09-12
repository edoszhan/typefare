package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"github.com/joho/godotenv"
)

var db *sql.DB

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to PostgreSQL
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"), os.Getenv("DB_PORT"), os.Getenv("DB_USER"), os.Getenv("DB_PASS"), os.Getenv("DB_NAME"))
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	// Test database connection
	err = db.Ping()
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}
	fmt.Println("✅ Successfully connected to PostgreSQL database!")

	// Create router
	router := mux.NewRouter()
	router.HandleFunc("/api/health", HealthCheckHandler).Methods("GET")
	router.HandleFunc("/api/user", GetUserHandler).Methods("GET")
	router.HandleFunc("/api/db-test", DatabaseTestHandler).Methods("GET")

	fmt.Println("Backend running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
}

// Health Check Route
func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Go Backend is running!"))
}

// Get User Route
func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	// Get the user from the request
	name := r.URL.Query().Get("name")
	if name == "" {
		http.Error(w, "Name is required", http.StatusBadRequest)
		return
	}

	// Return the user
	w.Write([]byte(fmt.Sprintf("Hello, %s!", name)))
}

// Database Test Route
func DatabaseTestHandler(w http.ResponseWriter, r *http.Request) {
	// Test database connection and get info
	var dbName, dbUser string
	
	err := db.QueryRow("SELECT current_database(), current_user").Scan(&dbName, &dbUser)
	if err != nil {
		http.Error(w, fmt.Sprintf("Database error: %v", err), http.StatusInternalServerError)
		return
	}

	response := fmt.Sprintf("✅ Database connected successfully!\nDatabase: %s\nUser: %s", dbName, dbUser)
	w.Write([]byte(response))
}
