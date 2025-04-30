package com.example.task_service.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import jakarta.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table("tasks")  // Используем Table из R2DBC
public class Task {
    @Id
    private Long id;

    @NotNull(message = "Название - обязательное значение")
    private String title;

    @NotNull(message = "Статус - обязательное значение")
    private String status;

    @NotNull(message = "Циклы - обязательное значение")
    private int cycles;

    @NotNull(message = "Циклы - обязательное значение")
    private int cyclesCurrent;

    private Long priorityId;  // Применяем ID для связи с Priority
    private Long categoryId;  // Применяем ID для связи с Category

    @NotNull(message = "User ID - обязательное значение")
    private String userId;  // ID пользователя
}
