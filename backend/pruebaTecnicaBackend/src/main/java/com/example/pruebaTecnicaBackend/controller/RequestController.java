package com.example.pruebaTecnicaBackend.controller;

import com.example.pruebaTecnicaBackend.model.Request;
import com.example.pruebaTecnicaBackend.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController {

    @Autowired
    private RequestService requestService;

    // Listar usuarios
    @GetMapping("/users")
    public ResponseEntity<String> getUsers() {
        return ResponseEntity.ok(requestService.getAllUsers());
    }

    // Listar posts
    @GetMapping("/posts")
    public ResponseEntity<String> getAllPosts() {
        return ResponseEntity.ok(requestService.getAllPosts());
    }

    // Álbumes de un usuario
    @GetMapping("/users/{userId}/albums")
    public ResponseEntity<String> getAlbumsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(requestService.getAlbumsByUserId(userId));
    }

    // Crear una petición
    @PostMapping("/request")
    public ResponseEntity<String> createRequest(@RequestBody Request request) {
        requestService.createRequest(request);
        return ResponseEntity.status(201).body("Petición creada exitosamente");
    }

    // Listar logs
    @GetMapping("/logs")
    public ResponseEntity<List<Request>> getAllLogs() {
        return ResponseEntity.ok(requestService.getAllLogs());
    }

    // Editar log
    @PutMapping("/logs/{id}")
    public ResponseEntity<Request> updateLog(
            @PathVariable Long id,
            @RequestParam(required = false) String method,
            @RequestBody(required = false) String data) {
        return ResponseEntity.ok(requestService.updateLog(id, method, data));
    }


    // Eliminar log
    @DeleteMapping("/logs/{id}")
    public ResponseEntity<String> deleteLog(@PathVariable Long id) {
        requestService.deleteLog(id);
        return ResponseEntity.ok("Logs eliminado correctamente");
    }

    // Simular error
    @GetMapping("/simulateError")
    public ResponseEntity<String> triggerError() {
        try {
            return ResponseEntity.ok(requestService.simulateError());
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Error simulado: " + e.getMessage());
        }
    }
}
