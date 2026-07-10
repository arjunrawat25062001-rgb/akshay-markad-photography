package com.akshaymarkad.photography.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioCategoryDto {
    private Long id;
    private String slug;
    private String label;
    private LocalDateTime createdAt;
}
