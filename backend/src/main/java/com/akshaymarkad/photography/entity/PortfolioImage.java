package com.akshaymarkad.photography.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "portfolio_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioImage extends BaseEntity {
    private String url;
    private String publicId;
    private Integer width;
    private Integer height;
    private String altText;

    @ManyToOne
    @JoinColumn(name = "portfolio_item_id")
    private PortfolioItem portfolioItem;
}
