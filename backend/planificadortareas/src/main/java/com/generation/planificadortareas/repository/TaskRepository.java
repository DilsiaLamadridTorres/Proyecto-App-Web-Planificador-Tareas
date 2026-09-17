package com.generation.planificadortareas.repository;

import com.generation.planificadortareas.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}