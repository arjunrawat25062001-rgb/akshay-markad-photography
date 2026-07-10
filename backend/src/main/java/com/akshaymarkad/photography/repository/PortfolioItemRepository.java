package com.akshaymarkad.photography.repository;

import com.akshaymarkad.photography.entity.PortfolioItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.Optional;

public interface PortfolioItemRepository extends JpaRepository<PortfolioItem, Long>, JpaSpecificationExecutor<PortfolioItem> {
    Optional<PortfolioItem> findBySlug(String slug);
}
