package com.akshaymarkad.photography.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioItemDto {
    private Long id;
    private String title;
    private String description;
    private String slug;
    private LocalDateTime createdAt;
    private String coverImageUrl;
}
