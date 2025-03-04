package com.example.task_service.Entity;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Название - обязательное значение")
    private String title;

    @NotNull(message = "Статус - обязательное значение")
    private String status;

    @NotNull(message = "Циклы - обязательное значение")
    private int cycles;

    @NotNull(message = "Циклы - обязательное значение")
    private int cyclesCurrent;

    @ManyToOne
    @JoinColumn(name = "priority_id")
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @NotNull(message = "User ID - обязательное значение")
    @Column(name = "user_id")
    private String userId;
}
