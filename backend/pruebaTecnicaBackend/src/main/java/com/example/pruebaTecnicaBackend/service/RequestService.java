package com.example.pruebaTecnicaBackend.service;

import com.example.pruebaTecnicaBackend.model.Request;
import com.example.pruebaTecnicaBackend.repository.IRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RequestService {
    private final IRequestRepository requestRepository;
    private final RestTemplate restTemplate;
    private static final String BASE_URL = "https://jsonplaceholder.typicode.com";

    public RequestService(IRequestRepository requestRepository, RestTemplate restTemplate) {
        this.requestRepository = requestRepository;
        this.restTemplate = restTemplate;
    }

    //  Métodos para consumir APIs externas

    // Listar usuarios
    public String getAllUsers() {
        return fetchFromApi("/users", "GET All Users");
    }

    // Listar posts
    public String getAllPosts() {
        return fetchFromApi("/posts", "GET All Posts");
    }

    // Álbumes de un usuario específico
    public String getAlbumsByUserId(Long userId) {
        return fetchFromApi("/users/" + userId + "/albums", "GET Albums by User ID");
    }

    // Métodos para el CRUD de logs

    // Crear una petición
    public void createRequest(Request request) {
        saveRequestLog("CREATE LOG", "Se creo un log manualmente ", false);
        requestRepository.save(request);
    }

    //  Editar registro de petición
    public Request updateLog(Long id, String newMethod, String newData) {

        Request log = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Log con ID " + id + " no encontrado"));

        saveRequestLog("UPDATE LOG", "Actualizado: ID=" + id + "| Método=" + newMethod + "| Datos=" + newData,
                false
        );

        if (newMethod != null) log.setMethod(newMethod);
        if (newData != null) log.setReturnedData(newData);

        return requestRepository.save(log);
    }

    // Eliminar registro de petición
    public void deleteLog(Long id) {
        if (!requestRepository.existsById(id)) {
            throw new RuntimeException("No existe log con ID: " + id);
        }
        saveRequestLog("DELETE LOG", "Se eliminó el log con ID: " + id, false);
        requestRepository.deleteById(id);
    }

    // Listar todos los registros de peticiones
    public List<Request> getAllLogs() {
        saveRequestLog("GET ALL LOGS", "Se listaron todos los logs", false);
        return requestRepository.findAll();
    }

    //Métodos auxiliares

    // Consume API externa y guarda log
    private String fetchFromApi(String endpoint, String methodName) {
        String url = BASE_URL + endpoint;
        String response;

        try {
            response = restTemplate.getForObject(url, String.class);
            saveRequestLog(methodName, response, false);
            return response;

        } catch (ResourceAccessException e) {
            // Error de conexión (timeout, red, etc.)
            saveRequestLog(methodName, "Error de conexión: " + e.getMessage(), true);
            throw new RuntimeException("No se pudo conectar al API externo", e);
        } catch (HttpClientErrorException e) {
            // Errores HTTP 4xx
            saveRequestLog(methodName, "Error HTTP: " + e.getStatusCode(), true);
            throw new RuntimeException("Error en la solicitud: " + e.getStatusCode(), e);
        } catch (Exception e) {
            // Otros errores genéricos
            saveRequestLog(methodName, "Error inesperado: " + e.getMessage(), true);
            throw new RuntimeException("Error interno", e);
        }
    }

    // Guardar log en BD
    private void saveRequestLog(String method, String data, boolean isError) {
        Request request = new Request();
        request.setMethod(isError ? method + " (Error)" : method);
        request.setDate(LocalDateTime.now());
        request.setReturnedData(data);
        requestRepository.save(request);
    }

    // Simular error
    public String simulateError() {
        return fetchFromApi("/nonexistent-endpoint", "SIMULATE ERROR");
    }
}

