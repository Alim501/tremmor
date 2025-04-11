package com.example.task_service.Service;

import com.example.task_service.Entity.Priority;
import com.example.task_service.Repostitory.PriorityRepository;
import com.example.task_service.Repostitory.TaskRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class PriorityService {
    private final PriorityRepository priorityRepository;
    private final TaskRepository taskRepository;

    public Mono<Priority> createPriority(Priority priority, String userId) {
        priority.setUserId(userId);
        return priorityRepository.save(priority);  // Возвращаем Mono
    }

    public Flux<Priority> getAllPriority(String userId) {
        return priorityRepository.findByUserId(userId);  // Возвращаем Flux
    }

    public Mono<Priority> getPriorityById(Long id) {
        return priorityRepository.findById(id);  // Возвращаем Mono
    }

    public Mono<Priority> updatePriority(Long id, Priority priorityDetails) {
        return priorityRepository.findById(id)
                .flatMap(priority -> {
                    priority.setTitle(priorityDetails.getTitle());
                    priority.setColor(priorityDetails.getColor());
                    return priorityRepository.save(priority);  // Возвращаем Mono
                });
    }

    public Mono<Object> deletePriority(Long id) {
        return priorityRepository.existsById(id)
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.just(false); // Категории не существует
                    }
                    return Mono.just(id)  // оборачиваем id в Mono
                    .flatMap(idVal -> Mono.fromCallable(() -> taskRepository.existsByPriority_Id(idVal)))  // оборачиваем existsByCategory_Id в Mono
                    .flatMap(taskExists -> {
                        if (taskExists) {
                            // Если категория используется в задачах, выбрасываем ошибку
                            return Mono.error(new IllegalStateException("Нельзя удалить категорию, так как она используется в задачах"));
                        }
                        // Если категория не используется в задачах, удаляем категорию
                        return Mono.fromRunnable(() -> priorityRepository.deleteById(id))
                                .then(Mono.just(true));  // Удаление прошло успешно
                    });
            
            

                });
    }
}
