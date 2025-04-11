package com.example.user_service.Entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    private Long id;

    private String title;

    private String status;

    private int cycles;

    private int cyclesCurrent;

    private Priority priority;

    private Category category;

    private String userId;
}
