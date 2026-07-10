package com.akshaymarkad.photography.service.impl;

import com.akshaymarkad.photography.dto.PortfolioItemDto;
import com.akshaymarkad.photography.mapper.PortfolioMapper;
import com.akshaymarkad.photography.repository.PortfolioItemRepository;
import com.akshaymarkad.photography.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService {
    private final PortfolioItemRepository repo;
    private final PortfolioMapper mapper;

    @Override
    public List<PortfolioItemDto> listAll() {
        return repo.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public PortfolioItemDto findBySlug(String slug) {
        return repo.findBySlug(slug).map(mapper::toDto).orElse(null);
    }

    @Override
    public Page<PortfolioItemDto> list(Pageable pageable, String q, String categorySlug, Boolean featured, String tags, String location) {
        var spec = (org.springframework.data.jpa.domain.Specification<com.akshaymarkad.photography.entity.PortfolioItem>) (root, query, cb) -> {
            var predicates = new java.util.ArrayList<javax.persistence.criteria.Predicate>();
            if (q != null && !q.isEmpty()) {
                var like = "%%%s%%".formatted(q);
                predicates.add(cb.or(cb.like(root.get("title"), like), cb.like(root.get("description"), like)));
            }
            if (categorySlug != null && !categorySlug.isEmpty()) {
                predicates.add(cb.equal(root.get("category").get("slug"), categorySlug));
            }
            if (featured != null) {
                predicates.add(cb.equal(root.get("featured"), featured));
            }
            if (tags != null && !tags.isEmpty()) {
                predicates.add(cb.like(root.get("tags"), "%%%s%%".formatted(tags)));
            }
            if (location != null && !location.isEmpty()) {
                predicates.add(cb.like(root.get("location"), "%%%s%%".formatted(location)));
            }
            return cb.and(predicates.toArray(new javax.persistence.criteria.Predicate[0]));
        };
        var page = repo.findAll(spec, pageable);
        List<PortfolioItemDto> content = page.getContent().stream().map(mapper::toDto).collect(Collectors.toList());
        return new PageImpl<>(content, pageable, page.getTotalElements());
    }

    @Override
    public java.util.List<com.akshaymarkad.photography.dto.PortfolioCategoryDto> listCategories() {
        return java.util.Optional.ofNullable(categoryRepo.findAll()).orElse(java.util.List.of()).stream()
                .map(c -> new com.akshaymarkad.photography.dto.PortfolioCategoryDto(c.getId(), c.getSlug(), c.getLabel(), c.getCreatedAt()))
                .collect(Collectors.toList());
    }
}
