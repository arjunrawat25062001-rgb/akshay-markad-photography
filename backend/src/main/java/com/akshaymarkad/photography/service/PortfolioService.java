package com.akshaymarkad.photography.service;

import com.akshaymarkad.photography.dto.PortfolioItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PortfolioService {
    List<PortfolioItemDto> listAll();
    PortfolioItemDto findBySlug(String slug);
    Page<PortfolioItemDto> list(Pageable pageable, String q, String categorySlug, Boolean featured, String tags, String location);
    java.util.List<com.akshaymarkad.photography.dto.PortfolioCategoryDto> listCategories();
}
