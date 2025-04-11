package com.example.task_service.Service;

import com.example.task_service.Entity.Category;
import com.example.task_service.Repostitory.CategoryRepository;
import com.example.task_service.Repostitory.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final TaskRepository taskRepository;

    public Mono<Category> createCategory(Category category, String userId) {
        category.setUserId(userId);
        return categoryRepository.save(category); // save уже возвращает Mono
    }

    public Flux<Category> getAllCategories(String userId) {
        return categoryRepository.findByUserId(userId); // findByUserId должен возвращать Flux
    }

    public Mono<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id); // findById теперь возвращает Mono
    }

    public Mono<Category> updateCategory(Long id, Category categoryDetails) {
        return categoryRepository.findById(id)
                .flatMap(category -> {
                    category.setTitle(categoryDetails.getTitle());
                    return categoryRepository.save(category); // Сохраняем измененную категорию
                });
    }

    public Mono<Boolean> deleteCategory(Long id) {
        return categoryRepository.existsById(id)
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.just(false); // Категории не существует
                    }
                    return Mono.just(id)  // оборачиваем id в Mono
                    .flatMap(idVal -> Mono.fromCallable(() -> taskRepository.existsByCategory_Id(idVal)))  // оборачиваем existsByCategory_Id в Mono
                    .flatMap(taskExists -> {
                        if (taskExists) {
                            // Если категория используется в задачах, выбрасываем ошибку
                            return Mono.error(new IllegalStateException("Нельзя удалить категорию, так как она используется в задачах"));
                        }
                        // Если категория не используется в задачах, удаляем категорию
                        return Mono.fromRunnable(() -> categoryRepository.deleteById(id))
                                .then(Mono.just(true));  // Удаление прошло успешно
                    });
            
            

                });
    }
}
