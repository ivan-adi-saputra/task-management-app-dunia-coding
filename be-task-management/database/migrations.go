package database

import (
	"be-task-management/internal/app/task"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	err := db.AutoMigrate(
		&task.Task{},
	)

	if err != nil {
		return err
	}

	return nil
}
