package main

import (
	"be-task-management/database"
	"be-task-management/internal/config"
	"be-task-management/internal/middleware"
	"be-task-management/internal/routes"
	"be-task-management/internal/utils"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// load config
	cfg, err := config.LoadConfig()
	utils.PanicIfError(err, "error load .env file")

	// connection database
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", cfg.DBUsername, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBName)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	utils.PanicIfError(err, "connection database failed")

	// migrations
	err = database.Migrate(db)
	utils.PanicIfError(err, "error migration database")

	// setup router
	router := gin.Default()

	// cors
	router.Use(middleware.CORSMiddleware())

	v1 := router.Group("/api/v1")
	routes.SetupRoutes(v1, db, cfg)

	router.Run(":" + cfg.AppPort)

	log.Printf("Server running on http://localhost:%s", cfg.AppPort)
}
