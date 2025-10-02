package task

import "time"

type Task struct {
	ID          uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Title       string    `gorm:"type:varchar(255);not null" json:"title"`
	Description string    `gorm:"type:text" json:"description,omitempty"`
	DueDate     time.Time `gorm:"type:date;not null" json:"due_date"`
	Status      string    `gorm:"type:enum('pending','in-progress','completed');default:'pending'" json:"status"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoCreateTime;autoUpdateTime" json:"updated_at"`
}
