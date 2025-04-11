package com.example.task_service.Repostitory;

import com.example.task_service.Entity.Category;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface CategoryRepository extends ReactiveCrudRepository<Category, Long> {
    Flux<Category> findByUserId(String userId);  
}
