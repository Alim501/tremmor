package com.example.task_service.Repostitory;


import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.example.task_service.Entity.Priority;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@Repository
public interface PriorityRepository extends ReactiveCrudRepository<Priority, Long> {
    Flux<Priority> findByUserId(String userId);  
    Mono<Boolean> existsById(Long id); 
}
