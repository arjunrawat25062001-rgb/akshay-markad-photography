package com.akshaymarkad.photography.repository;

import com.akshaymarkad.photography.entity.PortfolioCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.Optional;

public interface PortfolioCategoryRepository extends JpaRepository<PortfolioCategory, Long>, JpaSpecificationExecutor<PortfolioCategory> {
    Optional<PortfolioCategory> findBySlug(String slug);
}
