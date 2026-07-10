package com.akshaymarkad.photography.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioImageDto {
    private Long id;
    private String url;
    private String publicId;
    private Integer width;
    private Integer height;
    private String altText;
}
