package com.akshaymarkad.photography.service;

import com.akshaymarkad.photography.dto.PortfolioCategoryDto;
import com.akshaymarkad.photography.dto.PortfolioItemRequest;
import com.akshaymarkad.photography.dto.PortfolioItemResponse;

import java.util.List;

public interface PortfolioAdminService {
    List<PortfolioItemResponse> listAll();
    PortfolioItemResponse findById(Long id);
    PortfolioItemResponse create(PortfolioItemRequest req);
    PortfolioItemResponse update(Long id, PortfolioItemRequest req);
    void delete(Long id);

    List<PortfolioCategoryDto> listCategories();
    PortfolioCategoryDto createCategory(PortfolioCategoryDto dto);
    PortfolioCategoryDto updateCategory(Long id, PortfolioCategoryDto dto);
    void deleteCategory(Long id);
}
