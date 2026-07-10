package com.akshaymarkad.photography.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "portfolio_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioItem extends BaseEntity {
    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String story;

    private String slug;

    

    private String location;

    private String camera;

    private String lens;

    private boolean featured;

    @Column(length = 1000)
    private String tags; // comma-separated

    @ManyToOne
    @JoinColumn(name = "category_id")
    private PortfolioCategory category;

    @OneToMany(mappedBy = "portfolioItem", cascade = CascadeType.ALL)
    private List<PortfolioImage> galleryImages;

    private String coverImageUrl;
}
