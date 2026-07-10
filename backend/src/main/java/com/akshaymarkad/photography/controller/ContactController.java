package com.akshaymarkad.photography.controller;

import com.akshaymarkad.photography.entity.ContactMessage;
import com.akshaymarkad.photography.repository.ContactMessageRepository;
import com.akshaymarkad.photography.util.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final ContactMessageRepository repo;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> submit(@Valid @RequestBody ContactRequest req) {
        ContactMessage m = new ContactMessage();
        m.setName(req.getName());
        m.setEmail(req.getEmail());
        m.setMessage(req.getMessage());
        repo.save(m);
        return ResponseEntity.ok(new ApiResponse<>(true, "Message received", "ok"));
    }

    @Data
    static class ContactRequest {
        @NotBlank
        private String name;
        @Email
        private String email;
        @NotBlank
        private String message;
    }
}
