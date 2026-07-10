package com.akshaymarkad.photography.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioItemRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String slug;
    private String description;
    private String story;
    @NotNull
    private Long categoryId;
    private String location;
    private String camera;
    private String lens;
    private boolean featured;
    @NotBlank
    private String coverImageUrl;
    private List<PortfolioImageDto> galleryImages;
    private List<String> tags;
}
