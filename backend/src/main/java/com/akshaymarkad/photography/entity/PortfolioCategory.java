package com.akshaymarkad.photography.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "portfolio_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioCategory extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String label;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<PortfolioItem> items;
}
