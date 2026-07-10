package com.akshaymarkad.photography.service.impl;

import com.akshaymarkad.photography.dto.PortfolioCategoryDto;
import com.akshaymarkad.photography.dto.PortfolioImageDto;
import com.akshaymarkad.photography.dto.PortfolioItemRequest;
import com.akshaymarkad.photography.dto.PortfolioItemResponse;
import com.akshaymarkad.photography.entity.PortfolioCategory;
import com.akshaymarkad.photography.entity.PortfolioImage;
import com.akshaymarkad.photography.entity.PortfolioItem;
import com.akshaymarkad.photography.repository.PortfolioCategoryRepository;
import com.akshaymarkad.photography.repository.PortfolioItemRepository;
import com.akshaymarkad.photography.service.PortfolioAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioAdminServiceImpl implements PortfolioAdminService {
    private final PortfolioItemRepository itemRepo;
    private final PortfolioCategoryRepository categoryRepo;

    @Override
    public List<PortfolioItemResponse> listAll() {
        return itemRepo.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public PortfolioItemResponse findById(Long id) {
        return itemRepo.findById(id).map(this::toResponse).orElse(null);
    }

    @Override
    @Transactional
    public PortfolioItemResponse create(PortfolioItemRequest req) {
        if (itemRepo.findBySlug(req.getSlug()).isPresent()) throw new IllegalArgumentException("Slug must be unique");
        PortfolioItem it = new PortfolioItem();
        applyRequest(it, req);
        it.setCreatedAt(LocalDate.now());
        PortfolioItem saved = itemRepo.save(it);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public PortfolioItemResponse update(Long id, PortfolioItemRequest req) {
        PortfolioItem it = itemRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!it.getSlug().equals(req.getSlug()) && itemRepo.findBySlug(req.getSlug()).isPresent()) throw new IllegalArgumentException("Slug must be unique");
        applyRequest(it, req);
        PortfolioItem saved = itemRepo.save(it);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        itemRepo.deleteById(id);
    }

    @Override
    public List<PortfolioCategoryDto> listCategories() {
        return categoryRepo.findAll().stream().map(c -> new PortfolioCategoryDto(c.getId(), c.getSlug(), c.getLabel(), c.getCreatedAt())).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PortfolioCategoryDto createCategory(PortfolioCategoryDto dto) {
        if (categoryRepo.findBySlug(dto.getSlug()).isPresent()) throw new IllegalArgumentException("Slug must be unique");
        PortfolioCategory c = new PortfolioCategory();
        c.setLabel(dto.getLabel());
        c.setSlug(dto.getSlug());
        var saved = categoryRepo.save(c);
        return new PortfolioCategoryDto(saved.getId(), saved.getSlug(), saved.getLabel(), saved.getCreatedAt());
    }

    @Override
    @Transactional
    public PortfolioCategoryDto updateCategory(Long id, PortfolioCategoryDto dto) {
        PortfolioCategory c = categoryRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (!c.getSlug().equals(dto.getSlug()) && categoryRepo.findBySlug(dto.getSlug()).isPresent()) throw new IllegalArgumentException("Slug must be unique");
        c.setLabel(dto.getLabel());
        c.setSlug(dto.getSlug());
        var saved = categoryRepo.save(c);
        return new PortfolioCategoryDto(saved.getId(), saved.getSlug(), saved.getLabel(), saved.getCreatedAt());
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }

    private void applyRequest(PortfolioItem it, PortfolioItemRequest req) {
        it.setTitle(req.getTitle());
        it.setSlug(req.getSlug());
        it.setDescription(req.getDescription());
        it.setStory(req.getStory());
        it.setLocation(req.getLocation());
        it.setCamera(req.getCamera());
        it.setLens(req.getLens());
        it.setFeatured(req.isFeatured());
        it.setCoverImageUrl(req.getCoverImageUrl());
        it.setTags(req.getTags() == null ? null : String.join(",", req.getTags()));
        if (req.getCategoryId() != null) {
            var cat = categoryRepo.findById(req.getCategoryId()).orElseThrow(() -> new IllegalArgumentException("Category not found"));
            it.setCategory(cat);
        }
        if (req.getGalleryImages() != null) {
            List<PortfolioImage> images = req.getGalleryImages().stream().map(i -> {
                PortfolioImage pi = new PortfolioImage();
                pi.setUrl(i.getUrl());
                pi.setPublicId(i.getPublicId());
                pi.setWidth(i.getWidth());
                pi.setHeight(i.getHeight());
                pi.setAltText(i.getAltText());
                pi.setPortfolioItem(it);
                return pi;
            }).collect(Collectors.toList());
            it.setGalleryImages(images);
        }
    }

    private PortfolioItemResponse toResponse(PortfolioItem it) {
        var cat = it.getCategory();
        PortfolioCategoryDto catDto = cat == null ? null : new PortfolioCategoryDto(cat.getId(), cat.getSlug(), cat.getLabel(), cat.getCreatedAt() == null ? null : cat.getCreatedAt().atStartOfDay());
        List<PortfolioImageDto> images = it.getGalleryImages() == null ? List.of() : it.getGalleryImages().stream().map(i -> new PortfolioImageDto(i.getId(), i.getUrl(), i.getPublicId(), i.getWidth(), i.getHeight(), i.getAltText())).collect(Collectors.toList());
        List<String> tags = it.getTags() == null ? List.of() : List.of(it.getTags().split(","));
        return new PortfolioItemResponse(it.getId(), it.getTitle(), it.getDescription(), it.getStory(), it.getSlug(), it.getCreatedAt(), it.getCoverImageUrl(), images, tags, it.getLocation(), it.getCamera(), it.getLens(), it.isFeatured(), catDto);
    }
}
