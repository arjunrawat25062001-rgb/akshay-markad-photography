package com.akshaymarkad.photography.controller;

import com.akshaymarkad.photography.dto.PortfolioItemRequest;
import com.akshaymarkad.photography.dto.PortfolioItemResponse;
import com.akshaymarkad.photography.service.PortfolioAdminService;
import com.akshaymarkad.photography.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/admin/portfolio")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminPortfolioController {
    private final PortfolioAdminService service;

    @GetMapping
    @Operation(summary = "List all portfolio items (admin)")
    public ResponseEntity<List<PortfolioItemResponse>> list() {
        return ResponseEntity.ok(service.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioItemResponse> get(@PathVariable Long id) {
        var dto = service.findById(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<PortfolioItemResponse> create(@Valid @RequestBody PortfolioItemRequest req) {
        return ResponseEntity.ok(service.create(req));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<PortfolioItemResponse> update(@PathVariable Long id, @Valid @RequestBody PortfolioItemRequest req) {
        return ResponseEntity.ok(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
