package com.example.user_service.Entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Priority {
    private Long id;
    private String title;
    private String color;
    private String userId;
}

