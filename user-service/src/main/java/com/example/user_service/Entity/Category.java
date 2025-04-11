package com.example.user_service.Entity;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Category {
    private Long id;
    private String title;
    private String userId;
}
