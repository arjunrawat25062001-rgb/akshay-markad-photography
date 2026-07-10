package com.akshaymarkad.photography.controller;

import com.akshaymarkad.photography.dto.PortfolioItemDto;
import com.akshaymarkad.photography.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {
    private final PortfolioService service;

    @GetMapping
    public ResponseEntity<Page<PortfolioItemDto>> list(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int size,
                                                       @RequestParam(required = false) String q,
                                                       @RequestParam(required = false) String category,
                                                       @RequestParam(required = false) Boolean featured,
                                                       @RequestParam(required = false) String tags,
                                                       @RequestParam(required = false) String location) {
        var pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(service.list(pageable, q, category, featured, tags, location));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PortfolioItemDto> get(@PathVariable String slug) {
        var dto = service.findBySlug(slug);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/categories")
    public ResponseEntity<java.util.List<com.akshaymarkad.photography.dto.PortfolioCategoryDto>> categories() {
        return ResponseEntity.ok(service.listCategories());
    }
}
