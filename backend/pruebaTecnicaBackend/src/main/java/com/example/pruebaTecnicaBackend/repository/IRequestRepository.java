package com.example.pruebaTecnicaBackend.repository;

import com.example.pruebaTecnicaBackend.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRequestRepository extends JpaRepository<Request, Long> {
}
