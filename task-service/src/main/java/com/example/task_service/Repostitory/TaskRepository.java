package com.example.task_service.Repostitory;

import com.example.task_service.Entity.Task;


import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface TaskRepository extends ReactiveCrudRepository<Task, Long> {
    Flux<Task> findByUserId(String userId);

    // Поменяй на реактивный Mono
    Mono<Boolean> existsByCategoryId(Long category_id);

    // Поменяй на реактивный Mono
    Mono<Boolean> existsByPriorityId(Long priority_id);
}
