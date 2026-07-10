package com.akshaymarkad.photography.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioItemResponse {
    private Long id;
    private String title;
    private String description;
    private String story;
    private String slug;
    private LocalDateTime createdAt;
    private String coverImageUrl;
    private List<PortfolioImageDto> galleryImages;
    private List<String> tags;
    private String location;
    private String camera;
    private String lens;
    private boolean featured;
    private PortfolioCategoryDto category;
}
