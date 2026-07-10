package com.akshaymarkad.photography.controller;

import com.akshaymarkad.photography.dto.PortfolioCategoryDto;
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
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminCategoryController {
    private final PortfolioAdminService service;

    @GetMapping
    @Operation(summary = "List categories (admin)")
    public ResponseEntity<List<PortfolioCategoryDto>> list() {
        return ResponseEntity.ok(service.listCategories());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<PortfolioCategoryDto> create(@Valid @RequestBody PortfolioCategoryDto dto) {
        return ResponseEntity.ok(service.createCategory(dto));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<PortfolioCategoryDto> update(@PathVariable Long id, @Valid @RequestBody PortfolioCategoryDto dto) {
        return ResponseEntity.ok(service.updateCategory(id, dto));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
