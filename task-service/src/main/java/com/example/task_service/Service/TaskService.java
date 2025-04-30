package com.example.task_service.Service;

import com.example.task_service.Entity.Task;
import com.example.task_service.Repostitory.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public Mono<Task> createTask(Task taskDto, String userId) {
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setStatus(taskDto.getStatus());
        task.setCycles(taskDto.getCycles());
        task.setCyclesCurrent(0);
        task.setCategoryId(taskDto.getCategoryId());
        task.setPriorityId(taskDto.getPriorityId());
        task.setUserId(userId);
        return Mono.just(task)
                   .flatMap(taskRepository::save);
    }

    public Flux<Task> getAllTasks(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public Mono<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Mono<Task> updateTask(Long id, Task taskDetails, String userId) {
        return taskRepository.findById(id)
                .flatMap(task -> {
                    task.setTitle(taskDetails.getTitle());
                    task.setStatus(taskDetails.getStatus());
                    task.setCycles(taskDetails.getCycles());
                    task.setCyclesCurrent(taskDetails.getCyclesCurrent());
                    task.setCategoryId(taskDetails.getCategoryId());
                    task.setPriorityId(taskDetails.getPriorityId());
                    task.setUserId(userId);
                    return taskRepository.save(task);
                });
    }

    public Mono<Boolean> deleteTask(Long id) {
        return taskRepository.existsById(id)
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.just(false);
                    }
                    return taskRepository.deleteById(id).then(Mono.just(true));
                });
    }
}
