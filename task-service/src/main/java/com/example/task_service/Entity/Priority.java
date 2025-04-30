package com.example.task_service.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import jakarta.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table("priority")  // Используем Table из R2DBC
public class Priority {
    @Id
    private Long id;

    @NotNull(message = "Название - обязательное значение")
    private String title;

    @NotNull(message = "Статус - обязательное значение")
    private String color;

    @NotNull(message = "User ID - обязательное значение")
    private String userId;  // ID пользователя
}
