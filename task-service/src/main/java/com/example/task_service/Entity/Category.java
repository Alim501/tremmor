package com.example.task_service.Entity;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Используется автоинкрементное ID
    private Long id;

    @NotNull(message = "Название - обязательное значение")
    private String title;

    @NotNull(message = "User ID - обязательное значение")
    @Column(name = "user_id")
    private String userId; 
}
