package config

import (
	"errors"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBUsername string
	DBPassword string
	DBHost     string
	DBPort     string
	DBName     string

	AppPort string
}

func LoadConfig() (*Config, error) {
	err := godotenv.Load()

	if err != nil {
		return nil, errors.New("error loading .env file")
	}

	config := &Config{
		DBUsername: os.Getenv("DB_USERNAME"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBHost:     os.Getenv("DB_HOST"),
		DBPort:     os.Getenv("DB_PORT"),
		DBName:     os.Getenv("DB_NAME"),

		AppPort: os.Getenv("APP_PORT"),
	}

	return config, nil
}
